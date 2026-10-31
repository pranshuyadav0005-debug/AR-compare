// Bound remote payloads before decoding/parsing, including chunked responses.
async function responseText(response, maxBytes = 2 * 1024 * 1024) {
  const tooLarge = () => Object.assign(new Error('Remote response exceeds size limit.'), {retryable:false});
  if (Number(response.headers.get('content-length')) > maxBytes) { await response.body?.cancel(); throw tooLarge(); }
  if (!response.body) return '';
  const reader = response.body.getReader(), chunks = [];
  let size = 0;
  try {
    for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw tooLarge(); }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks, size).toString('utf8');
  } finally { reader.releaseLock(); }
}
module.exports = {responseText};
