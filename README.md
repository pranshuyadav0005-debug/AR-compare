# CoverScope — 3.10.1

Public username/password registration is enabled with no invitation or admin approval. Continue with Google is available after the provider configuration in GOOGLE-SIGNIN-SETUP.md. Public accounts remain regular users with isolated data and no admin access.

- Existing test database: run migrations/005_public_google_auth.sql, then deploy this version.
- New empty database: run sql/Testing-Database.sql once.
- Google provider and callback configuration: GOOGLE-SIGNIN-SETUP.md.
- Current verification and remaining blockers: PUBLIC-AUTH-REVIEW.md.

The application uses Node 24 and built-in runtime modules. Build: npm ci --omit=dev. Start: npm start. Root Directory is the folder containing package.json. The image/hosting security and live Google provider configuration still need verification; no production approval is claimed.

Users now go directly to motor-insurance.html after password or Google sign-in and when restoring a session. The old insurance-selection.html address redirects to the motor workspace. No database changes are required for this branding/navigation update. See BRANDING-UPDATE.md.
