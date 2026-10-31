const assert = require('assert');
// Smoke tests must never contact a production Redis instance.
for (const key of ['UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','REDIS_REST_URL','REDIS_REST_TOKEN']) delete process.env[key];
const cache = require('../server/functions/lib/cache');
const { mapWithConcurrency } = require('../server/functions/lib/concurrency');
const { rateLimit } = require('../server/functions/lib/rate-limit');

(async () => {
  const key = 'stage4:test';
  await cache.set(key, { ok: true }, 5);
  const hit = await cache.get(key);
  assert.deepStrictEqual(hit.value, { ok: true });

  let active = 0;
  let maxActive = 0;
  const results = await mapWithConcurrency([1,2,3,4,5], 2, async n => {
    active++; maxActive = Math.max(maxActive, active);
    await new Promise(r => setTimeout(r, 15));
    active--;
    return n * 2;
  });
  assert.strictEqual(maxActive, 2);
  assert.deepStrictEqual(results.map(r => r.value), [2,4,6,8,10]);

  const limit = await rateLimit('stage4-local-test', 60, 60);
  assert.strictEqual(limit.allowed, true);
  console.log('Stage 4 smoke tests passed.');
})();
