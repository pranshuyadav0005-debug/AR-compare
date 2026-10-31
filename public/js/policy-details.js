// Policy/customer requirements: policy type, claim/NCB and TP expiry.
const policyDetailsForm = document.getElementById('policyDetailsForm');
const pdSaveBtn = document.getElementById('pdSaveBtn');
const pdError = document.getElementById('pdError');
const pdErrorText = document.getElementById('pdErrorText');
const pdNcbLapsedBanner = document.getElementById('pdNcbLapsedBanner');
const pdPolicyTypeField = document.getElementById('pdPolicyTypeField');
const pdClaimField = document.getElementById('pdClaimField');
const pdNcbField = document.getElementById('pdNcbField');
const pdTpExpiryField = document.getElementById('pdTpExpiryField');
const pdPolicyType = document.getElementById('pdPolicyType');
const pdTpExpiry = document.getElementById('pdTpExpiry');
const pdClaim = document.getElementById('pdClaim');
const pdNcb = document.getElementById('pdNcb');
const pdPrevCoverField = document.getElementById('pdPrevCoverField');
const pdPrevCoverInputs = Array.from(document.querySelectorAll('#pdPrevCoverOptions input[type=checkbox]'));
const pdAccuracyField = document.getElementById('pdAccuracyField');
const pdAccuracyCheckbox = document.getElementById('pdAccuracyCheckbox');
pdAccuracyCheckbox?.addEventListener('change', () => pdAccuracyField?.classList.remove('has-error'));

// "None of these" is mutually exclusive with the actual cover options —
// checking one clears the other so the selection stays meaningful.
pdPrevCoverInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.value === 'none') {
      if (input.checked) pdPrevCoverInputs.forEach((i) => { if (i !== input) i.checked = false; });
    } else if (input.checked) {
      const noneBox = pdPrevCoverInputs.find((i) => i.value === 'none');
      if (noneBox) noneBox.checked = false;
    }
    pdPrevCoverField.classList.remove('has-error');
  });
});

// ===========================================================
// Break-in-insurance rule: if the previous policy expired 90 days ago
// or more, the NCB protection lapses entirely regardless of the
// customer's claim history, per standard motor-insurance practice.
// ===========================================================
const NCB_LAPSE_DAYS = 90;
function getPolicyBreakDays(policyExpiry) {
  if (!policyExpiry) return null;
  const expiry = new Date(policyExpiry);
  if (Number.isNaN(expiry.getTime())) return null;
  const today = new Date();
  const msPerDay = 86400000;
  const expiryUTC = Date.UTC(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((todayUTC - expiryUTC) / msPerDay);
}
function isNcbLapsed() {
  const days = getPolicyBreakDays(currentVehicleDetails?.policyExpiry);
  return typeof days === 'number' && days >= NCB_LAPSE_DAYS;
}
function applyNcbLapseUI() {
  const lapsed = isNcbLapsed();
  if (pdNcbLapsedBanner) pdNcbLapsedBanner.classList.toggle('is-visible', lapsed);
  if (lapsed) {
    pdClaim.value = 'no';
    pdClaim.disabled = true;
    pdClaimField.classList.add('is-disabled');
    pdNcb.value = '0';
    setNcbAvailability(false);
  } else {
    pdClaim.disabled = false;
    pdClaimField.classList.remove('is-disabled');
  }
  return lapsed;
}

const pdPolicyTypeChoices = document.getElementById('pdPolicyTypeChoices');
if (pdPolicyTypeChoices) {
  pdPolicyTypeChoices.querySelectorAll('.choice-card').forEach(btn => {
    btn.addEventListener('click', () => {
      pdPolicyType.value = btn.dataset.value || '';
      pdPolicyTypeChoices.querySelectorAll('.choice-card').forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-pressed', String(active));
      });
      pdPolicyTypeField.classList.remove('has-error');
      updatePolicyTypeUI();
    });
  });
}

function updatePolicyTypeUI() {
  const standalone = pdPolicyType.value === 'standalone';
  pdTpExpiryField.style.display = standalone ? '' : 'none';
  if (!standalone) pdTpExpiry.value = '';
}
pdPolicyType.addEventListener('change', updatePolicyTypeUI);

