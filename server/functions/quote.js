const crypto=require('crypto');
const {json}=require('./lib/http');
const {adapterFor}=require('./lib/insurer-registry');
const {fallbackQuote}=require('./lib/fallback');
const {mapWithConcurrency}=require('./lib/concurrency');
const {requestId,log}=require('./lib/request');
const {rateLimit}=require('./lib/rate-limit');
const cache=require('./lib/cache');
const redis=require('./lib/redis');
const config=require('./lib/config');
const {select,insert,update}=require('./lib/supabase');
const {requireAuth}=require('./lib/app-auth');
const {recordSubmission}=require('./lib/audit');
const {validateQuoteInput}=require('../services/quote-input');
const {assessQuote}=require('../services/quote-result');
const budget=require('../services/request-budget');
const idempotency=require('../services/idempotency');
let active=0;
exports.capacity=()=>({active,limit:config.maxActiveComparisons});
exports.handler=async event=>{
 if(event.httpMethod!=='POST')return handle(event);
 if(active>=config.maxActiveComparisons)return json(503,{error:'Comparison capacity is busy. Please retry shortly.',code:'busy'},{'retry-after':'1'});
 active++;
 try{return await budget.withBudget(config.responseBudgetMs,()=>handle(event));}
 catch(e){return json(e.status||503,{error:e.code==='deadline'?'Comparison exceeded the response window. Retry using the same request.':e.status?e.message:'Comparison service is temporarily unavailable.',code:e.code||'service_unavailable'},{'retry-after':'1'});}
 finally{active--;}
};

