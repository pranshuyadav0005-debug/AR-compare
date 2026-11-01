# Public signup and Google sign-in setup

This version removes the invitation field and all invitation checks. Username/password registration is public immediately after deployment. New accounts always receive the regular `advisor` database role for compatibility; the public UI treats them as testers. They cannot select admin privileges or read another account's saved comparisons. Google sign-in signs regular users in directly after verified authentication.

## 1. Update your existing TEST database

Run `migrations/005_public_google_auth.sql` in your test Supabase SQL Editor once. It adds one nullable hashed-Google-subject column, a unique index, validation and a restricted transactional RPC. No account, password or comparison rows are deleted. It is safe to rerun. Do NOT rerun the full fresh installer on a populated database.

For a brand-new empty project, use `sql/Testing-Database.sql` instead. It already includes migrations 001–005 plus synthetic sample rates and an admin row with no preset password.

Deploy this build once with GOOGLE_AUTH_ENABLED=false before publishing the Google consent configuration, so the new privacy page is reachable. Public username registration already works in that mode.

## 2. Configure Google OAuth

In Google Cloud / Google Auth Platform, create or choose a project and configure the app name as CoverScope. Choose an External audience for public testers. Request only the basic openid, email and profile scopes; do not add Gmail/Drive scopes.

Create an OAuth Client ID of type Web application:

| Setting | Value for the current site |
|---|---|
| Authorized JavaScript origin | https://ar-compare.onrender.com |
| Authorized redirect URI | The Supabase provider callback copied from its Google provider settings, typically https://YOUR-PROJECT.supabase.co/auth/v1/callback |
| Privacy-policy URL, when requested | https://ar-compare.onrender.com/privacy.html |

The Google redirect URI is the SUPABASE callback, not the app callback below. Keep the Client Secret private and enter it in Supabase's Google provider configuration. Do not add it to frontend JavaScript or send it in screenshots.

If Google leaves your OAuth app in Testing status, sign-in can be restricted to configured Google test users. For unrestricted public participation, review Google's Audience/publishing requirements and publish the OAuth app to the appropriate External/In production audience when eligible. Fulfil any required verification. Publishing the Google consent configuration is separate from security approval of this application.

## 3. Configure Supabase Authentication

In Authentication → Sign In / Providers → Google, enable Google and enter the OAuth Client ID and Client Secret.

Ensure new OAuth users are allowed to sign up. The application still does NOT rely on Supabase email/password login; only the Google OAuth flow uses Supabase Auth. Do not restore the old auth.users signup trigger or old browser table grants.

In Authentication → URL Configuration:

| Setting | Value |
|---|---|
| Site URL | https://ar-compare.onrender.com |
| Redirect URLs — add this exact entry | https://ar-compare.onrender.com/api/auth/google/callback |

If you later use a custom domain, update APP_ORIGIN, Supabase Site/Redirect URLs and Google's allowed origin together.

## 4. Set Render environment variables and deploy

Keep the existing database service-role key server-only. Add:

```text
APP_ORIGIN=https://ar-compare.onrender.com
GOOGLE_AUTH_ENABLED=true
SUPABASE_PUBLISHABLE_KEY=your-project-publishable-key
```

A legacy Supabase anon JWT can instead be configured as SUPABASE_ANON_KEY. Never put the service-role/secret key in the publishable-key variable. Public keys and service keys have different uses. The Google Client Secret stays in Supabase, not in these app variables.

Remove the old REGISTRATION_INVITE_CODE variable; the application ignores it now. Leave NODE_ENV=production, NODE_VERSION=24 and TRUST_PROXY_HOPS=1 for the existing trusted Render edge. Build with `npm ci --omit=dev`, start with `npm start`, and select the root directory containing package.json and package-lock.json.

Without Google settings, public username/password registration works and the Google button displays unavailable. Setting GOOGLE_AUTH_ENABLED=true only enables the app-side flow; the actual Google/Supabase provider configuration must also be correct. Redeploy after changing environment settings.

## 5. Verify with real public testers

Use a Google account that is not the project administrator. Confirm that the Continue with Google button redirects to Google, returns to the app, creates a regular profile and signs in. Repeat the flow and confirm it reuses the same account. Confirm that admin routes remain denied and another user's history is inaccessible. Test a cancelled consent screen, logout, deactivation and a later repeat login.

Google sign-in does not automatically link to an existing username/password account by matching a name or email; this prevents unintended account takeover. A returning Google identity maps to its own regular profile. Existing administrators keep their username/password login and are never promoted through Google.

The local tests use embedded PostgreSQL and a mock Supabase OAuth provider enforcing PKCE, single-use codes and verified identity checks. They do not prove the actual Google consent/client settings work. No Google OAuth credentials were supplied or modified, and no live Google login or deployment is claimed in this package.

References: https://supabase.com/docs/guides/auth/social-sign-in/auth-google ; https://supabase.com/docs/guides/auth/sessions/pkce-flow ; https://support.google.com/cloud/answer/15549945
