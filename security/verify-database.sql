-- READ ONLY assertions. Run as database owner in the dedicated app project.
-- A successful result proves only the checks listed here, not overall security.
begin read only;
do $$
declare tbl text; role_name text; privilege_name text; function_oid oid; function_name text;
begin
  foreach tbl in array array['advisors','app_passwords','app_sessions','insurers','rate_cards','quotes','quote_submissions','audit_logs','customers','vehicles','policies','app_schema_migrations'] loop
    if not exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname=tbl and c.relrowsecurity) then
      raise exception 'RLS missing on %',tbl;
    end if;
    foreach role_name in array array['anon','authenticated'] loop
      foreach privilege_name in array array['SELECT','INSERT','UPDATE','DELETE','TRUNCATE','REFERENCES','TRIGGER'] loop
        if has_table_privilege(role_name,format('public.%I',tbl),privilege_name) then
          raise exception 'Unexpected % privilege for % on %',privilege_name,role_name,tbl;
        end if;
      end loop;
    end loop;
  end loop;
  if exists(select 1 from public.advisors where approval_status <> 'approved') then
    raise exception 'Legacy account access migration incomplete';
  end if;
  foreach function_name in array array['get_email_for_username','get_advisor_requests','set_advisor_approval','get_advisor_users','set_advisor_active','is_current_user_admin','handle_new_advisor_signup'] loop
    for function_oid in select p.oid from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname=function_name loop
      foreach role_name in array array['anon','authenticated'] loop
        if has_function_privilege(role_name,function_oid,'EXECUTE') then raise exception 'Legacy RPC exposed: % to %',function_name,role_name; end if;
      end loop;
    end loop;
  end loop;
  if exists(select 1 from pg_trigger where tgrelid=to_regclass('auth.users') and tgname='on_auth_user_created' and not tgisinternal) then
    raise exception 'Legacy Auth provisioning is still enabled';
  end if;
  if has_table_privilege('service_role','public.quote_submissions','UPDATE') or has_table_privilege('service_role','public.quote_submissions','DELETE') or has_table_privilege('service_role','public.quote_submissions','TRUNCATE') then
    raise exception 'Submission audit log is mutable';
  end if;
  if not exists(select 1 from pg_trigger where tgrelid='public.quote_submissions'::regclass and tgname='quote_submissions_append_only' and tgenabled <> 'D') then
    raise exception 'Append-only audit trigger missing';
  end if;
  if not exists(select 1 from public.app_schema_migrations where version='005_public_google_auth') then raise exception 'Launch migration missing'; end if;
end $$;
do $$ declare r record; role_name text; begin
 if not exists(select 1 from information_schema.columns where table_schema='public' and table_name='app_sessions' and column_name='auth_version' and is_nullable='NO') then raise exception 'Session generation column missing'; end if;
 foreach role_name in array array['anon','authenticated'] loop
  for r in select p.oid,p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where (n.nspname='app_private' or (n.nspname='public' and p.proname in ('app_provision_advisor','app_reset_advisor_password','app_set_advisor_active','app_sign_in_google'))) loop
   if has_function_privilege(role_name,r.oid,'EXECUTE') then raise exception 'Unexpected function grant: % to %',r.proname,role_name; end if;
  end loop;
 end loop;
 if has_table_privilege('service_role','public.audit_logs','UPDATE') or has_table_privilege('service_role','public.audit_logs','DELETE') or has_table_privilege('service_role','public.audit_logs','TRUNCATE') then raise exception 'Security audit log is mutable'; end if;
 for r in select * from (values('advisors','account_security_change'),('app_passwords','password_security_change'),('app_sessions','session_generation_check'),('audit_logs','audit_logs_append_only')) as expected(tbl,trig) loop
  if not exists(select 1 from pg_trigger where tgrelid=format('public.%I',r.tbl)::regclass and tgname=r.trig and tgenabled<>'D') then raise exception 'Security trigger missing: %',r.trig; end if;
 end loop;
end $$;
select 'LISTED DATABASE ASSERTIONS PASSED; NOT AN OVERALL SECURITY APPROVAL' as result;
rollback;
