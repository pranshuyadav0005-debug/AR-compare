// Build stamp: type AR_BUILD in the browser console (F12) to confirm which version is running.
window.AR_BUILD = 'V35-backend-foundation';
// Comparison requests use the authenticated same-origin backend.
// "2.610% (was 2.900%)" when an advisor discount is on, otherwise just "2.900%".
function formatOdRate(result) {
  if (result?.odRatePercent == null) return '';
  const applied = Number(result?.odRatePercent);
  if (!Number.isFinite(applied)) return '';
  const before = Number(result?.odRatePercentBeforeDiscount);
  const discounted = Number(result?.advisorDiscountAmount) > 0 && Number.isFinite(before) && before !== applied;
  return discounted ? `${applied.toFixed(3)}% (was ${before.toFixed(3)}%)` : `${applied.toFixed(3)}%`;
}

function enrichPlanDetails(result, vehicle) {
  const addons = Array.isArray(result.addons) ? result.addons : [];
  const addonAvailability = Array.isArray(result.addonAvailability) ? result.addonAvailability : addons.map(a => ({name:a.name,premium:a.premium,available:a.available !== false}));
  const addonNames = addons.map((a) => a.name).filter(Boolean);
  const hasZeroDep = addonNames.some((n) => /zero\s*dep/i.test(n));
  const hasRsa = addonNames.some((n) => /roadside|rsa/i.test(n));
  return {
    planName: result.planName || (vehicle?.policyType === 'standalone' ? 'Standalone Own Damage Insurance' : 'Comprehensive Motor Insurance'),
    coverage: [
      { label: 'Own Damage', available: Number(result.odPremium) > 0 },
      { label: 'Third Party Liability', available: Number(result.tpPremium) > 0 },
    ],
    addons: addonAvailability.length ? addonAvailability.map((a) => ({ label: a.name, available: !!a.available })) : [
      { label: 'No add-ons configured', available: false }
    ],
    idv: result.returnedIdv ?? result.idv ?? null,
    premium: result.totalPremium,
    breakdown: [
      { label: 'Own Damage', value: result.odPremium },
      ...(Number(result.advisorDiscountAmount) > 0 ? [
        { label: 'OD before advisor discount', value: rupee(result.odBeforeDiscount), informational: true },
        { label: `Advisor discount (${result.advisorDiscountPercent}% on OD)`, value: `− ${rupee(result.advisorDiscountAmount)}`, informational: true },
      ] : []),
      { label: 'Vehicle category', value: result.insuranceCategory || normalizeInsuranceCategory(vehicle?.bodyType, vehicle?.make), informational: true },
      { label: 'Fuel / power type', value: result.appliedFuelType || normalizeInsuranceFuel(vehicle?.fuelType), informational: true },
      ...(result.odRatePercent != null && Number.isFinite(Number(result.odRatePercent)) ? [{ label: 'Applied OD rate', value: formatOdRate(result), informational: true }] : []),
      { label: 'Third Party', value: result.tpPremium },
      ...addons.map((a) => ({ label: a.name, value: a.premium })),
      { label: 'GST / Tax', value: result.gst },
      { label: 'Final Premium', value: result.totalPremium, total: true },
    ],
    ncb: result.ncbPercent ?? null,
    // These were never copied over, so the plan-details card always showed "Applied OD rate 0.000%".
    odRatePercent: result.odRatePercent,
    odRateText: formatOdRate(result),
    insuranceCategory: result.insuranceCategory,
    appliedFuelType: result.appliedFuelType,
    rating: result.rating,
    garageCount: result.garageCount,
    claimRatio: result.claimRatio,
    source: result.source || 'fallback',
    notes: [
      `${result.source === 'api' ? 'Live insurer quote' : 'Configured estimate — verify with insurer'}; requested IDV: ${rupee(currentIDV)}; returned IDV: ${rupee(result.returnedIdv ?? result.idv)}.`,
      ...(result.comparisonIssues || []),
      ...(result.providerQuoteId ? [`Provider quote reference: ${result.providerQuoteId}`] : []),
      ...(result.expiresAt ? [`Quote expiry: ${result.expiresAt}`] : ['Provider quote validity is not confirmed.']),
      ...(result.odRatePercent != null ? [`Applied OD rate: ${formatOdRate(result)}.`] : []),
      result.source === 'api' ? 'Premiums are returned by the insurer provider.' : 'Estimate calculated from the configured rate card; confirm with the insurer.',
      'Plan benefits and add-ons are shown only when they are configured in the returned quote/rate card.',
      'Any unconfigured insurer-specific terms, exclusions or eligibility conditions must be verified before presenting the quote as final.'
    ]
  };
}

// The backend is the only quote source. Authentication, validation, service
// and save failures must never turn into browser-generated estimates.
async function fetchComparison(vehicle, idv) {
  const body=JSON.stringify({
    vehicle: { ...vehicle, name: vehicle?.name || currentVehicleDetails?.name || '' },
    idv, autoIdv: autoIDV, quotationId: workingQuotationId, expectedRevision: workingRevision,
    declaredAccurate: currentPolicyDetails?.declaredAccurate === true,
    policy: { ...(currentPolicyDetails || {}), selectedAddons: vehicle.selectedAddons || [], advisorDiscount },
  });
  // Keep a key for transport retries of identical details. A completed
  // comparison gets a fresh key on the next deliberate recalculation.
  if(!comparisonRequest||comparisonRequest.body!==body)comparisonRequest={body,key:crypto.randomUUID()};
  const request=comparisonRequest;
  const data = await apiFetch('/api/quote', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key':request.key },body,signal:AbortSignal.timeout(6500),
  });
  if(comparisonRequest===request)comparisonRequest=null;
  if (!Array.isArray(data?.results)) throw new Error('The comparison response is incomplete. Please retry.');
  return data;
}

// ===========================================================
// COMPARISON SCREEN rendering
// ===========================================================
const rupee = n => typeof n === 'number' && Number.isFinite(n) ? '₹' + Math.round(n).toLocaleString('en-IN') : '—';

// Official insurer garage/network-locator links. These are kept in the UI
// layer so the Garage button remains available even when a quote comes from
// the backend/DB and that response does not carry the URL itself.
const GARAGE_URLS = {
  'icici-lombard': 'https://www.icicilombard.com/cashless-garages',
  'hdfc-ergo': 'https://www.hdfcergo.com/locators/cashless-garages-networks',
  'bajaj-allianz': 'https://www.bajajallianz.com/branch-locator.html',
  'tata-aig': 'https://www.tataaig.com/locator/cashless-car-network-garages',
  'reliance-general': 'https://www.reliancegeneral.co.in/Insurance/Self-Help/Cashless-Garages-and-Hospitals.aspx?network=Garages',
};

