// ===========================================================
// INSURER PROFILES — real, IRDAI-licensed Indian motor insurers.
// Ported from the original single-file build. Used as the
// client-side fallback in js/comparison.js when the get-comparison
// Edge Function isn't deployed/reachable, and mirrors the seed
// data in seed.sql so the DB-backed path (see
// supabase/functions/get-comparison/index.ts) produces comparable
// numbers once deployed.
//
// Cashless garage counts are approximate figures gathered from
// public network-garage listings (they vary slightly by source
// and change over time — verify current counts with each insurer
// before quoting a client).
//
// odRate / zeroDepRate / roadsideFee are NOT published by these
// insurers — Own Damage pricing is commercial and insurer-set, so
// there is no public rate card to pull from. rating / ncbPercent /
// claimRatio are likewise admin-maintained ESTIMATES (shown with
// the "Fallback" tag in the UI) until real insurer OD APIs are
// wired up. Edit these numbers freely to match your own market
// knowledge.
// ===========================================================
const INSURERS = [
  {
    id: 'icici-lombard', name: 'ICICI Lombard General Insurance',
    garageUrl: 'https://www.icicilombard.com/cashless-garages',
    garages: 7500, odRate: 0.032, zeroDepRate: 0.008, roadsideFee: 300,
    rating: 4.4, ncbPercent: 35, claimRatio: 87,
    addonRates: { zeroDep: 0.008, rsa: 300, engineProtect: 0.0035, rti: 0.0025, consumables: 0.0015, keyProtect: 180, tyreProtect: 0.002, personalBelongings: 120 },
    supportedAddons: ['Zero Depreciation','Roadside Assistance','Engine Protect','Return to Invoice','Consumables Cover','Key Protect','Tyre Protect'],
  },
  {
    id: 'hdfc-ergo', name: 'HDFC ERGO General Insurance',
    garageUrl: 'https://www.hdfcergo.com/locators/cashless-garages-networks',
    garages: 6800, odRate: 0.030, zeroDepRate: 0.0075, roadsideFee: 275,
    rating: 4.3, ncbPercent: 25, claimRatio: 91,
    addonRates: { zeroDep: 0.0075, rsa: 275, engineProtect: 0.0032, rti: 0.0023, consumables: 0.0014, keyProtect: 165, tyreProtect: 0.0018, personalBelongings: 110 },
    supportedAddons: ['Zero Depreciation','Roadside Assistance','Engine Protect','Return to Invoice','Consumables Cover','Key Protect','Loss of Personal Belongings'],
  },
  {
    id: 'bajaj-allianz', name: 'Bajaj Allianz General Insurance',
    garageUrl: 'https://www.bajajallianz.com/branch-locator.html',
    garages: 4000, odRate: 0.029, zeroDepRate: 0.007, roadsideFee: 250,
    rating: 4.1, ncbPercent: 20, claimRatio: 94,
    addonRates: { zeroDep: 0.007, rsa: 250, engineProtect: 0.0030, rti: 0.0021, consumables: 0.0013, keyProtect: 150, tyreProtect: 0.0017, personalBelongings: 100 },
    supportedAddons: ['Zero Depreciation','Roadside Assistance','Engine Protect','Consumables Cover','Key Protect','Tyre Protect'],
  },
  {
    id: 'tata-aig', name: 'Tata AIG General Insurance',
    garageUrl: 'https://www.tataaig.com/locator/cashless-car-network-garages',
    garages: 7500, odRate: 0.034, zeroDepRate: 0.009, roadsideFee: 350,
    rating: 4.5, ncbPercent: 45, claimRatio: 89,
    addonRates: { zeroDep: 0.009, rsa: 350, engineProtect: 0.0038, rti: 0.0027, consumables: 0.0017, keyProtect: 195, tyreProtect: 0.0022, personalBelongings: 130 },
    supportedAddons: ['Zero Depreciation','Roadside Assistance','Engine Protect','Return to Invoice','Consumables Cover','Key Protect','Tyre Protect','Loss of Personal Belongings'],
  },
  {
    id: 'reliance-general', name: 'Reliance General Insurance',
    garageUrl: 'https://www.reliancegeneral.co.in/Insurance/Self-Help/Cashless-Garages-and-Hospitals.aspx?network=Garages',
    garages: 5600, odRate: 0.031, zeroDepRate: 0.008, roadsideFee: 300,
    rating: 3.9, ncbPercent: 0, claimRatio: 83,
    addonRates: { zeroDep: 0.008, rsa: 300, engineProtect: 0.0034, rti: 0.0024, consumables: 0.0015, keyProtect: 175, tyreProtect: 0.0019, personalBelongings: 115 },
    supportedAddons: ['Zero Depreciation','Roadside Assistance','Engine Protect','Return to Invoice','Consumables Cover','Key Protect','Loss of Personal Belongings'],
  },
];

