const crypto=require('node:crypto');
const redis=require('../functions/lib/redis');
const {context,remaining}=require('./request-budget');
const namespace=process.env.APP_COORDINATION_NAMESPACE||`insurance-testing:${process.env.NODE_ENV||'development'}`;
const records=new Map();
const COMPLETE_TTL=600000;
const BEGIN=`local existing=redis.call('GET',KEYS[1]);if existing then return existing;end;local pending=cjson.encode({hash=ARGV[1],owner=ARGV[2],phase='pending'});redis.call('SET',KEYS[1],pending,'PX',ARGV[3]);return 'acquired';`;
function error(code,message,status=409){return Object.assign(new Error(message),{code,status});}
async function run(advisorId,key,hash,fn){
 if(!key)return fn();
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key))throw error('invalid_idempotency_key','Invalid comparison request key.',400);
 const scope=crypto.createHash('sha256').update(`${advisorId}:${key}`).digest('hex');
 const redisKey=`${namespace}:request:${scope}`;
 if(redis.enabled()){
  const owner=crypto.randomUUID();let existing;
  try{existing=await redis.command(['eval',BEGIN,'1',redisKey,hash,owner,'10000'],500,context()?.signal);}catch{throw error('coordination_unavailable','Request coordination is temporarily unavailable. Retry this comparison.',503);}
  if(existing!=='acquired'){
   let record;try{record=JSON.parse(existing);}catch{throw error('coordination_unavailable','Request coordination is temporarily unavailable.',503);}
   if(record.hash!==hash)throw error('idempotency_conflict','This request key was already used for different comparison details.');
   if(record.phase==='complete')return record.response;
   throw error('idempotency_pending','This comparison is already processing. Retry with the same request key shortly.');
  }
  try{
   const response=await fn();
   if(response.statusCode===200&&remaining()>20){
    const record=JSON.stringify({hash,phase:'complete',response});
    // Never overwrite a reservation acquired after this lease expired.
    await redis.command(['eval',"local v=redis.call('GET',KEYS[1]);if v and cjson.decode(v).owner==ARGV[1] then return redis.call('SET',KEYS[1],ARGV[2],'PX',ARGV[3]);end;return 0",'1',redisKey,owner,record,String(COMPLETE_TTL)],Math.min(100,remaining()),context()?.signal).catch(()=>{});
   }
   // On ambiguous failure retain the short reservation, rather than
   // immediately allowing another provider submission.
   return response;
  }catch(e){throw e;}
 }
 const now=Date.now();
 for(const [k,v]of records)if(v.expires<=now)records.delete(k);
 const previous=records.get(scope);
 if(previous){if(previous.hash!==hash)throw error('idempotency_conflict','This request key was already used for different comparison details.');return waitFor(previous.promise,context()?.signal);}
 if(records.size>=500){const completed=[...records].find(([,v])=>v.complete);if(completed)records.delete(completed[0]);else throw error('busy','Comparison capacity is busy. Please retry.',503);}
 const record={hash,expires:now+10000,complete:false,promise:null};
 record.promise=Promise.resolve().then(fn).then(response=>{if(response.statusCode===200){record.complete=true;record.expires=Date.now()+COMPLETE_TTL;}else records.delete(scope);return response;},err=>{records.delete(scope);throw err;});
 records.set(scope,record);
 return waitFor(record.promise,context()?.signal);
}
function waitFor(promise,signal){
 if(!signal)return promise;
 if(signal.aborted)return Promise.reject(signal.reason);
 return new Promise((resolve,reject)=>{const abort=()=>reject(signal.reason);signal.addEventListener('abort',abort,{once:true});promise.then(v=>{signal.removeEventListener('abort',abort);resolve(v);},e=>{signal.removeEventListener('abort',abort);reject(e);});});
}
module.exports={run};
