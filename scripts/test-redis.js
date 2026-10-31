// REST transport/coordination contract tests using a stand-in. These do not
// execute Lua or replace testing against the configured Redis service.
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const http=require('node:http');
const crypto=require('node:crypto');
const redis=require('../server/functions/lib/redis');
const idempotency=require('../server/services/idempotency');
const capacity=require('../server/services/provider-capacity');
const {rateLimit}=require('../server/functions/lib/rate-limit');
const {withBudget}=require('../server/services/request-budget');
let server,fail=false,slow=false,last,records=new Map();
before(async()=>{
 server=http.createServer(async(req,res)=>{
  let text='';for await(const part of req)text+=part;const parts=JSON.parse(text);last={url:req.url,method:req.method,authorization:req.headers.authorization,parts};
  if(slow){await new Promise(resolve=>{const timer=setTimeout(resolve,500);res.once('close',()=>{clearTimeout(timer);resolve();});});if(res.destroyed)return;}
  let result='PONG',error;
  if(fail)error='Simulated coordination failure';
  else if(parts[0]==='eval'){
   const key=parts[3];
   if(parts[1].includes("phase='pending'")){result=records.get(key)||'acquired';if(result==='acquired')records.set(key,JSON.stringify({hash:parts[4],owner:parts[5],phase:'pending'}));}
   else if(parts[1].includes('cjson.decode(v).owner')){if(JSON.parse(records.get(key)).owner===parts[4])records.set(key,parts[5]);result='OK';}
   else throw new Error('Unexpected command in REST stand-in');
  }
  res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify(error?{error}:{result}));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 process.env.UPSTASH_REDIS_REST_URL=`http://127.0.0.1:${server.address().port}`;process.env.UPSTASH_REDIS_REST_TOKEN='test-only';
});
after(async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));});
test('Redis uses POST JSON and never puts command payloads in URLs',async()=>{
 assert.equal(await redis.command(['ping']), 'PONG');assert.equal(last.url,'/');assert.equal(last.method,'POST');assert.equal(last.authorization,'Bearer test-only');assert.deepEqual(last.parts,['ping']);
});
test('shared idempotency rejects pending and conflicting submissions, then replays completion',async()=>{
 const key=crypto.randomUUID();let release,started;
 const began=new Promise(r=>started=r);const first=idempotency.run('advisor',key,'hash',async()=>{started();await new Promise(r=>release=r);return{statusCode:200,body:'saved'};});
 await began;
 await assert.rejects(idempotency.run('advisor',key,'hash',()=>assert.fail()),{code:'idempotency_pending'});
 await assert.rejects(idempotency.run('advisor',key,'different',()=>assert.fail()),{code:'idempotency_conflict'});
 release();const result=await first;assert.deepEqual(await idempotency.run('advisor',key,'hash',()=>assert.fail()),result);
});
test('configured coordination errors fail closed for duplicate, provider and multiple-instance rate admission',async()=>{
 fail=true;process.env.APP_DEPLOYMENT_MODE='multiple';
 try{
  await assert.rejects(idempotency.run('advisor',crypto.randomUUID(),'hash',()=>assert.fail()),{code:'coordination_unavailable'});
  await assert.rejects(capacity.run('https://insurer.example',AbortSignal.timeout(500),()=>assert.fail()),{code:'capacity_unavailable'});
  await assert.rejects(rateLimit('unique',10,60),{status:503});
 }finally{fail=false;delete process.env.APP_DEPLOYMENT_MODE;}
});
test('Redis transport inherits the comparison deadline',async()=>{
 slow=true;try{await assert.rejects(withBudget(20,()=>redis.command(['ping'],1000)));}finally{slow=false;}
});
