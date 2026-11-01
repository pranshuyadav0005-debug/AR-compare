# Database installation and upgrades

For the existing V39 testing database with migrations 001–004, apply ONLY 005_public_google_auth.sql. No rows are deleted and the update is safe to rerun.

Earlier installations must apply 001_backend_access_and_audit.sql, 002_quote_revisions.sql, 003_public_launch.sql, 004_transactional_security.sql and 005_public_google_auth.sql in that order after backup/staging review.

For a fresh empty project, sql/Testing-Database.sql already contains the final 001–005 schema, sample rates and an admin row without a preset password. Do not run a fresh installer over an existing database.

005 adds a nullable unique hashed-Google-subject column and a restricted transactional Google-account RPC. It does not delete or revoke existing username/password accounts, sessions, quotes or audit history. The current upgrade test installs the prior schema, preserves these records, applies 005 twice and verifies the new Google mapping/permissions. Hosted Supabase configuration still needs verification.

Run security/verify-database.sql after migration. Leave the old Supabase Auth signup trigger disabled and old browser table grants revoked. Google login uses verified provider identities through the new server-only flow, not legacy Auth provisioning functions.
