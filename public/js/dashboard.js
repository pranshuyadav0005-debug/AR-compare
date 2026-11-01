
// Admins can use the same registration-number comparison flow without
// returning to the insurer-management screen. Their Admin shell is
// restored automatically when they leave the flow.
function enterAdminRegistrationFlow() {
  if (!session || session.role !== 'admin') return;
  adminComparisonMode = true;
  showScreen('screen-dashboard');
  const greeting = document.getElementById('greeting');
  if (greeting) greeting.textContent = 'New registration comparison';
  const heading = document.querySelector('#screen-dashboard .page-heading p');
  if (heading) heading.textContent = "Enter the vehicle's registration number to pull its details and compare insurers.";
  loadDashboardStats();
}

document.getElementById('adminRegistrationBack')?.addEventListener('click', () => {
  adminComparisonMode = false;
  showScreen('screen-admin');
  if (typeof loadAdminPanel === 'function') loadAdminPanel();
});
// ===========================================================
// Dashboard screen: vehicle registration number lookup
// ===========================================================
function getAdvisorGreeting(date = new Date()) {
  const hour = date.getHours();
  return hour >= 5 && hour < 12 ? 'Good morning' : hour >= 12 && hour < 18 ? 'Good afternoon' : 'Good evening';
}
function updateDashboardWelcome() {
  const greeting = document.getElementById('greeting');
  const message = document.getElementById('greetingMessage');
  if (!greeting || !message) return;
  const name = session?.name || session?.username;
  greeting.textContent = name ? `${getAdvisorGreeting()}, ${name}` : 'Your workspace';
  message.textContent = 'Start a comparison or reopen a saved quotation.';
}
updateDashboardWelcome();

const regInput = document.getElementById('regNumber');
const regType = document.getElementById('regType');
const regTypeField = document.getElementById('regTypeField');
const regTypeChoices = document.getElementById('regTypeChoices');
if (regTypeChoices) {
  regTypeChoices.querySelectorAll('.choice-card').forEach(btn => {
    btn.addEventListener('click', () => {
      regType.value = btn.dataset.value || '';
      regTypeChoices.querySelectorAll('.choice-card').forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-pressed', String(active));
      });
      regTypeField.classList.remove('has-error');
    });
  });
}
regInput.addEventListener('input', () => { regInput.value = regInput.value.toUpperCase(); });

const regField = document.getElementById('regField');
const lookupBtn = document.getElementById('lookupBtn');
const lookupError = document.getElementById('lookupError');
const lookupErrorText = document.getElementById('lookupErrorText');
// Registration number formats vary a fair bit across states — some RTOs
// don't use a series letter at all (e.g. DL1CAR4567 has a 3-letter
// series with no gap), so the series length and spacing must stay
// flexible while still catching typos. BH-series plates follow a
// different, fixed shape entirely.
const NORMAL_REG_PATTERN = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,3}[0-9]{1,4}$/;
const BH_REG_PATTERN = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
function isValidRegNumber(value, type) {
  const normalized = String(value || '').replace(/\s+/g, '').toUpperCase();
  return type === 'bh' ? BH_REG_PATTERN.test(normalized) : NORMAL_REG_PATTERN.test(normalized);
}

function setLookupLoading(isLoading) {
  lookupBtn.disabled = isLoading;
  lookupBtn.classList.toggle('is-loading', isLoading);
}

document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  regField.classList.remove('has-error');
  regTypeField.classList.remove('has-error');
  lookupError.classList.remove('is-visible');

  const value = regInput.value.trim();
  if (!regType.value) { regTypeField.classList.add('has-error'); return; }
  if (!isValidRegNumber(value, regType.value)) { regField.classList.add('has-error'); return; }

  setLookupLoading(true);
  try {
    currentRegNumber = value.replace(/\s+/g, '');
    currentRegistrationType = regType.value;
    try {
      const result = await lookupRegistration(currentRegNumber);
      goToVehicleDetails();
      if (result) {
        const v = result.data;
        applyLookupToVehicleForm(result);
        if (result.source === 'saved') {
          document.getElementById('vdRegSub').textContent = `Saved vehicle found for ${currentRegNumber}. Verify the details before continuing.`;
        } else {
          document.getElementById('vdRegSub').textContent = `Registration ${currentRegNumber} was not found in saved records. Enter the vehicle details manually to continue.`;
        }
      }
    } catch (err) {
      // A missing saved vehicle is not a hard failure: the next screen is
      // explicitly designed for manual vehicle entry. Other API errors still
      // surface on the registration screen.
      if (err?.status === 404) {
        goToVehicleDetails();
        document.getElementById('vdRegSub').textContent = `Registration ${currentRegNumber} — vehicle not found in saved records. Enter the vehicle details manually to continue.`;
      } else {
        throw err;
      }
    }
  } catch (err) {
    lookupErrorText.textContent = err.message || "Couldn't look up that vehicle. Try again.";
    lookupError.classList.add('is-visible');
  } finally {
    setLookupLoading(false);
  }
});


// ===========================================================

