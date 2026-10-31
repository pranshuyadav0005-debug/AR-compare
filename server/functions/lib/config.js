function numberEnv(name, fallback, min, max) {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === '') return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}
function assertStartupConfig() {
  if(process.env.APP_DEPLOYMENT_MODE&&!['single','multiple'].includes(process.env.APP_DEPLOYMENT_MODE))throw new Error('APP_DEPLOYMENT_MODE must be single or multiple.');
  if(process.env.APP_COORDINATION_NAMESPACE&&!/^[A-Za-z0-9:_-]{1,80}$/.test(process.env.APP_COORDINATION_NAMESPACE))throw new Error('Use a short alphanumeric APP_COORDINATION_NAMESPACE without braces.');
  if (process.env.NODE_ENV !== 'production') return;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before starting production.');
  if (process.env.APP_ATOMIC_ACCOUNTS === 'false') throw new Error('Production cannot disable transactional account operations.');
  const appOrigin = new URL(process.env.APP_ORIGIN || 'invalid');
  if (appOrigin.protocol !== 'https:' || appOrigin.username || appOrigin.password || appOrigin.pathname !== '/' || appOrigin.search || appOrigin.hash) throw new Error('APP_ORIGIN must be the canonical HTTPS origin.');
  if (process.env.BOOTSTRAP_ADMIN_SECRET) throw new Error('Remove BOOTSTRAP_ADMIN_SECRET before starting production. Use the offline bootstrap command.');
  if (process.env.TRUST_PROXY_HOPS !== undefined && !/^[0-5]$/.test(process.env.TRUST_PROXY_HOPS)) throw new Error('TRUST_PROXY_HOPS must be an integer from 0 to 5.');
  const redisUrl=process.env.UPSTASH_REDIS_REST_URL||process.env.REDIS_REST_URL;
  const redisToken=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.REDIS_REST_TOKEN;
  if(redisUrl||redisToken){if(!redisUrl||!redisToken)throw new Error('Redis requires both an HTTPS REST URL and token.');const parsed=new URL(redisUrl);if(parsed.protocol!=='https:'||parsed.username||parsed.password)throw new Error('Redis must use HTTPS without URL credentials.');}
  const url = new URL(process.env.SUPABASE_URL);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('SUPABASE_URL must use HTTPS without URL credentials.');
  if (process.env.APP_DEPLOYMENT_MODE === 'multiple' && !((process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL) && (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN))) throw new Error('Multiple application instances require shared Redis coordination.');
  if (process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_TOKEN) throw new Error('Redis URL requires its token.');
}
module.exports = {
  authIpRateLimit: Math.floor(numberEnv('AUTH_IP_RATE_LIMIT', 300, 10, 2000)),
  signupIpRateLimit: Math.floor(numberEnv('SIGNUP_IP_RATE_LIMIT', 30, 1, 300)),
  quoteCacheTtl: numberEnv('QUOTE_CACHE_TTL_SECONDS', 30, 0, 300),
  rateLimit: numberEnv('QUOTE_RATE_LIMIT', 60, 1, 600),
  rateWindow: numberEnv('QUOTE_RATE_WINDOW_SECONDS', 60, 10, 3600),
  maxConcurrentInsurers: Math.floor(numberEnv('MAX_CONCURRENT_INSURERS', 5, 1, 10)),
  maxAdvisorDiscount: numberEnv('MAX_ADVISOR_DISCOUNT_PERCENT', 100, 0, 100),
  trustedProxyHops: Math.floor(numberEnv('TRUST_PROXY_HOPS', 0, 0, 5)),
  responseBudgetMs: Math.floor(numberEnv('QUOTE_RESPONSE_BUDGET_MS', 4800, 1000, 4800)),
  saveReserveMs: Math.floor(numberEnv('QUOTE_SAVE_RESERVE_MS', 900, 300, 1500)),
  maxActiveComparisons: Math.floor(numberEnv('MAX_ACTIVE_COMPARISONS', 60, 30, 300)),
  providerConcurrency: Math.floor(numberEnv('PROVIDER_CONCURRENCY', 50, 1, 300)),
  perProviderConcurrency: Math.floor(numberEnv('PER_PROVIDER_CONCURRENCY', 10, 1, 100)),
  providerQueueLimit: Math.floor(numberEnv('PROVIDER_QUEUE_LIMIT', 600, 30, 2000)),
  databaseConcurrency: Math.floor(numberEnv('DATABASE_CONCURRENCY', 20, 1, 100)),
  databaseQueueLimit: Math.floor(numberEnv('DATABASE_QUEUE_LIMIT', 300, 30, 1000)),
  assertStartupConfig,
};
