# V34 — Manual IDV when automatic IDV is unavailable

Updated 22 October 2026. Includes the earlier V33 premium comparison styling.

## Behaviour

When a selected vehicle has no valid catalog ex-showroom price, continuing from Vehicle Details now asks: **Enter a manual IDV first**. The prompt previews the ±15% range. After a valid whole-rupee value is supplied, the advisor can continue to Policy Details and comparison using that value as the base IDV, without applying depreciation to it again.

Example: manual base IDV ₹5,00,000 → minimum ₹4,25,000 → maximum ₹5,75,000.

Empty, zero, negative, decimal and oversized values are rejected. Back or Escape cancels without losing the form. The upper base limit leaves room for the +15% adjustment within the existing server IDV limit.

Valid catalog pricing keeps the existing automatic calculation. The comparison identifies manual IDV and does not display an invented ex-showroom price. Existing accessory-IDV behaviour is retained.

The same fallback handles comparison vehicle edits and direct comparison transitions. A manual base is reused only for the same vehicle selection/registration/date. New quotation payloads retain manual-IDV and vehicle metadata so the saved quotation viewer can reopen them. Comparison setup errors return an actionable message rather than leaving the loading screen stuck.

## Changed files

- js/idv.js: shared manual-entry dialog, validation, vehicle identity check and base-IDV resolution.
- js/vehicle-details.js: replace missing-price rejection with manual-IDV collection; preserve relevant vehicle metadata.
- js/comparison.js: use manual base when needed, label its source, support edits, handle setup failures.
- js/policy-details.js: await the comparison transition.
- js/reports.js: restore manual IDV and its base when viewing a newly saved quotation.
- css/comparison-premium.css: responsive manual-IDV prompt styling.

No database migration or new application dependency is required. Backend files and insurer adapters are unchanged. This update addresses the missing-IDV workflow; the separate backend review recommendations remain outstanding.

## Validation

Browser checks passed for missing/null and zero catalog prices, invalid input, cancellation/retry, policy continuation, quote request IDV metadata, exact ±15% bounds, min/max controls, changed vehicle selection, direct comparison entry, mobile dialog and saved quotation reopening. No JavaScript page errors occurred. Tests used a mock authenticated session and the existing offline quote path; production services were not contacted.

The existing comparison regression checks and pricing/discount unit tests also passed. All modified JavaScript files passed syntax checks.

## Project context

Private advisor-facing car-insurance comparison. The requested IDV and price comparison remain central. Existing New Customer/Renewal/Rollover workflows and the V33 visual changes are retained. Purchase, payment, KYC and issuance remain outside this update.
