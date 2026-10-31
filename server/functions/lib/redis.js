const crypto = require('crypto');

function redisConfig() {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN,
  };
}

function enabled() {
  const c = redisConfig();
  return Boolean(c.url && c.token);
}

async function command(parts, timeoutMs = 1200, outerSignal) {
  if (!enabled()) return null;
  if(outerSignal===undefined)outerSignal=require('../../services/request-budget').context()?.signal;
  const { url, token } = redisConfig();
  const endpoint = url.replace(/\/$/, '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', redirect: 'error', body: JSON.stringify(parts),
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      signal: outerSignal ? AbortSignal.any([controller.signal, outerSignal]) : controller.signal,
    });
    if (!response.ok) throw new Error(`Redis HTTP ${response.status}`);
    const data = await response.json();
    if (data.error) throw new Error('Redis command failed');
    return data.result;
  } finally {
    clearTimeout(timer);
  }
}

async function get(key) { return command(['get', key]); }
async function setEx(key, seconds, value) { return command(['set', key, value, 'EX', seconds]); }
async function incr(key) { return command(['incr', key]); }
async function expire(key, seconds) { return command(['expire', key, seconds]); }

function hashKey(prefix, payload) {
  const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  return `${prefix}:${hash}`;
}

module.exports = { enabled, command, get, setEx, incr, expire, hashKey };
