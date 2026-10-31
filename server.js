'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Built-in loading keeps local .env files out of public/ and avoids a runtime dependency.
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const MAX_BODY_BYTES = 64 * 1024;
const crypto = require('node:crypto');
const { rateLimit } = require('./server/functions/lib/rate-limit');
let draining = false, activeApi = 0;
const STATIC_ROOT = path.join(__dirname, 'public');
const config = require('./server/functions/lib/config');
config.assertStartupConfig();

const handlers = {
  '/api/auth/login': require('./server/functions/auth-login').handler,
  '/api/auth/logout': require('./server/functions/auth-logout').handler,
  '/api/auth/me': require('./server/functions/auth-me').handler,
  '/api/auth/register': require('./server/functions/auth-register').handler,
  '/api/vehicle/lookup': require('./server/functions/vehicle-lookup').handler,
  '/api/quote': require('./server/functions/quote').handler,
  '/api/quotes/search': require('./server/functions/quote-search').handler,
  '/api/ready': require('./server/functions/readiness').handler,
  '/api/health': require('./server/functions/health').handler,
  '/api/bootstrap-admin': require('./server/functions/bootstrap-admin').handler,
};

function routeHandler(urlPath) {
  if (handlers[urlPath]) return { fn: handlers[urlPath], eventPath: urlPath };
  let match;
  if ((match = urlPath.match(/^\/api\/admin\/users\/([^/]+)\/status$/))) {
    return { fn: require('./server/functions/admin-user-status').handler, eventPath: `/api/admin/users/${match[1]}/status` };
  }
  if ((match = urlPath.match(/^\/api\/admin\/users\/([^/]+)\/reset-password$/))) {
    return { fn: require('./server/functions/admin-reset-password').handler, eventPath: `/api/admin/users/${match[1]}/reset-password` };
  }
  if (urlPath === '/api/admin/users') return { fn: require('./server/functions/admin-users').handler, eventPath: urlPath };
  return null;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return resolve('');
    if (Number(req.headers['content-length']) > MAX_BODY_BYTES) { req.resume(); return reject(Object.assign(new Error('Request too large'), { status: 413 })); }
    let size = 0, exceeded = false;
    const chunks = [];
    req.on('data', chunk => {
      if (exceeded) return;
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        exceeded = true; chunks.length = 0;
        reject(Object.assign(new Error('Request too large'), { status: 413 }));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => { if (!exceeded) resolve(Buffer.concat(chunks).toString('utf8')); });
    req.on('aborted', () => reject(Object.assign(new Error('Request aborted'), { status: 400 })));
    req.on('error', reject);
  });
}

function headersObject(req) {
  const out = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) out[key] = value.join(', ');
    else if (value !== undefined) out[key] = value;
  }
  return out;
}

function securityHeaders() {
  return {
    ...(process.env.NODE_ENV === 'production' ? {'Strict-Transport-Security': 'max-age=31536000'} : {}),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.svgrepo.com https://upload.wikimedia.org; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  };
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...securityHeaders(), ...headers });
  res.end(body);
}

async function api(req, res, route) {
  if (activeApi >= 120) return send(res, 503, JSON.stringify({error:'Server busy. Retry shortly.'}), {'content-type':'application/json','cache-control':'no-store','retry-after':'2'});
  activeApi++;
  try {
    const limit = await rateLimit(`api:${clientAddress(req)}`, 600, 60);
    if (!limit.allowed) return send(res, 429, JSON.stringify({error:'Too many requests.'}), {'content-type':'application/json','cache-control':'no-store','retry-after':'60'});
    return await handleApi(req, res, route);
  } catch { return send(res, 503, JSON.stringify({error:'Request limiting unavailable.'}), {'content-type':'application/json','cache-control':'no-store','retry-after':'2'}); }
  finally { activeApi--; }
}

async function handleApi(req, res, route) {
  let body;
  try { body = await readBody(req); }
  catch (err) { return send(res, err.status || 400, JSON.stringify({ error: err.status === 413 ? 'Request too large' : 'Invalid request.' }), { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }); }

  if (body && !['GET','HEAD','OPTIONS'].includes(req.method)) {
    if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) return send(res, 415, JSON.stringify({error:'Use application/json for this request.'}), {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
    try { const parsed = JSON.parse(body); if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error(); }
    catch { return send(res, 400, JSON.stringify({error:'Request body must be a JSON object.'}), {'content-type':'application/json; charset=utf-8','cache-control':'no-store'}); }
  }

  const event = {
    httpMethod: req.method,
    path: route.eventPath,
    headers: headersObject(req),
    body,
    queryStringParameters: Object.fromEntries(new URL(req.url, `http://${req.headers.host || 'localhost'}`).searchParams.entries()),
    isBase64Encoded: false,
    clientIp: clientAddress(req),
    isSecure: !!req.socket.encrypted || (config.trustedProxyHops > 0 && String(req.headers['x-forwarded-proto'] || '').split(',').pop().trim() === 'https'),
  };

  try {
    const result = await route.fn(event, {});
    const responseHeaders = { ...(result?.headers || {}) };
    // This is a private same-origin server; it deliberately does not emit
    // wildcard Access-Control-Allow-Origin headers.
    delete responseHeaders['access-control-allow-origin'];
    delete responseHeaders['access-control-allow-methods'];
    delete responseHeaders['access-control-allow-headers'];
    return send(res, result?.statusCode || 200, result?.body || '', responseHeaders);
  } catch (err) {
    console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'error', message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : undefined }));
    return send(res, err.status || 500, JSON.stringify({ error: err.status ? err.message : 'Internal server error.' }), { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  }
}

