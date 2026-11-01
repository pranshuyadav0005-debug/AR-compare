# Insurance Testing Portal

Organization-neutral testing version. Use TESTING-DATABASE-SETUP.md for database setup and PUBLIC-LAUNCH.md for deployment requirements. Current branding verification is in BRANDING-UPDATE.md.

The application name, visible logos, page titles, exported quote labels, new quote-number prefixes, cookie names, default coordination namespaces, package metadata and deployment labels use neutral testing identifiers. Existing user-entered customer data and insurer names are application data, not portal branding.

For a new database use sql/Testing-Database.sql. This branding update changes no table definitions or permissions, so an existing V39 testing database does not need to be rebuilt. Set APP_COORDINATION_NAMESPACE=insurance-testing-sandbox consistently on every running instance. Updating cookies signs existing browser sessions out. Never run old and new namespaces concurrently against live traffic during deployment.

Production security approval remains NOT APPROVED; earlier deployment and legacy-test blockers still apply. This update does not deploy the service or change a remote database.
