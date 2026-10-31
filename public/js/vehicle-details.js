// ===========================================================
// Vehicle Details screen — manual entry (Name, Manufacturer,
// Car, Fuel, Variant, policy dates), inserted between the
// registration lookup (dashboard.js) and the policy details
// screen (js/policy-details.js) since reg-number lookup can't
// reliably auto-fill make/model/variant yet. Policy Details
// hands off to the comparison screen (comparison.js) in turn.
//
// Manufacturer -> Car -> Fuel Type -> Variant cascades from
// CAR_DATA (js/car-data.js, auto-generated from manufacturer
// spreadsheets: Audi/BMW/Hyundai/Kia/Mahindra/Maruti Suzuki/
// MG/Skoda/Tata Motors/Toyota). Manufacturer is asked first,
// same pattern as the Fuel Type -> Variant cascade further down
// the form, rather than a single free-text "Brand Model" field.
// ===========================================================

// ===========================================================
// Exact variant pricing
// Uses the selected variant's real ex-showroom price from
// CAR_DATA[brand][model].variantPrices[fuelType][variant].
// There is intentionally NO fuel/trim multiplier or alphabetical
// price estimation anymore. A missing price uses an advisor-entered
// manual IDV; no synthetic ex-showroom price is invented.
// ===========================================================
function getVariantPricing(brand, model, variant, fuelType) {
  return CAR_DATA[brand]?.[model]?.variantPrices?.[fuelType]?.[variant] || null;
}

function getManufacturerPrice(brand, model, variant, fuelType) {
  const pricing = getVariantPricing(brand, model, variant, fuelType);
  return pricing?.exShowroomPrice ?? null;
}

function buildVehicleFromSelection(regNumber, details) {
  const registered = new Date(details.registeredDate);
  const ageInYears = (Date.now() - registered.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const year = registered.getFullYear();
  const pricing = getVariantPricing(details.brand, details.model, details.variant, details.fuelType);
  if (!hasVariantPrice(pricing) && !(Number.isFinite(details.manualIDV) && details.manualIDV > 0)) {
    throw new Error('Enter a manual IDV first to continue.');
  }
  const bodyType = CAR_DATA[details.brand]?.[details.model]?.bodyType || '';
  return {
    regNumber,
    name: details.name || '',
    brand: details.brand,
    registeredDate: details.registeredDate,
    policyExpiry: details.policyExpiry,
    manualIdvVehicleKey: details.manualIdvVehicleKey,
    registrationType: currentRegistrationType || 'normal',
    make: details.brand,
    model: details.model,
    variant: details.variant,
    bodyType,
    insuranceCategory: normalizeInsuranceCategory(bodyType, details.brand),
    fuelType: details.fuelType,
    year,
    ageInYears,
    manufacturerPrice: hasVariantPrice(pricing) ? pricing.exShowroomPrice : null,
    exShowroomPrice: hasVariantPrice(pricing) ? pricing.exShowroomPrice : null,
    manualIDV: hasVariantPrice(pricing) ? null : details.manualIDV,
    idvSource: hasVariantPrice(pricing) ? 'calculated' : 'manual',
    engineCC: pricing?.engineCC ?? null,
    // Carried through to the quote submission payload so it lands in the
    // immutable quote_submissions audit row (see server/functions/quote.js) —
    // 'verified' | 'mismatch' | 'not_found' | 'unavailable' | 'not_configured'.
    verificationStatus: details.verificationStatus || 'not_configured',
  };
}

// ===========================================================
// Searchable dropdown (combobox) helper
// Wraps a text input + hidden value input + result list (see
// .autocomplete-wrap / .autocomplete-list in css/styles.css)
// into a type-to-filter dropdown. Used below for Manufacturer,
// Car name, and Variant — Fuel type stays a plain <select> since
// it only ever has a handful of options.
// ===========================================================
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return escapeHtml(text);
  return escapeHtml(text.slice(0, idx)) + '<mark>' + escapeHtml(text.slice(idx, idx + query.length)) + '</mark>' + escapeHtml(text.slice(idx + query.length));
}

