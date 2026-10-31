const crypto = require('crypto');
const { select, insert, update, remove, eq } = require('./supabase');

const SESSION_COOKIE = process.env.NODE_ENV==='production'?'__Host-test_session':'test_session';
const CSRF_COOKIE = process.env.NODE_ENV==='production'?'__Host-test_csrf':'test_csrf';
const SESSION_DAYS = 7;

function hashToken(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
function newToken(bytes = 32) { return crypto.randomBytes(bytes).toString('base64url'); }
function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$16384$8$1$${salt.toString('base64')}$${derived.toString('base64')}`;
}
function verifyPassword(password, stored) {
  try {
    const [alg, n, r, p, saltB64, hashB64] = String(stored).split('$');
    if (alg !== 'scrypt') return false;
    const salt = Buffer.from(saltB64, 'base64');
    const expected = Buffer.from(hashB64, 'base64');
    const actual = crypto.scryptSync(password, salt, expected.length, { N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024 });
    return crypto.timingSafeEqual(actual, expected);
  } catch { return false; }
}

const { promisify } = require('node:util');
const scryptAsync = promisify(crypto.scrypt);
const { BoundedPool } = require('../../services/bounded-pool');
const passwordPool = new BoundedPool(4, 24);
async function hashPasswordAsync(password) {
  return passwordPool.run(async () => {
    const salt = crypto.randomBytes(16);
    const hash = await scryptAsync(password, salt, 64, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 });
    return `scrypt$32768$8$3$${salt.toString('base64')}$${hash.toString('base64')}`;
  });
}
const dummySalt=crypto.randomBytes(16);
const dummyHash=`scrypt$32768$8$3$${dummySalt.toString('base64')}$${crypto.scryptSync('dummy-unusable-password',dummySalt,64,{N:32768,r:8,p:3,maxmem:64*1024*1024}).toString('base64')}`;
async function verifyPasswordAsync(password, stored) {
  return passwordPool.run(async () => {
    try {
      const [alg, n, r, p, saltB64, hashB64] = String(stored || dummyHash).split('$');
      if (alg !== 'scrypt' || r !== '8' || !((n==='16384'&&p==='1')||(n==='32768'&&p==='3'))) return false;
      const expected = Buffer.from(hashB64, 'base64');
      if (expected.length !== 64) return false;
      const salt=Buffer.from(saltB64,'base64');
      if(salt.length!==16)return false;
      const actual = await scryptAsync(password, salt, 64, { N: Number(n), r: 8, p: Number(p), maxmem: 64 * 1024 * 1024 });
      return crypto.timingSafeEqual(actual, expected) && !!stored;
    } catch { return false; }
  });
}

function cookie(name, value, maxAge, httpOnly, secure = true) {
  return `${name}=${value}; Max-Age=${maxAge}; Path=/; ${httpOnly ? 'HttpOnly; ' : ''}${secure ? 'Secure; ' : ''}SameSite=Lax`;
}
function clearCookie(name, secure = true) { return `${name}=; Max-Age=0; Path=/; ${secure ? 'Secure; ' : ''}SameSite=Lax`; }
// A request is only "secure" when it actually arrived over HTTPS (directly,
// or via a trusted reverse proxy such as Render's edge, which sets
// x-forwarded-proto). Browsers silently refuse to store a cookie marked
// Secure when it was set over a plain-HTTP connection, so on local
// http://localhost dev the login POST would appear to succeed (200 OK) but
// no session/csrf cookie would ever be saved, and every following page
// would look logged-out. Detect this instead of hardcoding Secure.
function isSecureRequest(event) {
  return !!event?.isSecure;
}
function parseCookies(event) {
  const raw = event.headers?.cookie || event.headers?.Cookie || '';
  const cookies = Object.create(null);
  for (const item of raw.split(';')) {
    const i = item.indexOf('=');
    if (i < 1) continue;
    const name=item.slice(0,i).trim();
    if (Object.hasOwn(cookies,name)) { cookies[name]=''; continue; }
    try { cookies[name] = decodeURIComponent(item.slice(i + 1).trim()); } catch { /* ignore malformed cookies */ }
  }
  return cookies;
}
function csrfValid(event) {
  const cookies = parseCookies(event);
  const header = event.headers?.['x-csrf-token'] || event.headers?.['X-CSRF-Token'];
  if (!cookies[CSRF_COOKIE] || !header) return false;
  const expected = Buffer.from(cookies[CSRF_COOKIE]);
  const supplied = Buffer.from(String(header));
  return expected.length === supplied.length && crypto.timingSafeEqual(expected, supplied);
}
function sameOrigin(event) {
  const origin = event.headers?.origin || event.headers?.Origin;
  if (process.env.NODE_ENV === 'production') {
    if (!isSecureRequest(event)) return false;
    if (origin && origin !== process.env.APP_ORIGIN) return false;
  }
  if (!origin) return true;
  const host = event.headers?.host || event.headers?.Host;
  try { const parsed = new URL(origin); return parsed.host === host && parsed.protocol === (isSecureRequest(event) ? 'https:' : 'http:'); } catch { return false; }
}
async function createSession(advisor) {
  const token = newToken();
  const csrf = newToken(24);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();
  await insert('app_sessions', { token_hash: hashToken(token), advisor_id: advisor.id, auth_version: advisor.auth_version ?? 0, expires_at: expires, csrf_token: hashToken(csrf) }, 'return=minimal');
  return { token, csrf, expires };
}
async function revokeSession(token) {
  if (!token) return;
  await update('app_sessions', `token_hash=eq.${encodeURIComponent(hashToken(token))}&revoked_at=is.null`, { revoked_at: new Date().toISOString() }, 'return=minimal');
}
async function getSession(event) {
  const token = parseCookies(event)[SESSION_COOKIE];
  if (!token) return null;
  const rows = await select('app_sessions', `token_hash=eq.${encodeURIComponent(hashToken(token))}&revoked_at=is.null&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=advisor_id,csrf_token,expires_at,auth_version&limit=1`);
  if (!rows?.length) return null;
  const advisors = await select('advisors', `id=eq.${encodeURIComponent(rows[0].advisor_id)}&select=id,name,username,role,approval_status,is_active,auth_version&limit=1`);
  if (!advisors?.length) return null;
  const advisor = advisors[0];
  if ((advisor.auth_version ?? 0) !== (rows[0].auth_version ?? 0)) { await revokeSession(token); return null; }
  if (advisor.is_active === false || advisor.approval_status !== 'approved') { await revokeSession(token); return null; }
  return { token, advisor, session: rows[0] };
}
async function requireAuth(event, roles = null) {
  if (!sameOrigin(event)) { const e = new Error('Cross-origin request blocked.'); e.status = 403; throw e; }
  if (!csrfValid(event) && !['GET','HEAD','OPTIONS'].includes(event.httpMethod)) { const e = new Error('Invalid security token. Refresh and try again.'); e.status = 403; throw e; }
  const auth = await getSession(event);
  if (!auth) { const e = new Error('Your session has expired. Please sign in again.'); e.status = 401; throw e; }
  if (!['GET','HEAD','OPTIONS'].includes(event.httpMethod)) {
    const supplied = String(event.headers?.['x-csrf-token'] || event.headers?.['X-CSRF-Token'] || '');
    const expected = Buffer.from(String(auth.session.csrf_token || ''));
    const actual = Buffer.from(hashToken(supplied));
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) { const e = new Error('Invalid security token. Refresh and try again.'); e.status = 403; throw e; }
  }
  if (roles && !roles.includes(auth.advisor.role)) { const e = new Error('You are not authorized for this action.'); e.status = 403; throw e; }
  return auth;
}
function authCookies(session, event) {
  const secure = process.env.NODE_ENV === 'production' || isSecureRequest(event);
  return [cookie(SESSION_COOKIE, session.token, SESSION_DAYS * 86400, true, secure), cookie(CSRF_COOKIE, session.csrf, SESSION_DAYS * 86400, false, secure)];
}
function clearAuthCookies(event) {
  const secure = process.env.NODE_ENV === 'production' || isSecureRequest(event);
  return [clearCookie(SESSION_COOKIE, secure), clearCookie(CSRF_COOKIE, secure)];
}
module.exports = { hashPasswordAsync, verifyPasswordAsync, hashPassword, verifyPassword, parseCookies, createSession, revokeSession, getSession, requireAuth, authCookies, clearAuthCookies, isSecureRequest, SESSION_COOKIE, CSRF_COOKIE, sameOrigin };
