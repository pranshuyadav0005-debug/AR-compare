// Isolated HTTP database stand-in behind the real Node server. Never production data.
const http=require('node:http');
const crypto=require('node:crypto');
const {spawn}=require('node:child_process');
const path=require('node:path');
const {hashPassword}=require('../../server/functions/lib/app-auth');
async function startStack(){
 const tables={advisors:[],app_passwords:[],app_sessions:[],audit_logs:[],quotes:[],quote_submissions:[],insurers:[],rate_cards:[]};
 const controls={failLists:false,delayLists:0,failRevocations:false,failSessions:false},writes=[];let app;
 const password='test-password-123';
 for(const [username,role]of [['admin','admin'],['existing','advisor']]){const id=crypto.randomUUID();tables.advisors.push({id,username,name:username==='admin'?'Workspace Admin':'Existing Advisor',role,approval_status:'approved',is_active:true,created_at:new Date().toISOString()});tables.app_passwords.push({advisor_id:id,password_hash:hashPassword(password)});}
 const send=(res,status,data)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(data));};
 const matches=(row,url)=>[...url.searchParams].every(([key,value])=>!value.startsWith('eq.')||String(row[key])===value.slice(3))&&[...url.searchParams].every(([key,value])=>value!=='is.null'||row[key]==null)&&[...url.searchParams].every(([key,value])=>!value.startsWith('gt.')||String(row[key])>value.slice(3));
 const db=http.createServer(async(req,res)=>{
  let text='';for await(const chunk of req)text+=chunk;const body=text?JSON.parse(text):{},url=new URL(req.url,'http://fixture'),name=url.pathname.replace('/rest/v1/','');
  if(!tables[name])return send(res,404,{});
  if(name==='app_sessions'&&req.method==='PATCH'&&controls.failRevocations)return send(res,503,{error:'Simulated revocation outage'});
  if(name==='app_sessions'&&req.method==='GET'&&controls.failSessions)return send(res,503,{error:'Simulated session outage'});
  if(req.method==='GET'){
   if(name==='advisors'&&url.searchParams.has('order')){if(controls.delayLists)await new Promise(r=>setTimeout(r,controls.delayLists));if(controls.failLists)return send(res,503,{error:'Simulated database outage'});}
   let rows=tables[name].filter(row=>matches(row,url));const limit=Number(url.searchParams.get('limit'));if(limit)rows=rows.slice(0,limit);return send(res,200,rows);
  }
  writes.push({table:name,method:req.method});
  if(req.method==='POST'){
   const incoming=Array.isArray(body)?body:[body];if(name==='advisors'&&incoming.some(x=>tables.advisors.some(row=>row.username===x.username)))return send(res,409,{code:'23505'});
   const rows=incoming.map(x=>({id:crypto.randomUUID(),created_at:new Date().toISOString(),...x}));tables[name].push(...rows);return send(res,201,rows);
  }
  const rows=tables[name].filter(row=>matches(row,url));
  if(req.method==='PATCH'){rows.forEach(row=>Object.assign(row,body));return send(res,200,rows);}
  if(req.method==='DELETE'){tables[name]=tables[name].filter(row=>!matches(row,url));return send(res,200,[]);}
  send(res,405,{});
 });
 await new Promise(r=>db.listen(0,'127.0.0.1',r));
 try{
  app=spawn(process.execPath,['server.js'],{cwd:path.resolve(__dirname,'../..'),env:{...process.env,NODE_ENV:'development',PORT:'0',HOST:'127.0.0.1',TRUST_PROXY_HOPS:'0',SUPABASE_URL:`http://127.0.0.1:${db.address().port}`,SUPABASE_SERVICE_ROLE_KEY:'local-test-only',UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:'',REDIS_REST_URL:'',REDIS_REST_TOKEN:'',APP_DEPLOYMENT_MODE:'single'},stdio:['ignore','pipe','pipe']});
  const base=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('App startup timeout')),5000);app.stdout.on('data',chunk=>{output+=chunk;const match=output.match(/listening on 127\.0\.0\.1:(\d+)/);if(match){clearTimeout(timer);resolve('http://127.0.0.1:'+match[1]);}});app.once('exit',()=>{clearTimeout(timer);reject(new Error('App exited'));});app.stderr.on('data',()=>{});});
  return {base,tables,controls,writes,password,async close(){app.kill();db.closeAllConnections();await new Promise(r=>db.close(r));}};
 }catch(error){app?.kill();db.closeAllConnections();db.close();throw error;}
}
module.exports={startStack};
