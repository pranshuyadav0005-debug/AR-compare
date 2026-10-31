// ===========================================================
// Insurance vehicle-category + fuel matrix helpers.
// Admin controls the final Own Damage rate (%) for each
// insurer + insurance vehicle category + fuel/power type.
// ===========================================================
const INSURANCE_VEHICLE_CATEGORIES = [
  'Hatchback', 'Sedan', 'SUV', 'MUV', 'Pickup', 'Coupe', 'Convertible', 'Luxury', 'Other'
];

const INSURANCE_RATE_FUELS = [
  'Petrol', 'Diesel', 'CNG', 'LPG', 'EV', 'Hybrid', 'Plug-in Hybrid', 'Mild Hybrid', 'CNG Hybrid'
];

function normalizeInsuranceCategory(bodyType, brand = '') {
  const bt = String(bodyType || '').toLowerCase();
  if (LUXURY_BRANDS && LUXURY_BRANDS.has(brand)) return 'Luxury';
  if (bt.includes('convertible')) return 'Convertible';
  if (bt.includes('coupe')) return 'Coupe';
  if (bt.includes('pickup')) return 'Pickup';
  if (bt.includes('muv') || bt.includes('mpv')) return 'MUV';
  if (bt.includes('suv')) return 'SUV';
  if (bt.includes('sedan')) return 'Sedan';
  if (bt.includes('hatchback')) return 'Hatchback';
  return 'Other';
}

function normalizeInsuranceFuel(fuelType) {
  const fuel = String(fuelType || '').trim();
  const lower = fuel.toLowerCase();
  if (lower.includes('cng') && lower.includes('hybrid')) return 'CNG Hybrid';
  if (lower.includes('plug') && lower.includes('hybrid')) return 'Plug-in Hybrid';
  if (lower.includes('mild') && lower.includes('hybrid')) return 'Mild Hybrid';
  if (lower.includes('hybrid')) return 'Hybrid';
  if (lower === 'electric' || lower === 'ev') return 'EV';
  return fuel;
}

// Convert the legacy base OD rate + loadings into a matrix only when
// an admin has not yet configured a cell. This preserves old pricing
// while giving the admin a fully editable category × fuel matrix.
function getDefaultVehicleFuelODRatePercent(baseRateDecimal, category, fuelType) {
  const base = Number(baseRateDecimal) || 0.032;
  const segmentMultiplier = category === 'Hatchback' ? 0.95
    : category === 'SUV' || category === 'MUV' ? 1.15
    : category === 'Luxury' ? 1.35
    : 1.00;
  const fuelPercent = {
    Petrol: 0, Diesel: 5, CNG: 8, LPG: 10, EV: 10,
    Hybrid: -3, 'Plug-in Hybrid': -3, 'Mild Hybrid': 2, 'CNG Hybrid': 4,
  }[fuelType] ?? 0;
  return Number((base * segmentMultiplier * (1 + fuelPercent / 100) * 100).toFixed(3));
}

function getVehicleFuelODRatePercent(rateRules, vehicle, fallbackBaseRate) {
  const category = vehicle.insuranceCategory || normalizeInsuranceCategory(vehicle.bodyType, vehicle.make || vehicle.brand);
  const fuel = normalizeInsuranceFuel(vehicle.fuelType);
  const matrix = rateRules?.vehicle_fuel_od_rates;
  if (matrix && matrix[category] && Object.prototype.hasOwnProperty.call(matrix[category], fuel)) {
    const value = Number(matrix[category][fuel]);
    if (Number.isFinite(value) && value >= 0) return { percent: value, category, fuel, source: 'matrix' };
  }
  const legacyFuel = vehicle.fuelType;
  const legacy = rateRules?.fuel_type_loadings;
  const legacyPercent = legacy && Object.prototype.hasOwnProperty.call(legacy, legacyFuel) ? Number(legacy[legacyFuel]) || 0 : null;
  if (legacyPercent !== null) {
    const base = Number(fallbackBaseRate) || 0.032;
    const segment = category === 'Hatchback' ? 0.95 : category === 'SUV' || category === 'MUV' ? 1.15 : category === 'Luxury' ? 1.35 : 1;
    return { percent: Number((base * segment * (1 + legacyPercent / 100) * 100).toFixed(3)), category, fuel, source: 'legacy' };
  }
  return { percent: getDefaultVehicleFuelODRatePercent(fallbackBaseRate, category, fuel), category, fuel, source: 'default' };
}
