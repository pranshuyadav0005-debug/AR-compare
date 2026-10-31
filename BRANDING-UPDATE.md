# Organization-neutral testing build (3.9.1)

All previous portal organization names, logos, background artwork, favicons, page titles, dashboard text and quotation export branding were replaced with neutral testing labels. New quote numbers use TESTQ. The shipped project folder is insurance-testing-portal, and the bundled complete SQL is sql/Testing-Database.sql.

No table, permission, login-role or comparison rule changed. An installed V39 testing database needs no rebuild for branding. Existing stored organization/user/customer data in a remote database was not accessed or rewritten. Previously stored quotation numbers are retained; new quotations use the neutral prefix.

Session-cookie identifiers were renamed consistently on server and client; existing sessions need a fresh sign-in. Configure the same neutral APP_COORDINATION_NAMESPACE on all deployed instances, avoid overlapping old/new namespace versions and allow old in-flight requests to drain. The sample value is insurance-testing-sandbox. If a repository contains the outer project folder, set Render Root Directory to insurance-testing-portal; leave it blank when package.json is at the repository root.

Verification: 21 security checks and 24 database/integration checks passed, including actual signup/admin browser operations. The existing comparison browser suite passed desktop/mobile/print and exports. Static scans found no previous organization identifiers in shipped text/paths, and every JavaScript file passed syntax checks. Three branded bitmap assets were removed; new graphics are neutral SVGs. Runtime login inspection checked the page title, visible text and image loading.

Test fixtures received mechanical branding, cookie-name, quote-prefix and renamed-file substitutions only. No assertions were weakened, removed or skipped to obtain a pass. Historical evidence was anonymized for this test-only distribution; only branding-* logs describe verification of this build. Previously reported legacy approval-test conflicts and production verification blockers remain. Production security approval remains NOT APPROVED.
