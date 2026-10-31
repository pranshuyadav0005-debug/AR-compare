
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
const DAILY_QUOTES = ["Progress begins the moment you decide to move forward.", "Consistency turns ordinary effort into extraordinary results.", "A clear decision today can create a stronger tomorrow.", "Your attention to detail is someone else's peace of mind.", "Great advisors don't just compare options; they create confidence.", "Small improvements repeated daily become lasting success.", "Listen carefully, compare wisely, and recommend confidently.", "The best results come from patience, clarity, and action.", "Every client conversation is an opportunity to build trust.", "Do today's work with tomorrow's success in mind.", "Confidence grows when preparation meets opportunity.", "A thoughtful comparison can turn uncertainty into clarity.", "Keep learning; every new insight makes your advice stronger.", "Your consistency is one of your greatest professional strengths.", "Focus on helping first, and success will follow.", "Strong relationships are built one trustworthy conversation at a time.", "The quality of your questions shapes the quality of your advice.", "Make every recommendation simple, honest, and useful.", "Today's effort is an investment in the advisor you become tomorrow.", "Clarity is a service; give your clients plenty of it.", "Stay curious, stay prepared, and keep moving forward.", "A good comparison informs; a great advisor empowers.", "Your work matters because the decisions you support matter.", "Take pride in the details others might overlook.", "Trust is earned through small promises kept consistently.", "One focused hour can change the direction of an entire day.", "Don't chase perfection; build dependable excellence.", "The strongest professionals make complex choices feel simple.", "Every challenge is a chance to sharpen your judgment.", "Keep your standards high and your process clear.", "Good preparation makes confident conversations easier.", "Your next breakthrough may begin with one better question.", "Be the calm, clear voice clients can rely on.", "Reliable service is built through reliable habits.", "Today's discipline becomes tomorrow's freedom.", "Progress is often quiet, but it is always worth building.", "When you add value consistently, people remember you.", "Choose clarity over complexity whenever you can.", "A positive attitude makes difficult work easier to navigate.", "Keep going; momentum is built one completed step at a time.", "The best advisors combine knowledge with genuine care.", "Your professionalism speaks before you say a word.", "Make every client feel heard, informed, and respected.", "Success is a collection of well-handled ordinary days.", "Stay focused on what you can improve today.", "A better process creates better decisions.", "Your work becomes powerful when consistency meets purpose.", "Keep your goals visible and your next step simple.", "A strong day starts with a clear intention.", "Give your best to the task in front of you.", "Trust your preparation and keep your standards steady.", "Every comparison is a chance to demonstrate your expertise.", "Be thorough where it matters and simple where it helps.", "The habit of finishing well is a competitive advantage.", "Stay composed, stay curious, and stay client-focused.", "A sincere recommendation can become a lasting relationship.", "You don't need a perfect day to make meaningful progress.", "Let today's work be proof of tomorrow's potential.", "The details you verify today can prevent problems tomorrow.", "Keep improving the process, and the results will improve with it.", "Progress begins the moment you decide to move forward. Keep moving forward.", "Consistency turns ordinary effort into extraordinary results. Stay prepared.", "A clear decision today can create a stronger tomorrow. Finish strong.", "Your attention to detail is someone else's peace of mind. Keep showing up.", "Great advisors don't just compare options; they create confidence. Be proud of your progress.", "Small improvements repeated daily become lasting success. Keep raising the bar.", "Listen carefully, compare wisely, and recommend confidently. Act wisely.", "The best results come from patience, clarity, and action. Be dependable.", "Every client conversation is an opportunity to build trust. Stay client-first.", "Do today's work with tomorrow's success in mind. Make it count.", "Confidence grows when preparation meets opportunity. Keep it simple.", "A thoughtful comparison can turn uncertainty into clarity. Learn and improve.", "Keep learning; every new insight makes your advice stronger. Do the next right thing.", "Your consistency is one of your greatest professional strengths. Make today useful.", "Focus on helping first, and success will follow. Choose progress.", "Strong relationships are built one trustworthy conversation at a time. Create value.", "The quality of your questions shapes the quality of your advice. Turn effort into impact.", "Make every recommendation simple, honest, and useful. Work with intention.", "Today's effort is an investment in the advisor you become tomorrow. Lead with confidence.", "Clarity is a service; give your clients plenty of it. Serve with purpose.", "Stay curious, stay prepared, and keep moving forward. Make a difference.", "A good comparison informs; a great advisor empowers. Make clarity your strength.", "Your work matters because the decisions you support matter. Keep building.", "Take pride in the details others might overlook. Build trust.", "Trust is earned through small promises kept consistently. Stay focused.", "One focused hour can change the direction of an entire day. Stay positive.", "Don't chase perfection; build dependable excellence. Keep the momentum.", "The strongest professionals make complex choices feel simple. Stay consistent.", "Every challenge is a chance to sharpen your judgment. Think clearly.", "Keep your standards high and your process clear. Keep your standards high.", "Good preparation makes confident conversations easier. Keep growing.", "Your next breakthrough may begin with one better question. Keep moving forward.", "Be the calm, clear voice clients can rely on. Stay prepared.", "Reliable service is built through reliable habits. Finish strong.", "Today's discipline becomes tomorrow's freedom. Keep showing up.", "Progress is often quiet, but it is always worth building. Be proud of your progress.", "When you add value consistently, people remember you. Keep raising the bar.", "Choose clarity over complexity whenever you can. Act wisely.", "A positive attitude makes difficult work easier to navigate. Be dependable.", "Keep going; momentum is built one completed step at a time. Stay client-first.", "The best advisors combine knowledge with genuine care. Make it count.", "Your professionalism speaks before you say a word. Keep it simple.", "Make every client feel heard, informed, and respected. Learn and improve.", "Success is a collection of well-handled ordinary days. Do the next right thing.", "Stay focused on what you can improve today. Make today useful.", "A better process creates better decisions. Choose progress.", "Your work becomes powerful when consistency meets purpose. Create value.", "Keep your goals visible and your next step simple. Turn effort into impact.", "A strong day starts with a clear intention. Work with intention.", "Give your best to the task in front of you. Lead with confidence.", "Trust your preparation and keep your standards steady. Serve with purpose.", "Every comparison is a chance to demonstrate your expertise. Make a difference.", "Be thorough where it matters and simple where it helps. Make clarity your strength.", "The habit of finishing well is a competitive advantage. Keep building.", "Stay composed, stay curious, and stay client-focused. Build trust.", "A sincere recommendation can become a lasting relationship. Stay focused.", "You don't need a perfect day to make meaningful progress. Stay positive.", "Let today's work be proof of tomorrow's potential. Keep the momentum.", "The details you verify today can prevent problems tomorrow. Stay consistent.", "Keep improving the process, and the results will improve with it. Think clearly.", "Progress begins the moment you decide to move forward. Keep your standards high.", "Consistency turns ordinary effort into extraordinary results. Keep growing.", "A clear decision today can create a stronger tomorrow. Keep moving forward.", "Your attention to detail is someone else's peace of mind. Stay prepared.", "Great advisors don't just compare options; they create confidence. Finish strong.", "Small improvements repeated daily become lasting success. Keep showing up.", "Listen carefully, compare wisely, and recommend confidently. Be proud of your progress.", "The best results come from patience, clarity, and action. Keep raising the bar.", "Every client conversation is an opportunity to build trust. Act wisely.", "Do today's work with tomorrow's success in mind. Be dependable.", "Confidence grows when preparation meets opportunity. Stay client-first.", "A thoughtful comparison can turn uncertainty into clarity. Make it count.", "Keep learning; every new insight makes your advice stronger. Keep it simple.", "Your consistency is one of your greatest professional strengths. Learn and improve.", "Focus on helping first, and success will follow. Do the next right thing.", "Strong relationships are built one trustworthy conversation at a time. Make today useful.", "The quality of your questions shapes the quality of your advice. Choose progress.", "Make every recommendation simple, honest, and useful. Create value.", "Today's effort is an investment in the advisor you become tomorrow. Turn effort into impact.", "Clarity is a service; give your clients plenty of it. Work with intention.", "Stay curious, stay prepared, and keep moving forward. Lead with confidence.", "A good comparison informs; a great advisor empowers. Serve with purpose.", "Your work matters because the decisions you support matter. Make a difference.", "Take pride in the details others might overlook. Make clarity your strength.", "Trust is earned through small promises kept consistently. Keep building.", "One focused hour can change the direction of an entire day. Build trust.", "Don't chase perfection; build dependable excellence. Stay focused.", "The strongest professionals make complex choices feel simple. Stay positive.", "Every challenge is a chance to sharpen your judgment. Keep the momentum.", "Keep your standards high and your process clear. Stay consistent.", "Good preparation makes confident conversations easier. Think clearly.", "Your next breakthrough may begin with one better question. Keep your standards high.", "Be the calm, clear voice clients can rely on. Keep growing.", "Reliable service is built through reliable habits. Keep moving forward.", "Today's discipline becomes tomorrow's freedom. Stay prepared.", "Progress is often quiet, but it is always worth building. Finish strong.", "When you add value consistently, people remember you. Keep showing up.", "Choose clarity over complexity whenever you can. Be proud of your progress.", "A positive attitude makes difficult work easier to navigate. Keep raising the bar.", "Keep going; momentum is built one completed step at a time. Act wisely.", "The best advisors combine knowledge with genuine care. Be dependable.", "Your professionalism speaks before you say a word. Stay client-first.", "Make every client feel heard, informed, and respected. Make it count.", "Success is a collection of well-handled ordinary days. Keep it simple.", "Stay focused on what you can improve today. Learn and improve.", "A better process creates better decisions. Do the next right thing.", "Your work becomes powerful when consistency meets purpose. Make today useful.", "Keep your goals visible and your next step simple. Choose progress.", "A strong day starts with a clear intention. Create value.", "Give your best to the task in front of you. Turn effort into impact.", "Trust your preparation and keep your standards steady. Work with intention.", "Every comparison is a chance to demonstrate your expertise. Lead with confidence.", "Be thorough where it matters and simple where it helps. Serve with purpose.", "The habit of finishing well is a competitive advantage. Make a difference.", "Stay composed, stay curious, and stay client-focused. Make clarity your strength.", "A sincere recommendation can become a lasting relationship. Keep building.", "You don't need a perfect day to make meaningful progress. Build trust.", "Let today's work be proof of tomorrow's potential. Stay focused.", "The details you verify today can prevent problems tomorrow. Stay positive.", "Keep improving the process, and the results will improve with it. Keep the momentum.", "Progress begins the moment you decide to move forward. Stay consistent.", "Consistency turns ordinary effort into extraordinary results. Think clearly.", "A clear decision today can create a stronger tomorrow. Keep your standards high.", "Your attention to detail is someone else's peace of mind. Keep growing.", "Great advisors don't just compare options; they create confidence. Keep moving forward.", "Small improvements repeated daily become lasting success. Stay prepared.", "Listen carefully, compare wisely, and recommend confidently. Finish strong.", "The best results come from patience, clarity, and action. Keep showing up.", "Every client conversation is an opportunity to build trust. Be proud of your progress.", "Do today's work with tomorrow's success in mind. Keep raising the bar.", "Confidence grows when preparation meets opportunity. Act wisely.", "A thoughtful comparison can turn uncertainty into clarity. Be dependable.", "Keep learning; every new insight makes your advice stronger. Stay client-first.", "Your consistency is one of your greatest professional strengths. Make it count.", "Focus on helping first, and success will follow. Keep it simple.", "Strong relationships are built one trustworthy conversation at a time. Learn and improve.", "The quality of your questions shapes the quality of your advice. Do the next right thing.", "Make every recommendation simple, honest, and useful. Make today useful.", "Today's effort is an investment in the advisor you become tomorrow. Choose progress.", "Clarity is a service; give your clients plenty of it. Create value.", "Stay curious, stay prepared, and keep moving forward. Turn effort into impact.", "A good comparison informs; a great advisor empowers. Work with intention.", "Your work matters because the decisions you support matter. Lead with confidence.", "Take pride in the details others might overlook. Serve with purpose.", "Trust is earned through small promises kept consistently. Make a difference.", "One focused hour can change the direction of an entire day. Make clarity your strength.", "Don't chase perfection; build dependable excellence. Keep building.", "The strongest professionals make complex choices feel simple. Build trust.", "Every challenge is a chance to sharpen your judgment. Stay focused.", "Keep your standards high and your process clear. Stay positive.", "Good preparation makes confident conversations easier. Keep the momentum.", "Your next breakthrough may begin with one better question. Stay consistent.", "Be the calm, clear voice clients can rely on. Think clearly.", "Reliable service is built through reliable habits. Keep your standards high.", "Today's discipline becomes tomorrow's freedom. Keep growing.", "Progress is often quiet, but it is always worth building. Keep moving forward.", "When you add value consistently, people remember you. Stay prepared.", "Choose clarity over complexity whenever you can. Finish strong.", "A positive attitude makes difficult work easier to navigate. Keep showing up.", "Keep going; momentum is built one completed step at a time. Be proud of your progress.", "The best advisors combine knowledge with genuine care. Keep raising the bar.", "Your professionalism speaks before you say a word. Act wisely.", "Make every client feel heard, informed, and respected. Be dependable.", "Success is a collection of well-handled ordinary days. Stay client-first.", "Stay focused on what you can improve today. Make it count.", "A better process creates better decisions. Keep it simple.", "Your work becomes powerful when consistency meets purpose. Learn and improve.", "Keep your goals visible and your next step simple. Do the next right thing.", "A strong day starts with a clear intention. Make today useful.", "Give your best to the task in front of you. Choose progress.", "Trust your preparation and keep your standards steady. Create value.", "Every comparison is a chance to demonstrate your expertise. Turn effort into impact.", "Be thorough where it matters and simple where it helps. Work with intention.", "The habit of finishing well is a competitive advantage. Lead with confidence.", "Stay composed, stay curious, and stay client-focused. Serve with purpose.", "A sincere recommendation can become a lasting relationship. Make a difference.", "You don't need a perfect day to make meaningful progress. Make clarity your strength.", "Let today's work be proof of tomorrow's potential. Keep building.", "The details you verify today can prevent problems tomorrow. Build trust.", "Keep improving the process, and the results will improve with it. Stay focused.", "Progress begins the moment you decide to move forward. Stay positive.", "Consistency turns ordinary effort into extraordinary results. Keep the momentum.", "A clear decision today can create a stronger tomorrow. Stay consistent.", "Your attention to detail is someone else's peace of mind. Think clearly.", "Great advisors don't just compare options; they create confidence. Keep your standards high.", "Small improvements repeated daily become lasting success. Keep growing.", "Listen carefully, compare wisely, and recommend confidently. Keep moving forward.", "The best results come from patience, clarity, and action. Stay prepared.", "Every client conversation is an opportunity to build trust. Finish strong.", "Do today's work with tomorrow's success in mind. Keep showing up.", "Confidence grows when preparation meets opportunity. Be proud of your progress.", "A thoughtful comparison can turn uncertainty into clarity. Keep raising the bar.", "Keep learning; every new insight makes your advice stronger. Act wisely.", "Your consistency is one of your greatest professional strengths. Be dependable.", "Focus on helping first, and success will follow. Stay client-first.", "Strong relationships are built one trustworthy conversation at a time. Make it count.", "The quality of your questions shapes the quality of your advice. Keep it simple.", "Make every recommendation simple, honest, and useful. Learn and improve.", "Today's effort is an investment in the advisor you become tomorrow. Do the next right thing.", "Clarity is a service; give your clients plenty of it. Make today useful.", "Stay curious, stay prepared, and keep moving forward. Choose progress.", "A good comparison informs; a great advisor empowers. Create value.", "Your work matters because the decisions you support matter. Turn effort into impact.", "Take pride in the details others might overlook. Work with intention.", "Trust is earned through small promises kept consistently. Lead with confidence.", "One focused hour can change the direction of an entire day. Serve with purpose.", "Don't chase perfection; build dependable excellence. Make a difference.", "The strongest professionals make complex choices feel simple. Make clarity your strength.", "Every challenge is a chance to sharpen your judgment. Keep building.", "Keep your standards high and your process clear. Build trust.", "Good preparation makes confident conversations easier. Stay focused.", "Your next breakthrough may begin with one better question. Stay positive.", "Be the calm, clear voice clients can rely on. Keep the momentum.", "Reliable service is built through reliable habits. Stay consistent.", "Today's discipline becomes tomorrow's freedom. Think clearly.", "Progress is often quiet, but it is always worth building. Keep your standards high.", "When you add value consistently, people remember you. Keep growing.", "Choose clarity over complexity whenever you can. Keep moving forward.", "A positive attitude makes difficult work easier to navigate. Stay prepared.", "Keep going; momentum is built one completed step at a time. Finish strong.", "The best advisors combine knowledge with genuine care. Keep showing up.", "Your professionalism speaks before you say a word. Be proud of your progress.", "Make every client feel heard, informed, and respected. Keep raising the bar.", "Success is a collection of well-handled ordinary days. Act wisely.", "Stay focused on what you can improve today. Be dependable.", "A better process creates better decisions. Stay client-first.", "Your work becomes powerful when consistency meets purpose. Make it count.", "Keep your goals visible and your next step simple. Keep it simple.", "A strong day starts with a clear intention. Learn and improve.", "Give your best to the task in front of you. Do the next right thing.", "Trust your preparation and keep your standards steady. Make today useful.", "Every comparison is a chance to demonstrate your expertise. Choose progress.", "Be thorough where it matters and simple where it helps. Create value.", "The habit of finishing well is a competitive advantage. Turn effort into impact.", "Stay composed, stay curious, and stay client-focused. Work with intention.", "A sincere recommendation can become a lasting relationship. Lead with confidence.", "You don't need a perfect day to make meaningful progress. Serve with purpose.", "Let today's work be proof of tomorrow's potential. Make a difference.", "The details you verify today can prevent problems tomorrow. Make clarity your strength.", "Keep improving the process, and the results will improve with it. Keep building.", "Progress begins the moment you decide to move forward. Build trust.", "Consistency turns ordinary effort into extraordinary results. Stay focused.", "A clear decision today can create a stronger tomorrow. Stay positive.", "Your attention to detail is someone else's peace of mind. Keep the momentum.", "Great advisors don't just compare options; they create confidence. Stay consistent.", "Small improvements repeated daily become lasting success. Think clearly.", "Listen carefully, compare wisely, and recommend confidently. Keep your standards high.", "The best results come from patience, clarity, and action. Keep growing.", "Every client conversation is an opportunity to build trust. Keep moving forward.", "Do today's work with tomorrow's success in mind. Stay prepared.", "Confidence grows when preparation meets opportunity. Finish strong.", "A thoughtful comparison can turn uncertainty into clarity. Keep showing up.", "Keep learning; every new insight makes your advice stronger. Be proud of your progress.", "Your consistency is one of your greatest professional strengths. Keep raising the bar.", "Focus on helping first, and success will follow. Act wisely.", "Strong relationships are built one trustworthy conversation at a time. Be dependable.", "The quality of your questions shapes the quality of your advice. Stay client-first.", "Make every recommendation simple, honest, and useful. Make it count.", "Today's effort is an investment in the advisor you become tomorrow. Keep it simple.", "Clarity is a service; give your clients plenty of it. Learn and improve.", "Stay curious, stay prepared, and keep moving forward. Do the next right thing.", "A good comparison informs; a great advisor empowers. Make today useful.", "Your work matters because the decisions you support matter. Choose progress.", "Take pride in the details others might overlook. Create value.", "Trust is earned through small promises kept consistently. Turn effort into impact.", "One focused hour can change the direction of an entire day. Work with intention.", "Don't chase perfection; build dependable excellence. Lead with confidence.", "The strongest professionals make complex choices feel simple. Serve with purpose.", "Every challenge is a chance to sharpen your judgment. Make a difference.", "Keep your standards high and your process clear. Make clarity your strength.", "Good preparation makes confident conversations easier. Keep building.", "Your next breakthrough may begin with one better question. Build trust.", "Be the calm, clear voice clients can rely on. Stay focused.", "Reliable service is built through reliable habits. Stay positive.", "Today's discipline becomes tomorrow's freedom. Keep the momentum.", "Progress is often quiet, but it is always worth building. Stay consistent.", "When you add value consistently, people remember you. Think clearly.", "Choose clarity over complexity whenever you can. Keep your standards high.", "A positive attitude makes difficult work easier to navigate. Keep growing.", "Keep going; momentum is built one completed step at a time. Keep moving forward.", "The best advisors combine knowledge with genuine care. Stay prepared.", "Your professionalism speaks before you say a word. Finish strong.", "Make every client feel heard, informed, and respected. Keep showing up.", "Success is a collection of well-handled ordinary days. Be proud of your progress.", "Stay focused on what you can improve today. Keep raising the bar.", "A better process creates better decisions. Act wisely.", "Your work becomes powerful when consistency meets purpose. Be dependable.", "Keep your goals visible and your next step simple. Stay client-first.", "A strong day starts with a clear intention. Make it count.", "Give your best to the task in front of you. Keep it simple.", "Trust your preparation and keep your standards steady. Learn and improve.", "Every comparison is a chance to demonstrate your expertise. Do the next right thing.", "Be thorough where it matters and simple where it helps. Make today useful.", "The habit of finishing well is a competitive advantage. Choose progress.", "Stay composed, stay curious, and stay client-focused. Create value.", "A sincere recommendation can become a lasting relationship. Turn effort into impact.", "You don't need a perfect day to make meaningful progress. Work with intention.", "Let today's work be proof of tomorrow's potential. Lead with confidence.", "The details you verify today can prevent problems tomorrow. Serve with purpose.", "Keep improving the process, and the results will improve with it. Make a difference.", "Progress begins the moment you decide to move forward. Make clarity your strength.", "Consistency turns ordinary effort into extraordinary results. Keep building.", "A clear decision today can create a stronger tomorrow. Build trust.", "Your attention to detail is someone else's peace of mind. Stay focused.", "Great advisors don't just compare options; they create confidence. Stay positive.", "Small improvements repeated daily become lasting success. Keep the momentum."];

