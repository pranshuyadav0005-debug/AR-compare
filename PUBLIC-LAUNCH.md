# Public testing deployment

This application is prepared for public testing with regular-user accounts. Use fictional vehicle/customer data. Registration no longer requires invitations or admin approval. Google sign-in needs the provider/client setup in GOOGLE-SIGNIN-SETUP.md.

Before deploying over the current V39 testing database, run migration 005. Keep HTTPS, the canonical APP_ORIGIN, trusted Render proxy settings and all server-only credentials configured. App port exposure, TLS, firewall, image scanning, backup/restore, abuse monitoring and actual hosted Supabase role permissions still need operator verification. Public access does not grant admin access or access to other users' data.

Use one application process unless shared Redis coordination is configured. The login/signup rate limits, bounded password work, strong password policy, HttpOnly/Secure cookies, CSRF checks, owner-scoped comparisons and database-enforced session revocation remain enabled. Auth client requests now allow 30 seconds for a slow or warming service; this does not bypass server capacity limits or retry account creation automatically.

The included privacy notice describes the implemented test behavior. Review it and supply appropriate operator/support arrangements before broader use. No self-service account deletion or email account linking is introduced. Publishing a Google OAuth app for public accounts is a separate Google configuration step, not a security certification.

Current tests and their limits are in PUBLIC-AUTH-REVIEW.md. Prior reports under security/historical are older contracts. Existing legacy approval/invitation assertions remain failing; no blanket security approval or successful live Google login is claimed.
