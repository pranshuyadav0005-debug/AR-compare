// ===========================================================
// Immutable submission audit trail — see schema.sql's quote_submissions
// table for the full rationale. This module only ever INSERTs; nothing
// here updates or deletes a row, by design.
//
// Writing an audit row must never be able to break the actual quote flow
// (an advisor should never see "quote failed" because an audit insert had
// a hiccup), so every insert here is wrapped and logged rather than thrown.
// ===========================================================
const { insert } = require('./supabase');
const { log } = require('./request');
function redact(value, depth = 0) {
  if (depth > 15) return '[truncated]';
  if (Array.isArray(value)) return value.slice(0, 100).map(v => redact(v, depth + 1));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, /password|secret|token|authorization|api.?key|cookie/i.test(k) ? '[redacted]' : redact(v, depth + 1)]));
  return typeof value === 'string' ? value.slice(0, 10000) : value;
}

// One row per meaningful event:
//  - insurerId === null -> the overall "here is what was submitted" snapshot,
//    written once per /api/quote call regardless of how many insurers were
//    priced, so there's always a record even before any insurer API is live.
//  - insurerId set -> one row per insurer whose adapter actually attempted a
//    real outbound API call (api_status === 'live'), carrying the exact
//    request/response for that specific insurer.
async function recordSubmission({ quotationId, advisorId, insurerId, registrationNumber, vehicle, idv, policy, declaredAccurate, requestPayload, responsePayload, status, requestId }) {
  try {
    await insert('quote_submissions', {
      quotation_id: quotationId || null,
      advisor_id: advisorId || null,
      insurer_id: insurerId || null,
      registration_number: registrationNumber || null,
      vehicle_snapshot: vehicle || {},
      idv_snapshot: Number.isFinite(Number(idv)) ? Number(idv) : null,
      policy_snapshot: policy || {},
      advisor_declared_accurate: declaredAccurate === true,
      request_payload: redact(requestPayload) || null,
      response_payload: redact(responsePayload) || null,
      status: status || null,
      request_id: requestId || null,
    }, 'return=minimal');
    return true;
  } catch (err) {
    // Deliberately swallowed: the quote itself must still be returned/saved
    // even if the audit insert fails (e.g. migration not yet applied). Log
    // loudly so this doesn't fail silently in practice.
    log('error', 'quote_submission_audit_failed', { quotationId, insurerId, requestId });
    return false;
  }
}

module.exports = { recordSubmission, redact };
