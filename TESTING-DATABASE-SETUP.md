# Fresh testing database setup — V39

Use a NEW, SEPARATE Supabase project. Do not point these steps at your production project. No production connection was used while preparing this package.

1. Open the new project's SQL Editor and run the entire `sql/AR-Advisors-Testing-Database.sql` file once. It creates all 12 tables, indexes, constraints, RLS, restricted grants, transactional account RPCs, session-security triggers, append-only audit protection, and migration markers 001–004. It also adds five synthetic sample insurer rate cards and the `test.admin` admin record. No password or API key is embedded. The installer refuses to run when app tables already exist and rolls back the whole transaction.
2. Copy `.env.example` to `.env` in a local checkout. Set your TEST project's `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Keep this file private and outside `public/`. For local testing set `NODE_ENV=development`, `HOST=127.0.0.1`, `TRUST_PROXY_HOPS=0`, `APP_ATOMIC_ACCOUNTS=true`. Production always uses transactional account operations and cannot disable them.
3. Initialize the test admin's password from your secured local terminal. In Bash, run the following; enter a unique passphrase of 15–128 characters. The shell reads it silently and pipes it through stdin, rather than putting it in command history or command arguments:

```bash
read -r -s -p 'Test admin password: ' testing_admin_password
printf '\n'
printf '%s' "$testing_admin_password" | ADMIN_USERNAME=test.admin npm run bootstrap:admin
unset testing_admin_password
```

The initializer refuses to reset an existing password. If you use PowerShell, use an equivalent secure prompt/stdin method rather than placing the password directly in a command. No default password is provided.

4. Run `npm start`, open `http://localhost:3000`, and sign in as `test.admin`. Create advisor accounts through User Management. For invited self-registration, set `REGISTRATION_INVITE_CODE` to at least 32 randomly generated characters and share it privately. Leave it empty to close registration. Successful invited accounts can immediately sign in; no admin approval step exists.
5. Run `security/verify-database.sql` in the test project's SQL Editor. This script is read only and raises an exception when any listed assertion fails. Keep the result, then exercise real advisor/admin sessions, registration, reset, deactivation, logout, quote saving and isolation against actual Supabase. Embedded PostgreSQL tests do not validate the hosted Supabase PostgREST layer, dashboard settings or actual network configuration.

For an existing app database, use migrations 001–004 IN ORDER after a tested backup and staging review; do NOT run the fresh installer. Migration 004 revokes existing sessions only on its first successful application, adds credential generations, installs transactional security operations and tightens backend grants. It does not delete accounts, passwords, quotations or audit history. Existing legacy password hashes remain readable for compatibility; reset imported accounts to the stronger current hash configuration before high-assurance deployment.

`schema.sql` and `sql/testing_database_schema.sql` are the same schema-only fresh installer without sample rates or an admin row. The downloadable `AR-Advisors-Testing-Database.sql` is the combined, atomic setup recommended above. Do not run both installers in the same project.

To reproduce isolated checks without a hosted database:

```sh
npm ci
npx playwright install chromium
npm run test:security
npm run test:database
node scripts/test-ui.cjs
```

The database test suite executes real PostgreSQL SQL/roles/constraints/transactions in PGlite. Its HTTP bridge covers only the application's tested PostgREST subset, not the full hosted service. Its browser test uses the actual Node application and those PostgreSQL-backed operations. The separate comparison UI suite intercepts quote responses to exercise failures and rendering; it is not a live-insurer test.

`npm test` retains an original test that expects the removed approval route; it fails rather than silently changing the old assertion. The original admin browser suite also expects old uninvited/pending signup. Current invitation/admin behavior is separately tested. See SECURITY-REVIEW.md for exact results and unresolved release checks.
