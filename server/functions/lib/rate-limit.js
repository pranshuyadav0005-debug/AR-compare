const redis = require('./redis');
const windows = new Map();
const MAX_KEYS = 10000;
function localLimit(key, limit, seconds) {
  const now = Date.now();
  let item = windows.get(key);
  if (!item || item.expires <= now) {
    if (windows.size >= MAX_KEYS) {
      for (const [k, v] of windows) if (v.expires <= now) windows.delete(k);
      if (windows.size >= MAX_KEYS && !windows.has(key)) return { allowed: false, remaining: 0, distributed: false };
    }
    item = { count: 0, expires: now + seconds * 1000 };
    windows.set(key, item);
  }
  item.count++;
  return { allowed: item.count <= limit, remaining: Math.max(0, limit - item.count), distributed: false };
}
async function rateLimit(key, limit, windowSeconds) {
  const local = localLimit(key, limit, windowSeconds);
  if (!local.allowed || !redis.enabled()) return local;
  try {
    // Atomic increment + expiry avoids a permanently unexpiring counter.
    const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n";
    const count = Number(await redis.command(['eval', script, '1', `${process.env.APP_COORDINATION_NAMESPACE||`ar-advisors:${process.env.NODE_ENV||'development'}`}:rl:${key}`, String(windowSeconds)]));
    if (!Number.isFinite(count)) throw new Error('Invalid limiter response');
    return { allowed: count <= limit, remaining: Math.min(local.remaining, Math.max(0, limit - count)), distributed: true };
  } catch { if(process.env.APP_DEPLOYMENT_MODE==='multiple')throw Object.assign(new Error('Shared request limiting is unavailable. Please retry shortly.'),{status:503});return { ...local, degraded: true }; }
}
function clientKey(event) { return String(event.clientIp || 'unknown').slice(0, 80); }
module.exports = { rateLimit, clientKey };
