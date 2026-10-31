// Raw HTTP is required here: Node fetch overwrites the Host header.
const http=require('node:http');
function fetch(url, options={}) {
 return new Promise((resolve,reject)=>{
  const req=http.request(url,{method:options.method||'GET',headers:options.headers||{}},res=>{
   res.resume();res.once('end',()=>resolve({status:res.statusCode,headers:{get:name=>res.headers[name.toLowerCase()]||null}}));
  });
  req.setTimeout(5000,()=>req.destroy(new Error('Test request timeout')));
  req.on('error',reject);req.end(options.body);
 });
}
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
test('production transport rejects wrong host and HTTP; trusted HTTPS adds HSTS',async()=>{
 const app=spawn(process.execPath,['server.js'],{env:{...process.env,NODE_ENV:'production',APP_ORIGIN:'https://advisors.example.com',PORT:'0',HOST:'127.0.0.1',TRUST_PROXY_HOPS:'1',SUPABASE_URL:'https://db.example.com',SUPABASE_SERVICE_ROLE_KEY:'test-only',REGISTRATION_INVITE_CODE:'',BOOTSTRAP_ADMIN_SECRET:'',APP_DEPLOYMENT_MODE:'single',UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:'',REDIS_REST_URL:'',REDIS_REST_TOKEN:''},stdio:['ignore','pipe','pipe']});
 try {
  const base=await new Promise((resolve,reject)=>{let data='';const timer=setTimeout(()=>reject(new Error('Startup timeout')),5000);app.stdout.on('data',chunk=>{data+=chunk;const m=data.match(/listening on 127\.0\.0\.1:(\d+)/);if(m){clearTimeout(timer);resolve('http://127.0.0.1:'+m[1]);}});app.once('exit',()=>{clearTimeout(timer);reject(new Error('App exited'));});});
  const get=(route,headers)=>fetch(base+route,{headers});
  assert.equal((await get('/',{host:'advisors.example.com'})).status,400);
  assert.equal((await get('/',{host:'evil.example','x-forwarded-proto':'https'})).status,400);
  const r=await get('/',{host:'advisors.example.com','x-forwarded-proto':'https'});assert.equal(r.status,200);assert.match(r.headers.get('strict-transport-security'),/max-age=31536000/);
  assert.equal((await fetch(base+'/api/bootstrap-admin',{method:'POST',headers:{host:'advisors.example.com','x-forwarded-proto':'https','content-type':'application/json'},body:'{}'})).status,404);
  assert.equal((await get('/api/health',{})).status,200);
 }finally{app.kill();await new Promise(resolve=>{if(app.exitCode!==null)return resolve();app.once('exit',resolve);});}
});
