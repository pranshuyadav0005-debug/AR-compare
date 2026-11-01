# V39 security review — NOT APPROVED FOR PRODUCTION LAUNCH

Review date: 31 October 2026. A complete fresh testing-database installer and application fixes are included. No hosted database or public server was modified/deployed.

## What passed

| Check | Result | Evidence |
|---|---|---|
| Database, HTTP integration and signup/admin browser tests | 24 passed, 0 failed | security/v39-database-tests.log |
| Security, transport, password, cookie and provider-destination tests | 21 passed, 0 failed | security/v39-security-tests.log |
| Capacity and Redis coordination units | 7 passed, 0 failed | security/v39-coordination-tests.log |
| Existing comparison browser suite | Passed | security/v39-comparison-browser.log; desktop/mobile/print, failure states, manual IDV and saved history |
| Existing foundation regression | 16 passed, 1 failed | security/v39-regression-tests.log; unchanged approval-race expectation conflicts with removed endpoint |
| Existing admin browser suite | Failed at old signup expectation | security/v39-legacy-admin-browser.log; submits no invitation and expects old pending signup behavior |
| Original test/fixture integrity | All 10 unchanged | security/v39-source-integrity.json; byte-compared with uploaded original ZIP |
| JavaScript syntax | 75 files passed | security/v39-source-integrity.json |
| Pinned project dependency audit | 0 reported advisories | security/v39-dependency-audit.json; npm audit, including dev dependencies |

No test assertions were weakened, removed or skipped. The new database suite first found an INSERT ... ON CONFLICT upsert causing a BEFORE INSERT password trigger and UPDATE trigger to advance credential generations twice. The trigger now runs AFTER INSERT OR UPDATE so one actual write advances once. The original failing output is preserved in security/v39-database-first-run.log; the unchanged assertion passed on rerun.

The overall regression command remains RED. The approval-race test expects [200,409] from parallel approval requests but now receives [404,404]. The old admin UI test expects uninvited registration to reach a pending account; registration is now closed without an invitation. Correct current behavior is tested separately in actual Chromium against PostgreSQL-backed account operations. These legacy contract conflicts require review; do not restore removed functionality or bypass CI just to make old tests green.

## Scope of the database evidence

The SQL ran in PGlite, an embedded PostgreSQL engine, with isolated anon, authenticated and BYPASSRLS service_role test roles. SQL functions, transactions, grants, constraints and triggers were really executed, not matched as text or simulated in JavaScript. The new complete downloadable installer was separately installed and checked for all 12 tables, five sample insurers/rate cards, and an admin record with NO preset password. It refuses existing app tables, rolling back the transaction.

A second database exercised the original legacy schema plus migrations 001–004, preserving an account and verifying one-time session revocation and safe migration reruns. No destructive table rebuilds or stored-row deletion were performed. The upgrade deliberately does not retrofit every stronger fresh-install constraint onto existing data; those require a production data review.

The HTTP test bridge implements the application's exercised PostgREST subset and executes parameterized SQL under service_role. It is not the hosted Supabase PostgREST service and does not implement every search grammar. Live Supabase Data API behavior, actual Auth settings, network/TLS, concurrency across PostgreSQL connections, provider contracts and production performance remain unverified.

## Issues addressed

1. Replaced the mixed legacy Supabase Auth/cookie-auth installation path with a complete server-auth-only fresh schema. No old email-lookup, approval or Supabase Auth signup functions are installed. RLS is enabled on every app table; browser roles have no table or account-RPC grants. Default privileges prevent owner-created future tables/functions from inheriting browser access. Backend privileges now match current reads/writes; provider and CRM configuration writes require owner maintenance.
2. Added service-only, SECURITY INVOKER transactional RPCs for advisor creation, password reset and account activation. Account, password and security audit changes roll back together on failure. Provisioning has no role parameter and can only create advisors. Database checks independently reject non-admin actors for administrative operations.
3. Added credential-generation columns, database-enforced revocation on password/status/role changes, and locked generation checks at session insertion. A login holding an old generation cannot create a usable session after reset/deactivation, and reactivation cannot revive an old generation. User/session generations are checked on authenticated requests.
4. Made both security audit logs and quotation-submission history append-only, including UPDATE, DELETE and TRUNCATE protections. Fresh-install foreign keys preserve history and prevent cross-advisor CRM and quotation-submission relationships. Added current quote revision/index definitions and input constraints.
5. Strengthened new password hashes to scrypt N=32768,r=8,p=3, with bounded asynchronous derivation. New/reset passwords require 15–128 characters and credential fields must be strings. Legacy hashes remain verifiable for existing installations; reset imported accounts to the new configuration before high-assurance deployment. The fresh installer accepts only the stronger hash format.
6. Added __Host- production cookies, duplicate-cookie rejection and a null-prototype cookie parser. Kept HttpOnly session cookies, Secure flags, session-bound CSRF, origin/host checks, logout CSRF validation and reset/status revocation. Expired/revoked sessions can clear browser cookies safely. Web admin bootstrap now always returns 404; initialization is offline and has no preset password.
7. Restricted optional vehicle-verification endpoints to HTTPS and an explicit hostname allowlist, built query strings through URLSearchParams, and refused missing configured credentials. Added backslash escaping to owner-name search filters. Existing pricing-provider allowlists, redirect rejection and bounded payload reads remain enforced.
8. Kept request/queue/connection limits, deadlines, provider/database capacity, idempotency, graceful shutdown and metadata-only request logs. IP login/signup limits are configurable for office NAT; per-account login throttling remains enabled. Readiness requires migration markers 001–004; production cannot disable transactional account operations.
9. Added pinned dev-test dependencies, an audited lockfile, full PostgreSQL/browser checks, and independent CI jobs for preserved regressions, current security/database/browser checks and runtime-image scanning. Runtime Docker code still uses Node built-ins and excludes test dependencies.

## Still required before production approval

- Create the real separate Supabase testing project and run the provided installer, then run security/verify-database.sql and authenticated tests against its actual PostgREST endpoints. Validate real grants, role access, session races and provider sandbox contracts.
- Resolve the preserved legacy signup/approval test contracts in review. Current CI will not be all green while those unchanged expectations remain.
- Build and scan the real Node/Linux/Caddy runtime images, validate deployment manifests, pin reviewed images/actions and check current infrastructure vulnerabilities. npm audit does not cover these components. Docker/image scanning was unavailable here.
- Verify the actual TLS domain, trusted edge/firewall, forwarding-header overwrite, inaccessible app port, secret storage and rotation. No public server or hosting credentials were provided.
- Establish enforced admin MFA/SSO or equivalent deployment access control. Application MFA/SSO is NOT implemented. Test encrypted backups and restore, alert delivery, retention and incident/rollback procedures. Quote audit writes remain best effort and visibly warn when incomplete; monitoring must catch failures.

The 52 passing current database/security/coordination checks and passing comparison browser suite support the listed local fixes. They do not prove all possible vulnerabilities are absent and do not constitute an independent security certification. Overall production approval remains NOT APPROVED until the remaining checks have evidence and the release owner accepts the result.

References consulted: https://supabase.com/docs/guides/api/securing-your-api ; https://supabase.com/docs/guides/database/functions ; https://www.postgresql.org/docs/current/sql-createtrigger.html ; https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html . These sources guide implementation and do not certify this app.