async function handle(event){
 const rid=requestId(event),started=Date.now();
 const headers={'x-request-id':rid};
 if(event.httpMethod==='OPTIONS')return json(204,{});
 if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed'},headers);
 let auth,input;
 try {
  auth=await requireAuth(event,['advisor','admin']);
  const limit=await rateLimit(`quote:${auth.advisor.id}`,config.rateLimit,config.rateWindow);
  if(!limit.allowed)return json(429,{error:'Too many quote requests. Please try again shortly.'},{...headers,'retry-after':String(config.rateWindow)});
  if(Buffer.byteLength(event.body||'','utf8')>65536)return json(413,{error:'Request too large'},headers);
  let payload;try{payload=JSON.parse(event.body||'{}');}catch{return json(400,{error:'Invalid JSON.'},headers);}
  input=validateQuoteInput(payload);

 }catch(e){return json(e.status||500,{error:e.status?e.message:'Unable to prepare the comparison.',requestId:rid},headers);}
 const requestKey=event.headers?.['idempotency-key'];
 try{return await idempotency.run(auth.advisor.id,requestKey,redis.hashKey('input',{...input,vehicle:{...input.vehicle,ageInYears:undefined}}),()=>compare(auth,input,rid,headers,started,requestKey));}
 catch(e){return json(e.status||503,{error:e.status?e.message:'Comparison service is temporarily unavailable.',code:e.code||'service_unavailable'}, {...headers,'retry-after':'1'});}
}
async function compare(auth,input,rid,headers,started,requestKey){
  if(input.quotationId){
   const owned=await select('quotes',`id=eq.${encodeURIComponent(input.quotationId)}&advisor_id=eq.${encodeURIComponent(auth.advisor.id)}&select=id,revision&limit=1`);
   if(!owned?.length)return json(404,{error:'Quotation not found.'},headers);
   if(input.expectedRevision===null)return json(409,{error:'Reopen the saved quotation before updating it.',code:'revision_required'},headers);
   if(owned[0].revision!==input.expectedRevision)return json(409,{error:'This quotation was changed in another request. Reopen the saved quotation before updating it.',code:'revision_conflict'},headers);
  }
 const {vehicle,policy,idv,autoIdv,advisorDiscount,quotationId,declaredAccurate}=input;
 let insurers;
 try{insurers=await getConfiguredInsurers();}catch{log('error','insurer_config_load_failed',{requestId:rid});return json(503,{error:'Insurer configuration could not be loaded. Please try again.',requestId:rid},headers);}
 if(!insurers.length)return json(503,{error:'No insurers are configured for comparison.',requestId:rid},headers);
 const comparisonId=crypto.randomUUID();
 const key=redis.hashKey('quote:v6',{advisor:auth.advisor.id,vehicle:{...vehicle,ageInYears:undefined},idv,policy,insurers:insurers.map(i=>({id:i.id,api_status:i.api_status,api_config:i.api_config,rateCard:i.rateCard}))});
 let results,entries=[],cacheSource='miss';
 if(config.quoteCacheTtl>0){
  const hit=await cache.get(key);
  // Expired provider quotes are never resurrected by the cache.
  if(hit?.value?.results && hit.value.results.every(r=>!r.expiresAt||Date.parse(r.expiresAt)>Date.now())){results=hit.value.results;cacheSource=hit.source;}
 }
 if(!results){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(Object.assign(new Error('Provider response window exceeded.'),{code:'deadline'})),Math.max(1,budget.remaining()-config.saveReserveMs));
  const signal=AbortSignal.any([controller.signal,budget.context().signal]);
  let settled;
  try{settled=await mapWithConcurrency(insurers,config.maxConcurrentInsurers,i=>quoteOne(i,vehicle,idv,policy,advisorDiscount,rid,signal,requestKey?redis.hashKey('provider-request',{advisor:auth.advisor.id,requestKey,insurer:i.id}):undefined));}
  finally{clearTimeout(timer);}
  const internal=settled.map((r,i)=>r.status==='fulfilled'?r.value:unavailable(insurers[i],r.reason));
  for(const q of internal)if(q._audit)entries.push({insurerId:q.insurerId,requestPayload:q._audit.requestBody,responsePayload:q._audit.responseBody,status:q.status});
  results=internal.map(({_audit,...rest})=>rest);
 }
 results.sort((a,b)=>(a.totalPremium??Infinity)-(b.totalPremium??Infinity));
 const response={results,meta:{requestId:rid,comparisonId,requestedIdv:idv,baseIdv:autoIdv,idvSource:vehicle.idvSource,maxAdvisorDiscountPercent:config.maxAdvisorDiscount,durationMs:Date.now()-started,insurerCount:insurers.length,live:results.filter(r=>r.source==='api').length,estimates:results.filter(r=>r.status==='estimate').length,unavailable:results.filter(r=>r.status==='unavailable').length,cache:cacheSource,timedOut:results.filter(r=>r.reason==='deadline').length,persistence:'pending'}};
 try{
  response.quotation=await saveQuote(auth.advisor.id,input,response);
  response.meta.persistence='saved';
 }catch(e){
  if(e.status===404||e.status===409)return json(e.status,{error:e.message,code:e.code,requestId:rid},headers);
  response.quotation=null;response.meta.persistence='failed';
  response.meta.notice='Comparison generated, but the quotation was not saved. Retry before relying on quotation history.';
  log('error','quote_save_failed',{requestId:rid,comparisonId});
 }
 const summary=await recordSubmission({quotationId:response.quotation?.id,advisorId:auth.advisor.id,registrationNumber:vehicle.regNumber,vehicle,idv,policy,declaredAccurate,status:cacheSource==='miss'?'submitted':'cached',requestId:rid});
 const audit=await Promise.all(entries.map(entry=>recordSubmission({...entry,quotationId:response.quotation?.id,advisorId:auth.advisor.id,registrationNumber:vehicle.regNumber,vehicle,idv,policy,declaredAccurate,requestId:rid})));
 response.meta.auditStatus=summary&&audit.every(Boolean)?'recorded':'failed';
 response.meta.durationMs=Date.now()-started;
 if(cacheSource==='miss'&&config.quoteCacheTtl>0&&response.meta.persistence==='saved'&&results.every(r=>r.status!=='unavailable')&&results.some(r=>r.source==='api')&&results.filter(r=>r.source==='api').every(r=>r.expiresAt&&Date.parse(r.expiresAt)>Date.now())){
  const expiry=Math.min(...results.filter(r=>r.expiresAt).map(r=>Math.floor((Date.parse(r.expiresAt)-Date.now())/1000)));
  if(expiry>0)await cache.set(key,{results},Math.min(config.quoteCacheTtl,expiry));
 }
 log('info','quote_completed',{requestId:rid,comparisonId,persistence:response.meta.persistence,live:response.meta.live,estimates:response.meta.estimates,unavailable:response.meta.unavailable,durationMs:Date.now()-started});
 return json(200,response,headers);
};
async function saveQuote(advisorId,input,comparisonResult){
 const {vehicle,idv,autoIdv,policy,quotationId,declaredAccurate,expectedRevision}=input;
 const fields={owner_name:vehicle.name,registration_number:vehicle.regNumber,vehicle_details:{...vehicle,policyDetails:policy},idv_value:idv,idv_auto_calculated:autoIdv,comparison_result:{...comparisonResult,meta:{...comparisonResult.meta,persistence:'saved'}},advisor_declared_accurate:declaredAccurate};
 let saved;
 if(quotationId){
  saved=(await update('quotes',`id=eq.${encodeURIComponent(quotationId)}&advisor_id=eq.${encodeURIComponent(advisorId)}&revision=eq.${expectedRevision}`,{...fields,revision:expectedRevision+1}))?.[0];
  if(!saved)throw Object.assign(new Error('This quotation changed while this comparison was processing. Reopen it before updating.'),{status:409,code:'revision_conflict'});
 }else{
  const number=`ARQ-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
  saved=(await insert('quotes',{advisor_id:advisorId,quotation_number:number,revision:1,...fields}))?.[0];
 }
 if(!saved)throw new Error('Quotation was not saved.');
 return {id:saved.id,quotationNumber:saved.quotation_number,ownerName:saved.owner_name,registrationNumber:saved.registration_number,createdAt:saved.created_at,revision:saved.revision};
}
async function quoteOne(insurer,vehicle,idv,policy,discount,rid,signal,requestKey){
 if(signal?.aborted)return unavailable(insurer,signal.reason);
 if(insurer.api_status==='live'){
  let quote;
  try{
   quote=await adapterFor(insurer)({insurer,vehicle,idv,policy,signal,requestKey});
   // Insurer-confirmed prices are preserved. Discounts must be requested
   // through a provider-supported request mapping, never subtracted locally.
   return assessQuote(quote,vehicle,idv,policy);
  }catch(e){
   const reason=e.status ? `provider_http_${e.status}` : e.name==='AbortError' ? 'timeout' : /credentials/i.test(e.message) ? 'credentials_missing' : 'invalid_or_unavailable';
   log('warn','insurer_quote_unavailable',{requestId:rid,insurerId:insurer.id,reason});
   return {...unavailable(insurer,signal?.aborted?signal.reason:e),_audit:quote?._audit||e._audit};
  }
 }
 try{
  const estimate=fallbackQuote(insurer,vehicle,idv,insurer.rateCard,discount);
  return assessQuote(estimate,vehicle,idv,policy);
 }catch(e){return unavailable(insurer,e);}
}
function unavailable(insurer,error){
 return {insurerId:insurer.id,insurerName:insurer.name,rating:insurer.rating??null,garageCount:insurer.garage_count??null,garageUrl:insurer.garage_url||null,totalPremium:null,source:'unavailable',status:'unavailable',eligibleForComparison:false,comparisonIssues:[],reason:error?.code==='deadline'?'deadline':'unavailable',error:error?.code==='deadline'?'This insurer did not complete within the response window. Retry to request a new quote.':insurer.api_status==='live'?'Live quote unavailable. Please retry or check the provider configuration.':'Configured estimate unavailable.'};
}
async function getConfiguredInsurers(){
 const insurers=await select('insurers','select=id,name,rating,garage_count,garage_url,api_status,api_config');
 const cards=await select('rate_cards','select=id,insurer_id,vehicle_category,rate_rules,updated_at');
 const byId=Object.fromEntries((cards||[]).map(c=>[c.insurer_id,c]));
 return(insurers||[]).filter(i=>['live','fallback_only'].includes(i.api_status)).map(i=>({...i,rateCard:byId[i.id]||{rate_rules:{}}}));
}
