# Database installation and upgrades

For a fresh TEST project, run `sql/Testing-Database.sql` once; do not run these incremental migrations as well. That installer already includes the final 001–004 state.

For an EXISTING app database, back up and test restoring it, then review and apply:

1. 001_backend_access_and_audit.sql
2. 002_quote_revisions.sql
3. 003_public_launch.sql
4. 004_transactional_security.sql

001 restricts browser grants and protects quotation submission history. 002 adds quote revision checks. 003 normalizes old pending/rejected advisors to inactive, disables legacy Supabase Auth signup provisioning and removes an old RPC grant. 004 introduces credential generations, transaction-based account creation/reset/status changes, database-enforced session revocation, immutable security audit history and tighter backend table privileges. Its first application revokes existing sessions; reapplying it does not revoke new sessions.

No migration deletes stored rows. Existing foreign keys and weaker old constraints are not destructively rebuilt by 004. The fresh testing schema adds stronger input and same-advisor CRM relationship constraints directly. Review production data before planning any further constraint changes.

After upgrading, run `security/verify-database.sql`. Existing databases were exercised locally from the archived original schema using embedded PostgreSQL; your actual Supabase project's grants, Auth configuration and schema still need validation. Never rerun `sql/legacy_schema_reference.sql`: it is an historical reference used by upgrade tests and contains obsolete browser-facing Auth objects.