// ===========================================================
// THIRD-PARTY (TP) PREMIUM — fixed by IRDAI, identical for every
// insurer. Base rates confirmed for FY 2026-27 (excl. 18% GST).
// Two-wheelers and commercial vehicles are out of scope for this
// tool.
// Source: IRDAI/MoRTH private-car TP tariff notification.
// ===========================================================
const TP_RATES_ICE = {
  up_to_1000: 2094,
  '1001_1500': 3416,
  above_1500: 7897,
};
// EV TP tariff is banded by motor power (kW), not engine cc. These
// figures are from the last published draft slabs and should be
// re-checked against the current-year IRDAI EV notification before
// relying on them.
const TP_RATES_EV = {
  under_30kw: 1780,
  '30_65kw': 2904,
  above_65kw: 6712,
};
const GST_RATE = 0.18;

// ===========================================================
// THIRD-PARTY (TP) ENGINE
// Uses exact engineCC from the selected variant whenever the
// variant dataset provides it. EVs still require motor-power (kW),
// which is not present in the current vehicle dataset, so they use
// the documented fallback band until kW is added.
// ===========================================================
const LUXURY_BRANDS = new Set(['Audi', 'BMW']);

function getEvSegmentTier(brand) {
  return LUXURY_BRANDS.has(brand) ? 'above_65kw' : '30_65kw';
}

function getIceTpPremium(engineCC, brand, bodyType) {
  if (Number.isFinite(engineCC) && engineCC > 0) {
    if (engineCC <= 1000) return TP_RATES_ICE.up_to_1000;
    if (engineCC <= 1500) return TP_RATES_ICE['1001_1500'];
    return TP_RATES_ICE.above_1500;
  }
  const bt = (bodyType || '').toLowerCase();
  if (LUXURY_BRANDS.has(brand) || bt.includes('suv') || bt.includes('mpv')) return TP_RATES_ICE.above_1500;
  if (bt.includes('hatchback')) return TP_RATES_ICE.up_to_1000;
  return TP_RATES_ICE['1001_1500'];
}

function getEvTpPremium(motorPowerKW, brand) {
  if (Number.isFinite(motorPowerKW) && motorPowerKW > 0) {
    if (motorPowerKW < 30) return TP_RATES_EV.under_30kw;
    if (motorPowerKW <= 65) return TP_RATES_EV['30_65kw'];
    return TP_RATES_EV.above_65kw;
  }
  return getEvSegmentTier(brand) === 'above_65kw' ? TP_RATES_EV.above_65kw : TP_RATES_EV['30_65kw'];
}

// Fuel-type loading on Own Damage premium (repair-cost risk
// relative to petrol). Diesel/CNG/LPG parts and EV battery repairs
// cost more; hybrids get a small discount some insurers offer for
// lower risk profiles.
const FUEL_OD_MULTIPLIER = {
  Petrol: 1.00,
  Diesel: 1.05,
  CNG: 1.08,
  LPG: 1.10,
  Electric: 1.10,
  'Petrol Hybrid': 0.97,
  'Petrol Mild-Hybrid': 1.02,
};

// Default fuel-type loading, expressed as a percentage. These values are
// configurable per insurer in the Admin rate card.
const DEFAULT_FUEL_OD_PERCENT = {
  Petrol: 0, Diesel: 5, CNG: 8, LPG: 10, Electric: 10,
  'Petrol Hybrid': -3, 'Petrol Mild-Hybrid': 2,
};

function getFuelODPercent(fuelType, fuelPercentages) {
  if (fuelPercentages && Object.prototype.hasOwnProperty.call(fuelPercentages, fuelType)) {
    return Number(fuelPercentages[fuelType]) || 0;
  }
  return DEFAULT_FUEL_OD_PERCENT[fuelType] ?? 0;
}

// Body-type loading on Own Damage premium (bigger/pricier body
// panels and parts cost more to repair).
function getSegmentODMultiplier(brand, bodyType) {
  if (LUXURY_BRANDS.has(brand)) return 1.35;
  const bt = (bodyType || '').toLowerCase();
  if (bt.includes('hatchback')) return 0.95;
  if (bt.includes('suv') || bt.includes('mpv')) return 1.15;
  return 1.00; // sedan and anything else
}

/**
 * Computes a full premium breakdown for one insurer + one vehicle.
 * @param {object} insurer - an entry from INSURERS
 * @param {object} vehicle - { brand, bodyType, fuelType, idv,
 *                    customerNcbPercent? } — customerNcbPercent is
 *                    the advisor-entered NCB from the Policy Details
 *                    screen (js/policy-details.js), already forced to
 *                    0 there if a claim was made in the previous
 *                    policy year. Not to be confused with
 *                    insurer.ncbPercent below, which is that
 *                    insurer's own published/estimated average NCB
 *                    uptake stat shown in the comparison table.
 * @returns {object} breakdown matching the shape js/comparison.js's
 *                    renderTable() expects (insurerId, insurerName,
 *                    rating, garageCount, odPremium, tpPremium,
 *                    addons, ncbPercent, claimRatio, totalPremium,
 *                    source).
 */
