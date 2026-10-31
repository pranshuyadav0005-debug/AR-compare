const {test,before,after} = require('node:test');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const {startStack} = require('./support/test-stack.cjs');
const invite='local-test-invitation-code-1234567890';
let stack;
before(async()=>{ process.env.REGISTRATION_INVITE_CODE=invite; stack=await startStack(); });
after(async()=>{await stack?.close();delete process.env.REGISTRATION_INVITE_CODE;});
async function api(route, body, extra={}) {
 const response=await fetch(stack.base+route,{...(body===undefined?{}:{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}),...extra});
 let data;try{data=await response.json();}catch{data=null;}
 return {response,status:response.status,data};
}
function credentials(response){
 const cookies=response.headers.getSetCookie();
 return {cookie:cookies.map(c=>c.split(';')[0]).join('; '),'x-csrf-token':cookies.find(c=>c.startsWith('ar_csrf=')).split(';')[0].split('=')[1]};
}
test('invitation is required and invalid signup performs no database writes',async()=>{
 const count=stack.writes.length;
 for(const code of [undefined,'wrong'])assert.equal((await api('/api/auth/register',{name:'Blocked User',username:'blocked',password:stack.password,inviteCode:code})).status,403);
 assert.equal(stack.writes.length,count);
});
test('invited signup ignores injected administrator role and is immediately usable',async()=>{
 const r=await api('/api/auth/register',{name:'Invited Advisor',username:'invited',password:stack.password,inviteCode:invite,role:'admin',is_active:false});
 assert.equal(r.status,201);
 const advisor=stack.tables.advisors.find(x=>x.username==='invited');assert.equal(advisor.role,'advisor');assert.equal(advisor.approval_status,'approved');assert.equal(advisor.is_active,true);
 const hash=stack.tables.app_passwords.find(x=>x.advisor_id===advisor.id).password_hash;assert.match(hash,/^scrypt\$/);assert.notEqual(hash,stack.password);
 const login=await api('/api/auth/login',{username:'invited',password:stack.password});assert.equal(login.status,200);assert.equal(login.data.session.role,'advisor');
 const cookies=login.response.headers.getSetCookie();assert(cookies.find(c=>c.startsWith('ar_session=')).includes('HttpOnly'));assert(cookies.every(c=>c.includes('SameSite=Lax')));
 const headers=credentials(login.response);
 assert.equal((await api('/api/admin/users',undefined,{headers})).status,403);
 assert.equal((await api('/api/auth/logout',{}, {method:'POST',headers:{...headers,'content-type':'application/json','x-csrf-token':'forged'},body:'{}'})).status,403);
});
test('duplicate registration cannot replace an existing password or grant admin',async()=>{
 const before=stack.tables.app_passwords.length;
 assert.equal((await api('/api/auth/register',{name:'Duplicate User',username:'invited',password:'different-password-123',inviteCode:invite,role:'admin'})).status,409);
 assert.equal(stack.tables.app_passwords.length,before);
});
test('approval queue and mutation routes no longer exist',async()=>{
 assert.equal((await api('/api/admin/advisors/requests')).status,404);
 assert.equal((await api('/api/admin/advisors/123/approval',{status:'approved'})).status,404);
});
test('anonymous private data and administration are denied',async()=>{
 for(const route of ['/api/auth/me','/api/admin/users','/api/quotes/search'])assert.equal((await api(route)).status,401);
});
test('origin spoofing cannot log in or register',async()=>{
 const response=await api('/api/auth/login',{}, {method:'POST',headers:{'content-type':'application/json',origin:'https://evil.example'},body:JSON.stringify({username:'admin',password:stack.password})});assert.equal(response.status,403);
});
test('JSON type, malformed JSON, body size and unsupported methods are rejected',async()=>{
 assert.equal((await api('/api/auth/login',undefined,{method:'POST',headers:{'content-type':'text/plain'},body:'{}'})).status,415);
 assert.equal((await api('/api/auth/login',undefined,{method:'POST',headers:{'content-type':'application/json'},body:'{'})).status,400);
 assert.equal((await api('/api/auth/login',[])).status,400);
 assert.equal((await api('/api/auth/login',{large:'x'.repeat(65536)})).status,413);
 assert.equal((await api('/index.html',{}, {method:'POST',body:'{}'})).status,405);
});
test('security headers, request identifiers and private file protection',async()=>{
 const r=await fetch(stack.base);assert.equal(r.status,200);assert.equal(r.headers.get('x-frame-options'),'DENY');assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.match(r.headers.get('content-security-policy'),/form-action 'self'/);assert.match(r.headers.get('x-request-id'),/^[a-f0-9-]{36}$/);assert.equal(r.headers.get('cache-control'),'no-store');
 for(const path of ['/.env','/server.js','/schema.sql','/package.json','/assets/%2e%2e/%2e%2e/schema.sql'])assert.equal((await fetch(stack.base+path)).status,404);
});
test('unknown user and wrong password give the same error',async()=>{
 const a=await api('/api/auth/login',{username:'missing',password:stack.password}),b=await api('/api/auth/login',{username:'existing',password:'wrong'});assert.equal(a.status,401);assert.equal(b.status,401);assert.deepEqual(a.data,b.data);
});
test('password reset and deactivation invalidate existing sessions',async()=>{
 const admin=await api('/api/auth/login',{username:'admin',password:stack.password}),advisor=await api('/api/auth/login',{username:'existing',password:stack.password});const ah=credentials(admin.response),uh=credentials(advisor.response),id=advisor.data.session.id;
 const reset=await api(`/api/admin/users/${id}/reset-password`,{}, {method:'POST',headers:{...ah,'content-type':'application/json'},body:JSON.stringify({password:'new-safe-password-123'})});assert.equal(reset.status,200);
 assert.equal((await api('/api/auth/me',undefined,{headers:uh})).status,401);
 const next=await api('/api/auth/login',{username:'existing',password:'new-safe-password-123'});assert.equal(next.status,200);
 assert.equal((await api(`/api/admin/users/${id}/status`,{}, {method:'POST',headers:{...ah,'content-type':'application/json'},body:'{"is_active":false}'})).status,200);
 assert.equal((await api('/api/auth/me',undefined,{headers:credentials(next.response)})).status,401);
 assert.equal((await api('/api/auth/login',{username:'existing',password:'new-safe-password-123'})).status,403);
});
test('readiness fails closed without migration evidence',async()=>{assert.equal((await api('/api/ready')).status,503);});
test('production configuration rejects unsafe origin, invite and web bootstrap',()=>{
 const base={...process.env,NODE_ENV:'production',APP_ORIGIN:'https://advisors.example.com',SUPABASE_URL:'https://database.example.com',SUPABASE_SERVICE_ROLE_KEY:'test-only',BOOTSTRAP_ADMIN_SECRET:''};
 for(const patch of [{APP_ORIGIN:''},{APP_ORIGIN:'http://example.com'},{APP_ORIGIN:'https://example.com/path'},{REGISTRATION_INVITE_CODE:'short'},{BOOTSTRAP_ADMIN_SECRET:'enabled'},{TRUST_PROXY_HOPS:'bad'},{APP_DEPLOYMENT_MODE:'multiple',UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:'',REDIS_REST_URL:'',REDIS_REST_TOKEN:''}]){
  const result=spawnSync(process.execPath,['-e',"require('./server/functions/lib/config').assertStartupConfig()"],{env:{...base,...patch},encoding:'utf8'});assert.notEqual(result.status,0);
 }
 const valid=spawnSync(process.execPath,['-e',"require('./server/functions/lib/config').assertStartupConfig()"],{env:{...base,APP_DEPLOYMENT_MODE:'single'},encoding:'utf8'});assert.equal(valid.status,0,valid.stderr);
});
test('production cannot issue cookies over an insecure request or invoke web bootstrap',async()=>{
 const saved=process.env.NODE_ENV;process.env.NODE_ENV='production';
 try {
  const auth=require('../server/functions/lib/app-auth');const result=await require('../server/functions/bootstrap-admin').handler({httpMethod:'POST',headers:{}});assert.equal(result.statusCode,404);
  assert(auth.authCookies({token:'test',csrf:'test'}, {isSecure:false}).every(c=>c.includes('Secure;')));
  assert.equal(auth.sameOrigin({isSecure:false,headers:{}}),false);
 }finally{process.env.NODE_ENV=saved;}
});
test('registration is closed without an invitation configured',async()=>{
 const saved=process.env.REGISTRATION_INVITE_CODE;delete process.env.REGISTRATION_INVITE_CODE;
 try {const r=await require('../server/functions/auth-register').handler({httpMethod:'POST',clientIp:'closed-test',headers:{},body:'{}'});assert.equal(r.statusCode,403);assert.match(JSON.parse(r.body).error,/closed/);}finally{process.env.REGISTRATION_INVITE_CODE=saved;}
});
test('approval controls removed from HTML and browser code',()=>{
 const html=fs.readFileSync('public/index.html','utf8'),js=fs.readFileSync('public/js/admin.js','utf8');assert(!html.includes('data-admin-target="approvals"'));assert(!html.includes('data-admin-section="approvals"'));assert(!js.includes('/api/admin/advisors/'));assert(html.includes('id="signupInvite"'));
});
test('remote JSON responses are bounded before parsing, including chunked bodies',async()=>{
 const {responseText}=require('../server/functions/lib/response-body');
 assert.equal(await responseText(new Response('small'),32),'small');
 await assert.rejects(responseText(new Response('x',{headers:{'content-length':'100'}}),32),/size limit/);
 const body=new ReadableStream({start(c){c.enqueue(new Uint8Array(20));c.enqueue(new Uint8Array(20));c.close();}});
 await assert.rejects(responseText(new Response(body),32),/size limit/);
});
