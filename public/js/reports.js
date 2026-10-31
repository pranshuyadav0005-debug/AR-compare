// ===========================================================
// Reports screen — previously generated quotations.
// Reached via the "Dashboard"/"Search" header nav's search bar, or
// directly once shown. Lists every quote saved by the logged-in
// advisor and supports filtering by registration number, vehicle
// owner name, or quotation number.
// ===========================================================
(function initReports() {
  const form = document.getElementById('reportsSearchForm');
  if (!form) return;

  const typeEl = document.getElementById('reportsSearchType');
  const inputEl = document.getElementById('reportsSearchInput');
  const button = document.getElementById('reportsSearchBtn');
  const message = document.getElementById('reportsSearchMessage');
  const results = document.getElementById('reportsSearchResults');

  const placeholders = {
    all: 'Leave blank to see all your quotes...',
    registration: 'Enter registration number...',
    owner: 'Enter vehicle owner name...',
    quotation: 'Enter quotation number (e.g. ARQ-20260918-ABC123)...'
  };

  function escape(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }
  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function setLoading(loading) {
    button.disabled = loading;
    button.classList.toggle('is-loading', loading);
    button.querySelector('.btn-label').textContent = loading ? 'Searching...' : 'Search Quotes';
  }
  function showMessage(text = '', kind = '') {
    message.textContent = text;
    message.className = `quote-search-message${kind ? ` is-${kind}` : ''}`;
  }

  typeEl.addEventListener('change', () => {
    inputEl.value = '';
    inputEl.placeholder = placeholders[typeEl.value] || 'Enter search value...';
    results.innerHTML = '';
    showMessage('');
  });
  inputEl.placeholder = placeholders[typeEl.value];

  function render(items) {
    if (!items.length) {
      results.innerHTML = '<div class="quote-result-card"><div class="quote-result-main"><strong>No quotations found</strong><span>Try another search value or search type.</span></div></div>';
      return;
    }
    results.innerHTML = items.map((q) => {
      const vehicle = q.vehicle_details || {};
      const vehicleName = [vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(' ') || 'Vehicle details unavailable';
      return `
        <article class="quote-result-card">
          <div class="quote-result-main"><strong>${escape(q.quotation_number)}</strong><span>${escape(formatDate(q.created_at))}</span></div>
          <div class="quote-result-meta"><strong>${escape(q.owner_name || vehicle.name || '—')}</strong><span>Vehicle owner</span></div>
          <div class="quote-result-meta"><strong>${escape(q.registration_number || vehicle.regNumber || '—')}</strong><span>Registration number</span></div>
          <div class="quote-result-meta"><strong>${escape(vehicleName)}</strong><span>Vehicle</span></div>
          <div class="quote-result-actions"><button type="button" class="btn btn-glass view-saved-quote-btn" data-quote-id="${escape(q.id)}">View Quote</button></div>
        </article>`;
    }).join('');

    results.querySelectorAll('.view-saved-quote-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const quote = items.find((item) => String(item.id) === String(btn.dataset.quoteId));
        if (!quote) return;
        try {
          await openSavedQuote(quote);
        } catch (err) {
          showMessage(err.message || 'Could not open this quotation.', 'error');
        }
      });
    });
  }

  async function openSavedQuote(q) {
    const vehicleDetails = q.vehicle_details || {};
    if (!vehicleDetails.brand || !vehicleDetails.model || !vehicleDetails.variant) {
      throw new Error('This quotation does not contain complete vehicle details.');
    }
    if (typeof buildVehicleFromSelection !== 'function' || typeof getIDVBounds !== 'function') {
      throw new Error('Quote viewer is not ready. Refresh the page and try again.');
    }

    currentRegNumber = vehicleDetails.regNumber || q.registration_number || '';
    currentRegistrationType = vehicleDetails.registrationType || 'normal';
    currentVehicleDetails = {
      name: vehicleDetails.name || q.owner_name || '',
      brand: vehicleDetails.brand,
      model: vehicleDetails.model,
      carName: vehicleDetails.carName || `${vehicleDetails.brand} ${vehicleDetails.model}`,
      fuelType: vehicleDetails.fuelType || '',
      variant: vehicleDetails.variant,
      registeredDate: vehicleDetails.registeredDate || '',
      policyExpiry: vehicleDetails.policyExpiry || '',
      manualIDV: vehicleDetails.manualIDV,
      manualIdvVehicleKey: vehicleDetails.manualIDV ? manualIdvVehicleKey({brand:vehicleDetails.brand, model:vehicleDetails.model, fuelType:vehicleDetails.fuelType, variant:vehicleDetails.variant, registeredDate:vehicleDetails.registeredDate || ''}, currentRegNumber) : undefined
    };
    currentPolicyDetails = vehicleDetails.policyDetails || {
      policyType: vehicleDetails.policyType || 'comprehensive',
      hadClaim: vehicleDetails.hadClaim || false,
      ncbPercent: Number(vehicleDetails.ncbPercent || 0),
      tpExpiryDate: vehicleDetails.tpExpiryDate || '',
      selectedAddons: Array.isArray(vehicleDetails.selectedAddons) ? vehicleDetails.selectedAddons : []
    };

    vehicle = buildVehicleFromSelection(currentRegNumber, currentVehicleDetails);
    vehicle.ncbPercent = Number(currentPolicyDetails.ncbPercent || 0);
    vehicle.hadClaim = !!currentPolicyDetails.hadClaim;
    vehicle.policyType = currentPolicyDetails.policyType || 'comprehensive';
    vehicle.tpExpiryDate = currentPolicyDetails.tpExpiryDate || '';
    vehicle.selectedAddons = Array.isArray(currentPolicyDetails.selectedAddons) ? currentPolicyDetails.selectedAddons : [];

    vehicleBaseIDV = getVehicleBaseIDV(vehicle);
    autoIDV = Number(q.idv_auto_calculated) || vehicleBaseIDV;
    bounds = getIDVBounds(autoIDV);
    currentIDV = Number(q.idv_value) || autoIDV;
    const savedResults = q.comparison_result?.results;
    if (!Array.isArray(savedResults) || !savedResults.length) throw new Error('This quotation has no saved comparison results.');
    currentResults = savedResults.map((result) => ({ ...result, planDetails: result.planDetails || enrichPlanDetails(result, vehicle) }));
    currentComparisonMeta = { ...(q.comparison_result?.meta || {}), persistence: 'saved', historical: true };
    window.currentSavedQuotation = {
      id: q.id,
      quotationNumber: q.quotation_number,
      ownerName: q.owner_name,
      registrationNumber: q.registration_number,
      createdAt: q.created_at
    };

    // Opening a saved quotation is read-only history: the first recalculation after this
    // creates a new quotation instead of overwriting the saved one.
    workingQuotationId = null;
    workingRevision = null;
    comparisonRequest = null;
    setDiscount(Number(currentPolicyDetails.advisorDiscount) || 0, 'Saved discount', { recalc: false });

    showScreen('screen-comparison');
    renderComparison();
    showMessage('');
  }

  async function runSearch(type, value) {
    results.innerHTML = '';
    showMessage('');
    setLoading(true);
    try {
      const qs = `type=${encodeURIComponent(type)}&q=${encodeURIComponent(value || '')}`;
      const data = await apiFetch(`/api/quotes/search?${qs}`);
      const items = Array.isArray(data.results) ? data.results : [];
      render(items);
      const count = data.count || items.length || 0;
      showMessage(value ? `${count} quotation${count === 1 ? '' : 's'} found.` : `${count} quotation${count === 1 ? '' : 's'} on file.`, 'success');
    } catch (err) {
      showMessage(err.message || 'Could not load quotations.', 'error');
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(typeEl.value, inputEl.value.trim());
  });

  // Entry point used by the header "Dashboard + Search" bar on every
  // advisor screen. An empty value lists every quote on file; a value
  // is matched across registration number, owner name and quotation number.
  window.goToReports = function goToReports(searchValue = '') {
    const value = String(searchValue || '').trim();
    showScreen('screen-reports');
    typeEl.value = value ? 'all' : 'all';
    inputEl.value = value;
    inputEl.placeholder = placeholders[typeEl.value];
    runSearch('all', value);
  };

  // Load everything the first time the Reports screen is used, if it's
  // reached some other way before goToReports runs a query.
  window.loadAllReports = function loadAllReports() {
    typeEl.value = 'all';
    inputEl.value = '';
    runSearch('all', '');
  };
})();
