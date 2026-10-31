# Testing database setup

For a new empty Supabase project, run sql/Testing-Database.sql once. It creates the complete server-auth schema, migrations 001–005, sample insurer rates and a test.admin row with no preset password. The fresh installer refuses populated app tables.

For your existing V39 testing database, run only migrations/005_public_google_auth.sql. No rows are deleted. Then run security/verify-database.sql for read-only permission assertions.

Username/password signup is now public and needs no invitation. New users can register with a name, username and a unique password of 15–128 characters. Google setup is documented in GOOGLE-SIGNIN-SETUP.md. Public Google signup also requires allowing new users in Supabase Auth and configuring the provider; old auth.users provisioning triggers must stay disabled.

The existing offline initializer still sets the first test.admin password from stdin: set ADMIN_USERNAME=test.admin and run npm run bootstrap:admin from a secured local checkout connected to the testing database. It refuses to reset an already initialized admin. Do not place the password in command-line arguments, public files, Git history or screenshots.

To run new checks: npm ci; npx playwright install chromium; npm run test:public-auth. The current flow is tested with PostgreSQL and a mock OAuth provider. Legacy invitation-specific tests are preserved and conflict with the requested public-signup contract; they are not rewritten or bypassed to claim a green release.
