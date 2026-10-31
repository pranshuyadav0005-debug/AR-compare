const {json} = require('./lib/http');
const {select} = require('./lib/supabase');
const redis = require('./lib/redis');
let cached, expires = 0, pending;
exports.handler = async event => {
  if (event.httpMethod !== 'GET') return json(405, {error:'Method not allowed'});
  if (Date.now() < expires) return cached;
  if (pending) return pending;
  pending = (async () => {
    try {
      const rows = await select('app_schema_migrations', 'select=version');
      const versions = new Set((rows || []).map(row => row.version));
      if (!['001_backend_access_and_audit','002_quote_revisions','003_public_launch','004_transactional_security'].every(v => versions.has(v))) throw new Error();
      if (process.env.APP_DEPLOYMENT_MODE === 'multiple') {
        if (!redis.enabled() || String(await redis.command(['ping'])).toUpperCase() !== 'PONG') throw new Error();
      }
      cached = json(200, {ready:true});
    } catch { cached = json(503, {ready:false}); }
    expires = Date.now() + 10000;
    return cached;
  })();
  try { return await pending; } finally { pending = null; }
};
