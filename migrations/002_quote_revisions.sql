-- Apply after 001, before deploying V36. No rows are deleted.
begin;
alter table public.quotes add column if not exists revision integer not null default 1;
do $$ begin
 if not exists(select 1 from pg_constraint where conname='quotes_revision_positive' and conrelid='public.quotes'::regclass) then
  alter table public.quotes add constraint quotes_revision_positive check(revision>0);
 end if;
end $$;
insert into public.app_schema_migrations(version) values ('002_quote_revisions') on conflict do nothing;
commit;
