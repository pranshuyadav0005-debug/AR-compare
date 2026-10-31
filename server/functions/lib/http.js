const {responseText} = require('./response-body');
const {setTimeout:delay}=require('node:timers/promises');
const DEFAULT_TIMEOUT_MS = 4500;
function json(statusCode, body, extraHeaders = {}) { return {statusCode,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...extraHeaders},body:JSON.stringify(body)}; }
const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function fetchJson(url, options = {}, opts = {}) {
  const timeoutMs = Math.max(100, Math.min(15000, Number(opts.timeoutMs) || DEFAULT_TIMEOUT_MS));
  const method = (options.method || 'GET').toUpperCase();
  const retries = Math.max(0, Math.min(2, Number(opts.retries) || 0));
  const safeRetry = ['GET','HEAD'].includes(method) || opts.retrySafe === true;
  for (let attempt=0;;attempt++) {
    const controller = new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs);
    let error;
    const signal=opts.signal ? AbortSignal.any([controller.signal,opts.signal]) : controller.signal;
    if(opts.signal?.aborted){clearTimeout(timer);throw opts.signal.reason;}
    try {
      const response = await fetch(url,{...options,redirect:'error',signal});
      const text=await responseText(response);
      let data;
      try { data=JSON.parse(text); } catch { throw Object.assign(new Error('Provider returned an invalid response.'),{retryable:false}); }
      if (response.ok) return {response,data};
      error=Object.assign(new Error(`Provider HTTP ${response.status}`),{status:response.status,data,retryable:[408,425,429].includes(response.status)||response.status>=500});
    } catch(err) { error=err; }
    finally {clearTimeout(timer);}
    if (opts.signal?.aborted) throw opts.signal.reason;
    if (!safeRetry || error.retryable === false || (error.status && error.status<500 && ![408,425,429].includes(error.status)) || attempt>=retries) throw error;
    await delay(250*(2**attempt)+Math.floor(Math.random()*100),undefined,{signal:opts.signal});
  }
}
module.exports={json,fetchJson,sleep};
