# Public signup and Google auth review — 3.10.0

Review date: 31 October 2026. This is a code/database update for public testers. No repository push, live database migration, Google Cloud/Supabase provider configuration or production deployment was performed in this task.

## Current results

| Check | Result | Evidence |
|---|---|---|
| New public signup/Google/security/browser tests | 20 passed, 0 failed | security/public-google-tests.log |
| Earlier foundation regression | 16 passed, 1 failed | security/foundation-process.log; old approval-race expectation remains |
| Earlier security suite | 17 passed, 4 failed | security/public-auth-legacy-security.log; invitation-required/closed-signup/config and removed invite-field expectations conflict with public signup |
| Earlier database suite | 20 passed, 4 failed | security/public-auth-legacy-database.log; old four-marker assertion, old invitation browser flow, its dependent test user and old upgrade path omitting 005 |
| Capacity/Redis coordination | 7 passed, 0 failed | security/public-auth-coordination.log |
| Existing comparison browser suite | Passed | security/public-auth-comparison-browser.log |
| Dependency lock audit | 0 reported advisories | security/public-auth-dependency-audit.json; does not scan Node/OS/container/CI actions |
| JavaScript syntax | 80 files passed | security/public-auth-syntax.json |

The complete original suites are preserved, including incompatible assertions. No failing test was removed, weakened or skipped to manufacture a green release. The new test suite verifies the requested public-registration contract independently. The old database browser test also has dependent tests; its missing invite field prevents creation of its later fixture user. These failures are listed rather than presented as passing or ignored in CI. Earlier regression attempts were interrupted by workspace disconnections; the standalone foundation run recorded the complete 16/1 result.

## Implemented behavior

- Public username/password registration no longer needs any invitation or admin approval. Name/username validation, 15–128 character passwords, strong bounded scrypt, rate limits and regular-account-only provisioning remain enforced. Extra role/status fields cannot create an admin.
- Continue with Google appears on login and signup pages. It becomes enabled only when GOOGLE_AUTH_ENABLED=true and a separate Supabase publishable/anon key is configured. Misconfigured or disabled Google sign-in leaves username/password registration available.
- Google starts through a same-origin server redirect to Supabase Auth. A random PKCE verifier is kept in a signed, short-lived HttpOnly flow cookie, using Secure/__Host- protections in production. The callback validates that flow and exchanges a one-use code server-side. Supabase handles the upstream Google provider flow; the app fetches the authenticated Supabase user endpoint and requires a confirmed Google identity. It does not trust client-provided identity claims, user_metadata.sub, names, emails or role fields to select the account.
- The app hashes the verified Google subject and maps it transactionally to one regular account. Repeated sign-ins reuse that profile. No automatic name/email-based linking occurs, and existing admin accounts are not promoted or linked through public Google login. No password is invented for a Google-only account.
- Migration 005 adds the identity column, uniqueness/format constraints and a service-only SECURITY INVOKER RPC. The upgrade test verifies existing passwords, sessions and quotations survive, and applying the migration twice is safe. A failed audit insert rolls account creation back. Deactivated Google accounts cannot evade deactivation by registering the same identity again.
- Successful Google authentication creates the existing generation-bound app session and signs the tester in directly. Google/Supabase access and refresh tokens are not sent to browser storage or placed in app URLs. Signed cookies, CSRF, origin checks, role/owner isolation, password-reset/deactivation revocation and append-only audit protections remain.
- Public feature flags contain no keys/secrets. OAuth failures redirect to fixed local pages with generic messages; diagnostic logs include only a coarse failure stage/correlation identifier and status, never provider tokens, codes, credentials or raw upstream error messages. Rate-limited Google navigation shows a sign-in message instead of a raw JSON page.
- Auth fetches allow 30 seconds on slow/warming infrastructure; mutations are not automatically retried. Quote deadlines/capacity behavior remains unchanged. A public testing privacy notice and fictional-data guidance are included.

## Test scope and limits

The new browser flow runs against the real Node application, embedded PostgreSQL roles/constraints/RPCs and a mock Supabase Auth service that enforces PKCE and single-use codes. It exercises public account signup, regular roles, actual server session cookies, repeated Google sign-ins, missing/tampered/expired cookies, cross-browser code interception, unverified/non-Google identities, denial of deactivated identities, rollback, migration reruns and lack of administrator linking.

This is NOT a real Google account/consent test. No Google OAuth Client ID/Secret or provider configuration was supplied. The mock does not certify the actual hosted Supabase Auth/PostgREST settings, Google consent audience, network/proxy/certificate deployment or cross-connection production concurrency.

## Remaining deployment work

1. Apply migration 005 to the existing testing database, upload/deploy this version and verify actual hosted permissions and readiness.
2. Configure Google Cloud OAuth (External audience, basic identity scopes and the Supabase callback) and enable the Google provider/new-user signup in Supabase. Set the exact app callback in Supabase's redirect allowlist. Configure GOOGLE_AUTH_ENABLED and the publishable key on Render. Complete Google publishing/verification requirements for public users.
3. Perform a real Google sign-in with an ordinary external account, then repeat, logout, deactivate and cross-account-test it. Username/password and Google profiles intentionally do not merge by email/name.
4. Resolve obsolete invitation/approval test contracts through review. CI remains capable of reporting these failures; current-flow coverage does not erase them.
5. Verify runtime images, actual TLS/proxy/firewall, abuse controls/monitoring, backup/restore and operator privacy/support/retention arrangements. Admin MFA/SSO is not added by this regular-user Google feature.

Overall production security approval remains NOT APPROVED. The public-auth feature and migration are prepared and locally verified within the scope above; live Google sign-in is not claimed as enabled or tested until provider setup succeeds.

References: https://supabase.com/docs/guides/auth/social-sign-in/auth-google ; https://supabase.com/docs/guides/auth/sessions/pkce-flow ; https://supabase.com/docs/guides/auth/general-configuration ; https://support.google.com/cloud/answer/15549945
