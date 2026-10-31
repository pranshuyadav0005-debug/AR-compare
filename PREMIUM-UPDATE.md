# AR Advisors — V33 comparison presentation update

Updated 21 October 2026.

The internal advisor comparison workflow and pricing remain unchanged. This update refines the existing comparison screen in both index.html and motor-insurance.html.

## Included changes

- Readable comparison columns, right-aligned amounts, and tabular numerals.
- 22px total premiums and a restrained green Lowest premium indicator using the existing lowest-price calculation.
- Compact vehicle summary with all eight fields retained.
- Prominent IDV, aligned IDV controls, and a softer accessory subsection.
- Consistent PAYD, add-on, and discount presentation with blue selected states.
- Primary View details action with quieter Export and Garage actions.
- Aligned insurer search, sorting, and PDF controls; clearer saved-quotation search wording.
- Refined details modal, with existing IDV and premium values prominent.
- Styled comparison print/PDF output and individual insurer HTML quotations for browser printing/Save as PDF. The comparison printout starts its insurer section on a separate page to keep its heading and quote context together.
- Responsive layouts, contained horizontal table scrolling on narrow screens, keyboard focus styles, and reduced-motion support.

## Changed files

- index.html and motor-insurance.html: load the scoped presentation stylesheet and refine comparison labels.
- css/comparison-premium.css: comparison-only presentation and print rules.
- js/comparison.js: badge wording, build identifier, existing premium display in modal, and individual quotation export styling. Pricing and event handlers are unchanged.

Backend files, pricing rules, API requests, authentication, and customer workflows are unchanged. Keep using the existing server/environment configuration and `npm start`; no migration or new dependency is required. No deployment or public sharing was performed.

## Validation

- Existing pricing/discount unit tests passed.
- JavaScript syntax check passed.
- Headless browser checks passed using the existing offline quote fallback: comparison rendering, search and empty state, rating sorting, details modal, single-insurer download, discount recalculation, minimum/maximum/custom IDV, add-on selection, PAYD toggle, accessories, vehicle edit modal, print rendering, and desktop/mobile overflow.
- Desktop and mobile screenshots were inspected; no JavaScript page errors occurred.
- Live insurer APIs and production authentication were not exercised; browser checks used a test session and unavailable API responses to exercise the unchanged local estimate path.

## Project context

Private internal car-insurance comparison for advisors, supporting the existing New Customer, Renewal, and Rollover cases. The comparison focuses on price at the selected IDV, with existing coverage and pricing controls. Policy purchase, payment, KYC, and issuance remain outside this update's scope.
