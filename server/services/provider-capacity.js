const crypto=require('node:crypto');
const {setTimeout:sleep}=require('node:timers/promises');
const {BoundedPool}=require('./bounded-pool');
const redis=require('../functions/lib/redis');
const config=require('../functions/lib/config');
const namespace=process.env.APP_COORDINATION_NAMESPACE||`ar-advisors:${process.env.NODE_ENV||'development'}`;
const local=new BoundedPool(config.providerConcurrency,config.providerQueueLimit);
const providers=new Map();
// Redis time supplies the lease clock for all application instances.
const ACQUIRE=`local t=redis.call('TIME');local now=t[1]*1000+math.floor(t[2]/1000);for i=1,2 do redis.call('ZREMRANGEBYSCORE',KEYS[i],'-inf',now);end;if redis.call('ZCARD',KEYS[1])>=tonumber(ARGV[1]) or redis.call('ZCARD',KEYS[2])>=tonumber(ARGV[2]) then return 0;end;for i=1,2 do redis.call('ZADD',KEYS[i],now+tonumber(ARGV[3]),ARGV[4]);redis.call('PEXPIRE',KEYS[i],ARGV[3]);end;return 1;`;
async function run(endpoint,signal,fn){
 const provider=new URL(endpoint).hostname.toLowerCase();
 let pool=providers.get(provider);
 if(!pool){if(providers.size>=100)throw Object.assign(new Error('Provider configuration limit reached.'),{code:'busy'});pool=new BoundedPool(config.perProviderConcurrency,config.providerQueueLimit);providers.set(provider,pool);}
 return pool.run(()=>local.run(async()=>{
  let keys,token;
  if(redis.enabled()){
   token=crypto.randomUUID();keys=[`{${namespace}:capacity}:global`,`{${namespace}:capacity}:provider:${crypto.createHash('sha256').update(provider).digest('hex')}`];
   while(true){
    signal?.throwIfAborted();
    let acquired;
    try{acquired=await redis.command(['eval',ACQUIRE,'2',...keys,String(config.providerConcurrency),String(config.perProviderConcurrency),String(config.responseBudgetMs+5000),token],500,signal);}
    catch{throw Object.assign(new Error('Shared provider capacity is unavailable. Please retry.'),{code:'capacity_unavailable'});}
    if(acquired===1)break;
    await sleep(30+Math.floor(Math.random()*30),undefined,{signal});
   }
  }
  try{signal?.throwIfAborted();return await fn();}
  finally{if(keys)await redis.command(['eval',"return redis.call('ZREM',KEYS[1],ARGV[1])+redis.call('ZREM',KEYS[2],ARGV[1])",'2',...keys,token],100,null).catch(()=>{});}
 },signal),signal);
}
function snapshot(){return{global:local.snapshot(),providers:Object.fromEntries([...providers].map(([k,v])=>[k,v.snapshot()]))};}
module.exports={run,snapshot};
