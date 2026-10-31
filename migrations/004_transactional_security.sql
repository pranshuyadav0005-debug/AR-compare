-- Existing deployments only: apply AFTER 001,002,003 with a tested backup.
-- No rows deleted. Existing sessions are revoked because credential generation is introduced.
begin;
alter table public.advisors add column if not exists auth_version bigint not null default 0;
alter table public.app_sessions add column if not exists auth_version bigint not null default 0;
-- Re-running this migration must not revoke fresh sessions.
do $$ begin
 if not exists(select 1 from public.app_schema_migrations where version='004_transactional_security') then
  update public.app_sessions set revoked_at=clock_timestamp() where revoked_at is null;
 end if;
end $$;

-- Match current application queries; provider/CRM writes require database-owner maintenance.
revoke all on public.advisors,public.app_passwords,public.app_sessions,public.insurers,public.rate_cards,public.quotes,public.quote_submissions,public.audit_logs,public.customers,public.vehicles,public.policies,public.app_schema_migrations from public,anon,authenticated,service_role;
grant select,insert,update,delete on public.advisors to service_role;
grant select,insert,update on public.app_passwords,public.app_sessions,public.quotes to service_role;
grant select,insert on public.audit_logs,public.quote_submissions to service_role;
grant select on public.insurers,public.rate_cards,public.vehicles,public.customers,public.policies,public.app_schema_migrations to service_role;

-- Atomic security operations. Applies to both fresh and upgraded schemas.
create schema if not exists app_private;
revoke all on schema app_private from public,anon,authenticated,service_role;
alter default privileges revoke execute on functions from public,anon,authenticated,service_role;
create or replace function app_private.reject_history_changes() returns trigger
language plpgsql set search_path=pg_catalog as $$ begin
 raise exception 'Security history is append-only' using errcode='42501';
end $$;
create or replace function app_private.revoke_on_account_change() returns trigger
language plpgsql security definer set search_path=pg_catalog as $$ begin
 if new.is_active is distinct from old.is_active or new.role is distinct from old.role or new.approval_status is distinct from old.approval_status then
  new.auth_version := old.auth_version+1;
  update public.app_sessions set revoked_at=clock_timestamp() where advisor_id=old.id and revoked_at is null;
 end if;
 return new;
end $$;
create or replace function app_private.revoke_on_password_change() returns trigger
language plpgsql security definer set search_path=pg_catalog as $$ begin
 if tg_op='INSERT' or new.password_hash is distinct from old.password_hash then
  update public.advisors set auth_version=auth_version+1 where id=new.advisor_id;
  update public.app_sessions set revoked_at=clock_timestamp() where advisor_id=new.advisor_id and revoked_at is null;
 end if;
 return new;
end $$;
create or replace function app_private.check_session_generation() returns trigger
language plpgsql security definer set search_path=pg_catalog as $$
declare account public.advisors;
begin
 select * into account from public.advisors where id=new.advisor_id for share;
 if not found or not account.is_active or account.approval_status<>'approved' or new.auth_version<>account.auth_version then
  raise exception 'Credentials changed; sign in again' using errcode='42501';
 end if;
 return new;
end $$;
revoke all on all functions in schema app_private from public,anon,authenticated,service_role;
drop trigger if exists account_security_change on public.advisors;
create trigger account_security_change before update on public.advisors for each row execute function app_private.revoke_on_account_change();
drop trigger if exists password_security_change on public.app_passwords;
create trigger password_security_change after insert or update on public.app_passwords for each row execute function app_private.revoke_on_password_change();
drop trigger if exists session_generation_check on public.app_sessions;
create trigger session_generation_check before insert on public.app_sessions for each row execute function app_private.check_session_generation();
drop trigger if exists quote_submissions_append_only on public.quote_submissions;
create trigger quote_submissions_append_only before update or delete or truncate on public.quote_submissions for each statement execute function app_private.reject_history_changes();
drop trigger if exists audit_logs_append_only on public.audit_logs;
create trigger audit_logs_append_only before update or delete or truncate on public.audit_logs for each statement execute function app_private.reject_history_changes();

