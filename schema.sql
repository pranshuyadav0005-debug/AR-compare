-- AR Advisors V39: COMPLETE schema for a NEW, EMPTY testing Supabase project.
-- Run as the database owner in SQL Editor. Do not run on your production database.
-- No sample passwords, service keys, Supabase Auth users, or legacy auth RPCs are created.
-- Existing app tables cause this transaction to abort without changing anything.
-- For existing installations use migrations/004_transactional_security.sql instead.
begin;
do $$ begin
 if exists(select 1 from pg_tables where schemaname='public' and tablename=any(array['advisors','app_passwords','app_sessions','insurers','rate_cards','quotes','quote_submissions','audit_logs','customers','vehicles','policies','app_schema_migrations'])) then
  raise exception 'Fresh install only: application tables already exist. Use a separate empty project or the reviewed incremental migrations.';
 end if;
 if not exists(select 1 from pg_roles where rolname='service_role' and rolbypassrls) then
  raise exception 'Expected the Supabase service_role with BYPASSRLS. Do not create an unprotected substitute role.';
 end if;
end $$;
create table public.advisors (
 id uuid primary key default gen_random_uuid(),
 name text not null check(char_length(btrim(name)) between 2 and 100),
 username text not null unique check(username ~ '^[a-z0-9._-]{3,40}$'),
 letterhead_details jsonb not null default '{}' check(jsonb_typeof(letterhead_details)='object'),
 role text not null default 'advisor' check(role in ('advisor','admin')),
 approval_status text not null default 'approved' check(approval_status='approved'),
 is_active boolean not null default true,
 auth_version bigint not null default 0 check(auth_version>=0),
 created_at timestamptz not null default now()
);
create table public.app_passwords (
 id uuid primary key default gen_random_uuid(),
 advisor_id uuid not null unique references public.advisors(id) on delete cascade,
 password_hash text not null check(password_hash ~ '^scrypt\$32768\$8\$3\$[A-Za-z0-9+/]{22}==\$[A-Za-z0-9+/]{86}==$'),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.app_sessions (
 id uuid primary key default gen_random_uuid(),
 token_hash text not null unique check(token_hash ~ '^[a-f0-9]{64}$'),
 advisor_id uuid not null references public.advisors(id) on delete cascade,
 auth_version bigint not null default 0 check(auth_version>=0),
 expires_at timestamptz not null, csrf_token text not null check(csrf_token ~ '^[a-f0-9]{64}$'),
 revoked_at timestamptz, created_at timestamptz not null default now(),
 check(expires_at>created_at and expires_at<=created_at+interval '8 days')
);
create table public.insurers (
 id uuid primary key default gen_random_uuid(), name text not null check(char_length(name) between 1 and 100),
 logo_url text, rating numeric check(rating between 0 and 5), garage_count integer not null default 0 check(garage_count>=0),
 api_status text not null default 'disabled' check(api_status in ('live','fallback_only','disabled')),
 garage_url text, api_config jsonb not null default '{}' check(jsonb_typeof(api_config)='object'),
 created_at timestamptz not null default now()
);
create table public.rate_cards (
 id uuid primary key default gen_random_uuid(), insurer_id uuid not null references public.insurers(id) on delete restrict,
 vehicle_category text not null default 'default', rate_rules jsonb not null default '{}' check(jsonb_typeof(rate_rules)='object'),
 updated_by uuid references public.advisors(id) on delete restrict, updated_at timestamptz not null default now(),
 unique(insurer_id,vehicle_category)
);
create table public.quotes (
 id uuid primary key default gen_random_uuid(), advisor_id uuid not null references public.advisors(id) on delete restrict,
 quotation_number text not null unique, owner_name text not null check(char_length(owner_name) between 1 and 100),
 registration_number text not null check(registration_number ~ '^[A-Z0-9-]{6,15}$'),
 vehicle_details jsonb not null check(jsonb_typeof(vehicle_details)='object'),
 idv_value numeric not null check(idv_value>0 and idv_value<=100000000),
 idv_auto_calculated numeric check(idv_auto_calculated>0 and idv_auto_calculated<=100000000),
 comparison_result jsonb check(jsonb_typeof(comparison_result)='object'), pdf_url text,
 advisor_declared_accurate boolean not null default false, revision integer not null default 1 check(revision>0),
 created_at timestamptz not null default now(), unique(id,advisor_id)
);
create table public.audit_logs (
 id uuid primary key default gen_random_uuid(), actor_id uuid references public.advisors(id) on delete restrict,
 action text not null check(char_length(action) between 1 and 80), target_id uuid,
 metadata jsonb not null default '{}' check(jsonb_typeof(metadata)='object'), created_at timestamptz not null default now()
);
create table public.quote_submissions (
 id uuid primary key default gen_random_uuid(), quotation_id uuid references public.quotes(id) on delete restrict,
 advisor_id uuid references public.advisors(id) on delete restrict, insurer_id uuid references public.insurers(id) on delete restrict,
 registration_number text, vehicle_snapshot jsonb not null check(jsonb_typeof(vehicle_snapshot)='object'),
 idv_snapshot numeric check(idv_snapshot>0 and idv_snapshot<=100000000), policy_snapshot jsonb,
 advisor_declared_accurate boolean not null default false, request_payload jsonb, response_payload jsonb,
 status text, request_id text, submitted_at timestamptz not null default now(),
 foreign key(quotation_id,advisor_id) references public.quotes(id,advisor_id) on delete restrict
);
create table public.customers (
 id uuid primary key default gen_random_uuid(), advisor_id uuid not null references public.advisors(id) on delete restrict,
 name text not null, phone text, email text, notes text, created_at timestamptz not null default now(), unique(id,advisor_id)
);
create table public.vehicles (
 id uuid primary key default gen_random_uuid(), advisor_id uuid not null references public.advisors(id) on delete restrict,
 customer_id uuid, registration_number text not null, make text not null, model text not null,
 variant text, fuel_type text, body_type text, engine_cc integer check(engine_cc>0), registered_date date,
 ex_showroom_price numeric check(ex_showroom_price>0), created_at timestamptz not null default now(),
 unique(advisor_id,registration_number), unique(id,advisor_id), unique(id,customer_id,advisor_id),
 foreign key(customer_id,advisor_id) references public.customers(id,advisor_id) on delete restrict
);
create table public.policies (
 id uuid primary key default gen_random_uuid(), advisor_id uuid not null references public.advisors(id) on delete restrict,
 customer_id uuid, vehicle_id uuid, previous_insurer text, had_claim boolean not null default false,
 ncb_percent numeric not null default 0 check(ncb_percent in (0,20,25,35,45,50)), expiry_date date not null,
 status text not null default 'active' check(status in ('active','expired','cancelled')), created_at timestamptz not null default now(),
 foreign key(customer_id,advisor_id) references public.customers(id,advisor_id) on delete restrict,
 foreign key(vehicle_id,advisor_id) references public.vehicles(id,advisor_id) on delete restrict,
 foreign key(vehicle_id,customer_id,advisor_id) references public.vehicles(id,customer_id,advisor_id) on delete restrict
);
create table public.app_schema_migrations(version text primary key, applied_at timestamptz not null default now());

create index app_sessions_advisor_idx on public.app_sessions(advisor_id);
create index app_sessions_expiry_idx on public.app_sessions(expires_at);
create index app_sessions_active_advisor_idx on public.app_sessions(advisor_id) where revoked_at is null;
create index quotes_advisor_created_idx on public.quotes(advisor_id,created_at desc);
create index quotes_advisor_registration_idx on public.quotes(advisor_id,registration_number);
create index quotes_advisor_owner_idx on public.quotes(advisor_id,owner_name);
create index quotes_advisor_quotation_idx on public.quotes(advisor_id,quotation_number);
create index audit_logs_actor_idx on public.audit_logs(actor_id);
create index audit_logs_created_idx on public.audit_logs(created_at desc);
create index quote_submissions_advisor_idx on public.quote_submissions(advisor_id);
create index quote_submissions_quotation_idx on public.quote_submissions(quotation_id);
create index quote_submissions_registration_idx on public.quote_submissions(registration_number);
create index quote_submissions_submitted_idx on public.quote_submissions(submitted_at desc);
create index customers_advisor_idx on public.customers(advisor_id);
create index vehicles_customer_idx on public.vehicles(customer_id,advisor_id);
create index policies_advisor_expiry_idx on public.policies(advisor_id,expiry_date);
create unique index policies_active_vehicle_unique on public.policies(vehicle_id) where status='active';

-- This is a dedicated server-side-auth project. Browser Data API roles have NO table access.
do $$ declare t text; begin
 foreach t in array array['advisors','app_passwords','app_sessions','insurers','rate_cards','quotes','quote_submissions','audit_logs','customers','vehicles','policies','app_schema_migrations'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('revoke all on table public.%I from public,anon,authenticated,service_role',t);
 end loop;
end $$;
revoke create on schema public from public,anon,authenticated,service_role;
grant usage on schema public to service_role;
grant select,insert,update,delete on public.advisors to service_role;
grant select,insert,update on public.app_passwords to service_role;
grant select,insert,update on public.app_sessions to service_role;
grant select on public.insurers,public.rate_cards,public.vehicles,public.customers,public.policies,public.app_schema_migrations to service_role;
grant select,insert,update on public.quotes to service_role;
grant select,insert on public.audit_logs,public.quote_submissions to service_role;
alter default privileges revoke execute on functions from public,anon,authenticated,service_role;
alter default privileges revoke all on tables from public,anon,authenticated,service_role;
-- Lock future objects created by this database owner, not just the existing tables.
alter default privileges in schema public revoke all on tables from public,anon,authenticated,service_role;
alter default privileges in schema public revoke all on sequences from public,anon,authenticated,service_role;
alter default privileges in schema public revoke execute on functions from public,anon,authenticated,service_role;
insert into public.app_schema_migrations(version) values ('001_backend_access_and_audit'),('002_quote_revisions'),('003_public_launch');

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