function calculatePremium(insurer, vehicle, rateRules = null) {
  const { brand, bodyType, fuelType, idv, customerNcbPercent, engineCC, motorPowerKW } = vehicle;
  const odRateDecimal = Number(insurer.odRate) || Number(rateRules?.od_rate_per_idv) || 0.032;
  const odRateInfo = getVehicleFuelODRatePercent(rateRules, vehicle, odRateDecimal);
  const odRate = odRateInfo.percent / 100;

  // NCB is a customer-level discount on Own Damage premium only.
  const ncbDiscount = (customerNcbPercent || 0) / 100;
  const odBeforeDiscount = Math.round(idv * odRate * (1 - ncbDiscount));
  // Advisor discount applies to Own Damage only (never TP, add-ons or GST).
  const advisorDiscountPercent = Math.min(100, Math.max(0, Number(vehicle.advisorDiscount) || 0));
  const advisorDiscountAmount = Math.round(odBeforeDiscount * advisorDiscountPercent / 100);
  const odPremium = odBeforeDiscount - advisorDiscountAmount;

  let tpPremium;
  if (vehicle.policyType === 'standalone') {
    tpPremium = 0;
  } else if (fuelType === 'Electric' || normalizeInsuranceFuel(fuelType) === 'EV') {
    tpPremium = getEvTpPremium(motorPowerKW, brand);
  } else {
    tpPremium = getIceTpPremium(engineCC, brand, bodyType);
  }

  const addonRates = insurer.addonRates || { zeroDep: 0.008, rsa: 300, engineProtect: 0.003, rti: 0.002, consumables: 0.0012, keyProtect: 150, tyreProtect: 0.002, personalBelongings: 100 };
  const supported = new Set(insurer.supportedAddons || []);
  const selected = Array.isArray(vehicle.selectedAddons) && vehicle.selectedAddons.length ? vehicle.selectedAddons : [];
  const allAddonRows = [
    ['Zero Depreciation', Math.round(idv * Number(addonRates.zeroDep || 0)), 'zeroDep'],
    ['Roadside Assistance', Math.round(Number(addonRates.rsa || 0)), 'rsa'],
    [fuelType === 'Electric' ? 'Battery / Motor Protect' : 'Engine Protect', Math.round(idv * Number(addonRates.engineProtect || 0.003)), fuelType === 'Electric' ? 'batteryMotor' : 'engineProtect'],
    ['Return to Invoice', Math.round(idv * Number(addonRates.rti || 0)), 'rti'],
    ['Consumables Cover', Math.round(idv * Number(addonRates.consumables || 0)), 'consumables'],
    ['Key Protect', Math.round(Number(addonRates.keyProtect || 0)), 'keyProtect'],
    ['Tyre Protect', Math.round(idv * Number(addonRates.tyreProtect || 0.002)), 'tyreProtect'],
    ['Loss of Personal Belongings', Math.round(Number(addonRates.personalBelongings || 100)), 'personalBelongings'],
  ];
  const addons = allAddonRows.filter(([name]) => selected.includes(name) && supported.has(name)).map(([name,premium]) => ({ name, premium }));
  const addonAvailability = allAddonRows.map(([name,premium]) => ({ name, premium, available: supported.has(name) }));
  const addonTotal = addons.reduce((sum, a) => sum + a.premium, 0);

  const subtotal = odPremium + tpPremium + addonTotal;
  const gst = Math.round(subtotal * GST_RATE);
  const totalPremium = subtotal + gst;

  return {
    insurerId: insurer.id,
    insurerName: insurer.name,
    rating: insurer.rating,
    garageCount: insurer.garages,
    odPremium, odBeforeDiscount, advisorDiscountPercent, advisorDiscountAmount, tpPremium, addons, addonAvailability, gst,
    fuelType, insuranceCategory: odRateInfo.category,
    appliedFuelType: odRateInfo.fuel,
    // Applied rate after the advisor discount (e.g. 2.900% -> 2.610% at 10% off); the pre-discount rate is kept alongside.
    odRatePercent: Math.round(odRateInfo.percent * (1 - advisorDiscountPercent / 100) * 1000) / 1000,
    odRatePercentBeforeDiscount: Math.round(odRateInfo.percent * 1000) / 1000,
    rateSource: odRateInfo.source,
    ncbPercent: insurer.ncbPercent,
    claimRatio: insurer.claimRatio,
    totalPremium,
    source: 'fallback',
  };
}
