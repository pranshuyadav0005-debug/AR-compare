const redis = require('./redis');

const memoryCache = new Map();
const MAX_MEMORY_ENTRIES = 200;

function memoryGet(key) {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (item.expiresAt <= Date.now()) { memoryCache.delete(key); return null; }
  return item.value;
}

function memorySet(key, value, ttlSeconds) {
  if (memoryCache.size >= MAX_MEMORY_ENTRIES) {
    const first = memoryCache.keys().next().value;
    if (first) memoryCache.delete(first);
  }
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

async function get(key) {
  const local = memoryGet(key);
  if (local) return { value: local, source: 'memory' };
  if (!redis.enabled()) return null;
  try {
    const value = await redis.get(key);
    if (!value) return null;
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return { value: parsed, source: 'redis' };
  } catch { return null; }
}

async function set(key, value, ttlSeconds) {
  memorySet(key, value, ttlSeconds);
  if (!redis.enabled()) return { stored: true, distributed: false };
  try {
    await redis.setEx(key, ttlSeconds, JSON.stringify(value));
    return { stored: true, distributed: true };
  } catch { return { stored: true, distributed: false }; }
}

module.exports = { get, set };
