# Security review — NOT APPROVED FOR PUBLIC LAUNCH

Review date: 31 October 2026. Version: 3.8.0.

Changes are prepared locally. No deployment, live database mutation, external security approval, or public release has occurred.

## Verification results

| Check | Result | Evidence / limitation |
|---|---|---|
| New security/transport tests | 17 passed, 0 failed | security/local-security-tests.log; actual Node HTTP server, isolated DB fixture; production transport tested with trusted proxy headers locally |
| Existing foundation regression | 16 passed, 1 failed | security/regression-tests.log; original approval-race test expects removed endpoints |
| Existing backend, pricing and stage-4 smoke checks | Passed | security/regression-tests.log before the foundation failure |
| Capacity and Redis coordination units | 7 passed, 0 failed | security/coordination-tests.log; stand-ins, not production Redis/providers |
| JavaScript syntax | 70 files checked, 0 failures | security/source-integrity.json |
| Original test and fixture integrity | All 10 unchanged | Byte comparison with uploaded ZIP; no original assertion removed, weakened, skipped or deleted |
| Browser tests | Blocked / did not start | security/browser-tests.log; Playwright Chromium executable is unavailable |
| SQL migration and privilege assertions | NOT RUN | No PostgreSQL/Supabase access configured; must validate SQL and actual grants in staging |
| Docker build, Compose execution, image scan | NOT RUN | Docker unavailable; CI configuration supplied, no CI run claimed |
| Live HTTPS, firewall, actual proxies, live account isolation | NOT RUN | Production server/domain and test accounts not provided |
| Backup restore, incident alerts, MFA/SSO | NOT VERIFIED | Requires deployment/operator work; MFA/SSO is not implemented |

The regression failure is `admin advisor lists exclude administrators and approval races cannot overwrite a review` (scripts/test-foundation.js:203). Its parallel approval requests expect statuses [200,409], but both now return 404 because approval routes are removed. This is an intentional behavior change requested by the owner, but the full test command remains RED. It must not be described as passing. The original UI suite also contains approval expectations that need an owner-reviewed contract update after browser availability is restored.

A first-run new test exposed logout accepting a forged CSRF token. The application handler was fixed; the assertion stayed unchanged and now passes. A newly added transport test initially used Node fetch with a custom Host header; a separate HTTP observation proved Node replaced that header with the local socket authority. Only that new test's HTTP client was corrected to raw HTTP, with all assertions preserved. Its original failed output is retained in security/transport-harness-first-run.log. This is separate from the unchanged original regression failure.

## Implemented changes

- Removed the admin approval queue from signup, navigation and HTTP routing. Invited accounts become advisors and can sign in immediately; role injection is ignored. No registration invitation configured means registration is closed. A reusable invitation is a shared secret, not identity proof or MFA.
- Added migration 003 to keep formerly pending/rejected accounts inactive while normalizing the compatibility approval field. Existing active advisors remain active. No rows are deleted. The migration disables the obsolete Supabase Auth provisioning trigger and revokes an additional legacy RPC grant.
- Fixed logout CSRF/session validation. Retained session-bound CSRF for protected mutations, HttpOnly cookies, hashed server sessions, password-reset revocation, account deactivation and owner-scoped quotations.
- Required a canonical HTTPS origin in production; reject wrong hosts/insecure application traffic. Always mark production auth cookies Secure. Retained HSTS, framing protection, MIME protection and CSP; added form-action protection.
- Disabled web bootstrap in production and reject an enabled bootstrap secret at startup. Added an offline first-password initializer that refuses to reset an initialized admin.
- Moved web password derivation to bounded asynchronous scrypt work, preserving existing hash compatibility. Unknown users perform dummy derivation and receive the same invalid-credential response as wrong passwords.
- Added general API admission and per-IP limits, smaller request bodies, bounded remote response reads, database redirect rejection, header/connection/time limits and graceful draining on shutdown. Preserved bounded providers/database queues, comparison deadlines, retries and idempotency.
- Added request IDs and metadata-only access logs, migration/coordination readiness checks, an HTTPS edge deployment template, a non-root minimal runtime image, container resource limits and CI image scanning.
- Supplied read-only database assertions, anonymous live probes and deployment/recovery instructions. Neither a migration marker nor a passing anonymous probe automatically approves security.

## Release blockers

1. Resolve the unchanged approval-test contract in review; retain proof of the requested removal and do not bypass CI. Current CI intentionally fails at npm test rather than silently accepting the mismatch.
2. Install Chromium in a testing environment and verify advisor signup/login/logout, admin account management, mobile layouts and the comparison flow in a real browser. Existing browser tests require deliberate updates for the new invitation contract; do not silently weaken them.
3. Review/apply migrations 001–003 after a tested backup; validate security/verify-database.sql and test real anon/authenticated/service-role access. Check all public security-definer RPCs and table grants in the deployed database, including anything not present in this ZIP.
4. Build and scan the actual release images; check current Node/Caddy/OS/CI vulnerabilities, pin reviewed images and establish an update process. Runtime having no npm dependencies is not a complete vulnerability review.
5. Verify the real HTTPS edge, forwarding-header overwrite, DNS, firewall and origin settings. App port 3000 must not be internet-accessible when proxy headers are trusted. Review outbound egress restrictions to database/Redis/insurers.
6. Run anonymous probes plus real authenticated cross-account/role/CSRF/session tests and provider sandbox/load tests. Establish enforced admin MFA/SSO or equivalent access control for the deployment's assurance requirements.
7. Prove encrypted backups and restore, monitoring and alert delivery, audit-failure handling, retention policy, secret rotation, rollback and graceful shutdown on the actual host.

This is source hardening with bounded local evidence, not a penetration-test certificate or a guarantee that every vulnerability is eliminated. Overall security approval remains NOT APPROVED until the blockers have evidence and a release owner accepts the result.

Guidance consulted: OWASP Authentication Cheat Sheet (https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) and Node HTTP documentation (https://nodejs.org/api/http.html). They guide controls; they do not certify this application.
