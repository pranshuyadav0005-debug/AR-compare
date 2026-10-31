const { json } = require('./lib/http');
const { select } = require('./lib/supabase');
const { verifyPasswordAsync, createSession, authCookies, sameOrigin } = require('./lib/app-auth');
const { rateLimit, clientKey } = require('./lib/rate-limit');
exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!sameOrigin(event)) return json(403, { error: 'Cross-origin request blocked.' });
  const rl = await rateLimit(`login-ip:${clientKey(event)}`, require('./lib/config').authIpRateLimit, 900);
  if (!rl.allowed) return json(429, { error: 'Too many login attempts. Please try again later.' });
  let b; try { b = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON.' }); }
  if (!b || typeof b !== 'object' || Array.isArray(b)) return json(400, { error: 'Invalid request.' });
  if (typeof b.username !== 'string' || typeof b.password !== 'string') return json(400,{error:'Account fields must be strings.'});
  const username = String(b.username || '').trim().toLowerCase();
  const password = String(b.password || '');
  if (!/^[a-z0-9._-]{3,40}$/.test(username) || !password || password.length > 128) return json(400, { error: 'Username and password are required.' });
  const accountLimit = await rateLimit(`login-account:${username}`, 8, 900);
  if (!accountLimit.allowed) return json(429, { error: 'Too many login attempts for this account. Please try again later.' });
  const advisors = await select('advisors', `username=eq.${encodeURIComponent(username)}&select=id,name,username,role,approval_status,is_active,auth_version&limit=1`);
  // Deliberately avoid revealing whether a username exists.
  if (!advisors?.length) { await verifyPasswordAsync(password, null); return json(401, { error: 'Invalid username or password.' }); }
  const advisor = advisors[0];
  const hashes = await select('app_passwords', `advisor_id=eq.${encodeURIComponent(advisor.id)}&select=password_hash&limit=1`);
  if (!await verifyPasswordAsync(password, hashes?.[0]?.password_hash)) return json(401, { error: 'Invalid username or password.' });
  if (advisor.is_active === false) return json(403, { error: 'Your account is currently deactivated by the Admin.' });
  if (advisor.approval_status !== 'approved') return json(403, { error: advisor.approval_status === 'rejected' ? 'Your advisor account was rejected by the Admin.' : 'Your advisor account is waiting for Admin approval.' });
  let s; try { s = await createSession(advisor); } catch (e) { if(e.data?.code==='42501') return json(401,{error:'Credentials changed. Please sign in again.'}); throw e; }
  return json(200, { session: { id: advisor.id, username: advisor.username, role: advisor.role, name: advisor.name } }, { 'set-cookie': authCookies(s, event) });
};