// ===========================================================
// Dashboard summary stat cards + recent activity list.
// Uses the same /api/quotes/search endpoint the Reports screen
// (js/reports.js) already calls — real saved-quote data, no
// placeholder numbers. Safe no-op on any page where the new
// dashboard markup isn't present (e.g. motor-insurance.html's
// dashboard, which is intentionally left as-is by this pass).
// ===========================================================
function dashEscapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function dashFormatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function dashRelativeDayLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 1 && diffDays < 7) return `${diffDays}d ago`;
  return dashFormatShortDate(value);
}

function renderDashboardRecentActivity(quotes) {
  const listEl = document.getElementById('dashRecentList');
  if (!listEl) return;
  if (!quotes.length) {
    listEl.innerHTML = '<div class="dash-recent-empty">No quotes yet — your recent lookups will show up here.</div>';
    return;
  }
  listEl.innerHTML = quotes.map((q) => {
    const vehicle = q.vehicle_details || {};
    const vehicleName = [vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(' ') || 'Vehicle details unavailable';
    const owner = q.owner_name || vehicle.name || 'Unknown owner';
    const reg = q.registration_number || vehicle.regNumber || '—';
    return `
      <button type="button" class="dash-recent-item" data-quotation="${dashEscapeHtml(q.quotation_number || '')}">
        <div class="dash-recent-item-main">
          <strong>${dashEscapeHtml(owner)} — ${dashEscapeHtml(reg)}</strong>
          <span>${dashEscapeHtml(vehicleName)}</span>
        </div>
        <div class="dash-recent-item-date">${dashEscapeHtml(dashRelativeDayLabel(q.created_at))}</div>
      </button>`;
  }).join('');

  listEl.querySelectorAll('.dash-recent-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const quotation = btn.dataset.quotation;
      if (quotation && typeof goToReports === 'function') goToReports(quotation);
    });
  });
}

async function loadDashboardStats() {
  const monthEl = document.getElementById('statQuotesMonth');
  const monthSubEl = document.getElementById('statQuotesMonthSub');
  const weekEl = document.getElementById('statQuotesWeek');
  const weekSubEl = document.getElementById('statQuotesWeekSub');
  const lastEl = document.getElementById('statLastQuote');
  const lastSubEl = document.getElementById('statLastQuoteSub');
  const listEl = document.getElementById('dashRecentList');
  // Not present on this page/screen (e.g. motor-insurance.html's own
  // dashboard copy, left untouched by this redesign) — nothing to do.
  if (!monthEl || !weekEl || !lastEl || !listEl) return;
  // Both advisors and admins can reach this screen (admins via the
  // "new registration comparison" flow) and /api/quotes/search accepts
  // both roles, so only require an active session.
  if (!session) return;

  try {
    const data = await apiFetch('/api/quotes/search?type=all&q=');
    const quotes = Array.isArray(data.results) ? data.results : [];

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);

    const monthCount = quotes.filter((q) => q.created_at && new Date(q.created_at) >= startOfMonth).length;
    const weekCount = quotes.filter((q) => q.created_at && new Date(q.created_at) >= startOfWeek).length;

    monthEl.textContent = String(monthCount);
    // The search endpoint returns at most the 50 most recent saved
    // quotes, so if that cap is reached, say so rather than implying
    // this count is exhaustive for the month.
    monthSubEl.textContent = quotes.length >= 50
      ? 'may undercount — only last 50 shown'
      : (monthCount === 1 ? 'quote generated' : 'quotes generated');

    weekEl.textContent = String(weekCount);
    weekSubEl.textContent = 'in the last 7 days';

    if (quotes.length) {
      const latest = quotes[0]; // API already orders by created_at desc
      lastEl.textContent = latest.registration_number || latest.quotation_number || '—';
      lastSubEl.textContent = dashRelativeDayLabel(latest.created_at);
    } else {
      lastEl.textContent = 'None yet';
      lastSubEl.textContent = 'Run your first lookup';
    }

    renderDashboardRecentActivity(quotes.slice(0, 5));
  } catch (err) {
    monthEl.textContent = '—';
    if (monthSubEl) monthSubEl.textContent = 'Unavailable';
    weekEl.textContent = '—';
    if (weekSubEl) weekSubEl.textContent = 'Unavailable';
    lastEl.textContent = '—';
    if (lastSubEl) lastSubEl.textContent = 'Unavailable';
    listEl.innerHTML = '<div class="dash-recent-empty">Couldn\'t load recent activity.</div>';
  }
}

document.getElementById('dashViewAllBtn')?.addEventListener('click', () => {
  if (typeof goToReports === 'function') goToReports('');
});

// Refresh the stat cards whenever the dashboard is reached via the
// header "Dashboard" link or a screen's "Home" button, in addition to
// the enterAdminRegistrationFlow() call above.
document.querySelectorAll('[data-nav-dashboard]').forEach((btn) => {
  btn.addEventListener('click', loadDashboardStats);
});
['homeBtnVehicleDetails', 'homeBtnPolicyDetails', 'homeBtnComparison', 'homeBtnReports'].forEach((id) => {
  document.getElementById(id)?.addEventListener('click', loadDashboardStats);
});

// If a session is already active when this script runs (e.g. a saved
// session on reload) and the dashboard happens to be the active screen,
// load the stats immediately rather than waiting for a nav click.
if (session && document.getElementById('screen-dashboard')?.classList.contains('is-active')) {
  loadDashboardStats();
}