function goToPolicyDetails() {
  policyDetailsForm.reset();
  if (pdPolicyTypeChoices) pdPolicyTypeChoices.querySelectorAll('.choice-card').forEach(b => { b.classList.remove('is-selected'); b.setAttribute('aria-pressed','false'); });
  updatePolicyTypeUI();
  setNcbAvailability(true);
  pdClaim.disabled = false;
  pdClaimField.classList.remove('is-disabled');
  if (pdNcbLapsedBanner) pdNcbLapsedBanner.classList.remove('is-visible');
  [pdPolicyTypeField,pdClaimField,pdPrevCoverField,pdNcbField,pdTpExpiryField,pdAccuracyField].forEach(f => f?.classList.remove('has-error'));
  pdPrevCoverInputs.forEach((i) => { i.checked = false; });
  if (pdAccuracyCheckbox) pdAccuracyCheckbox.checked = false;
  pdError.classList.remove('is-visible');
  applyNcbLapseUI();
  showScreen('screen-policy-details');
}
document.getElementById('pdBackLink').addEventListener('click', () => {
  // Go to the immediately previous screen without resetting entered vehicle details.
  showScreen('screen-vehicle-details');
});
function setNcbAvailability(selectable) {
  pdNcb.disabled = !selectable;
  pdNcb.setAttribute('aria-disabled', String(!selectable));
  pdNcb.tabIndex = selectable ? 0 : -1;
  pdNcb.style.pointerEvents = selectable ? '' : 'none';
  pdNcbField.classList.toggle('is-disabled', !selectable);
}

pdClaim.addEventListener('change', () => {
  if (isNcbLapsed()) { applyNcbLapseUI(); return; }
  const hadClaim = pdClaim.value === 'yes';
  if (hadClaim) {
    pdNcb.value = '0';
    setNcbAvailability(false);
  } else {
    setNcbAvailability(true);
    }
});
function setPdLoading(v){ pdSaveBtn.disabled=v; pdSaveBtn.classList.toggle('is-loading',v); }
policyDetailsForm.addEventListener('submit', async e => {
  e.preventDefault();
  [pdPolicyTypeField,pdClaimField,pdPrevCoverField,pdNcbField,pdTpExpiryField,pdAccuracyField].forEach(f=>f?.classList.remove('has-error'));
  pdError.classList.remove('is-visible');
  const lapsed = isNcbLapsed();
  const policyType=pdPolicyType.value, hadClaim=lapsed ? 'no' : pdClaim.value, ncbPercent=lapsed ? 0 : (hadClaim==='yes' ? 0 : Number(pdNcb.value));
  const prevPolicyCover = pdPrevCoverInputs.filter(i => i.checked).map(i => i.value);
  const declaredAccurate = !!pdAccuracyCheckbox?.checked;
  let bad=false;
  if(!policyType){pdPolicyTypeField.classList.add('has-error');bad=true;}
  if(!lapsed && !hadClaim){pdClaimField.classList.add('has-error');bad=true;}
  if(!prevPolicyCover.length){pdPrevCoverField.classList.add('has-error');bad=true;}
  if(policyType==='standalone' && !pdTpExpiry.value){pdTpExpiryField.classList.add('has-error');bad=true;}
  // This attestation is what server/functions/quote.js requires (declaredAccurate)
  // before it will submit for quotes, and it's what gets written into the
  // immutable quote_submissions audit row alongside the vehicle snapshot.
  if(!declaredAccurate){pdAccuracyField?.classList.add('has-error');bad=true;}
  if(bad)return;
  setPdLoading(true);
  try {
    currentPolicyDetails={ policyType, hadClaim: lapsed ? false : hadClaim==='yes', ncbPercent, ncbLapsed: lapsed, tpExpiryDate:policyType==='standalone'?pdTpExpiry.value:null, prevPolicyCover, selectedAddons: [], declaredAccurate };
    await new Promise(r=>setTimeout(r,200)); await goToComparison();
  } catch(err){pdErrorText.textContent=err.message||'Could not save these details.';pdError.classList.add('is-visible');}
  finally{setPdLoading(false);}
});
