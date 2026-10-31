// enteredDetails (optional) lets the caller ask the server to check whatever
// make/model the advisor has typed so far against the RTO/VAHAN-style
// provider adapter (server/functions/lib/vehicle-verify.js). On the first
// call (registration screen) there's nothing entered yet, so this is
// omitted; vehicle-details.js calls this again once brand/model are picked,
// specifically to catch a mismatch before the advisor moves on.
async function lookupRegistration(regNumber, enteredDetails) {
  const normalized = regNumber.replace(/\s+/g,'').toUpperCase();
  const data = await apiFetch('/api/vehicle/lookup', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({registrationNumber:normalized, enteredDetails: enteredDetails || undefined}) });
  window.currentVerification = data.verification || { status: 'not_configured' };
  return { source:data.source || 'saved', data:data.vehicle, verification:window.currentVerification };
}

function applyLookupToVehicleForm(result) {
  if (!result?.data) return false;
  const v=result.data;
  const brand=v.make || v.brand; const model=v.model; const fuel=v.fuel_type || v.fuelType; const variant=v.variant;
  if (brand && CAR_DATA[brand]) { vdManufacturerCombo.setOptions(Object.keys(CAR_DATA).sort()); vdManufacturerCombo.setValue?.(brand); populateCarNames(brand); }
  if (brand && model && CAR_DATA[brand]?.[model]) { vdCarNameCombo.setOptions(Object.keys(CAR_DATA[brand]).sort()); vdCarNameCombo.setValue?.(model); populateFuelTypes(brand,model); }
  if (fuel && CAR_DATA[brand]?.[model]?.fuelTypes?.[fuel]) { vdFuelType.value=fuel; populateVariants(brand,model,fuel); }
  if (variant) { document.getElementById('vdVariant').value=variant; document.getElementById('vdVariantValue').value=variant; }
  if (v.registered_date) document.getElementById('vdRegisteredDate').value=v.registered_date;
  return true;
}
