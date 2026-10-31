const { json } = require('./lib/http');
const { getSession } = require('./lib/app-auth');
exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });
  try { const a = await getSession(event); return a ? json(200, { session: { id:a.advisor.id, username:a.advisor.username, role:a.advisor.role, name:a.advisor.name } }) : json(401, { error:'Not signed in.' }); } catch { return json(503, { error:'Session service is temporarily unavailable. Please retry.' }); }
};
