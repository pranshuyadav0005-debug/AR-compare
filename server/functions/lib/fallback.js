const GST_RATE = 0.18;
const TP_ICE = { up_to_1000: 2094, '1001_1500': 3416, above_1500: 7897 };
const TP_EV = { under_30kw: 1780, '30_65kw': 2904, above_65kw: 6712 };

function roundRate(n) { return Math.round(Number(n) * 1000) / 1000; }

function tpPremium(vehicle) {
  if (String(vehicle.fuelType || '').toLowerCase().includes('electric')) {
    const kw = Number(vehicle.motorPowerKW);
    if (kw > 0 && kw < 30) return TP_EV.under_30kw;
    if (kw > 65) return TP_EV.above_65kw;
    return TP_EV['30_65kw'];
  }
  const cc = Number(vehicle.engineCC);
  if (cc > 1500) return TP_ICE.above_1500;
  if (cc > 1000) return TP_ICE['1001_1500'];
  return TP_ICE.up_to_1000;
}

function category(vehicle) {
  const bt = String(vehicle.bodyType || '').toLowerCase();
  if (['audi','bmw'].includes(String(vehicle.make || '').toLowerCase())) return 'Luxury';
  if (bt.includes('suv')) return 'SUV';
  if (bt.includes('muv') || bt.includes('mpv')) return 'MUV';
  if (bt.includes('hatch')) return 'Hatchback';
  if (bt.includes('sedan')) return 'Sedan';
  if (bt.includes('pickup')) return 'Pickup';
  if (bt.includes('coupe')) return 'Coupe';
  if (bt.includes('convertible')) return 'Convertible';
  return 'Other';
}

function fuel(vehicle) {
  const f = String(vehicle.fuelType || '').toLowerCase();
  if (f.includes('plug') && f.includes('hybrid')) return 'Plug-in Hybrid';
  if (f.includes('mild') && f.includes('hybrid')) return 'Mild Hybrid';
  if (f.includes('cng') && f.includes('hybrid')) return 'CNG Hybrid';
  if (f === 'electric' || f === 'ev') return 'EV';
  if (f.includes('hybrid')) return 'Hybrid';
  return vehicle.fuelType || 'Petrol';
}

function fallbackQuote(insurer, vehicle, idv, rateCard, advisorDiscountPercent = 0) {
  const rules = rateCard?.rate_rules || {};
  const cat = category(vehicle);
  const f = fuel(vehicle);
  const matrix = rules.vehicle_fuel_od_rates || {};
  const cell = matrix?.[cat]?.[f];
  const matrixRate = cell == null || cell === '' ? NaN : Number(cell);
  const base = Number(rules.od_rate_per_idv ?? 0.032) * 100;
  const odRatePercent = Number.isFinite(matrixRate) ? matrixRate : base;
  const customerNcb = vehicle.hadClaim ? 0 : Math.min(Math.max(Number(vehicle.ncbPercent) || 0, 0), 50);
  // OD after NCB but before the advisor's discount.
  const odBeforeDiscount = Math.round(Number(idv) * (odRatePercent / 100) * (1 - customerNcb / 100));
  // Advisor discount applies to Own Damage only (like NCB): never to TP, add-ons or GST.
  const discountPct = Math.min(100, Math.max(0, Number(advisorDiscountPercent) || 0));
  const advisorDiscountAmount = Math.round(odBeforeDiscount * discountPct / 100);
  const odPremium = odBeforeDiscount - advisorDiscountAmount;
  // The rate the customer is effectively charged after the discount, e.g. 2.900% -> 2.610% at 10% off.
  // (NCB is a separate discount on top of this rate, exactly as in the OD amount above.)
  const appliedOdRatePercent = roundRate(odRatePercent * (1 - discountPct / 100));
  const tp = vehicle.policyType === 'standalone' ? 0 : tpPremium(vehicle);
  const addonRules = rules.addons || [
    { name: 'Zero Depreciation', rate_per_idv: 0.006 },
    { name: 'Roadside Assistance', flat: 300 },
    { name: String(vehicle.fuelType).toLowerCase().includes('electric') ? 'Battery / Motor Protect' : 'Engine Protect', rate_per_idv: 0.003 },
    { name: 'Return to Invoice', rate_per_idv: 0.002 },
    { name: 'Consumables Cover', rate_per_idv: 0.0012 },
    { name: 'Key Protect', flat: 150 },
  ];
  const selected = new Set((vehicle.selectedAddons || []).map(String));
  const addons = addonRules.map(a => ({
    name: a.name,
    premium: selected.has(a.name) ? (a.flat ?? Math.round(Number(idv) * Number(a.rate_per_idv || 0))) : 0,
    available: true,
    selected: selected.has(a.name),
  })).filter(a => a.selected);
  const subtotal = odPremium + tp + addons.reduce((s, a) => s + a.premium, 0);
  const gst = Math.round(subtotal * GST_RATE);
  return {
    insurerId: insurer.id,
    insurerName: insurer.name,
    rating: insurer.rating ?? null,
    garageCount: insurer.garage_count ?? null,
    garageUrl: insurer.garage_url || insurer.garageUrl || null,
    idv: Number(idv),
    odPremium,
    odBeforeDiscount,
    advisorDiscountPercent: discountPct,
    advisorDiscountAmount,
    tpPremium: tp,
    addons,
    gst,
    totalPremium: subtotal + gst,
    ncbPercent: customerNcb,
    policyType: vehicle.policyType,
    claimRatio: rules.claim_ratio == null ? null : Number(rules.claim_ratio),
    insuranceCategory: cat,
    appliedFuelType: f,
    odRatePercent: appliedOdRatePercent,
    odRatePercentBeforeDiscount: roundRate(odRatePercent),
    rateSource: Number.isFinite(matrixRate) ? 'matrix' : 'fallback',
    source: 'fallback',
    status: 'fallback',
  };
}

// Applies the advisor's OD discount to a quote that came from a live insurer API.
// The insurer's own figures are the source of truth, so we only take the discount
// off OD and remove the GST that was charged on that amount.
function applyAdvisorDiscount(quote, advisorDiscountPercent) {
  const pct = Math.min(100, Math.max(0, Number(advisorDiscountPercent) || 0));
  if (!pct || !Number.isFinite(quote?.odPremium)) return quote;
  const cut = Math.round(quote.odPremium * pct / 100);
  const gstCut = Math.round(cut * GST_RATE);
  return {
    ...quote,
    odBeforeDiscount: quote.odPremium,
    advisorDiscountPercent: pct,
    advisorDiscountAmount: cut,
    ...(Number.isFinite(quote.odRatePercent) ? {
      odRatePercentBeforeDiscount: quote.odRatePercent,
      odRatePercent: roundRate(quote.odRatePercent * (1 - pct / 100)),
    } : {}),
    odPremium: quote.odPremium - cut,
    gst: Number.isFinite(quote.gst) ? quote.gst - gstCut : quote.gst,
    totalPremium: Number.isFinite(quote.totalPremium) ? quote.totalPremium - cut - gstCut : quote.totalPremium,
  };
}

module.exports = { fallbackQuote, applyAdvisorDiscount };
