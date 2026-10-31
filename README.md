# AR Advisors V39 — testing database and security fixes

Start with [TESTING-DATABASE-SETUP.md](TESTING-DATABASE-SETUP.md). Run `sql/AR-Advisors-Testing-Database.sql` in a NEW, EMPTY Supabase project for the complete test database, synthetic sample rates and a test administrator record without a preset password.

This application is an internal car insurance advisor tool. Public hosting still requires staff authentication and restricted registration. There is no admin approval queue: an invited advisor can immediately sign in. Policy purchase, KYC, payment and issuance remain outside scope.

- [SECURITY-REVIEW.md](SECURITY-REVIEW.md): verification evidence, findings fixed and remaining blockers.
- [PUBLIC-LAUNCH.md](PUBLIC-LAUNCH.md): deployment constraints and release checks.
- [migrations/README.md](migrations/README.md): existing database upgrades.
- `security/verify-database.sql`: read-only hosted database assertions.

Node 24 is required. Runtime code uses Node built-ins; dev-only tests use pinned PGlite and Playwright dependencies in package-lock.json. The production Docker image excludes test dependencies and maintenance scripts.

Overall production security approval is **NOT APPROVED** pending actual hosted Supabase, infrastructure/image-scan and live authenticated deployment verification, plus review of the preserved legacy approval-test conflict. Passing isolated tests is not a guarantee that every vulnerability is eliminated.
