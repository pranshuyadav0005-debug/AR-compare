(async function () {
  try {
    const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!r.ok) throw new Error('Not signed in');
    const data = await r.json();
    if (!data.session || data.session.role !== 'advisor') throw new Error('Invalid role');
    session = data.session;
    adminComparisonMode = false;
    updateRoleChips();
    showScreen('screen-dashboard');
    const gate = document.getElementById('authGateLoading');
    if (gate) gate.remove();
  } catch (e) {
    window.location.href = 'index.html';
  }
})();
