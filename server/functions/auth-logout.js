const { json } = require('./lib/http');
const { parseCookies, revokeSession, clearAuthCookies, sameOrigin, requireAuth, SESSION_COOKIE } = require('./lib/app-auth');
exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!sameOrigin(event)) return json(403, { error: 'Cross-origin request blocked.' });
  try {
    if (parseCookies(event)[SESSION_COOKIE]) await requireAuth(event);
    await revokeSession(parseCookies(event)[SESSION_COOKIE]);
  } catch (error) { if(error.status===401)return json(200,{ok:true},{'set-cookie':clearAuthCookies(event)}); return json(error.status || 500, {error:error.status ? error.message : 'Could not sign out.'}); }
  return json(200, { ok:true }, { 'set-cookie': clearAuthCookies(event) });
};