function createSearchableDropdown({ input, hidden, list, onSelect, onClear }) {
  // If the page is missing any of the three elements (e.g. a simplified modal),
  // return an inert control instead of throwing. A throw here used to abort the
  // whole calling script, silently disabling every listener defined after it.
  if (!input || !hidden || !list) {
    console.warn('createSearchableDropdown: missing element(s) for', input?.id || '(unknown input)');
    return { setOptions() {}, disable() {}, getValue() { return ''; }, setValue() {} };
  }
  let options = [];
  let filtered = [];
  let activeIndex = -1;

  function renderFiltered(query) {
    const q = query.trim().toLowerCase();
    filtered = q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
    activeIndex = -1;
    list.innerHTML = filtered.length
      ? filtered.map((opt, i) => `<div class="autocomplete-item" data-index="${i}">${highlightMatch(opt, q)}</div>`).join('')
      : '<div class="autocomplete-empty">No matches found</div>';
  }

  function open() {
    if (input.disabled) return;
    renderFiltered(input.value === hidden.value ? '' : input.value);
    list.classList.add('is-open');
  }

  function close() {
    list.classList.remove('is-open');
    activeIndex = -1;
  }

  function highlightActive() {
    Array.from(list.children).forEach((el, i) => el.classList.toggle('is-active', i === activeIndex));
    if (activeIndex >= 0) list.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function selectOption(value) {
    input.value = value;
    hidden.value = value;
    close();
    onSelect(value);
  }

  input.addEventListener('focus', () => { input.select(); open(); });
  input.addEventListener('input', () => {
    const hadValue = !!hidden.value;
    hidden.value = '';
    renderFiltered(input.value);
    list.classList.add('is-open');
    if (hadValue && onClear) onClear();
  });
  input.addEventListener('keydown', (e) => {
    if (!list.classList.contains('is-open')) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') { open(); }
      if (e.key !== 'Tab') return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, filtered.length - 1); highlightActive(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); highlightActive(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (activeIndex >= 0 && filtered[activeIndex] !== undefined) selectOption(filtered[activeIndex]); }
    else if (e.key === 'Escape') { close(); }
  });
  input.addEventListener('blur', close);
  list.addEventListener('mousedown', (e) => {
    const item = e.target.closest('.autocomplete-item');
    if (!item) return;
    e.preventDefault();
    const idx = Number(item.dataset.index);
    if (filtered[idx] !== undefined) selectOption(filtered[idx]);
  });

  return {
    setOptions(newOptions) {
      options = newOptions;
      input.disabled = false;
      input.value = '';
      hidden.value = '';
      input.placeholder = 'Search...';
    },
    disable(placeholder) {
      options = [];
      filtered = [];
      input.value = '';
      hidden.value = '';
      input.placeholder = placeholder;
      input.disabled = true;
      close();
    },
    getValue() { return hidden.value; },
    setValue(value) { if (options.includes(value)) { selectOption(value); } },
  };
}

// ===========================================================
// Screen setup / cascading dropdowns
// ===========================================================
function updateVehicleSummaryUI() {
  const nameEl = document.getElementById('vdSummaryName');
  const regTypeEl = document.getElementById('vdSummaryRegType');
  const regNumberEl = document.getElementById('vdSummaryRegNumber');
  const name = document.getElementById('vdName')?.value?.trim() || '—';
  const regType = currentRegistrationType === 'bh' ? 'BH Registration' : currentRegistrationType === 'normal' ? 'Normal Registration' : '—';
  if (nameEl) nameEl.textContent = name;
  if (regTypeEl) regTypeEl.textContent = regType;
  if (regNumberEl) regNumberEl.textContent = currentRegNumber || '—';
}

function goToVehicleDetails() {
  document.getElementById('vdRegSub').textContent = `Registration ${currentRegNumber} — fill in the vehicle owner, vehicle and policy details to continue.`;
  vehicleDetailsForm.reset();
  updateVehicleSummaryUI();
  populateManufacturers();
  resetCarNameFuelAndVariant();
  [vdManufacturerField, vdCarNameField, vdFuelTypeField, vdVariantField, vdRegisteredDateField, vdPolicyExpiryField].forEach((f) => f.classList.remove('has-error'));
  vdError.classList.remove('is-visible');
  showScreen('screen-vehicle-details');
}

