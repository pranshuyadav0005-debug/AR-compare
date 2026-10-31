const { json } = require('./http');
function handleError(err) {
  const status = err.status || 500;
  return json(status, { error: status >= 500 ? 'Internal server error.' : err.message });
}
module.exports = { handleError };
