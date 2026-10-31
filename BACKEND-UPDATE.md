# V35 — Secure backend and trustworthy comparison foundation

Updated 22 October 2026. Retains V33 styling and the V34 manual-IDV flow.

Implemented the first two system-design priorities and prepared database hardening:

- Public-only static file serving, path/symlink restrictions, production configuration checks and a supported Node 24 Docker base.
- Trusted proxy/IP handling, local fallback rate limits, session-bound CSRF validation, bounded login input and database deadlines.
- Backend catalogue, policy, manual-IDV, accessory and adjustment-range validation.
- Advisor-scoped quotation updates and search; encoded search filters; behavioural permission tests.
- Live quote validation, returned-IDV and coverage matching, provider validity checks and separate estimate rankings.
- Removal of silent browser pricing and hardcoded server fallback insurer lists; explicit provider/service/save failures.
- Preservation of provider prices, opt-in provider discount support, HTTPS provider allowlists and safe retry controls.
- Quote reference/expiry metadata, advisor-scoped cache keys, credential-field audit redaction and visible audit/save status.
- Numbered SQL migration for restricted database privileges and append-only history, ready for owner review/application.
- HTTP behavioural tests and optional browser regression script.

The complete app must run through `server.js`; the frontend files now live in `public/`, with their existing URLs preserved. Use the root README for environment setup and migration instructions.

Validation passed: existing structure/pricing/smoke checks, 11 real HTTP integration cases against local stand-ins, and browser comparison/manual-IDV/error-state checks. No database migration was applied, no live insurer connected and no hosting deployment performed.

Next work: apply the supplied migration in the app database, connect one documented provider sandbox, verify production access rules and backups, then run a private advisor pilot. Branch sharing, durable audit retries, asynchronous provider adapters and expected-load testing remain future work.
