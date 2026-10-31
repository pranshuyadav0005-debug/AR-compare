# Public deployment — V39, NOT APPROVED FOR LAUNCH

Use TESTING-DATABASE-SETUP.md first. The complete fresh installer has been executed and tested locally in embedded PostgreSQL, and the new auth/admin flow plus the comparison flow have run in Chromium. No hosted Supabase project or public deployment was configured for this task.

## Deployment requirements

Configure the exact HTTPS APP_ORIGIN, server-only database credentials, permitted insurer/vehicle API hosts, private registration invitation and coordination settings from .env.example. Production uses `__Host-` Secure cookies with HttpOnly session tokens, session-bound CSRF, and transaction-based account operations. Moving from older cookie names signs users out. Browser code accepts the production CSRF cookie name.

Use supported Node 24 with current security updates. Rebuild and scan the release image; resolve and pin reviewed container/CI versions or digests. The included CI jobs keep original regressions, current PostgreSQL/browser checks and image scanning independent; any failed required job still blocks the release. No CI or container image build/scan has run here. The npm audit result for the pinned project dependency lock was zero reported advisories at review time; this does not scan the OS, Node binary, Caddy or CI actions.

The included deployment/compose.yaml uses a non-root, read-only application container with resource limits and an HTTPS Caddy edge. Its configuration has not been executed here because Docker is unavailable. Set APP_HOST (hostname only), APP_ORIGIN (exact HTTPS origin without trailing slash), and DNS before:

```sh
docker compose --env-file .env -f deployment/compose.yaml config --quiet
docker compose --env-file .env -f deployment/compose.yaml up -d --build
```

Expose only the edge's 80/443 ports. Restrict SSH and do not expose app port 3000 when trusting forwarded headers. TRUST_PROXY_HOPS=1 is correct only when a single trusted edge overwrites the headers and all requests pass through it. Review the trust chain again before adding a CDN/load balancer. Render users can use render.yaml with the correct public origin and proxy trust.

Keep APP_DEPLOYMENT_MODE=single for one process. Configure shared Redis and set multiple BEFORE starting workers/replicas or overlapping releases. Existing coordination fails closed where required. Tune request limits for shared office IPs; account-specific login throttling remains in effect. Resource limits and local stand-in capacity measurements are not a live-provider guarantee.

## Live release checks

- Run the hosted database assertions and validate real anon/authenticated/service-role permissions, account RPCs, trigger execution, migrations and actual PostgREST behavior. In this dedicated app project, disable unused public Supabase Auth signup and do not reinstate old provisioning triggers/RPCs.
- Build/scan the final runtime images and validate Compose/Render settings, TLS certificates/redirects, firewall and proxy header overwrite.
- Run `SECURITY_TARGET=https://your-host npm run security:live`, then authenticated multi-advisor isolation, admin, CSRF, reset/revocation, logout, quote-history and insurer-sandbox tests. Anonymous probe success never marks overall security approved.
- Require admin MFA/SSO or equivalent enforced access control appropriate to your deployment. Application MFA/SSO is not implemented in this package. Establish staff onboarding/offboarding and protect the reusable invitation; anyone with a leaked invitation may register until it is rotated.
- Prove encrypted backups and restore; configure operator alerts for unavailable services, error/latency spikes, busy responses and quote_submission_audit_failed. Audit storage is append-only, but quote audit writes remain best effort and the interface warns on failure. Decide retention before implementing cleanup; no historical rows are deleted by this update.
- Test graceful shutdown and rollback. Keep a known-good image and a tested database recovery plan. Preserve inactive-account decisions and credential generations when rolling back.

/api/health is cheap liveness. /api/ready checks migration markers 001–004 and required Redis with a ten-second cache. It is not proof of correct permissions or a full security attestation. Access logs omit request bodies, cookies, passwords and query strings.

Resolve the preserved original approval-test contract in review before a green release; do not restore the approval queue merely to satisfy an obsolete expectation or bypass a failing job. Current behavior is covered by dedicated new tests. SECURITY-REVIEW.md records what passed, failed and remains unverified.
