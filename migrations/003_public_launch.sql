-- Apply after 001 and 002, with a verified backup, as the database owner.
-- No rows are deleted. Previously pending/rejected users stay blocked (inactive).
begin;
update public.advisors set is_active = false, approval_status = 'approved'
where role = 'advisor' and approval_status in ('pending', 'rejected');
alter table public.advisors alter column approval_status set default 'approved';
-- Service-role API only; do not retain old browser-facing policies/grants.
alter table public.advisors enable row level security;
alter table public.app_passwords enable row level security;
alter table public.app_sessions enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_submissions enable row level security;
alter table public.audit_logs enable row level security;
-- Disable the obsolete Supabase Auth provisioning path. This app uses cookie auth.
drop trigger if exists on_auth_user_created on auth.users;
revoke execute on function public.set_advisor_active(uuid,boolean) from public, anon, authenticated;
create index if not exists app_sessions_active_advisor_idx
on public.app_sessions(advisor_id) where revoked_at is null;
insert into public.app_schema_migrations(version) values ('003_public_launch') on conflict do nothing;
commit;