// ===========================================================
// Daily advisor welcome + annual quote (UI only)
// The quote is selected by local calendar day, so the same date
// gets the same quote each year and leap years have their own slot.
// ===========================================================
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date - start) / 86400000) + 1;
}

function getAdvisorGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'GOOD MORNING';
  if (hour >= 12 && hour < 18) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

function updateDashboardWelcome() {
  const greeting = document.getElementById('greeting');
  const message = document.getElementById('greetingMessage');
  const quote = document.getElementById('dailyQuote');
  if (!greeting || !message || !quote) return;

  const now = new Date();
  const name = session?.name || 'Advisor';
  const greetingWord = getAdvisorGreeting(now);
  const messages = [
    'Every comparison is an opportunity to create clarity and build trust.',
    'Stay focused, stay prepared, and make every client conversation count.',
    'Your expertise creates confidence. Keep helping clients choose wisely.',
    'A strong day starts with a clear goal and one useful step forward.',
    'Keep learning, keep improving, and keep making decisions simpler for clients.',
    'Your attention to detail can turn an ordinary comparison into great service.'
  ];
  const messageIndex = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - new Date(now.getFullYear(),0,1)) / 86400000) % messages.length;
  greeting.textContent = `${greetingWord}, ${name.toUpperCase()}`;
  message.textContent = messages[messageIndex];

  const day = getDayOfYear(now);
  const isLeap = new Date(now.getFullYear(), 1, 29).getMonth() === 1;
  const quoteIndex = isLeap ? day - 1 : Math.min(day - 1, 364);
  quote.textContent = DAILY_QUOTES[quoteIndex] || DAILY_QUOTES[0];
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
    // TODO: replace with a real Edge Function / vehicle-data API call
    // (see ARCHITECTURE.md "Open Technical Decisions"). Simulated here
    // so the flow is fully clickable end to end. For now, the registration
    // number lookup can't reliably auto-fill make/model/variant, so we
    // hand off to the Vehicle Details screen (js/vehicle-details.js) for
    // manual entry, backed by the real make/model/variant/fuel-type data
    // in js/car-data.js.
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
