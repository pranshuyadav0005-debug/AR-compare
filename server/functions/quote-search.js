const { json } = require('./lib/http');
const { select } = require('./lib/supabase');
const { requireAuth } = require('./lib/app-auth');

const MAX_QUERY_LENGTH = 100;
const ALLOWED_FIELDS = new Set(['registration', 'owner', 'quotation', 'all']);

function normalizeRegistration(value) {
  return String(value || '').replace(/\s+/g, '').toUpperCase();
}
function normalizeQuotation(value) {
  return String(value || '').trim().toUpperCase();
}
function escapeLike(value) {
  return String(value).replace(/[\\.*%_]/g, ch => `\\${ch}`);
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });

  let auth;
  try { auth = await requireAuth(event, ['advisor', 'admin']); }
  catch (e) { return json(e.status || 500, { error: e.status ? e.message : 'Internal server error.' }); }

  const type = String(event.queryStringParameters?.type || 'all').trim().toLowerCase();
  const rawQuery = String(event.queryStringParameters?.q || '').trim();
  if (!ALLOWED_FIELDS.has(type)) return json(400, { error: 'Select registration number, owner name, or quotation number.' });
  if (rawQuery.length > MAX_QUERY_LENGTH) return json(400, { error: 'Search value is too long.' });

  const advisorId = encodeURIComponent(auth.advisor.id);
  const filters = [`advisor_id=eq.${advisorId}`];

  // No search value: the Reports screen's default view, listing every
  // quotation the advisor has generated, most recent first.
  if (rawQuery) {
    if (type === 'registration') {
      const value = normalizeRegistration(rawQuery);
      if (!value) return json(400, { error: 'Enter a valid registration number.' });
      filters.push(`registration_number=eq.${encodeURIComponent(value)}`);
    } else if (type === 'quotation') {
      const value = normalizeQuotation(rawQuery);
      filters.push(`quotation_number=eq.${encodeURIComponent(value)}`);
    } else if (type === 'owner') {
      // Owner-name search intentionally supports partial matching.
      const value = escapeLike(rawQuery.toLowerCase());
      filters.push(`owner_name=ilike.*${encodeURIComponent(value)}*`);
    } else {
      // "all": match the header search bar against every quote field —
      // registration number, quotation number, or a partial owner name.
      const regValue = normalizeRegistration(rawQuery);
      const quoteValue = normalizeQuotation(rawQuery);
      const ownerValue = escapeLike(rawQuery.toLowerCase());
      const or = [
        `registration_number.eq.${JSON.stringify(regValue)}`,
        `quotation_number.eq.${JSON.stringify(quoteValue)}`,
        `owner_name.ilike.${JSON.stringify("*" + ownerValue + "*")}`
      ].join(',');
      // Encode the whole value, so &, # and = can never add PostgREST parameters.
      filters.push(`or=${encodeURIComponent('(' + or + ')')}`);
    }
  }

  try {
    const rows = await select('quotes', [
      ...filters,
      'select=id,quotation_number,owner_name,registration_number,vehicle_details,idv_value,idv_auto_calculated,comparison_result,pdf_url,created_at',
      'order=created_at.desc',
      'limit=50'
    ].join('&'));

    return json(200, { results: rows || [], count: Array.isArray(rows) ? rows.length : 0 });
  } catch (e) {
    return json(e.status || 500, { error: e.status ? e.message : 'Could not search saved quotations.' });
  }
};