function getGarageUrl(result) {
  if (result?.garageUrl) { try { const url = new URL(result.garageUrl); if (url.protocol === 'https:') return url.href; } catch {} }
  const id = String(result?.insurerId || '').toLowerCase();
  if (GARAGE_URLS[id]) return GARAGE_URLS[id];
  const name = String(result?.insurerName || '').toLowerCase();
  if (name.includes('icici')) return GARAGE_URLS['icici-lombard'];
  if (name.includes('hdfc')) return GARAGE_URLS['hdfc-ergo'];
  if (name.includes('bajaj')) return GARAGE_URLS['bajaj-allianz'];
  if (name.includes('tata') && name.includes('aig')) return GARAGE_URLS['tata-aig'];
  if (name.includes('reliance')) return GARAGE_URLS['reliance-general'];
  return '';
}

// Customer requirement: from Comparison, Back must return to the
// immediately previous Policy Details screen, not restart at registration.
const comparisonBackLink = document.getElementById('backLink');
if (comparisonBackLink) {
  comparisonBackLink.textContent = 'Back';
  comparisonBackLink.insertAdjacentHTML('afterbegin', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>');
  comparisonBackLink.addEventListener('click', () => showScreen('screen-policy-details'));
}
let vehicle, autoIDV, bounds, currentIDV, currentResults = [];
let currentComparisonMeta = {};
let quoteExpiryTimer;
// Externally-fitted accessories (Trailer / Non-Electrical / Biofuel Kit / Electrical)
// declared on the Comparison screen. Each one the advisor ticks and enters an IDV
// for is added straight on top of the vehicle's own auto-calculated IDV.
const ACCESSORY_FIELDS = [
  { key: 'trailer', checkbox: 'accTrailerCheck', wrap: 'accTrailerWrap', value: 'accTrailerValue' },
  { key: 'nonElectrical', checkbox: 'accNonElectricalCheck', wrap: 'accNonElectricalWrap', value: 'accNonElectricalValue' },
  { key: 'biofuel', checkbox: 'accBiofuelCheck', wrap: 'accBiofuelWrap', value: 'accBiofuelValue' },
  { key: 'electrical', checkbox: 'accElectricalCheck', wrap: 'accElectricalWrap', value: 'accElectricalValue' },
];
let accessoryIDV = { trailer: 0, nonElectrical: 0, biofuel: 0, electrical: 0 };
let vehicleBaseIDV = 0; // the vehicle-only auto-calculated IDV, before accessories are added
// Id of the quotation created by THIS comparison session. Recalculations (add-ons,
// IDV, discount) update it in place instead of saving a new quotation every time.
let workingQuotationId = null;
let workingRevision = null;
let comparisonRequest = null;
let comparisonQueue = Promise.resolve();
let quoteRequestSeq = 0; // lets us ignore out-of-order responses when the advisor clicks quickly
let idvDebounceTimer = null;

async function goToComparison() {
  try {
    if (!await ensureVehicleIDV(currentVehicleDetails)) return;
    // Resolve the base before showing the loading screen, so a missing IDV
    // can never leave the advisor stuck on a comparison spinner.
    vehicle = buildVehicleFromSelection(currentRegNumber, currentVehicleDetails);
    vehicleBaseIDV = getVehicleBaseIDV(vehicle);
    if (currentPolicyDetails) {
      vehicle.ncbPercent = currentPolicyDetails.ncbPercent;
      vehicle.hadClaim = currentPolicyDetails.hadClaim;
      vehicle.policyType = currentPolicyDetails.policyType;
      vehicle.tpExpiryDate = currentPolicyDetails.tpExpiryDate;
      vehicle.selectedAddons = currentPolicyDetails.selectedAddons || [];
    }
    showScreen('screen-comparison');
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('resultsState').style.display = 'none';
    workingQuotationId = null;
    workingRevision = null;
    comparisonRequest = null;
    window.currentSavedQuotation = null;
    resetAdvisorDiscount();
    resetAccessoriesUI();
    applyAccessoriesToIDV();
    await loadComparison();
    renderComparison();
  } catch (err) {
    document.getElementById('loadingState').style.display = 'none';
    showScreen('screen-policy-details');
    document.getElementById('pdErrorText').textContent = err.message || 'Could not load the comparison. Please try again.';
    document.getElementById('pdError').classList.add('is-visible');
  }
}

// Fetches the server comparison once and stores the raw results. Sorting is
// then done locally in renderTable() without re-fetching.
async function loadComparison() {
  const seq = ++quoteRequestSeq;
  const previous=comparisonQueue;
  let releaseQueue;
  comparisonQueue=new Promise(resolve=>{releaseQueue=resolve;});
  await previous;
  try {
  if(seq!==quoteRequestSeq)return false;
  // Record which externally-fitted accessories (and their declared IDVs) are
  // contributing to the current IDV, for the saved quotation.
  vehicle.fittedAccessories = ACCESSORY_FIELDS.reduce((acc, f) => {
    const cb = document.getElementById(f.checkbox);
    if (cb && cb.checked && Number(accessoryIDV[f.key]) > 0) acc[f.key] = Number(accessoryIDV[f.key]);
    return acc;
  }, {});
  currentComparisonMeta = { loading: true };
  currentResults = [];
  renderTable(document.getElementById('sortSelect').value);
  try {
    const data = await fetchComparison(vehicle, currentIDV);
    if (data.quotation?.id) { workingQuotationId = data.quotation.id; workingRevision = data.quotation.revision; }
    if (seq !== quoteRequestSeq) return false;
    currentResults = data.results.map(result => ({ ...result, planDetails: enrichPlanDetails(result, vehicle) }));
    currentComparisonMeta = data.meta || {};
    const discountCap = currentComparisonMeta.maxAdvisorDiscountPercent;
    if (typeof discountCap === 'number' && Number.isFinite(discountCap) && discountCap >= 0 && discountCap <= 100) { MAX_ADVISOR_DISCOUNT_PERCENT = discountCap; document.getElementById('ownDiscountInput').max = String(discountCap); } 
    window.currentSavedQuotation = data.quotation || null;

    clearTimeout(quoteExpiryTimer);
    const nextExpiry = Math.min(...currentResults.map(r => Date.parse(r.expiresAt)).filter(n => Number.isFinite(n) && n > Date.now()));
    if (Number.isFinite(nextExpiry)) quoteExpiryTimer = setTimeout(() => renderTable(document.getElementById('sortSelect').value), Math.min(2147483647, nextExpiry - Date.now() + 25));
    return true;
  } catch (err) {
    if (seq !== quoteRequestSeq) return false;
    currentResults = [];
    window.currentSavedQuotation = null;
    currentComparisonMeta = { persistence: 'failed', error: err.message || 'Could not retrieve quotes. Please retry.' };
    return false;
  }

  } finally {releaseQueue();}
}

function renderComparison() {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('resultsState').style.display = 'block';

  document.getElementById('vehicleTitle').textContent = `${vehicle.make} ${vehicle.model} ${vehicle.variant}`;
  const savedLine = document.getElementById('savedQuotationLine');
  const savedNumber = document.getElementById('savedQuotationNumber');
  if (savedLine && savedNumber) {
    const qn = window.currentSavedQuotation?.quotationNumber || '';
    savedNumber.textContent = qn || '—';
    savedLine.style.display = qn ? 'block' : 'none';
  }
  const ncbNote = typeof vehicle.ncbPercent === 'number' ? ` · NCB ${vehicle.ncbPercent}%${vehicle.hadClaim ? ' (claim last year)' : ''}` : '';
  document.getElementById('vehicleSub').textContent = `${vehicle.policyType === 'standalone' ? 'Standalone OD' : 'Comprehensive OD + TP'} · ${vehicle.year} · ${Math.round(vehicle.ageInYears * 10) / 10} yrs old · ${Number.isFinite(vehicle.exShowroomPrice) && vehicle.exShowroomPrice > 0 ? rupee(vehicle.exShowroomPrice) + ' ex-showroom' : 'Manual IDV'}${vehicle.engineCC ? ` · ${vehicle.engineCC} cc` : ''}${ncbNote}`;
  document.getElementById('regChip').textContent = `${vehicle.registrationType === 'bh' ? 'BH' : 'REG'} · ${vehicle.regNumber}`;
  renderVehicleSummary();

  // Keep the visible add-on controls synchronized with the current quote state.
  document.querySelectorAll('#addonFilter input[type=checkbox]').forEach((input) => {
    input.checked = Array.isArray(vehicle?.selectedAddons) && vehicle.selectedAddons.includes(input.value);
  });
  renderSelectedAddonsSummary();
  renderIDV();
  const insurerSearchInputEl = document.getElementById('insurerSearchInput');
  if (insurerSearchInputEl) insurerSearchInputEl.value = '';
  renderTable(document.getElementById('sortSelect').value);
}

function formatDateForDisplay(value) {
  if (!value) return '—';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderVehicleSummary() {
  const details = currentVehicleDetails || {};
  const map = {
    cmpFirstName: details.name || '—',
    cmpRegistration: vehicle ? `${vehicle.registrationType === 'bh' ? 'BH' : 'REG'} · ${vehicle.regNumber || '—'}` : '—',
    cmpManufacturer: vehicle?.make || details.brand || '—',
    cmpCarName: vehicle?.model || details.model || details.carName || '—',
    cmpFuel: vehicle?.fuelType || details.fuelType || '—',
    cmpVariant: vehicle?.variant || details.variant || '—',
    cmpRegistered: details.registeredDate ? formatDateForDisplay(details.registeredDate) : '—',
    cmpPolicyExpiry: details.policyExpiry ? formatDateForDisplay(details.policyExpiry) : '—'
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

// ===========================================================
// Edit vehicle details modal — Manufacturer / Car name / Variant
// use the same cascading searchable dropdowns as the Vehicle
// Details screen (js/vehicle-details.js: createSearchableDropdown +
// CAR_DATA), instead of free-text inputs, so edits here can only
// ever match real, priced vehicle data.
// ===========================================================
const editManufacturerCombo = createSearchableDropdown({
  input: document.getElementById('editManufacturer'),
  hidden: document.getElementById('editManufacturerValue'),
  list: document.getElementById('editManufacturerList'),
  onSelect: (brand) => editPopulateCarNames(brand),
  onClear: () => editResetCarNameFuelAndVariant(),
});
const editCarNameCombo = createSearchableDropdown({
  input: document.getElementById('editCarName'),
  hidden: document.getElementById('editCarNameValue'),
  list: document.getElementById('editCarNameList'),
  onSelect: (model) => editPopulateFuelTypes(editManufacturerCombo.getValue(), model),
  onClear: () => editResetFuelAndVariant(),
});
const editVariantCombo = createSearchableDropdown({
  input: document.getElementById('editVariant'),
  hidden: document.getElementById('editVariantValue'),
  list: document.getElementById('editVariantList'),
  onSelect: () => {},
});
const editFuelTypeEl = document.getElementById('editFuelType');

function editResetFuelAndVariant() {
  editFuelTypeEl.innerHTML = '<option value="">Select a car first</option>';
  editFuelTypeEl.disabled = true;
  editVariantCombo.disable('Select a fuel type first');
}
function editResetCarNameFuelAndVariant() {
  editCarNameCombo.disable('Select a manufacturer first');
  editResetFuelAndVariant();
}
function editPopulateCarNames(brand) {
  const models = Object.keys(CAR_DATA[brand] || {}).sort();
  editCarNameCombo.setOptions(models);
  editResetFuelAndVariant();
}
function editPopulateFuelTypes(brand, model) {
  const fuels = Object.keys(CAR_DATA[brand]?.[model]?.fuelTypes || {}).sort();
  editFuelTypeEl.innerHTML = '<option value="">Select a fuel type</option>' + fuels.map((f) => `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
  editFuelTypeEl.disabled = false;
  editVariantCombo.disable('Select a fuel type first');
}
function editPopulateVariants(brand, model, fuelType) {
  const modelData = CAR_DATA[brand]?.[model];
  if (!modelData || !fuelType) { editVariantCombo.disable('Select a fuel type first'); return; }
  const declared = Array.isArray(modelData.fuelTypes?.[fuelType]) ? modelData.fuelTypes[fuelType] : [];
  const priced = Object.keys(modelData.variantPrices?.[fuelType] || {});
  const variants = [...new Set([...declared, ...priced])]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  editVariantCombo.setOptions(variants);
}
if (editFuelTypeEl) editFuelTypeEl.addEventListener('change', () => {
  const brand = editManufacturerCombo.getValue();
  const model = editCarNameCombo.getValue();
  if (!brand || !model || !editFuelTypeEl.value) { editVariantCombo.disable('Select a fuel type first'); return; }
  editPopulateVariants(brand, model, editFuelTypeEl.value);
});

function openVehicleEdit() {
  const details = currentVehicleDetails || {};
  const brand = vehicle?.make || details.brand || '';
  const model = vehicle?.model || details.model || details.carName || '';
  const fuelType = vehicle?.fuelType || details.fuelType || '';
  const variant = vehicle?.variant || details.variant || '';

  document.getElementById('editFirstName').value = details.name || '';
  document.getElementById('editRegistrationType').value = currentRegistrationType || vehicle?.registrationType || 'normal';
  document.getElementById('editRegistrationNumber').value = currentRegNumber || vehicle?.regNumber || '';
  document.getElementById('editRegisteredDate').value = details.registeredDate || '';
  document.getElementById('editPolicyExpiry').value = details.policyExpiry || '';

  editManufacturerCombo.setOptions(Object.keys(CAR_DATA).sort());
  editResetCarNameFuelAndVariant();
  if (brand && CAR_DATA[brand]) {
    editManufacturerCombo.setValue(brand);
    if (model && CAR_DATA[brand][model]) {
      editCarNameCombo.setValue(model);
      if (fuelType && CAR_DATA[brand][model].fuelTypes?.[fuelType]) {
        editFuelTypeEl.value = fuelType;
        editPopulateVariants(brand, model, fuelType);
        if (variant) editVariantCombo.setValue(variant);
      }
    }
  }

  const modal = document.getElementById('vehicleEditModal');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeVehicleEdit() {
  const modal = document.getElementById('vehicleEditModal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

async function saveVehicleEdit(event) {
  event.preventDefault();
  const get = id => document.getElementById(id)?.value?.trim() || '';
  const name = get('editFirstName');
  const regType = get('editRegistrationType') || 'normal';
  const regNumber = get('editRegistrationNumber').toUpperCase();
  const brand = editManufacturerCombo.getValue();
  const model = editCarNameCombo.getValue();
  const fuelType = get('editFuelType');
  const variant = editVariantCombo.getValue();
  const registeredDate = get('editRegisteredDate');
  const policyExpiry = get('editPolicyExpiry');
  if (!name || !regNumber || !brand || !model || !fuelType || !variant || !registeredDate || !policyExpiry) {
    alert('Please complete all vehicle details.');
    return;
  }
  if (typeof isValidRegNumber === 'function' && !isValidRegNumber(regNumber, regType)) {
    alert(regType === 'bh' ? 'Enter a valid BH-series registration number, e.g. 23BH1234AB.' : 'Enter a valid registration number, e.g. MH12AB1234.');
    return;
  }
  const nextDetails = { name, brand, model, carName: `${brand} ${model}`, fuelType, variant, registeredDate, policyExpiry, registrationType: regType };
  if (!await ensureVehicleIDV(nextDetails, regNumber)) return;
  currentRegistrationType = regType;
  currentRegNumber = regNumber;
  currentVehicleDetails = nextDetails;
  // The selected fuel controls the quote theme only; showScreen() applies it
  // when the comparison screen becomes active.
  if (typeof setAdvisorFuelTheme === 'function') setAdvisorFuelTheme(fuelType);

  const keptAddons = Array.isArray(vehicle?.selectedAddons) ? vehicle.selectedAddons : [];
  vehicle = buildVehicleFromSelection(currentRegNumber, currentVehicleDetails);
  if (currentPolicyDetails) {
    vehicle.ncbPercent = currentPolicyDetails.ncbPercent;
    vehicle.hadClaim = currentPolicyDetails.hadClaim;
    vehicle.policyType = currentPolicyDetails.policyType;
    vehicle.tpExpiryDate = currentPolicyDetails.tpExpiryDate;
  }
  vehicle.selectedAddons = keptAddons; // keep the customer's add-on choices when only the vehicle is corrected
  vehicleBaseIDV = getVehicleBaseIDV(vehicle);
  applyAccessoriesToIDV(); // keep any fitted-accessory IDVs already entered, re-based on the corrected vehicle
  closeVehicleEdit();
  document.getElementById('loadingState').style.display = 'block';
  document.getElementById('resultsState').style.display = 'none';
  await loadComparison();
  renderComparison();
}

function renderSelectedAddonsSummary() {
  const el = document.getElementById('selectedAddonsSummary');
  if (!el) return;
  const addons = Array.isArray(vehicle?.selectedAddons) ? vehicle.selectedAddons : [];
  const addonPart = addons.length
    ? `<div class="selected-addons-chips">${addons.map(a => `<span class="addon-chip">${escapeHtml(a)}</span>`).join('')}</div><div class="selected-addons-note">✓ = supported by insurer &nbsp; ✕ = not supported</div>`
    : `<div class="selected-addons-note">No add-ons selected</div>`;
  const discountPart = advisorDiscount > 0
    ? `<div class="selected-addons-note selected-discount-note">Advisor discount: <strong>${advisorDiscount}%</strong> off Own Damage premium</div>`
    : '';
  el.innerHTML = `<div class="selected-addons-title">Customer requested add-ons</div>${addonPart}${discountPart}`;
}

function renderIDV() {
  document.getElementById('idvValue').textContent = rupee(currentIDV);
  const label = vehicle?.idvSource === 'manual' ? 'Manual base IDV' : 'Auto-calculated';
  document.getElementById('idvAutoNote').textContent = `${label}: ${rupee(vehicleBaseIDV)}${getAccessoriesTotal() ? ' + accessories' : ''}${currentIDV !== autoIDV ? ' (adjusted)' : ''}`;
  document.getElementById('idvMinLabel').textContent = rupee(bounds.min);
  document.getElementById('idvMaxLabel').textContent = rupee(bounds.max);
  const accessoriesTotalEl = document.getElementById('idvAccessoriesTotalLabel');
  if (accessoriesTotalEl) accessoriesTotalEl.textContent = rupee(currentIDV);
}

// Sum of accessory IDVs for every accessory that is both ticked and has a
// valid (>0) IDV entered against it.
function getAccessoriesTotal() {
  return ACCESSORY_FIELDS.reduce((sum, f) => {
    const cb = document.getElementById(f.checkbox);
    if (cb && cb.checked) {
      const v = Number(accessoryIDV[f.key]) || 0;
      return sum + (v > 0 ? v : 0);
    }
    return sum;
  }, 0);
}

// Clears every accessory checkbox/value (used when a new vehicle is loaded,
// since fitted accessories are specific to the vehicle being quoted).
function resetAccessoriesUI() {
  accessoryIDV = { trailer: 0, nonElectrical: 0, biofuel: 0, electrical: 0 };
  ACCESSORY_FIELDS.forEach((f) => {
    const cb = document.getElementById(f.checkbox);
    const wrap = document.getElementById(f.wrap);
    const valueInput = document.getElementById(f.value);
    if (cb) cb.checked = false;
    if (wrap) { wrap.style.display = 'none'; wrap.classList.remove('has-error'); }
    if (valueInput) valueInput.value = '';
  });
}

// Rebuilds autoIDV/bounds/currentIDV from vehicleBaseIDV + the accessories
// currently ticked, so a fitted accessory's IDV directly increases the
// vehicle's declared value (rather than only being informational).
function applyAccessoriesToIDV() {
  autoIDV = Math.round(vehicleBaseIDV + getAccessoriesTotal());
  bounds = getIDVBounds(autoIDV);
  currentIDV = autoIDV;
  const slider = document.getElementById('idvSlider');
  if (slider) slider.value = 50;
}

function onAccessoriesChanged() {
  if (!bounds) return; // vehicle/comparison hasn't loaded yet
  applyAccessoriesToIDV();
  renderIDV();
  clearTimeout(idvDebounceTimer);
  idvDebounceTimer = setTimeout(async () => {
    await loadComparison();
    renderTable(document.getElementById('sortSelect').value);
  }, 350);
}

ACCESSORY_FIELDS.forEach((f) => {
  const cb = document.getElementById(f.checkbox);
  const wrap = document.getElementById(f.wrap);
  const valueInput = document.getElementById(f.value);
  if (!cb || !wrap || !valueInput) return;
  cb.addEventListener('change', () => {
    if (cb.checked) {
      wrap.style.display = '';
      wrap.classList.toggle('has-error', !(Number(valueInput.value) > 0));
    } else {
      wrap.style.display = 'none';
      wrap.classList.remove('has-error');
      valueInput.value = '';
      accessoryIDV[f.key] = 0;
    }
    onAccessoriesChanged();
  });
  valueInput.addEventListener('input', () => {
    const v = Number(valueInput.value);
    accessoryIDV[f.key] = Number.isFinite(v) && v > 0 ? v : 0;
    wrap.classList.toggle('has-error', cb.checked && !(v > 0));
    onAccessoriesChanged();
  });
});

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function renderAddonCells(result) {
  const requested = Array.isArray(vehicle?.selectedAddons) ? vehicle.selectedAddons : [];
  if (!requested.length) return '<span class="addon-none">No add-ons selected</span>';
  const availability = Array.isArray(result.addonAvailability) ? result.addonAvailability : [];
  const returned = Array.isArray(result.addons) ? result.addons : [];
  return requested.map(name => {
    const row = availability.find(a => a.name === name);
    const returnedRow = returned.find(a => a.name === name);
    const available = row ? !!row.available : !!returnedRow;
    const premiumValue = row?.premium ?? returnedRow?.premium;
    const premium = available && premiumValue ? ` · ${rupee(premiumValue)}` : '';
    return `<span class="addon-status ${available ? 'is-supported' : 'is-unsupported'}"><strong>${available ? '✓' : '✕'}</strong> ${escapeHtml(name)}${premium}</span>`;
  }).join('');
}

// ===========================================================
// Per-insurer export — downloads a single, self-contained HTML
// file containing only that insurer's quote (never the whole
// comparison table), which the advisor can open, print, or
// "Save as PDF" straight from the browser's print dialog.
// ===========================================================
function buildInsurerExportHtml(result) {
  const details = enrichPlanDetails(result, vehicle);
  const coverageItems = details.coverage.map((x) => `<li>${x.available ? '✓' : '✕'} ${escapeHtml(x.label)}</li>`).join('');
  const addonItems = details.addons.map((x) => `<li>${x.available ? '✓' : '✕'} ${escapeHtml(x.label)}</li>`).join('');
  const breakdownRows = details.breakdown.map((x) => `<tr${x.total ? ' class="quote-total-row"' : ''}><td>${escapeHtml(x.label)}</td><td style="text-align:right;">${x.informational ? escapeHtml(x.value) : rupee(x.value)}</td></tr>`).join('');
  const vehicleLine = `${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)} ${escapeHtml(vehicle.variant)} · ${escapeHtml(vehicle.registrationType === 'bh' ? 'BH' : 'REG')} ${escapeHtml(vehicle.regNumber)}`;
  const generatedOn = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${escapeHtml(result.insurerName)} — Quote</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#1c2b45;margin:0;padding:36px;background:#fff;}
  h1{font-size:21px;margin:0 0 4px;}
  .sub{color:#5b6b85;font-size:13px;margin-bottom:22px;}
  .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:22px;}
  .card{border:1px solid #dfe6f2;border-radius:10px;padding:11px 13px;}
  .card h3{margin:0 0 4px;font-size:10.5px;text-transform:uppercase;color:#7d8bab;letter-spacing:.06em;}
  .card strong{font-size:16px;}
  h2.section{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#33456b;margin:22px 0 8px;}
  table{width:100%;border-collapse:collapse;}
  td{padding:8px 4px;border-bottom:1px solid #eef1f7;font-size:13.5px;}
  ul{margin:0;padding-left:18px;font-size:13.5px;line-height:1.7;}
  .footer{color:#8894ab;font-size:11px;margin-top:28px;border-top:1px solid #eef1f7;padding-top:12px;}
  body{font-family:Inter,Arial,Helvetica,sans-serif;max-width:1000px;margin:auto;padding:40px;color:#14213d;line-height:1.6;}
  h1{font-size:26px;letter-spacing:-.025em;color:#0f2a5c;}
  .sub{font-size:13px;border-bottom:1px solid #e1e7ef;padding-bottom:18px;}
  .grid{gap:14px;}.card{padding:16px 18px;border-color:#e1e7ef;border-radius:12px;background:#f8fafc;}
  .card h3{font-size:12px;color:#66758a;text-transform:none;letter-spacing:0;}
  .card strong{font-size:20px;font-variant-numeric:tabular-nums;}
  .card.premium-card{background:#edf4ff;border-color:#c6d9f5;}.premium-card strong{font-size:30px;color:#0f2a5c;}
  h2.section{font-size:14px;text-transform:none;letter-spacing:0;margin-top:24px;}
  td{padding:12px 10px;font-variant-numeric:tabular-nums;border-color:#e8edf4;}
  .quote-total-row td{font-size:22px;font-weight:700;background:#edf4ff;color:#0f2a5c;border-bottom:0;}
  .footer{font-size:12px;color:#66758a;}tr,.card{break-inside:avoid;}
  @page{size:A4 portrait;margin:14mm;}
  @media print { body{padding:0;font-size:12px;}h1{font-size:23px;}.card,.quote-total-row td{print-color-adjust:exact;-webkit-print-color-adjust:exact;} }
  @media(max-width:600px){body{padding:20px;}.grid{grid-template-columns:1fr;}h1{font-size:22px;}}
</style></head>
<body>
  <h1>${escapeHtml(result.insurerName)} — Motor Insurance Quote</h1>
  <p class="quote-status">${result.source === 'api' ? 'Live insurer quote' : 'ESTIMATE — requires insurer confirmation'} · ${currentComparisonMeta.persistence === 'failed' ? 'Quotation not saved' : 'Internal comparison'}</p>
  <p>${(result.comparisonIssues || []).map(escapeHtml).join(' ')}</p>
  <div class="sub">${vehicleLine} · Generated ${generatedOn} · AR Advisors</div>
  <div class="grid">
    <div class="card"><h3>IDV</h3><strong>${rupee(details.idv)}</strong></div>
    <div class="card premium-card"><h3>Total Premium</h3><strong>${rupee(details.premium)}</strong></div>
    <div class="card"><h3>Customer NCB</h3><strong>${details.ncb == null ? 'Not confirmed' : details.ncb + '%'}</strong></div>
    <div class="card"><h3>Insurer Rating</h3><strong>${details.rating ?? 'Not configured'}</strong></div>
  </div>
  <h2 class="section">Coverage</h2><ul>${coverageItems}</ul>
  <h2 class="section">Add-ons in this quote</h2><ul>${addonItems}</ul>
  <h2 class="section">Premium breakdown</h2><table>${breakdownRows}</table>
  <div class="footer">Generated by AR Advisors for internal advisor use. Verify all figures with ${escapeHtml(result.insurerName)} before sharing with the customer.</div>
</body></html>`;
}

function exportInsurerQuote(insurerId) {
  const result = currentResults.find((r) => String(r.insurerId) === String(insurerId));
  if (!result || !vehicle || !isPricedQuote(result) || isExpiredQuote(result)) return;
  const html = buildInsurerExportHtml(result);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const safeInsurer = String(result.insurerName || 'insurer').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
  const safeReg = String(vehicle.regNumber || 'vehicle').replace(/[^a-z0-9]+/gi, '');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeInsurer}-quote-${safeReg}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function isPricedQuote(result) {
  return result.status !== 'unavailable' && typeof result.totalPremium === 'number' && Number.isFinite(result.totalPremium) && result.totalPremium > 0;
}
function isExpiredQuote(result) { return !!result.expiresAt && (!Number.isFinite(Date.parse(result.expiresAt)) || Date.parse(result.expiresAt) <= Date.now()); }
function isMatchingQuote(result) {
  return isPricedQuote(result) && !isExpiredQuote(result) && result.eligibleForComparison !== false && Math.abs(Number(result.returnedIdv ?? result.idv) - currentIDV) <= .5;
}
function quoteGroup(result) {
  if (!isPricedQuote(result) || isExpiredQuote(result)) return 3;
  if (!isMatchingQuote(result)) return 2;
  return result.source === 'api' ? 0 : 1;
}
function renderComparisonStatus() {
  let banner = document.getElementById('comparisonStatus');
  if (!banner) {
    banner = document.createElement('div'); banner.id = 'comparisonStatus'; banner.className = 'comparison-status'; banner.setAttribute('role','status');
    document.getElementById('resultsState').prepend(banner);
  }
  const meta = currentComparisonMeta;
  const live = currentResults.filter(r => quoteGroup(r) === 0).length;
  const estimates = currentResults.filter(r => quoteGroup(r) === 1).length;
  const pendingReview = currentResults.filter(r => quoteGroup(r) === 2).length;
  const unavailable = currentResults.filter(r => quoteGroup(r) === 3).length;
  let message = meta.loading ? 'Updating comparison…' : `${live} matching live quotes · ${estimates} matching estimates · ${pendingReview} to review · ${unavailable} unavailable`;
  if (!meta.loading && !live && estimates) message += '. Estimates need insurer confirmation.';
  if (meta.historical) message += '. Viewing a saved comparison; refresh for current prices.';
  if (meta.error) message = meta.error;
  else if (!meta.loading && (meta.persistence === 'failed' || !window.currentSavedQuotation)) message += ' Quotation not saved. Retry to save it.';
  if (meta.timedOut) message += ` ${meta.timedOut} insurers did not complete within the response window. Retry for a new comparison.`;
  if (meta.auditStatus === 'failed') message += ' Comparison history could not be fully recorded. Please retry.';
  const bad = !!meta.error || meta.persistence === 'failed' || meta.auditStatus === 'failed';
  banner.classList.toggle('has-warning', bad || (!live && !!estimates));
  banner.replaceChildren();
  const content=document.createElement('span'); content.textContent=message; banner.appendChild(content);
  if (!meta.loading) { const retry=document.createElement('button'); retry.type='button'; retry.className='btn btn-glass'; retry.textContent=meta.historical?'Refresh quotes':'Retry comparison'; retry.addEventListener('click',()=>refreshComparisonPricing()); banner.appendChild(retry); }
  const savedLine = document.getElementById('savedQuotationLine');
  const savedNumber = document.getElementById('savedQuotationNumber');
  if (savedLine && savedNumber) { savedLine.style.display = !meta.loading && window.currentSavedQuotation ? 'block' : 'none'; savedNumber.textContent = window.currentSavedQuotation?.quotationNumber || '—'; }
  if (document.getElementById('planDetailsModal').classList.contains('is-open')) { const plan = currentResults.find(r => String(r.insurerId) === document.getElementById('selectPlanBtn').dataset.planId); document.getElementById('selectPlanBtn').disabled = !plan || !isMatchingQuote(plan); }
  document.getElementById('exportBtn').disabled = !!meta.loading || !currentResults.some(isPricedQuote);
}
function renderTable(sortBy) {
  clearTimeout(quoteExpiryTimer);
  const nextExpiry = Math.min(...currentResults.map(r => Date.parse(r.expiresAt)).filter(n => Number.isFinite(n) && n > Date.now()));
  if (Number.isFinite(nextExpiry)) quoteExpiryTimer = setTimeout(() => renderTable(document.getElementById('sortSelect').value), Math.min(2147483647, nextExpiry - Date.now() + 25));
  renderComparisonStatus();
  const searchInput = document.getElementById('insurerSearchInput');
  const term = (searchInput?.value || '').trim().toLowerCase();
  const compare = sortBy === 'rating' ? (a,b)=>(b.rating||0)-(a.rating||0) : sortBy === 'addons' ? (a,b)=>(b.addons?.length||0)-(a.addons?.length||0)||(a.totalPremium??Infinity)-(b.totalPremium??Infinity) : (a,b)=>(a.totalPremium??Infinity)-(b.totalPremium??Infinity);
  const rows = currentResults.filter(r=>String(r.insurerName||'').toLowerCase().includes(term)).slice().sort((a,b)=>quoteGroup(a)-quoteGroup(b)||compare(a,b));
  // Searching never changes which insurer actually has the lowest premium.
  const lowest = [0,1].map(group=>Math.min(...currentResults.filter(r=>quoteGroup(r)===group).map(r=>r.totalPremium)));
  const body = document.getElementById('compareBody'); body.innerHTML='';
  if (!rows.length) {
    const tr=document.createElement('tr');tr.className='no-results-row';
    tr.innerHTML=`<td colspan="7">${currentComparisonMeta.loading ? 'Updating quotes…' : term ? 'No insurers match this search.' : 'No quote results are available. Retry the comparison.'}</td>`;body.appendChild(tr);return;
  }
  let previousGroup=-1;
  const labels=['Matching live quotes','Matching configured estimates — require insurer confirmation','Quotes to review — IDV or coverage differs','Unavailable or expired quotes'];
  for (const r of rows) {
    const group=quoteGroup(r), priced=isPricedQuote(r), usable=priced&&!isExpiredQuote(r);
    if (group!==previousGroup) { const heading=document.createElement('tr');heading.className='quote-group';heading.innerHTML=`<th colspan="7" scope="rowgroup">${labels[group]}</th>`;body.appendChild(heading);previousGroup=group; }
    const best=group<2&&r.totalPremium===lowest[group];
    const source=r.source==='api'?'Live quote':r.status==='unavailable'?'Unavailable':'Estimate';
    const issues=[...(r.comparisonIssues||[])];
    if (isExpiredQuote(r)) issues.unshift('Quote expired. Refresh for current prices.');
    if (!priced) issues.unshift(r.error || 'A valid premium was not returned.');
    const tr=document.createElement('tr');tr.dataset.planId=r.insurerId;
    tr.className=[best?'is-best':'',group===1?'is-estimate':'',group===3?'is-unavailable':''].join(' ');
    tr.innerHTML=`<td><div class="insurer-name">${escapeHtml(r.insurerName)}</div>
      <div class="insurer-meta">${r.rating == null ? '' : '★ '+escapeHtml(r.rating)+' · '}${Number(r.garageCount||0).toLocaleString('en-IN')} garages</div>
      ${best?`<div class="best-badge">${group===0?'Lowest live premium':'Lowest estimate'}</div>`:''}
      ${usable?`<div class="insurer-actions"><button type="button" class="btn btn-glass plan-details-btn" data-plan-id="${escapeHtml(r.insurerId)}">View details</button><button type="button" class="btn btn-glass insurer-export-btn" data-plan-id="${escapeHtml(r.insurerId)}">Export</button>${getGarageUrl(r)?`<a class="btn btn-glass garage-link-btn" href="${escapeHtml(getGarageUrl(r))}" target="_blank" rel="noopener noreferrer">Garage</a>`:''}</div>`:''}</td>
      <td>${usable?rupee(r.odPremium):'—'}${usable&&r.odRatePercent!=null?`<div class="od-rate-note">${escapeHtml(formatOdRate(r))} OD rate</div>`:''}${usable&&Number(r.advisorDiscountAmount)>0?`<div class="od-discount-note">−${rupee(r.advisorDiscountAmount)} (${escapeHtml(r.advisorDiscountPercent)}% off)</div>`:''}</td>
      <td>${usable&&vehicle?.policyType!=='standalone'?rupee(r.tpPremium):'—'}</td>
      <td class="addon-list">${usable?renderAddonCells(r):'—'}</td>
      <td>${usable&&r.ncbPercent!=null?escapeHtml(r.ncbPercent)+'%':'—'}</td>
      <td>${usable&&r.claimRatio!=null?escapeHtml(r.claimRatio)+'%':'—'}</td>
      <td><div class="total-premium">${usable?rupee(r.totalPremium):'—'}</div><span class="source-tag ${r.source==='api'?'api':usable?'estimate':'unavailable'}">${isExpiredQuote(r)?'Expired':source}</span>
      ${usable?`<div class="quote-context">IDV ${rupee(r.returnedIdv??r.idv)}</div>`:''}
      ${issues.length?`<div class="quote-issues">${issues.map(escapeHtml).join(' ')}</div>`:''}</td>`;
    body.appendChild(tr);
  }
  body.querySelectorAll('.plan-details-btn').forEach(b=>b.addEventListener('click',()=>openPlanDetails(b.dataset.planId)));
  body.querySelectorAll('.insurer-export-btn').forEach(b=>b.addEventListener('click',()=>exportInsurerQuote(b.dataset.planId)));
}

function openPlanDetails(insurerId) {
  const result = currentResults.find((r) => String(r.insurerId) === String(insurerId));
  if (!result || !isPricedQuote(result) || isExpiredQuote(result)) return;
  const details = enrichPlanDetails(result, vehicle);
  const modal = document.getElementById('planDetailsModal');
  document.getElementById('planModalTitle').textContent = result.insurerName;
  document.getElementById('planModalSubtitle').textContent = `${details.planName} · ${vehicle.make} ${vehicle.model} ${vehicle.variant}`;
  const coverageItems = details.coverage.map((x) => `<li class="${x.available ? '' : 'is-unavailable'}">${escapeHtml(x.label)}</li>`).join('');
  const addonItems = details.addons.map((x) => `<li class="${x.available ? '' : 'is-unavailable'}">${escapeHtml(x.label)}</li>`).join('');
  const breakdown = details.breakdown.map((x) => `<tr${x.total ? ' class="plan-total-row"' : ''}><td>${escapeHtml(x.label)}</td><td>${x.informational ? escapeHtml(x.value) : rupee(x.value)}</td></tr>`).join('');
  const extra = [
    ['IDV', rupee(details.idv)],
    ['Total premium', rupee(details.premium)],
    ['Customer NCB', details.ncb == null ? 'Not confirmed' : `${details.ncb}%`],
    ['Insurer rating', details.rating ?? 'Not configured'],
    ['Cashless garages', Number(details.garageCount || 0) ? Number(details.garageCount).toLocaleString('en-IN') : 'Not configured'],
    ['Claim ratio', details.claimRatio != null ? `${details.claimRatio}%` : 'Not configured'],
    ['Vehicle category', details.insuranceCategory || normalizeInsuranceCategory(vehicle?.bodyType, vehicle?.make)],
    ['Fuel / power type', details.appliedFuelType || normalizeInsuranceFuel(vehicle?.fuelType)],
    ['Applied OD rate', details.odRateText || 'Not returned'],
    ['Policy type', vehicle?.policyType === 'standalone' ? 'Standalone (OD only)' : 'Comprehensive (OD + TP)'],
    ['TP expiry', vehicle?.tpExpiryDate || '—'],
  ];
  document.getElementById('planModalBody').innerHTML = `
    <div class="plan-detail-grid">
      ${extra.map(([label, value]) => `<div class="plan-detail-card"><h3>${escapeHtml(label)}</h3><strong>${escapeHtml(value)}</strong></div>`).join('')}
    </div>
    <div class="plan-detail-section"><h3>Coverage</h3><ul class="plan-detail-list">${coverageItems}</ul></div>
    <div class="plan-detail-section"><h3>Add-ons in this quote</h3><ul class="plan-detail-list">${addonItems}</ul></div>
    <div class="plan-detail-section"><h3>Premium breakdown</h3><table class="plan-breakdown"><tbody>${breakdown}</tbody></table></div>
    <div class="plan-detail-section"><h3>Advisor notes</h3><ul class="plan-detail-list">${details.notes.map((n) => `<li class="is-unavailable">${escapeHtml(n)}</li>`).join('')}</ul></div>`;
  const source = document.getElementById('planModalSource');
  source.className = `source-tag ${result.source || 'fallback'}`;
  source.textContent = result.source === 'api' ? 'Live insurer quote' : 'Estimate — requires confirmation';
  const select = document.getElementById('selectPlanBtn');
  select.disabled = !isMatchingQuote(result);
  select.textContent = result.source === 'api' ? 'Select this plan' : 'Shortlist estimate';
  document.getElementById('selectPlanBtn').dataset.planId = insurerId;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closePlanDetails() {
  const modal = document.getElementById('planDetailsModal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

['closePlanModal', 'planModalBackdrop'].forEach((id) => {
  document.getElementById(id).addEventListener('click', closePlanDetails);
});
document.getElementById('selectPlanBtn').addEventListener('click', () => {
  const result = currentResults.find((r) => String(r.insurerId) === String(document.getElementById('selectPlanBtn').dataset.planId));
  if (!result || !isMatchingQuote(result)) return;
  closePlanDetails();
  currentResults = currentResults.map((r) => ({ ...r, selected: String(r.insurerId) === String(result.insurerId) }));
  renderTable(document.getElementById('sortSelect').value);
  const title = document.getElementById('vehicleTitle');
  title.textContent = `${vehicle.make} ${vehicle.model} ${vehicle.variant} · ${result.insurerName} selected`;
});

document.getElementById('sortSelect').addEventListener('change', (e) => renderTable(e.target.value));
const insurerSearchInputEl = document.getElementById('insurerSearchInput');
if (insurerSearchInputEl) {
  insurerSearchInputEl.addEventListener('input', () => renderTable(document.getElementById('sortSelect').value));
}
// Recalculates every insurer's premium with the current add-ons / IDV / discount and
// repaints the table. The backend is the single source of truth (see fetchComparison);
// nothing is painted from a second, different pricing engine in the meantime.
async function refreshComparisonPricing() {
  if (!vehicle) return;
  const filter = document.getElementById('addonFilter');
  if (filter) filter.classList.add('is-loading');
  try {
    await loadComparison();
    renderSelectedAddonsSummary();
    renderTable(document.getElementById('sortSelect').value);
  } finally {
    if (filter) filter.classList.remove('is-loading');
  }
}

async function updateAddonSelection() {
  if (!vehicle) return;
  vehicle.selectedAddons = [...document.querySelectorAll('#addonFilter input:checked')].map(i => i.value);
  // Update the stat card straight away so the click feels instant; prices follow once recalculated.
  renderSelectedAddonsSummary();
  await refreshComparisonPricing();
}

// Event delegation keeps the controls reliable even if the comparison DOM
// is re-rendered later. Clicking the label or checkbox updates the same state.
const addonFilterEl = document.getElementById('addonFilter');
if (addonFilterEl) addonFilterEl.addEventListener('change', (event) => {
  if (event.target && event.target.matches('input[type=checkbox]')) updateAddonSelection();
});
document.getElementById('clearAddonFilter').addEventListener('click', async () => {
  document.querySelectorAll('#addonFilter input').forEach(input => { input.checked = false; });
  await updateAddonSelection();
});

document.getElementById('idvSlider').addEventListener('input', (e) => {
  const pct = Number(e.target.value) / 100;
  currentIDV = Math.round(bounds.min + pct * (bounds.max - bounds.min));
  renderIDV();

  // Debounce: wait until the advisor stops dragging before
  // re-fetching, rather than hitting the Edge Function on every
  // pixel of slider movement.
  clearTimeout(idvDebounceTimer);
  idvDebounceTimer = setTimeout(async () => {
    await loadComparison();
    renderTable(document.getElementById('sortSelect').value);
  }, 350);
});

document.getElementById('exportBtn').addEventListener('click', () => {
  // TODO: call the `generate-pdf` Edge Function (ARCHITECTURE.md Section 6)
  // with the current vehicle + IDV + comparison snapshot and the advisor's
  // letterhead details, then trigger the download.
  window.print();
});


// Comparison controls requested by the advisor. These are presentation/UI
// controls and do not alter the existing insurer pricing rules.
const editVehicleBtn = document.getElementById('editVehicleBtn');
if (editVehicleBtn) editVehicleBtn.addEventListener('click', openVehicleEdit);
['closeVehicleEdit','cancelVehicleEdit','vehicleEditBackdrop'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', closeVehicleEdit);
});
const vehicleEditForm = document.getElementById('vehicleEditForm');
if (vehicleEditForm) vehicleEditForm.addEventListener('submit', saveVehicleEdit);

async function applyIdvChoice(value) {
  if (!bounds) return;
  currentIDV = Math.max(bounds.min, Math.min(bounds.max, Math.round(Number(value))));
  const pct = ((currentIDV - bounds.min) / Math.max(1, bounds.max - bounds.min)) * 100;
  document.getElementById('idvSlider').value = Math.round(pct);
  renderIDV();
  await loadComparison();
  renderTable(document.getElementById('sortSelect').value);
}
const idvMinBtn = document.getElementById('idvMinBtn');
const idvMaxBtn = document.getElementById('idvMaxBtn');
const applyOwnIdvBtn = document.getElementById('applyOwnIdvBtn');
if (idvMinBtn) idvMinBtn.addEventListener('click', () => applyIdvChoice(bounds?.min));
if (idvMaxBtn) idvMaxBtn.addEventListener('click', () => applyIdvChoice(bounds?.max));
if (applyOwnIdvBtn) applyOwnIdvBtn.addEventListener('click', () => {
  const input = document.getElementById('ownIdvInput');
  const value = Number(input?.value);
  if (!Number.isFinite(value) || !bounds || value < bounds.min || value > bounds.max) {
    alert(bounds ? `Enter an IDV between ${rupee(bounds.min)} and ${rupee(bounds.max)}.` : 'IDV is not ready yet.');
    return;
  }
  applyIdvChoice(value);
});

const payAsYouDriveToggle = document.getElementById('payAsYouDriveToggle');
if (payAsYouDriveToggle) payAsYouDriveToggle.addEventListener('change', () => {
  payAsYouDriveToggle.closest('.toggle-row')?.classList.toggle('is-selected', payAsYouDriveToggle.checked);
});

// Highest OD discount the advisor may give. 100 = no cap beyond "can't go negative".
// Keep in sync with MAX_ADVISOR_DISCOUNT_PERCENT on the server (server/functions/lib/config.js).
let MAX_ADVISOR_DISCOUNT_PERCENT = 100;
let advisorDiscount = 0;
let advisorDiscountLabel = '';
const discountStatus = document.getElementById('discountStatus');
const maxDiscountBtn = document.getElementById('maxDiscountBtn');
const applyOwnDiscountBtn = document.getElementById('applyOwnDiscountBtn');
const ownDiscountInput = document.getElementById('ownDiscountInput');

function paintDiscountControls() {
  if (discountStatus) {
    discountStatus.textContent = advisorDiscount
      ? `${advisorDiscountLabel}: ${advisorDiscount}% off Own Damage premium.`
      : 'No advisor discount selected.';
  }
  if (maxDiscountBtn) maxDiscountBtn.classList.toggle('is-selected', advisorDiscount > 0 && advisorDiscount === MAX_ADVISOR_DISCOUNT_PERCENT);
  if (ownDiscountInput && !advisorDiscount) ownDiscountInput.value = '';
}

// The discount reduces the Own Damage premium of every insurer (NCB is applied first,
// then this discount; TP, add-ons and GST logic are unchanged).
function setDiscount(value, label, { recalc = true } = {}) {
  advisorDiscount = Math.max(0, Math.min(MAX_ADVISOR_DISCOUNT_PERCENT, Number(value) || 0));
  advisorDiscountLabel = label || 'Advisor discount';
  paintDiscountControls();
  renderSelectedAddonsSummary();
  if (recalc) refreshComparisonPricing();
}
function resetAdvisorDiscount() {
  advisorDiscount = 0;
  advisorDiscountLabel = '';
  paintDiscountControls();
}

if (maxDiscountBtn) maxDiscountBtn.addEventListener('click', () => setDiscount(MAX_ADVISOR_DISCOUNT_PERCENT, 'Maximum discount'));
if (applyOwnDiscountBtn) applyOwnDiscountBtn.addEventListener('click', () => {
  const raw = String(ownDiscountInput?.value ?? '').trim();
  const value = Number(raw);
  if (raw === '') { setDiscount(0); return; } // empty box = remove the discount
  if (!Number.isFinite(value) || value < 0 || value > MAX_ADVISOR_DISCOUNT_PERCENT) {
    alert(`Enter a discount between 0% and ${MAX_ADVISOR_DISCOUNT_PERCENT}%.`);
    return;
  }
  setDiscount(value, 'My own discount');
});
