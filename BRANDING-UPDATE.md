# CoverScope — 3.10.1

The public application is now named CoverScope. Page titles, visible brand labels, SVG logos, favicon, privacy page, comparison exports, package metadata and server startup name use the new name.

The insurance type chooser and its JavaScript/CSS were removed. Regular users go directly to motor-insurance.html after password or Google sign-in and when restoring an existing session. Old /insurance-selection.html bookmarks receive a server redirect to the motor workspace. The motor page still verifies the session and returns unsigned-in users to login; administrator login still opens the admin panel.

## Deploy this update

Replace the repository application files with the contents of the coverscope folder in CoverScope.zip, including package.json and package-lock.json, and redeploy the existing Render service. Keep the current service URL, APP_ORIGIN, Supabase keys, cookie identifiers and coordination namespace. Build: npm ci --omit=dev. Start: npm start. Root Directory must point to the folder containing package.json; leave it blank if those files are at the repository root.

This branding/navigation update needs no new SQL migration. If migration 005 from the previous Google sign-in update has not been applied, follow GOOGLE-SIGNIN-SETUP.md. In Google Auth Platform, change the consent-screen application name to CoverScope; keep the existing callback URLs. This task did not update Google/Supabase/Render settings or deploy the live application.

The app still uses demonstration/sample rates, so the fictional-data and insurer-verification notices remain. Renaming the app does not change its pricing accuracy or production security status.

## Verification

- Public authentication/database/browser suite: 21 passed, 0 failed (security/coverscope-auth-tests.log). Includes real browser public signup, password login, mocked Google login, session restore, desktop/mobile layout, anonymous access protection, old chooser redirect and the existing security assertions.
- Existing comparison browser suite passed desktop/mobile/print, comparison controls, history, error states and exports (security/coverscope-comparison-browser.log).
- JavaScript syntax: 79 files passed (security/coverscope-syntax.json).

Navigation assertions in three existing test files were updated to require the newly requested motor destination; the browser auth test was strengthened to exercise password login, restored sessions and anonymous protection. No security assertion was deleted or skipped. Earlier incompatible invitation/admin-approval tests remain documented in PUBLIC-AUTH-REVIEW.md; these changes do not claim the entire legacy suite is green or grant production approval.
