// ===========================================================
// In-page router: screen switching, session state, sign out,
// password show/hide toggle (shared across auth screens)
// ===========================================================
let session = null;      // { email, role, name }
let currentRegNumber = null;
let currentRegistrationType = null;
let currentVehicleDetails = null; // { name, brand, model, carName, fuelType, variant, registeredDate, policyExpiry }
let currentPolicyDetails = null;  // { previousInsurer, hadClaim, ncbPercent } — set on screen-policy-details
let currentCustomerId = null;
let adminComparisonMode = false;

// ===========================================================
// Fuel theme — quote/comparison flow only (UI only)
// Dashboard and non-quote screens always use the default light-blue theme.
// ===========================================================
function normalizeFuelTheme(fuelType = '') {
  const normalized = String(fuelType).trim().toLowerCase();
  if (normalized === 'diesel') return 'diesel';
  if (normalized === 'petrol') return 'petrol';
  if (normalized === 'cng') return 'cng';
  if (normalized === 'ev' || normalized === 'electric' || normalized === 'electric vehicle') return 'ev';
  if (normalized === 'hybrid') return 'hybrid';
  return 'default';
}

function setAdvisorFuelTheme(fuelType = '') {
  const theme = normalizeFuelTheme(fuelType);
  document.body.dataset.fuelTheme = theme;
  document.documentElement.dataset.fuelTheme = theme;
  return theme;
}

function clearFuelTheme() {
  setAdvisorFuelTheme('');
}

function applyQuoteFuelTheme() {
  const fuel = currentVehicleDetails?.fuelType || window.vehicle?.fuelType || '';
  setAdvisorFuelTheme(fuel);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.remove('is-active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('is-active');

  // Fuel theme is strictly quote/comparison-only. Dashboard/Home, Vehicle
  // Details, Policy Details and Login always use the default light-blue theme.
  if (id === 'screen-comparison') {
    applyQuoteFuelTheme();
  } else {
    clearFuelTheme();
  }

  updateAdminFlowShell();
  window.scrollTo(0, 0);
}

function updateAdminFlowShell() {
  const adminFlow = adminComparisonMode && session && session.role === 'admin';
  document.querySelectorAll('.advisor-flow-back-admin').forEach((el) => {
    el.style.display = adminFlow ? 'inline-flex' : 'none';
  });
  const dashboardBrand = document.querySelector('#screen-dashboard .brand-name');
  const dashboardChip = document.querySelector('#screen-dashboard .chip');
  if (dashboardBrand) dashboardBrand.textContent = adminFlow ? 'Test Portal — Admin' : 'Test Portal';
  if (dashboardChip) dashboardChip.textContent = adminFlow ? 'Admin' : 'Advisor';
  document.querySelectorAll('#screen-vehicle-details .chip, #screen-policy-details .chip, #screen-comparison .chip').forEach((el) => {
    el.textContent = adminFlow ? 'Admin' : 'Advisor';
  });
}


function updateRoleChips() {
  const label = session && session.role === 'admin' ? 'Admin' : 'Advisor';
  document.querySelectorAll('.topbar .chip').forEach((el) => (el.textContent = label));
  const advisorName = session?.name || session?.username || 'Advisor';
  document.querySelectorAll('[data-advisor-name]').forEach((el) => {
    el.textContent = advisorName;
    el.title = advisorName;
  });
  if (typeof updateDashboardWelcome === 'function' && session?.role === 'advisor') {
    updateDashboardWelcome();
  }
}

let signingOut=false;
async function signOut(){
 if(signingOut)return;signingOut=true;
 const buttons=[...document.querySelectorAll('[id^="signOutBtn"]')];buttons.forEach(b=>b.disabled=true);
 try{
  await apiFetch('/api/auth/logout',{method:'POST'});
  session=null;clearFuelTheme();currentRegNumber=null;currentVehicleDetails=null;currentPolicyDetails=null;window.currentSavedQuotation=null;adminComparisonMode=false;
  location.replace('index.html');
 }catch(error){
  let notice=document.getElementById('logoutNotice');if(!notice){notice=document.createElement('div');notice.id='logoutNotice';notice.className='workspace-toast';notice.setAttribute('role','alert');document.body.append(notice);}
  notice.textContent='Sign out failed. '+error.message+' Please try again.';
 }finally{signingOut=false;buttons.forEach(b=>b.disabled=false);}
}

[1, 2, 3, 4, 5, 6].forEach((n) => document.getElementById('signOutBtn' + n)?.addEventListener('click', signOut));

// Persistent Home buttons on advisor quote-flow screens.
// Home always returns to the advisor dashboard and resets the quote-only fuel theme.
['homeBtnVehicleDetails', 'homeBtnPolicyDetails', 'homeBtnComparison', 'homeBtnReports'].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => {
    adminComparisonMode = session?.role === 'admin';
    window.currentSavedQuotation = null;
    showScreen('screen-dashboard');
  });
});

// ===========================================================
// Global header nav: "Dashboard" button + "Search all quotes" bar.
// Present in the topbar on every advisor screen (dashboard, vehicle
// details, policy details, comparison, reports).
// ===========================================================
document.querySelectorAll('[data-nav-dashboard]').forEach((btn) => {
  btn.addEventListener('click', () => {
    adminComparisonMode = session?.role === 'admin';
    window.currentSavedQuotation = null;
    showScreen('screen-dashboard');
  });
});

document.querySelectorAll('[data-nav-reports]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (typeof goToReports === 'function') goToReports();
  });
});

document.querySelectorAll('.topbar-search-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.topbar-search-input');
    const value = input ? input.value.trim() : '';
    if (typeof goToReports === 'function') goToReports(value);
    if (input) input.value = '';
  });
});

// Password show/hide toggle — works for any field wrapped in
// .password-field-wrapper with a matching data-target id.
document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.getAttribute('data-target'));
    const isVisible = input.type === 'text';
    input.type = isVisible ? 'password' : 'text';
    btn.classList.toggle('is-visible', !isVisible);
    btn.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  });
});

// ===========================================================