document.getElementById('vdBackLink').addEventListener('click', () => {
  // Vehicle Details -> Registration (immediately previous step).
  showScreen('screen-dashboard');
});

const vehicleDetailsForm = document.getElementById('vehicleDetailsForm');
const vdSaveBtn = document.getElementById('vdSaveBtn');
const vdError = document.getElementById('vdError');
const vdErrorText = document.getElementById('vdErrorText');
const vdNameField = document.getElementById('vdNameField');
const vdManufacturerField = document.getElementById('vdManufacturerField');
const vdCarNameField = document.getElementById('vdCarNameField');
const vdFuelTypeField = document.getElementById('vdFuelTypeField');
const vdVariantField = document.getElementById('vdVariantField');
const vdRegisteredDateField = document.getElementById('vdRegisteredDateField');
const vdPolicyExpiryField = document.getElementById('vdPolicyExpiryField');
const vdFuelType = document.getElementById('vdFuelType');
const vehicleDetailsPanel = document.getElementById('vehicleDetailsPanel');
const vdNameInput = document.getElementById('vdName');
vdNameInput?.addEventListener('input', () => {
  vdNameField?.classList.remove('has-error');
  updateVehicleSummaryUI();
});

// UI-only fuel theme. Fuel colors are applied only on the quote/comparison screen.
// Dashboard, Vehicle Details and Policy Details always use the default theme.
function applyFuelTheme(fuelType = '') {
  if (typeof clearFuelTheme === 'function') clearFuelTheme();
}

const vdManufacturerCombo = createSearchableDropdown({
  input: document.getElementById('vdManufacturer'),
  hidden: document.getElementById('vdManufacturerValue'),
  list: document.getElementById('vdManufacturerList'),
  onSelect: (brand) => populateCarNames(brand),
  onClear: () => resetCarNameFuelAndVariant(),
});

const vdCarNameCombo = createSearchableDropdown({
  input: document.getElementById('vdCarName'),
  hidden: document.getElementById('vdCarNameValue'),
  list: document.getElementById('vdCarNameList'),
  onSelect: (model) => populateFuelTypes(vdManufacturerCombo.getValue(), model),
  onClear: () => resetFuelAndVariant(),
});

const vdVariantCombo = createSearchableDropdown({
  input: document.getElementById('vdVariant'),
  hidden: document.getElementById('vdVariantValue'),
  list: document.getElementById('vdVariantList'),
  onSelect: () => {},
});

function populateManufacturers() {
  vdManufacturerCombo.setOptions(Object.keys(CAR_DATA).sort());
}

function resetFuelAndVariant() {
  vdFuelType.innerHTML = '<option value="">Select a car first</option>';
  vdFuelType.disabled = true;
  vdVariantCombo.disable('Select a fuel type first');
}

function resetCarNameFuelAndVariant() {
  vdCarNameCombo.disable('Select a manufacturer first');
  resetFuelAndVariant();
}

function populateCarNames(brand) {
  const models = Object.keys(CAR_DATA[brand]).sort();
  vdCarNameCombo.setOptions(models);
  resetFuelAndVariant();
}

function populateFuelTypes(brand, model) {
  const fuels = Object.keys(CAR_DATA[brand][model].fuelTypes).sort();
  vdFuelType.innerHTML = '<option value="">Select a fuel type</option>' + fuels.map((f) => `<option value="${f}">${f}</option>`).join('');
  vdFuelType.disabled = false;
  vdVariantCombo.disable('Select a fuel type first');
}

function populateVariants(brand, model, fuelType) {
  const modelData = CAR_DATA[brand]?.[model];
  if (!modelData || !fuelType) {
    vdVariantCombo.disable('Select a fuel type first');
    return;
  }

  // Use the union of the model's declared fuel variants and any variant-level
  // pricing records. This guarantees that a variant is never hidden merely
  // because one of the two compatible data structures is incomplete.
  const declared = Array.isArray(modelData.fuelTypes?.[fuelType])
    ? modelData.fuelTypes[fuelType]
    : [];
  const priced = Object.keys(modelData.variantPrices?.[fuelType] || {});
  const variants = [...new Set([...declared, ...priced])]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  vdVariantCombo.setOptions(variants);
}

