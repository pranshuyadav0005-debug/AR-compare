// Unit tests for the advisor OD discount (pure functions, no database needed).
const assert = require('assert');
const { fallbackQuote, applyAdvisorDiscount } = require('../server/functions/lib/fallback');

const insurer = { id: 'x', name: 'Test Insurer', rating: 4, garage_count: 100 };
const rateCard = { rate_rules: { od_rate_per_idv: 0.03, addons: [{ name: 'Zero Depreciation', rate_per_idv: 0.007 }] } };
const vehicle = { fuelType: 'Petrol', engineCC: 1197, bodyType: 'Hatchback', make: 'Maruti Suzuki', ncbPercent: 20, hadClaim: false, selectedAddons: ['Zero Depreciation'] };
const IDV = 1000000;

const base = fallbackQuote(insurer, vehicle, IDV, rateCard, 0);
const disc = fallbackQuote(insurer, vehicle, IDV, rateCard, 10);

// OD is reduced by exactly the discount; nothing else changes.
assert.strictEqual(disc.odBeforeDiscount, base.odPremium);
assert.strictEqual(disc.advisorDiscountAmount, Math.round(base.odPremium * 0.10));
assert.strictEqual(disc.odPremium, base.odPremium - disc.advisorDiscountAmount);
assert.strictEqual(disc.tpPremium, base.tpPremium);
assert.deepStrictEqual(disc.addons, base.addons);
// GST is charged on the discounted subtotal, so total is consistent.
const subtotal = disc.odPremium + disc.tpPremium + disc.addons.reduce((s, a) => s + a.premium, 0);
assert.strictEqual(disc.totalPremium, subtotal + Math.round(subtotal * 0.18));
assert.ok(disc.totalPremium < base.totalPremium);

// The displayed OD rate follows the discount, and rate x IDV x (1 - NCB) reproduces the OD amount.
assert.strictEqual(disc.odRatePercentBeforeDiscount, base.odRatePercent);
assert.strictEqual(disc.odRatePercent, Math.round(base.odRatePercent * 0.9 * 1000) / 1000);
assert.ok(Math.abs(IDV * (disc.odRatePercent / 100) * (1 - 0.20) - disc.odPremium) < 2);
assert.strictEqual(fallbackQuote(insurer, vehicle, IDV, rateCard, 100).odRatePercent, 0);

// Out-of-range input is clamped, never negative or above 100%.
assert.strictEqual(fallbackQuote(insurer, vehicle, IDV, rateCard, -5).odPremium, base.odPremium);
assert.strictEqual(fallbackQuote(insurer, vehicle, IDV, rateCard, 250).odPremium, 0);
assert.strictEqual(fallbackQuote(insurer, vehicle, IDV, rateCard, 'abc').odPremium, base.odPremium);

// Live-API quotes: OD and the GST on that OD come off; TP and add-ons stay.
const api = { odPremium: 10000, tpPremium: 2000, gst: 2160, totalPremium: 14160, source: 'api' };
const apiDisc = applyAdvisorDiscount(api, 20);
assert.strictEqual(apiDisc.odPremium, 8000);
assert.strictEqual(apiDisc.gst, 2160 - Math.round(2000 * 0.18));
assert.strictEqual(apiDisc.totalPremium, 14160 - 2000 - Math.round(2000 * 0.18));
assert.strictEqual(applyAdvisorDiscount({ ...api, odRatePercent: 3 }, 20).odRatePercent, 2.4);
assert.strictEqual(applyAdvisorDiscount({ ...api, odRatePercent: 3 }, 20).odRatePercentBeforeDiscount, 3);
assert.strictEqual(applyAdvisorDiscount(api, 0), api);
assert.strictEqual(applyAdvisorDiscount({ odPremium: null }, 20).odPremium, null);

console.log('Pricing / discount tests passed.');
