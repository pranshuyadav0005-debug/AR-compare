const crypto = require('crypto');

function requestId(event) {
  const supplied = event?.headers?.['x-request-id'] || event?.headers?.['X-Request-ID'];
  if (supplied && /^[A-Za-z0-9._:-]{1,80}$/.test(supplied)) return supplied;
  return crypto.randomUUID();
}

const { clientKey } = require('./rate-limit');

function log(level, message, fields = {}) {
  const entry = { ts: new Date().toISOString(), level, message, ...fields };
  if (level === 'error') console.error(JSON.stringify(entry));
  else console.log(JSON.stringify(entry));
}

module.exports = { requestId, clientKey, log };
