const { fetchJson } = require('./http');
const { normalizeQuote } = require('./normalize');

// One adapter per insurer keeps credentials, request mapping and response mapping
// isolated. New insurer APIs can be added without changing quote.js.
const capacity=require('../../services/provider-capacity');
const ADAPTERS = {
  generic: async ({ insurer, vehicle, idv, policy, signal, requestKey }) => {
    const cfg = insurer.api_config || {};
    if (!cfg.endpoint) throw new Error('API endpoint is not configured');
    const endpoint = new URL(cfg.endpoint);
    const allowHttp = process.env.NODE_ENV !== 'production' && process.env.ALLOW_INSECURE_PROVIDER_HTTP === 'true';
    const hosts = String(process.env.PROVIDER_ALLOWED_HOSTS || '').split(',').map(x=>x.trim()).filter(Boolean);
    if ((endpoint.protocol !== 'https:' && !(allowHttp && endpoint.protocol === 'http:')) || endpoint.username || endpoint.password || !hosts.includes(endpoint.hostname)) throw new Error('Provider endpoint is not allowlisted.');
    if (policy.advisorDiscount > 0 && cfg.supportsAdvisorDiscount !== true) throw new Error('This provider does not support the selected advisor discount.');

    const headers = { 'content-type': 'application/json', ...(cfg.headers || {}) };
    if (cfg.apiKeyHeader && cfg.apiKeyEnv) {
      const value = process.env[cfg.apiKeyEnv];
      if (!value) throw new Error('Provider credentials are not configured');
      headers[cfg.apiKeyHeader] = value;
    }
    if (cfg.bearerTokenEnv) {
      const value = process.env[cfg.bearerTokenEnv];
      if (!value) throw new Error('Provider credentials are not configured');
      headers.authorization = `Bearer ${value}`;
    }

    if (cfg.idempotencyHeader && requestKey) {
      if (!/^[A-Za-z0-9-]+$/.test(cfg.idempotencyHeader) || /^(authorization|cookie|host|content-type)$/i.test(cfg.idempotencyHeader)) throw new Error('Invalid provider idempotency header configuration');
      headers[cfg.idempotencyHeader]=requestKey;
    }
    const body = typeof cfg.requestBody === 'object'
      ? replaceTokens(cfg.requestBody, { vehicle, idv, policy })
      : { vehicle, idv, policy };

    let data, callError;
    try {
      ({ data } = await capacity.run(cfg.endpoint,signal,()=>fetchJson(cfg.endpoint, {
        method: cfg.method || 'POST',
        headers,
        body: JSON.stringify(body),
      }, { timeoutMs: Number(cfg.timeoutMs) || 4500, retries: Number(cfg.retries ?? 0), retrySafe: cfg.retrySafe === true, signal })));
    } catch (err) {
      callError = err;
    }

    if (callError) {
      // Preserve the attempted payload for audit. Failed live quotes stay unavailable.
      // Abort reasons can be shared by several insurer calls; never mutate them.
      throw Object.assign(new Error(callError.message),{name:callError.name,status:callError.status,code:callError.code,data:callError.data,_audit:{requestBody:body,responseBody:callError.data??{error:callError.message}}});
    }

    const quote = normalizeQuote(insurer, data, cfg.responseMapping || {});
    // Not sent to the browser — quoteOne (server/functions/quote.js) reads
    // this to write the immutable quote_submissions row, then strips it
    // before the quote is returned to the client.
    quote._audit = { requestBody: body, responseBody: data };
    return quote;
  },
};

function replaceTokens(value, context) {
  if (Array.isArray(value)) return value.map(v => replaceTokens(v, context));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceTokens(v, context)]));
  if (typeof value !== 'string') return value;
  const match = value.match(/^\$\{(.+)\}$/);
  if (!match) return value;
  return match[1].split('.').reduce((v, k) => (v == null ? undefined : v[k]), context);
}

function adapterFor(insurer) {
  return ADAPTERS[insurer.api_config?.adapter || 'generic'] || ADAPTERS.generic;
}

module.exports = { adapterFor };