-- SECURITY INVOKER: only service_role gets EXECUTE and must have its own table grants.
-- No role argument exists; this function can only create advisors.
create or replace function public.app_provision_advisor(p_id uuid,p_name text,p_username text,p_password_hash text,p_actor uuid default null)
returns uuid language plpgsql security invoker set search_path=pg_catalog as $$ begin
 if p_actor is not null then
  perform 1 from public.advisors where id=p_actor and role='admin' and is_active and approval_status='approved' for share;
  if not found then raise exception 'Administrator access required' using errcode='42501'; end if;
 end if;
 if char_length(btrim(p_name)) not between 2 and 100 or p_username !~ '^[a-z0-9._-]{3,40}$' or p_password_hash !~ '^scrypt\$32768\$8\$3\$[A-Za-z0-9+/]{22}==\$[A-Za-z0-9+/]{86}==$' then
  raise exception 'Invalid account fields' using errcode='22023';
 end if;
 insert into public.advisors(id,name,username,role,approval_status,is_active) values(p_id,btrim(p_name),p_username,'advisor','approved',true);
 insert into public.app_passwords(advisor_id,password_hash) values(p_id,p_password_hash);
 insert into public.audit_logs(actor_id,action,target_id,metadata) values(coalesce(p_actor,p_id),case when p_actor is null then 'advisor_registered' else 'admin_create_user' end,p_id,jsonb_build_object('username',p_username));
 return p_id;
end $$;
create or replace function public.app_reset_advisor_password(p_id uuid,p_password_hash text,p_actor uuid)
returns boolean language plpgsql security invoker set search_path=pg_catalog as $$ begin
 perform 1 from public.advisors where id=p_actor and role='admin' and is_active and approval_status='approved' for share;
 if not found then raise exception 'Administrator access required' using errcode='42501'; end if;
 perform 1 from public.advisors where id=p_id and role='advisor' for update;
 if not found then raise exception 'Advisor not found' using errcode='P0002'; end if;
 if p_password_hash !~ '^scrypt\$32768\$8\$3\$[A-Za-z0-9+/]{22}==\$[A-Za-z0-9+/]{86}==$' then raise exception 'Invalid password hash' using errcode='22023'; end if;
 insert into public.app_passwords(advisor_id,password_hash) values(p_id,p_password_hash)
 on conflict(advisor_id) do update set password_hash=excluded.password_hash,updated_at=clock_timestamp();
 insert into public.audit_logs(actor_id,action,target_id) values(p_actor,'reset_password',p_id);
 return true;
end $$;
create or replace function public.app_set_advisor_active(p_id uuid,p_active boolean,p_actor uuid)
returns boolean language plpgsql security invoker set search_path=pg_catalog as $$ begin
 perform 1 from public.advisors where id=p_actor and role='admin' and is_active and approval_status='approved' for share;
 if not found then raise exception 'Administrator access required' using errcode='42501'; end if;
 update public.advisors set is_active=p_active where id=p_id and role='advisor';
 if not found then raise exception 'Advisor not found' using errcode='P0002'; end if;
 insert into public.audit_logs(actor_id,action,target_id) values(p_actor,case when p_active then 'activate_user' else 'deactivate_user' end,p_id);
 return true;
end $$;
revoke all on function public.app_provision_advisor(uuid,text,text,text,uuid),public.app_reset_advisor_password(uuid,text,uuid),public.app_set_advisor_active(uuid,boolean,uuid) from public,anon,authenticated;
grant execute on function public.app_provision_advisor(uuid,text,text,text,uuid),public.app_reset_advisor_password(uuid,text,uuid),public.app_set_advisor_active(uuid,boolean,uuid) to service_role;
revoke update,delete,truncate on public.audit_logs,public.quote_submissions from public,anon,authenticated,service_role;
insert into public.app_schema_migrations(version) values('004_transactional_security') on conflict do nothing;

notify pgrst,'reload schema';
commit;
