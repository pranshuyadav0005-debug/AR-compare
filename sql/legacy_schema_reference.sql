-- ===========================================================
-- AR Advisors — Insurance Comparison Tool
-- Initial schema + Row Level Security (RLS)
-- Run this in Supabase Dashboard -> SQL Editor
-- ===========================================================

-- advisors: one row per application user. Authentication is handled by the
-- server-side username/password session layer; this table does not depend on auth.users.
-- IMPORTANT: this application uses a server-side username/password session layer.
-- Advisor IDs are application UUIDs and are NOT required to exist in auth.users.
-- Remove the legacy FK if an older database version created it.
alter table if exists advisors drop constraint if exists advisors_id_fkey;

create table if not exists advisors (
  id uuid primary key,
  name text not null,
  username text,
  letterhead_details jsonb default '{}'::jsonb,
  role text not null check (role in ('advisor', 'admin')),
  approval_status text not null default 'approved' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

-- Safety net: add username if this table already existed from an
-- earlier run of this file, before username-based login was added.
alter table advisors add column if not exists username text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'advisors_username_key'
  ) then
    alter table advisors add constraint advisors_username_key unique (username);
  end if;
end $$;

alter table advisors enable row level security;

drop policy if exists "Advisors can read their own row" on advisors;
create policy "Advisors can read their own row"
  on advisors for select
  using (auth.uid() = id);

-- Existing accounts are approved; new public signups are marked pending by the trigger.
alter table advisors add column if not exists approval_status text;
update advisors set approval_status = 'approved' where approval_status is null;
alter table advisors alter column approval_status set default 'approved';
alter table advisors alter column approval_status set not null;
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'advisors_approval_status_check') then
    alter table advisors add constraint advisors_approval_status_check
      check (approval_status in ('pending', 'approved', 'rejected'));
  end if;
end $$;

create or replace function is_current_user_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from advisors where id = auth.uid() and role = 'admin');
$$;
grant execute on function is_current_user_admin() to authenticated;

drop policy if exists "Admins can read all advisor accounts" on advisors;
create policy "Admins can read all advisor accounts"
  on advisors for select
  using (is_current_user_admin());

drop policy if exists "Admins can update advisor approval" on advisors;
create policy "Admins can update advisor approval"
  on advisors for update
  using (is_current_user_admin())
  with check (is_current_user_admin());


-- ===========================================================
-- Username-based login support.
--
-- Supabase Auth only knows email/password natively — there's no
-- built-in "username" concept. The login page looks up a user's
-- real email by their username via this function BEFORE calling
-- signInWithPassword(), and the signup page uses it to check
-- whether a username is already taken.
--
-- SECURITY DEFINER lets this run with owner privileges so it can
-- read auth.users (normally locked down) and bypass advisors' RLS
-- — it only ever returns an email address, nothing else.
-- ===========================================================
create or replace function get_email_for_username(p_username text)
returns text
language sql
security definer
set search_path = public
as $$
  select au.email
  from advisors ad
  join auth.users au on au.id = ad.id
  where ad.username = p_username
  limit 1;
$$;

revoke execute on function get_email_for_username(text) from anon, authenticated;