function clientAddress(req) {
  const forwarded = config.trustedProxyHops > 0 ? String(req.headers['x-forwarded-for'] || '').split(',').map(x => x.trim()).filter(Boolean) : [];
  const chain = [...forwarded, req.socket.remoteAddress || 'unknown'];
  return chain[Math.max(0, chain.length - 1 - config.trustedProxyHops)];
}
function safeStaticPath(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath.split('?')[0]); } catch { return null; }
  if (decoded.includes('\\') || decoded.includes('\0')) return null;
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  if (relative.split('/').some(part => part.startsWith('.') || part === '..')) return null;
  // Only public entry pages and known asset types are web-accessible.
  if (!['index.html', 'motor-insurance.html', 'insurance-selection.html'].includes(relative) &&
      !/^(?:css|js|assets)\/[A-Za-z0-9_./-]+\.(?:css|js|png|jpg|jpeg|svg|ico|webp|woff2?)$/i.test(relative)) return null;
  const resolved = path.resolve(STATIC_ROOT, relative);
  try {
    const real = fs.realpathSync(resolved);
    if (!real.startsWith(fs.realpathSync(STATIC_ROOT) + path.sep)) return null;
    return real;
  } catch { return null; }
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

function staticFile(req, res) {
  const file = safeStaticPath(req.url || '/');
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return send(res, 404, 'Not found', { 'content-type': 'text/plain; charset=utf-8' });
  }
  const ext = path.extname(file).toLowerCase();
  // HTML is never cached. JS/CSS/JSON are cached but the browser must re-check with the
  // server every time (ETag -> cheap 304 when unchanged), so a new deploy can never leave
  // users running fresh HTML with a stale script. Images keep the 1-hour cache.
  const revalidate = ['.js', '.css', '.json'].includes(ext);
  const cache = ext === '.html' ? 'no-store' : revalidate ? 'no-cache' : 'public, max-age=3600';
  const stat = fs.statSync(file);
  const headers = { 'content-type': mime[ext] || 'application/octet-stream', 'cache-control': cache };
  if (ext !== '.html') {
    headers.etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    if (req.headers['if-none-match'] === headers.etag) return send(res, 304, '', headers);
  }
  return send(res, 200, req.method === 'HEAD' ? '' : fs.readFileSync(file), headers);
}

const server = http.createServer({maxHeaderSize:16384, connectionsCheckingInterval:1000}, async (req, res) => {
  try {
    const requestId = crypto.randomUUID();
    res.setHeader('X-Request-Id', requestId);
    req.headers['x-request-id'] = requestId;
    if (draining) return send(res, 503, 'Server restarting', {'retry-after':'5'});
    const started = Date.now();
    res.once('finish', () => console.log(JSON.stringify({requestId,method:req.method,status:res.statusCode,durationMs:Date.now()-started})));
    if (process.env.NODE_ENV === 'production' && req.url !== '/api/health') {
      const origin = new URL(process.env.APP_ORIGIN);
      const secure = !!req.socket.encrypted || (config.trustedProxyHops > 0 && String(req.headers['x-forwarded-proto'] || '').split(',').pop().trim() === 'https');
      if (!secure || req.headers.host !== origin.host) return send(res, 400, 'Use the configured HTTPS origin.', {'cache-control':'no-store'});
    }
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      const route = routeHandler(url.pathname);
      if (!route) return send(res, 404, JSON.stringify({ error: 'Not found' }), { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      return api(req, res, route);
    }
    if (!['GET', 'HEAD'].includes(req.method)) return send(res, 405, 'Method not allowed', { 'content-type': 'text/plain; charset=utf-8' });
    return staticFile(req, res);
  } catch (err) {
    console.error(err);
    return send(res, 500, 'Internal server error', { 'content-type': 'text/plain; charset=utf-8' });
  }
});

server.keepAliveTimeout = 5000;
server.timeout = 30000;
server.maxRequestsPerSocket = 1000;
server.maxConnections = 512;
server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.listen(PORT, HOST, () => console.log(`Test Portal private server listening on ${HOST}:${server.address().port}`));

function shutdown() {
  if (draining) return;
  draining = true;
  server.close(() => process.exit(0));
  setTimeout(() => { server.closeAllConnections(); process.exit(1); }, 15000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