// Fuel Type -> Variant (Fuel type stays a plain <select>)
vdFuelType.addEventListener('change', () => {
  // Visual theme changes immediately when fuel type is selected.
  applyFuelTheme(vdFuelType.value);

  const brand = vdManufacturerCombo.getValue();
  const model = vdCarNameCombo.getValue();
  if (!brand || !model || !vdFuelType.value) {
    vdVariantCombo.disable('Select a fuel type first');
    return;
  }
  populateVariants(brand, model, vdFuelType.value);
});

function setVdLoading(isLoading) {
  vdSaveBtn.disabled = isLoading;
  vdSaveBtn.classList.toggle('is-loading', isLoading);
}

vehicleDetailsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  [vdManufacturerField, vdCarNameField, vdFuelTypeField, vdVariantField, vdRegisteredDateField, vdPolicyExpiryField].forEach((f) => f.classList.remove('has-error'));
  vdError.classList.remove('is-visible');

  const name = document.getElementById('vdName').value.trim();
  const brand = vdManufacturerCombo.getValue();
  const model = vdCarNameCombo.getValue();
  const fuelType = vdFuelType.value;
  const variant = vdVariantCombo.getValue();
  const registeredDate = document.getElementById('vdRegisteredDate').value;
  const policyExpiry = document.getElementById('vdPolicyExpiry').value;
  const today = new Date().toISOString().slice(0, 10);

  let hasError = false;
  if (!name) { vdNameField?.classList.add('has-error'); hasError = true; }
  if (!brand) { vdManufacturerField.classList.add('has-error'); hasError = true; }
  if (!model) { vdCarNameField.classList.add('has-error'); hasError = true; }
  if (!fuelType) { vdFuelTypeField.classList.add('has-error'); hasError = true; }
  if (!variant) { vdVariantField.classList.add('has-error'); hasError = true; }
  if (!registeredDate || registeredDate > today) { vdRegisteredDateField.classList.add('has-error'); hasError = true; }
  if (!policyExpiry) { vdPolicyExpiryField.classList.add('has-error'); hasError = true; }
  if (hasError) return;

  setVdLoading(true);
  try {
    const nextDetails = { name, brand, model, fuelType, variant, registeredDate, policyExpiry };
    if (!await ensureVehicleIDV(nextDetails)) return;
    // Re-check the registration number against the RTO/VAHAN-style verification
    // adapter now that a make/model has actually been entered (the very first
    // lookup, on the registration screen, ran before any of this existed to
    // check against). This is a best-effort signal, not a hard gate: if the
    // provider isn't configured yet, or the call fails, we proceed exactly as
    // before — the advisor's accuracy declaration on the next screen is what
    // covers that case. We DO hard-block on an explicit 'mismatch', since that
    // means a real provider actively disagrees with what was typed in.
    let verification = { status: 'not_configured' };
    try {
      const recheck = await lookupRegistration(currentRegNumber, { make: brand, model, variant, fuelType });
      verification = recheck.verification || verification;
    } catch { /* verification is best-effort; a failed check should not block manual entry */ }

    if (verification.status === 'mismatch') {
      vdManufacturerField.classList.add('has-error');
      vdErrorText.textContent = verification.reason || `The registration number does not match ${brand}. Please double-check the vehicle details.`;
      vdError.classList.add('is-visible');
      setVdLoading(false);
      return;
    }

    currentVehicleDetails = { ...nextDetails, name, brand, model, carName: `${brand} ${model}`, fuelType, variant, registeredDate, policyExpiry, registrationType: currentRegistrationType || 'normal', verificationStatus: verification.status };
    await new Promise((resolve) => setTimeout(resolve, 300));
    goToPolicyDetails();
  } catch (err) {
    vdErrorText.textContent = err.message || 'Could not save these details. Please try again.';
    vdError.classList.add('is-visible');
  } finally {
    setVdLoading(false);
  }
});

// ===========================================================
