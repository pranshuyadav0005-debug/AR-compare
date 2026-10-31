const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const http=require('node:http');
const {spawn,spawnSync}=require('node:child_process');
const {once}=require('node:events');
const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
const {hashPassword}=require('../server/functions/lib/app-auth');
const {catalogue}=require('../server/services/quote-input');
const {fetchJson}=require('../server/functions/lib/http');
const {normalizeQuote}=require('../server/functions/lib/normalize');
const {redact}=require('../server/functions/lib/audit');
const root=path.resolve(__dirname,'..');
let remote,app,base,remoteBase;let calls=[];let requests=[];let providerCalls=0;let failSave=false;let failConfig=false;let providerDelay=0,dbDelay=0,providerActive=0,providerPeak=0,dbActive=0,dbPeak=0;const measurements=[];
const ids={alice:crypto.randomUUID(),bob:crypto.randomUUID(),admin:crypto.randomUUID()};
const tables={advisors:[],app_passwords:[],app_sessions:[],quotes:[],quote_submissions:[],audit_logs:[],insurers:[],rate_cards:[]};
const cookieJars={};
const listen=server=>new Promise(r=>server.listen(0,'127.0.0.1',r));
const send=(res,status,data)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(data));};
function matches(row,url){
 for(const [key,value]of url.searchParams){
  if(['select','order','limit','or'].includes(key))continue;
  if(value.startsWith('eq.')&&String(row[key])!==value.slice(3))return false;
  if(value==='is.null'&&row[key]!=null)return false;
  if(value.startsWith('gt.')&&String(row[key])<=value.slice(3))return false;
 }
 return true;
}
before(async()=>{
 for(const [username,id]of Object.entries(ids)){
  tables.advisors.push({id,username,name:username,role:username==='admin'?'admin':'advisor',approval_status:'approved',is_active:true});
  tables.app_passwords.push({advisor_id:id,password_hash:hashPassword('test-password-123')});
 }
 remote=http.createServer(async(req,res)=>{
  let text='';for await(const part of req)text+=part;const body=text?JSON.parse(text):{};
  const url=new URL(req.url,'http://local');requests.push({method:req.method,url,body});
  if(url.pathname.startsWith('/provider/')){
   providerCalls++;providerActive++;providerPeak=Math.max(providerPeak,providerActive);
   let done=false;const finish=()=>{if(!done){done=true;providerActive--;}};res.once('close',finish);res.once('finish',finish);
   if(providerDelay||url.pathname==='/provider/slow')await new Promise(resolve=>{const timer=setTimeout(resolve,url.pathname==='/provider/slow'?8000:providerDelay);res.once('close',()=>{clearTimeout(timer);resolve();});});
   if(res.destroyed)return;
   if(url.pathname==='/provider/reject')return send(res,400,{error:'Rejected'});
   if(url.pathname==='/provider/error')return send(res,503,{error:'Down'});
   if(url.pathname==='/provider/missing')return send(res,200,{totalPremium:null});
   const addons=(body.policy.selectedAddons||[]).map(name=>({name,premium:500,available:true}));
   const odPremium=8000,tpPremium=body.policy.policyType==='standalone'?0:3416;
   const gst=Math.round((odPremium+tpPremium+addons.length*500)*.18);
   return send(res,200,{idv:body.idv+(url.pathname==='/provider/mismatch'?1000:0),odPremium,tpPremium,gst,totalPremium:odPremium+tpPremium+gst+addons.length*500,addons,policyType:body.policy.policyType,ncbPercent:body.policy.ncbPercent,quoteId:'provider-reference',expiresAt:new Date(Date.now()+(url.pathname==='/provider/expired'?-60000:60000)).toISOString(),accessToken:'must-be-redacted'});
  }
  dbActive++;dbPeak=Math.max(dbPeak,dbActive);let dbDone=false;const dbFinish=()=>{if(!dbDone){dbDone=true;dbActive--;}};res.once('close',dbFinish);res.once('finish',dbFinish);
  if(dbDelay)await new Promise(resolve=>setTimeout(resolve,dbDelay));
  const table=url.pathname.replace('/rest/v1/','');
  if(!tables[table])return send(res,404,{error:'unknown table'});
  if(failConfig&&table==='insurers')return send(res,503,{message:'sensitive internal db error'});
  if(failSave&&table==='quotes'&&req.method!=='GET')return send(res,503,{message:'sensitive internal db error'});
  if(req.method==='GET')return send(res,200,tables[table].filter(row=>matches(row,url)));
  if(req.method==='POST'){
   const rows=(Array.isArray(body)?body:[body]).map(x=>({id:crypto.randomUUID(),created_at:new Date().toISOString(),...x}));tables[table].push(...rows);return send(res,201,rows);
  }
  const rows=tables[table].filter(row=>matches(row,url));
  if(req.method==='PATCH'){rows.forEach(row=>Object.assign(row,body));return send(res,200,rows);}
  if(req.method==='DELETE'){tables[table]=tables[table].filter(row=>!matches(row,url));return send(res,200,[]);}
  send(res,405,{});
 });
 for(let i=0;i<200;i++){
  const name='load'+i,id=crypto.randomUUID(),token=crypto.randomUUID(),csrf=crypto.randomUUID();
  tables.advisors.push({id,username:name,name,role:'advisor',approval_status:'approved',is_active:true});
  tables.app_sessions.push({advisor_id:id,token_hash:crypto.createHash('sha256').update(token).digest('hex'),csrf_token:crypto.createHash('sha256').update(csrf).digest('hex'),expires_at:new Date(Date.now()+86400000).toISOString(),revoked_at:null});
  cookieJars[name]=`ar_session=${token}; ar_csrf=${csrf}`;
 }
 await listen(remote);remoteBase=`http://127.0.0.1:${remote.address().port}`;
 app=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,NODE_ENV:'development',TRUST_PROXY_HOPS:'0',PORT:'0',HOST:'127.0.0.1',SUPABASE_URL:remoteBase,SUPABASE_SERVICE_ROLE_KEY:'local-test-only',UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:'',REDIS_REST_URL:'',REDIS_REST_TOKEN:'',QUOTE_CACHE_TTL_SECONDS:'0',PROVIDER_ALLOWED_HOSTS:'127.0.0.1',ALLOW_INSECURE_PROVIDER_HTTP:'true'},stdio:['ignore','pipe','pipe']});
 let output='';app.stdout.on('data',d=>{output+=d;});app.stderr.on('data',()=>{});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server start timeout')),5000);app.stdout.on('data',()=>{const m=output.match(/listening on 127\.0\.0\.1:(\d+)/);if(m){base=`http://127.0.0.1:${m[1]}`;clearTimeout(timer);resolve();}});app.once('exit',()=>{clearTimeout(timer);reject(new Error('Server exited'));});});
 for(const username of Object.keys(ids)){
  const response=await fetch(base+'/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({username,password:'test-password-123'})});assert.equal(response.status,200);
  const cookies=response.headers.getSetCookie();cookieJars[username]=cookies.map(v=>v.split(';')[0]).join('; ');
 }
});
after(async()=>{if(process.env.CAPACITY_REPORT){fs.writeFileSync(process.env.CAPACITY_REPORT,JSON.stringify({generatedAt:new Date().toISOString(),node:process.version,environment:'Local HTTP database and insurer stand-ins; one application process, no shared Redis. Not a production capacity guarantee.',measurements},null,2)+'\n');}app?.kill();remote?.closeAllConnections();await new Promise(r=>remote?remote.close(r):r());});
async function api(url,{user='alice',body,method=body?'POST':'GET',headers={}}={}){
 const cookie=cookieJars[user]||'';const csrf=cookie.match(/ar_csrf=([^;]+)/)?.[1]||'';
 const r=await fetch(base+url,{method,headers:{cookie,'content-type':'application/json','x-csrf-token':csrf,...headers},body:body===undefined?undefined:JSON.stringify(body)});
 return {status:r.status,data:await r.json()};
}
function payload(){
 const make='Maruti Suzuki',model=Object.keys(catalogue[make])[0],car=catalogue[make][model],fuelType=Object.keys(car.variantPrices)[0],variant=Object.keys(car.variantPrices[fuelType]).find(v=>car.variantPrices[fuelType][v].exShowroomPrice>0);
 const registeredDate='2023-04-01',age=(Date.now()-Date.parse(registeredDate))/(365.25*86400000),depreciation=age<=3?.3:age<=4?.4:.5;
 const idv=Math.round(car.variantPrices[fuelType][variant].exShowroomPrice*(1-depreciation));
 return {vehicle:{name:'Demo Owner',regNumber:'DL01AB1234',make,model,variant,fuelType,registeredDate,policyExpiry:new Date(Date.now()+30*86400000).toISOString().slice(0,10),selectedAddons:[]},idv,autoIdv:idv,declaredAccurate:true,policy:{policyType:'comprehensive',hadClaim:false,ncbPercent:20,prevPolicyCover:['none'],selectedAddons:[],advisorDiscount:0}};
}
function configure(kind='fallback_only',endpoint='good'){
 tables.insurers=[{id:'test-insurer',name:'Test Insurer',rating:4,api_status:kind,api_config:kind==='live'?{endpoint:remoteBase+'/provider/'+endpoint,adapter:'generic',timeoutMs:500,retries:0}: {}}];
 tables.rate_cards=[{id:'rate',insurer_id:'test-insurer',rate_rules:{od_rate_per_idv:.03,addons:[]}}];
}
test('only public files can be served, including encoded and symlink probes',async()=>{
 for(const name of ['/','/motor-insurance.html','/js/comparison.js','/css/comparison-premium.css'])assert.equal((await fetch(base+name)).status,200,name);
 for(const name of ['/server.js','/schema.sql','/.env','/.env.example','/package.json','/server/functions/lib/app-auth.js','/scripts/test-foundation.js','/%2eenv','/js/%2e%2e/server.js','/js/%ZZ'])assert.equal((await fetch(base+name)).status,404,name);
 const link=path.join(root,'public/js/test-leak.js');fs.symlinkSync(path.join(root,'server.js'),link);try{assert.equal((await fetch(base+'/js/test-leak.js')).status,404);}finally{fs.unlinkSync(link);}
});
test('session binding and role permissions reject forged CSRF and advisor administration',async()=>{
 assert.equal((await api('/api/auth/me',{user:'missing'})).status,401);
 assert.equal((await api('/api/admin/users')).status,403);
 const fake='same-cookie-and-header-but-not-session';const cookie=cookieJars.alice.replace(/ar_csrf=[^;]+/,'ar_csrf='+fake);
 assert.equal((await api('/api/quote',{body:payload(),headers:{cookie,'x-csrf-token':fake}})).status,403);
 assert.equal((await api('/api/quote',{body:payload(),headers:{origin:'https://different.example'}})).status,403);
});
test('invalid vehicle, dates, NCB, discount, addons and IDV are rejected before provider calls',async()=>{
 configure('live');const before=providerCalls;
 const cases=[p=>p.vehicle.registeredDate='2023-02-30',p=>p.vehicle.regNumber='invalid',p=>p.vehicle.model='unknown',p=>p.idv=null,p=>p.idv=0,p=>p.idv*=2,p=>p.policy.ncbPercent=30,p=>p.policy.hadClaim=true,p=>p.policy.advisorDiscount=101,p=>p.policy.selectedAddons=['invented'],p=>p.declaredAccurate=false];
 for(const mutate of cases){const p=payload();mutate(p);assert.equal((await api('/api/quote',{body:p})).status,400);}
 assert.equal((await api('/api/quote',{body:null,method:'POST'})).status,400);assert.equal(providerCalls,before);
});
test('configured estimates are saved and owner-scoped; another advisor cannot update them',async()=>{
 configure();const r=await api('/api/quote',{body:payload()});assert.equal(r.status,200);assert.equal(r.data.meta.persistence,'saved');assert.equal(r.data.results[0].source,'estimate');assert.equal(r.data.results[0].ncbPercent,20);
 const p=payload();p.quotationId=r.data.quotation.id;assert.equal((await api('/api/quote',{user:'bob',body:p})).status,404);
 assert.equal((await api('/api/quotes/search',{user:'bob'})).data.results.length,0);
 const own=await api('/api/quotes/search');assert(own.data.results.every(q=>q.advisor_id===ids.alice));
 await api('/api/quotes/search?type=all&q='+encodeURIComponent('X&advisor_id=eq.'+ids.bob));
 const query=requests.filter(r=>r.url.pathname==='/rest/v1/quotes').at(-1).url.searchParams;
 assert.deepEqual(query.getAll('advisor_id'),['eq.'+ids.alice]);
});
test('catalogue vehicles without prices retain manual IDV and exact adjustment bounds',async()=>{
 configure();const p=payload();Object.assign(p.vehicle,{make:'Audi',model:'A4',fuelType:'Petrol',variant:'1.8 TFSI',manualIDV:500000,idvSource:'manual'});p.idv=500000;p.autoIdv=500000;
 const missing={...p,vehicle:{...p.vehicle,manualIDV:null}};assert.equal((await api('/api/quote',{body:missing})).status,400);
 for(const value of [425000,500000,575000]){p.idv=value;const r=await api('/api/quote',{body:p});assert.equal(r.status,200);assert.equal(r.data.meta.baseIdv,500000);assert.equal(r.data.meta.idvSource,'manual');assert.equal(r.data.results[0].returnedIdv,value);}
 p.idv=575001;assert.equal((await api('/api/quote',{body:p})).status,400);
});
test('valid live quotes preserve provider totals and audit redacts credentials',async()=>{
 configure('live');const r=await api('/api/quote',{body:payload()});assert.equal(r.status,200);const quote=r.data.results[0];assert.equal(quote.source,'api');assert.equal(quote.eligibleForComparison,true);assert.equal(quote.providerQuoteId,'provider-reference');assert.equal(quote.totalPremium,13471);assert.equal(quote._audit,undefined);
 assert.equal(tables.quote_submissions.at(-1).response_payload.accessToken,'[redacted]');
 const p=payload();p.policy.advisorDiscount=10;const unsupported=await api('/api/quote',{body:p});assert.equal(unsupported.data.results[0].status,'unavailable');
 tables.insurers[0].api_config.supportsAdvisorDiscount=true;const supported=await api('/api/quote',{body:p});assert.equal(supported.data.results[0].totalPremium,13471);
});
test('provider failures and incomplete responses remain unavailable, never estimates or zero-priced plans',async()=>{
 for(const endpoint of ['error','missing']){configure('live',endpoint);const r=await api('/api/quote',{body:payload()});assert.equal(r.data.results[0].status,'unavailable');assert.equal(r.data.results[0].totalPremium,null);assert.equal(r.data.meta.estimates,0);}
 for(const endpoint of ['mismatch','expired']){configure('live',endpoint);const r=await api('/api/quote',{body:payload()});assert.equal(r.data.results[0].eligibleForComparison,false);assert(r.data.results[0].comparisonIssues.length);}
});
test('save and configuration failures are explicit; there is no fallback insurer registry',async()=>{
 configure();failSave=true;try{const r=await api('/api/quote',{body:payload()});assert.equal(r.status,200);assert.equal(r.data.meta.persistence,'failed');assert.equal(r.data.quotation,null);assert(r.data.meta.notice);assert(!JSON.stringify(r.data).includes('sensitive internal'));}finally{failSave=false;}
 failConfig=true;try{assert.equal((await api('/api/quote',{body:payload()})).status,503);}finally{failConfig=false;}
});
test('normalization rejects empty money and retries respect non-retryable errors',async()=>{
 const q=normalizeQuote({id:'x',name:'X'},{idv:null,totalPremium:'',odPremium:null});assert.equal(q.totalPremium,null);assert.equal(q.odPremium,null);
 const before=providerCalls;await assert.rejects(fetchJson(remoteBase+'/provider/reject',{method:'POST',body:'{}'},{retries:2,retrySafe:true}));assert.equal(providerCalls-before,1);
 assert.deepEqual(redact({token:'x',safe:{password:'y',amount:1}}),{token:'[redacted]',safe:{password:'[redacted]',amount:1}});
});
test('production requires database configuration and configured provider hosts/credentials',async()=>{
 const child=spawnSync(process.execPath,['server.js'],{cwd:root,env:{...process.env,NODE_ENV:'production',SUPABASE_URL:'',SUPABASE_SERVICE_ROLE_KEY:''},timeout:3000,encoding:'utf8'});
 assert.notEqual(child.status,0);assert.match(child.stderr,/Configure SUPABASE_URL/);
 configure('live');tables.insurers[0].api_config.endpoint='http://localhost:1/provider';let before=providerCalls;let r=await api('/api/quote',{body:payload()});assert.equal(r.data.results[0].status,'unavailable');assert.equal(providerCalls,before);
 configure('live');Object.assign(tables.insurers[0].api_config,{apiKeyEnv:'MISSING_TEST_CREDENTIAL',apiKeyHeader:'x-api-key'});r=await api('/api/quote',{body:payload()});assert.equal(r.data.results[0].status,'unavailable');assert.equal(providerCalls,before);
});
test('password reset revokes sessions and login rate limits work without Redis or trusted forwarding headers',async()=>{
 assert.equal((await api(`/api/admin/users/${ids.bob}/reset-password`,{user:'admin',body:{password:'another-test-password'}})).status,200);
 assert.equal((await api('/api/auth/me',{user:'bob'})).status,401);
 let response;for(let i=0;i<9;i++){response=await fetch(base+'/api/auth/login',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':'forged-'+i},body:JSON.stringify({username:'unknown',password:'wrong'})});}
 assert.equal(response.status,429);
});

test('request keys coalesce duplicate submissions, reject changed input, and replay an update',async()=>{
 configure('live');providerDelay=80;
 try{
  const key=crypto.randomUUID(),p=payload(),before=providerCalls,saved=tables.quotes.length;
  const pair=await Promise.all([api('/api/quote',{body:p,headers:{'idempotency-key':key}}),api('/api/quote',{body:p,headers:{'idempotency-key':key}})]);
  assert(pair.every(x=>x.status===200));assert.equal(pair[0].data.quotation.id,pair[1].data.quotation.id);assert.equal(providerCalls-before,1);assert.equal(tables.quotes.length-saved,1);
  const other=structuredClone(p);other.vehicle.name='Changed Owner';assert.equal((await api('/api/quote',{body:other,headers:{'idempotency-key':key}})).status,409);
  p.quotationId=pair[0].data.quotation.id;p.expectedRevision=1;const updateKey=crypto.randomUUID();
  const first=await api('/api/quote',{body:p,headers:{'idempotency-key':updateKey}});assert.equal(first.status,200);assert.equal(first.data.quotation.revision,2);
  const replay=await api('/api/quote',{body:p,headers:{'idempotency-key':updateKey}});assert.equal(replay.status,200);assert.equal(replay.data.quotation.revision,2);
 }finally{providerDelay=0;}
});
test('concurrent quotation updates use an atomic revision condition',async()=>{
 configure('live');const first=await api('/api/quote',{body:payload()});const p=payload();p.quotationId=first.data.quotation.id;p.expectedRevision=1;providerDelay=80;
 try{const pair=await Promise.all([api('/api/quote',{body:p}),api('/api/quote',{body:p})]);assert.deepEqual(pair.map(r=>r.status).sort(),[200,409]);assert.equal(pair.find(r=>r.status===200).data.quotation.revision,2);}
 finally{providerDelay=0;}
});
function percentile(values,p){return values.slice().sort((a,b)=>a-b)[Math.ceil(values.length*p)-1];}
async function burst(count,label){
 const results=await Promise.all(Array.from({length:count},async(_,i)=>{const started=performance.now();const result=await api('/api/quote',{user:'load'+i,body:payload(),headers:{'idempotency-key':crypto.randomUUID()}});return{...result,ms:performance.now()-started};}));
 const times=results.map(r=>r.ms);const summary={scenario:label,requests:count,offered:'All requests launched together (within a five-second window)',ok:results.filter(r=>r.status===200).length,busy:results.filter(r=>r.status===503).length,liveQuotes:results.reduce((n,r)=>n+(r.data.meta?.live||0),0),timedOutQuotes:results.reduce((n,r)=>n+(r.data.meta?.timedOut||0),0),p50Ms:Math.round(percentile(times,.5)),p95Ms:Math.round(percentile(times,.95)),p99Ms:Math.round(percentile(times,.99)),maxMs:Math.round(Math.max(...times)),providerPeak,dbPeak};
 measurements.push(summary);console.log(JSON.stringify(summary));return results;
}
test('200 seeded advisors; 30 simultaneous comparisons with three 150ms insurers',async()=>{
 configure('live');tables.insurers=Array.from({length:3},(_,i)=>({...tables.insurers[0],id:'load-insurer-'+i,name:'Load insurer '+i}));
 providerPeak=0;dbPeak=0;providerDelay=150;dbDelay=5;
 try{const results=await burst(30,'30 advisors, three insurers each, provider delay 150ms, database delay 5ms');assert(results.every(r=>r.status===200&&r.data.meta.persistence==='saved'&&r.data.meta.live===3&&r.data.meta.auditStatus==='recorded'));assert(Math.max(...results.map(r=>r.ms))<5000);assert(providerPeak<=10);assert(dbPeak<=20);}
 finally{providerDelay=0;dbDelay=0;}
});
test('deadline retains fast results and cancels queued provider work',async()=>{
 configure('live');tables.insurers.push({...tables.insurers[0],id:'slow-insurer',api_config:{...tables.insurers[0].api_config,endpoint:remoteBase+'/provider/slow',timeoutMs:15000}});
 const start=performance.now();let result=await api('/api/quote',{user:'load30',body:payload()});assert.equal(result.status,200);assert.equal(result.data.meta.live,1);assert.equal(result.data.meta.timedOut,1);assert.equal(result.data.meta.persistence,'saved');assert(performance.now()-start<5000);
 configure('live','slow');tables.insurers[0].api_config.timeoutMs=15000;providerPeak=0;dbPeak=0;
 const results=await burst(30,'30 advisors, insurer delay 8000ms exceeds response window');assert(results.every(r=>r.status===200&&r.data.meta.timedOut===1&&r.data.meta.persistence==='saved'));assert(Math.max(...results.map(r=>r.ms))<5000);
 const completed=providerCalls;await new Promise(r=>setTimeout(r,100));assert.equal(providerCalls,completed,'No expired queued request may start later');assert(providerPeak<=10);
});
test('overload is rejected promptly instead of growing the comparison queue',async()=>{
 configure('live','slow');tables.insurers[0].api_config.timeoutMs=15000;providerPeak=0;dbPeak=0;
 const results=await burst(65,'65 simultaneous advisors exceed admission limit of 60');assert.equal(results.filter(r=>r.status===503).length,5);assert.equal(results.filter(r=>r.status===200).length,60);assert(Math.max(...results.map(r=>r.ms))<5000);
});

test('admin advisor lists exclude administrators and approval races cannot overwrite a review',async()=>{
 const list=await api('/api/admin/users',{user:'admin'});assert.equal(list.status,200);assert(list.data.users.every(u=>u.role==='advisor'));
 const id=crypto.randomUUID();tables.advisors.push({id,name:'Pending Review',username:'review.test',role:'advisor',is_active:true,approval_status:'pending'});
 const path=`/api/admin/advisors/${id}/approval`;
 const results=await Promise.all(['approved','rejected'].map(status=>api(path,{user:'admin',body:{status}})));assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
 assert.equal((await api(`/api/admin/advisors/${ids.admin}/approval`,{user:'admin',body:{status:'approved'}})).status,404);
 assert.equal((await api(`/api/admin/users/${ids.admin}/reset-password`,{user:'admin',body:{password:'another-password-123'}})).status,404);
});