-- Admin-only approval helpers. These return the email from auth.users without exposing
-- auth.users directly to the browser and allow the Admin panel to approve/reject accounts.
create or replace function get_advisor_requests()
returns table (id uuid, name text, username text, email text, approval_status text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select ad.id, ad.name, ad.username, au.email, ad.approval_status, ad.created_at
  from advisors ad
  join auth.users au on au.id = ad.id
  where is_current_user_admin()
    and ad.role = 'advisor'
  order by case when ad.approval_status = 'pending' then 0 else 1 end, ad.created_at desc;
$$;
grant execute on function get_advisor_requests() to authenticated;

create or replace function set_advisor_approval(p_advisor_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_current_user_admin() then
    raise exception 'Only an Admin can approve advisor accounts';
  end if;
  if p_status not in ('approved', 'rejected') then
    raise exception 'Invalid approval status';
  end if;
  update advisors
    set approval_status = p_status
  where id = p_advisor_id and role = 'advisor';
  return found;
end;
$$;
grant execute on function set_advisor_approval(uuid, text) to authenticated;

-- ===========================================================
-- Auto-provisioning: when someone signs up via the Sign Up form,
-- supabaseClient.auth.signUp() creates the auth.users row and
-- passes { name, username } as user metadata. This trigger reads
-- that metadata and creates the matching `advisors` row
-- automatically, always as role 'advisor' — admin accounts are
-- still provisioned manually (see the note at the bottom of this
-- file), never through public signup.
-- ===========================================================
create or replace function handle_new_advisor_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into advisors (id, name, username, role, approval_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'username',
    'advisor',
    'pending'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function handle_new_advisor_signup();

-- insurers: read-only for advisors, writable by admins only
create table if not exists insurers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  rating numeric default 4.0,
  garage_count integer default 0,
  api_status text not null default 'fallback_only' check (api_status in ('live', 'fallback_only', 'disabled')),
  garage_url text,
  api_config jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table insurers enable row level security;

-- Safety net: if `insurers` already existed from an earlier run of
-- this file (before rating/garage_count were added), add them now.
-- Safe to run even if the columns already exist.
alter table insurers add column if not exists rating numeric default 4.0;
alter table insurers add column if not exists garage_count integer default 0;

drop policy if exists "Any advisor can read insurers" on insurers;
create policy "Any advisor can read insurers"
  on insurers for select
  using (auth.role() = 'authenticated');

drop policy if exists "Only admins can write insurers" on insurers;
create policy "Only admins can write insurers"
  on insurers for all
  using (exists (select 1 from advisors where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from advisors where id = auth.uid() and role = 'admin'));

-- rate_cards: fallback data, admin-maintained
create table if not exists rate_cards (
  id uuid primary key default gen_random_uuid(),
  insurer_id uuid references insurers(id) on delete cascade,
  vehicle_category text,
  rate_rules jsonb default '{}'::jsonb,
  updated_by uuid references advisors(id),
  updated_at timestamptz default now(),
  unique (insurer_id, vehicle_category)
);

alter table rate_cards enable row level security;

-- Safety net: add the uniqueness constraint if this table already
-- existed from an earlier run without it (Postgres has no
-- "ADD CONSTRAINT IF NOT EXISTS", hence the DO block).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'rate_cards_insurer_id_vehicle_category_key'
  ) then
    alter table rate_cards
      add constraint rate_cards_insurer_id_vehicle_category_key
      unique (insurer_id, vehicle_category);
  end if;
end $$;

drop policy if exists "Any advisor can read rate cards" on rate_cards;
create policy "Any advisor can read rate cards"
  on rate_cards for select
  using (auth.role() = 'authenticated');

drop policy if exists "Only admins can write rate cards" on rate_cards;
create policy "Only admins can write rate cards"
  on rate_cards for all
  using (exists (select 1 from advisors where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from advisors where id = auth.uid() and role = 'admin'));

-- quotes: advisor's saved comparisons / quote history
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid references advisors(id) on delete cascade,
  quotation_number text,
  owner_name text,
  registration_number text,
  vehicle_details jsonb not null,
  idv_value numeric not null,
  idv_auto_calculated numeric,
  comparison_result jsonb,
  pdf_url text,
  created_at timestamptz default now()
);

-- Quote-history search fields. These ALTERs make the script safe to run
-- against an existing database created from an earlier schema version.
alter table quotes add column if not exists quotation_number text;
alter table quotes add column if not exists owner_name text;
alter table quotes add column if not exists registration_number text;
-- Latest accuracy attestation state for this quotation record (the row is
-- still mutable — see quote_submissions below for the immutable history of
-- every individual submission, including ones later corrected/overwritten).
alter table quotes add column if not exists advisor_declared_accurate boolean;

create unique index if not exists quotes_quotation_number_uq on quotes(quotation_number) where quotation_number is not null;
create index if not exists quotes_advisor_registration_idx on quotes(advisor_id, registration_number);
create index if not exists quotes_advisor_owner_idx on quotes(advisor_id, owner_name);
create index if not exists quotes_advisor_quotation_idx on quotes(advisor_id, quotation_number);


alter table quotes enable row level security;

drop policy if exists "Advisors can read their own quotes" on quotes;
create policy "Advisors can read their own quotes"
  on quotes for select
  using (auth.uid() = advisor_id);

drop policy if exists "Advisors can insert their own quotes" on quotes;
create policy "Advisors can insert their own quotes"
  on quotes for insert
  with check (auth.uid() = advisor_id);

drop policy if exists "Admins can read all quotes" on quotes;
create policy "Admins can read all quotes"
  on quotes for select
  using (exists (select 1 from advisors where id = auth.uid() and role = 'admin'));

-- ===========================================================
-- After running this:
-- 1. Go to Authentication -> Users -> Add user, create your
--    first ADMIN (advisor accounts can now just use the app's
--    own Sign Up form — that's handled automatically by the
--    trigger above).
-- 2. Insert a matching row into `advisors` for that admin user:
--
--    insert into advisors (id, name, username, role)
--    values ('<user-uuid-from-auth>', 'Your Name', 'yourusername', 'admin');
--
--    (Find the user's UUID on the Authentication -> Users page.)
-- ===========================================================

-- ===========================================================
-- Server-side username/password sessions. The application uses its own
-- cookie session layer, so these tables must not depend on Supabase Auth.
-- ===========================================================
create table if not exists app_passwords (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references advisors(id) on delete cascade,
  password_hash text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (advisor_id)
);
alter table app_passwords enable row level security;

create table if not exists app_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  advisor_id uuid not null references advisors(id) on delete cascade,
  expires_at timestamptz not null,
  csrf_token text not null,
  revoked_at timestamptz,
  created_at timestamptz default now()
);
alter table app_sessions enable row level security;
create index if not exists app_sessions_advisor_idx on app_sessions(advisor_id);
create index if not exists app_sessions_token_idx on app_sessions(token_hash);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references advisors(id) on delete set null,
  action text not null,
  target_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
alter table audit_logs enable row level security;
create index if not exists audit_logs_actor_idx on audit_logs(actor_id);
create index if not exists audit_logs_created_idx on audit_logs(created_at desc);

-- ===========================================================
-- Immutable submission audit trail.
--
-- `quotes` (above) stays mutable by design — an advisor revising IDV,
-- add-ons or vehicle details on the same comparison updates the same row
-- (see saveQuote() in server/functions/quote.js), so it only ever shows
-- the LATEST state.
--
-- quote_submissions is the append-only counterpart: every time vehicle/IDV
-- data is actually sent out for pricing (fallback engine today, a live
-- insurer API once one is switched on), a new row is written here with the
-- exact snapshot of what was sent, who sent it and when. Rows are never
-- updated or deleted — a later correction creates a new row rather than
-- changing an old one, so the full history survives even after `quotes`
-- has moved on. This is what answers "what did we actually tell the
-- insurer, and when did it change" if a mismatch is ever raised later.
--
-- Like audit_logs above, this table is intentionally left with RLS enabled
-- and NO policies for the anon/authenticated roles: only the server
-- (using SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS) can read or write
-- it, so an advisor's own browser session can never edit or erase it.
-- ===========================================================
create table if not exists quote_submissions (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid references quotes(id) on delete set null,
  advisor_id uuid references advisors(id) on delete set null,
  insurer_id uuid references insurers(id) on delete set null, -- null = overall/summary row, not a specific insurer call
  registration_number text,
  vehicle_snapshot jsonb not null,
  idv_snapshot numeric,
  policy_snapshot jsonb,
  advisor_declared_accurate boolean not null default false,
  request_payload jsonb,   -- exact body sent to the insurer's API (live adapter only)
  response_payload jsonb,  -- insurer's raw response, or error detail (live adapter only)
  status text,             -- 'success' | 'fallback' | 'unavailable' | 'submitted'
  request_id text,
  submitted_at timestamptz not null default now()
);
alter table quote_submissions enable row level security;
create index if not exists quote_submissions_advisor_idx on quote_submissions(advisor_id);
create index if not exists quote_submissions_quotation_idx on quote_submissions(quotation_id);
create index if not exists quote_submissions_registration_idx on quote_submissions(registration_number);
create index if not exists quote_submissions_submitted_idx on quote_submissions(submitted_at desc);

-- ===========================================================
-- Advisor CRM and policy tracking
-- ===========================================================
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references advisors(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  notes text,
  created_at timestamptz default now()
);
alter table customers enable row level security;
drop policy if exists "Advisors can read their customers" on customers;
create policy "Advisors can read their customers" on customers for select using (auth.uid() = advisor_id);
drop policy if exists "Advisors can write their customers" on customers;
create policy "Advisors can write their customers" on customers for all using (auth.uid() = advisor_id) with check (auth.uid() = advisor_id);
drop policy if exists "Admins can read all customers" on customers;
create policy "Admins can read all customers" on customers for select using (exists (select 1 from advisors where id=auth.uid() and role='admin'));

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references advisors(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  registration_number text not null,
  make text not null,
  model text not null,
  variant text,
  fuel_type text,
  body_type text,
  engine_cc integer,
  registered_date date,
  ex_showroom_price numeric,
  created_at timestamptz default now(),
  unique(advisor_id, registration_number)
);
alter table vehicles enable row level security;
drop policy if exists "Advisors can read their vehicles" on vehicles;
create policy "Advisors can read their vehicles" on vehicles for select using (auth.uid() = advisor_id);
drop policy if exists "Advisors can write their vehicles" on vehicles;
create policy "Advisors can write their vehicles" on vehicles for all using (auth.uid() = advisor_id) with check (auth.uid() = advisor_id);
drop policy if exists "Admins can read all vehicles" on vehicles;
create policy "Admins can read all vehicles" on vehicles for select using (exists (select 1 from advisors where id=auth.uid() and role='admin'));

create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references advisors(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete cascade,
  previous_insurer text,
  had_claim boolean default false,
  ncb_percent numeric default 0,
  expiry_date date not null,
  status text not null default 'active' check (status in ('active','expired','cancelled')),
  created_at timestamptz default now()
);
alter table policies enable row level security;
drop policy if exists "Advisors can read their policies" on policies;
create policy "Advisors can read their policies" on policies for select using (auth.uid() = advisor_id);
drop policy if exists "Advisors can write their policies" on policies;
create policy "Advisors can write their policies" on policies for all using (auth.uid() = advisor_id) with check (auth.uid() = advisor_id);
drop policy if exists "Admins can read all policies" on policies;
create policy "Admins can read all policies" on policies for select using (exists (select 1 from advisors where id=auth.uid() and role='admin'));
create unique index if not exists policies_active_vehicle_unique on policies(vehicle_id) where status='active';

create index if not exists customers_advisor_idx on customers(advisor_id);
create index if not exists vehicles_advisor_reg_idx on vehicles(advisor_id, registration_number);
create index if not exists policies_advisor_expiry_idx on policies(advisor_id, expiry_date);

-- ===========================================================
-- User management: Admin can activate/deactivate advisors.
-- Passwords remain in Supabase Auth and are never readable.
-- ===========================================================
alter table advisors add column if not exists is_active boolean not null default true;
alter table insurers add column if not exists garage_url text;


create or replace function get_advisor_users()
returns table (id uuid, name text, username text, email text, role text, approval_status text, is_active boolean, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select ad.id, ad.name, ad.username, au.email, ad.role, ad.approval_status, ad.is_active, ad.created_at
  from advisors ad
  join auth.users au on au.id = ad.id
  where is_current_user_admin() and ad.role = 'advisor'
  order by ad.created_at desc;
$$;
grant execute on function get_advisor_users() to authenticated;

create or replace function set_advisor_active(p_advisor_id uuid, p_is_active boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_current_user_admin() then
    raise exception 'Only an approved Admin can change advisor access';
  end if;
  update advisors set is_active = p_is_active where id = p_advisor_id and role = 'advisor';
  if not found then raise exception 'Advisor account not found'; end if;
  return true;
end;
$$;
grant execute on function set_advisor_active(uuid, boolean) to authenticated;
