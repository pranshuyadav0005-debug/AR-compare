// ===========================================================
// IDV (Insured Declared Value) calculation — PRD.md Section 6
// ===========================================================
function getDepreciationRate(ageInYears) {
  if (ageInYears <= 0.5) return 0.05;
  if (ageInYears <= 1) return 0.15;
  if (ageInYears <= 2) return 0.20;
  if (ageInYears <= 3) return 0.30;
  if (ageInYears <= 4) return 0.40;
  if (ageInYears <= 5) return 0.50;
  return 0.50;
}
function calculateIDV(manufacturerPrice, ageInYears) {
  if (!Number.isFinite(manufacturerPrice) || manufacturerPrice <= 0) {
    throw new Error('A valid ex-showroom variant price is required to calculate IDV.');
  }
  if (!Number.isFinite(ageInYears) || ageInYears < 0) {
    throw new Error('A valid vehicle age is required to calculate IDV.');
  }
  return Math.round(manufacturerPrice * (1 - getDepreciationRate(ageInYears)));
}
function getIDVBounds(autoIDV) {
  return { min: Math.round(autoIDV * 0.85), max: Math.round(autoIDV * 1.15) };
}

// ===========================================================

// Missing catalog prices must not prevent an advisor from comparing quotes.
// Manual IDV is a declared base value, never a replacement ex-showroom price.
function hasVariantPrice(pricing) {
  return Number.isFinite(pricing?.exShowroomPrice) && pricing.exShowroomPrice > 0;
}
function manualIdvVehicleKey(details, regNumber) {
  return JSON.stringify([regNumber, details.brand, details.model, details.fuelType, details.variant, details.registeredDate]);
}
function getVehicleBaseIDV(vehicle) {
  if (Number.isFinite(vehicle.manualIDV) && vehicle.manualIDV > 0) return vehicle.manualIDV;
  return calculateIDV(vehicle.manufacturerPrice, vehicle.ageInYears);
}
async function ensureVehicleIDV(details, regNumber = currentRegNumber) {
  const pricing = getVariantPricing(details.brand, details.model, details.variant, details.fuelType);
  if (hasVariantPrice(pricing)) {
    delete details.manualIDV;
    delete details.manualIdvVehicleKey;
    return true;
  }
  const key = manualIdvVehicleKey(details, regNumber);
  const previous = currentVehicleDetails;
  if (previous?.manualIdvVehicleKey === key && Number.isFinite(previous.manualIDV) && previous.manualIDV > 0) {
    details.manualIDV = previous.manualIDV;
    details.manualIdvVehicleKey = key;
    return true;
  }
  const value = await requestManualIDV();
  if (value === null) return false;
  details.manualIDV = value;
  details.manualIdvVehicleKey = key;
  return true;
}
function requestManualIDV() {
  return new Promise(resolve => {
    const previousFocus = document.activeElement;
    const dialog = document.createElement('dialog');
    dialog.className = 'manual-idv-dialog';
    dialog.setAttribute('aria-labelledby', 'manualIdvTitle');
    dialog.setAttribute('aria-describedby', 'manualIdvDescription');
    dialog.innerHTML = `<form novalidate>
      <div class="eyebrow">IDV required</div><h2 id="manualIdvTitle">Enter a manual IDV first</h2>
      <p id="manualIdvDescription">An IDV cannot be calculated for this vehicle because its price is unavailable. Enter the vehicle's IDV to continue. A ±15% adjustment range will be applied to this value.</p>
      <label for="manualIdvInput">Manual IDV (₹)</label>
      <input id="manualIdvInput" name="manualIDV" type="number" inputmode="numeric" min="1" max="86956521" step="1" placeholder="e.g. 500000" aria-describedby="manualIdvRange manualIdvError" autofocus>
      <p id="manualIdvRange" aria-live="polite">Enter a value to see the ±15% range.</p>
      <p id="manualIdvError" role="alert"></p>
      <div class="manual-idv-actions"><button type="button" class="btn btn-glass" id="manualIdvCancel">Back</button><button type="submit" class="btn btn-primary">Apply IDV &amp; continue</button></div>
    </form>`;
    document.body.appendChild(dialog);
    const input = dialog.querySelector('input');
    const error = dialog.querySelector('#manualIdvError');
    const valid = () => Number.isInteger(Number(input.value)) && Number(input.value) > 0 && Number(input.value) <= 86956521;
    const finish = value => { dialog.close(); dialog.remove(); previousFocus?.focus(); resolve(value); };
    input.addEventListener('input', () => {
      error.textContent = '';
      input.removeAttribute('aria-invalid');
      const range = valid() ? getIDVBounds(Number(input.value)) : null;
      const money = n => '₹' + n.toLocaleString('en-IN');
      dialog.querySelector('#manualIdvRange').textContent = range ? `Adjustment range: ${money(range.min)} – ${money(range.max)} (±15%)` : 'Enter a value to see the ±15% range.';
    });
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      if (!valid()) {
        error.textContent = 'Enter a whole-rupee IDV between ₹1 and ₹8,69,56,521.';
        input.setAttribute('aria-invalid', 'true'); input.focus(); return;
      }
      finish(Number(input.value));
    });
    dialog.querySelector('#manualIdvCancel').addEventListener('click', () => finish(null));
    dialog.addEventListener('cancel', event => { event.preventDefault(); finish(null); });
    dialog.showModal();
  });
}
