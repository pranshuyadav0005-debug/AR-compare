// ===========================================================
// Registration-number verification adapter.
//
// Today, vehicle-lookup.js can only ever confirm a registration number
// against this advisor's OWN previously-saved vehicles (js/vehicle-lookup.js
// -> server/functions/vehicle-lookup.js -> `vehicles` table). It has no way
// to confirm that a registration number genuinely belongs to the make/
// model/variant an advisor typed in on the Vehicle Details screen, because
// nothing here has ever called an actual RTO / VAHAN source of truth.
//
// This adapter is the pluggable slot for that. Same shape as
// insurer-registry.js's adapterFor(): configuration lives in an env var,
// not in code, so switching on a real provider later is a config change,
// not a rewrite. Until VAHAN_API_ENDPOINT (or an equivalent provider) is
// set, verifyVehicle() always returns status 'not_configured' rather than
// pretending to have verified anything — the calling code (and the UI) is
// expected to treat 'not_configured' the same as "unverified: rely on the
// advisor's manual entry and their accuracy declaration".
// ===========================================================
const { fetchJson } = require('./http');

function isConfigured() {
  return Boolean(process.env.VAHAN_API_ENDPOINT);
}

// Returns one of:
//   { status: 'not_configured' }
//   { status: 'verified', data: { make, model, variant, fuelType, registeredDate, ... } }
//   { status: 'mismatch', data: {...}, reason: 'text' }     -- provider responded, but disagrees with what was entered
//   { status: 'not_found' }                                  -- provider has no record for this registration number
//   { status: 'unavailable', reason: 'text' }                -- provider configured but the call failed/timed out
async function verifyVehicle(registrationNumber, enteredDetails = {}) {
  if (!isConfigured()) return { status: 'not_configured' };

  const url = new URL(process.env.VAHAN_API_ENDPOINT);
  const hosts = String(process.env.VEHICLE_PROVIDER_ALLOWED_HOSTS || '').split(',').map(x=>x.trim()).filter(Boolean);
  if (url.protocol!=='https:' || url.username || url.password || url.hash || !hosts.includes(url.hostname)) return {status:'unavailable',reason:'Vehicle provider configuration is not permitted.'};
  url.searchParams.set('registrationNumber',registrationNumber);
  const endpoint = url.href;
  const headers = { 'content-type': 'application/json' };
  if (process.env.VAHAN_API_KEY_ENV) {
    const key = process.env[process.env.VAHAN_API_KEY_ENV];
    if (!key) return {status:'unavailable',reason:'Vehicle provider credentials are missing.'};
    if (key) headers[process.env.VAHAN_API_KEY_HEADER || 'x-api-key'] = key;
  }

  try {
    const { data } = await fetchJson(
      endpoint,
      { method: 'GET', headers },
      { timeoutMs: Number(process.env.VAHAN_API_TIMEOUT_MS) || 4500, retries: 1 }
    );

    if (!data || data.found === false) return { status: 'not_found' };

    const providerMake = String(data.make || data.manufacturer || '').trim().toLowerCase();
    const enteredMake = String(enteredDetails.make || '').trim().toLowerCase();
    if (providerMake && enteredMake && providerMake !== enteredMake) {
      return {
        status: 'mismatch',
        data,
        reason: `Registration ${registrationNumber} is on record as ${data.make || data.manufacturer}, not ${enteredDetails.make}.`,
      };
    }

    return { status: 'verified', data };
  } catch (err) {
    return { status: 'unavailable', reason: err?.message || 'Verification provider did not respond.' };
  }
}

module.exports = { verifyVehicle, isConfigured };
