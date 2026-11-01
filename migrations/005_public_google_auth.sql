-- Existing TEST database: apply after 004. No stored accounts/history are deleted.
begin;
alter table public.advisors add column if not exists google_subject_hash text;
create unique index if not exists advisors_google_subject_hash_key on public.advisors(google_subject_hash) where google_subject_hash is not null;
do $$ begin
 if not exists(select 1 from pg_constraint where conname='advisors_google_subject_hash_format' and conrelid='public.advisors'::regclass) then
  alter table public.advisors add constraint advisors_google_subject_hash_format check(google_subject_hash is null or google_subject_hash ~ '^[a-f0-9]{64}$');
 end if;
end $$;
-- Google identity must be verified server-side. No email-based linking or role parameter.
create or replace function public.app_sign_in_google(p_subject_hash text,p_name text)
returns uuid language plpgsql security invoker set search_path=pg_catalog as $$
declare account public.advisors; new_id uuid:=gen_random_uuid();
begin
 if p_subject_hash is null or p_subject_hash !~ '^[a-f0-9]{64}$' or p_name is null or char_length(btrim(p_name)) not between 2 and 100 then
  raise exception 'Invalid verified identity' using errcode='22023';
 end if;
 insert into public.advisors(id,name,username,role,approval_status,is_active,google_subject_hash)
 values(new_id,btrim(p_name),'g_'||replace(new_id::text,'-',''),'advisor','approved',true,p_subject_hash)
 on conflict(google_subject_hash) where google_subject_hash is not null
 do update set google_subject_hash=excluded.google_subject_hash returning * into account;
 if account.role<>'advisor' or not account.is_active or account.approval_status<>'approved' then
  raise exception 'This account cannot sign in with Google' using errcode='42501';
 end if;
 insert into public.audit_logs(actor_id,action,target_id,metadata)
 values(account.id,case when account.id=new_id then 'google_account_created' else 'google_sign_in' end,account.id,'{}');
 return account.id;
end $$;
revoke all on function public.app_sign_in_google(text,text) from public,anon,authenticated;
grant execute on function public.app_sign_in_google(text,text) to service_role;
insert into public.app_schema_migrations(version) values('005_public_google_auth') on conflict do nothing;
notify pgrst,'reload schema';
commit;
