-- V35: execute as the database owner in the app's dedicated Supabase project.
-- Back up the database before applying. Safe to rerun.
begin;

-- This app authenticates through server cookie sessions. The browser does
-- not use Supabase Auth or call the Data API directly. Explicit backend
-- grants prevent service-role access from depending on inherited PUBLIC grants.
revoke all on table public.advisors, public.app_passwords, public.app_sessions,
  public.insurers, public.rate_cards, public.quotes, public.quote_submissions,
  public.audit_logs, public.customers, public.vehicles, public.policies
  from public, anon, authenticated;
grant select, insert, update, delete on table public.advisors,
  public.app_passwords, public.app_sessions, public.insurers, public.rate_cards,
  public.quotes, public.audit_logs, public.customers, public.vehicles,
  public.policies to service_role;
grant select, insert on table public.quote_submissions to service_role;
revoke update, delete, truncate on table public.quote_submissions from service_role;

-- Older installations contain Supabase-Auth helper RPCs. A function's
-- default PUBLIC execution grant otherwise survives revoking named roles.
revoke execute on function public.get_email_for_username(text),
  public.get_advisor_requests(), public.set_advisor_approval(uuid,text),
  public.get_advisor_users(), public.set_advisor_active(uuid,boolean),
  public.is_current_user_admin(), public.handle_new_advisor_signup()
  from public, anon, authenticated;

create or replace function public.prevent_quote_submission_changes()
returns trigger language plpgsql set search_path = public as $$
begin
  raise exception 'Quote submission history is append-only';
end;
$$;
revoke all on function public.prevent_quote_submission_changes() from public, anon, authenticated;
drop trigger if exists quote_submissions_append_only on public.quote_submissions;
create trigger quote_submissions_append_only
  before update or delete on public.quote_submissions
  for each row execute function public.prevent_quote_submission_changes();

create index if not exists quotes_advisor_created_idx on public.quotes(advisor_id,created_at desc);
create index if not exists app_sessions_expiry_idx on public.app_sessions(expires_at);

create table if not exists public.app_schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);
alter table public.app_schema_migrations enable row level security;
revoke all on public.app_schema_migrations from public, anon, authenticated;
grant select on public.app_schema_migrations to service_role;
insert into public.app_schema_migrations(version) values ('001_backend_access_and_audit') on conflict(version) do nothing;
commit;
