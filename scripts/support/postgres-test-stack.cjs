// Embedded PostgreSQL executes the real schema and transactions.
// HTTP compatibility bridge supports the app's exercised PostgREST subset only.
const {PGlite}=require('@electric-sql/pglite');
const http=require('node:http'),crypto=require('node:crypto'),fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'../..');
const {hashPasswordAsync}=require('../../server/functions/lib/app-auth');
const tables=new Set(['advisors','app_passwords','app_sessions','insurers','rate_cards','quotes','quote_submissions','audit_logs','customers','vehicles','policies','app_schema_migrations']);
const column=x=>{if(!/^[a-z_]+$/.test(x))throw new Error('Unsupported identifier');return '"'+x+'"';};
async function startPostgresStack(){
 const db=new PGlite();await db.exec('create role anon;create role authenticated;create role service_role bypassrls;');
 await db.exec(fs.readFileSync(path.join(root,'sql/testing_database_schema.sql'),'utf8'));
 await db.exec(fs.readFileSync(path.join(root,'seed.sql'),'utf8'));
 const password='Local-testing-password-123',adminId=crypto.randomUUID();
 await db.query("insert into advisors(id,name,username,role) values($1,'Testing Administrator','test.admin','admin')",[adminId]);
 await db.query('insert into app_passwords(advisor_id,password_hash) values($1,$2)',[adminId,await hashPasswordAsync(password)]);
 const send=(res,status,data)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(data));};
 const server=http.createServer(async(req,res)=>{
  try{
   if(req.headers.apikey!=='test-server-key')return send(res,401,{code:'invalid_key'});
   let body='';for await(const c of req)body+=c;const data=body?JSON.parse(body):{},url=new URL(req.url,'http://test');
   const parts=url.pathname.split('/').filter(Boolean);
   const result=await db.transaction(async tx=>{
    await tx.exec('set local role service_role');
    if(parts[2]==='rpc'){
     const functions={app_provision_advisor:['p_id','p_name','p_username','p_password_hash','p_actor'],app_reset_advisor_password:['p_id','p_password_hash','p_actor'],app_set_advisor_active:['p_id','p_active','p_actor']};
     const names=functions[parts[3]];if(!names)throw new Error('Unknown test RPC');
     return (await tx.query(`select public.${column(parts[3])}(${names.map((_,i)=>'$'+(i+1)).join(',')}) as result`,names.map(n=>data[n]??null))).rows[0].result;
    }
    const table=parts[2];if(!tables.has(table))throw new Error('Unknown test table');
    const values=[],filters=[];
    for(const [key,value]of url.searchParams){
     if(['select','order','limit'].includes(key))continue;
     if(key==='or')throw new Error('OR grammar is outside the test bridge; use real Supabase for that check.');
     const col=column(key);
     if(value==='is.null')filters.push(`${col} is null`);
     else if(value.startsWith('eq.')){values.push(value.slice(3));filters.push(`${col}=$${values.length}`);}
     else if(value.startsWith('gt.')){values.push(value.slice(3));filters.push(`${col}>$${values.length}`);}
     else throw new Error('Unsupported test filter');
    }
    const where=filters.length?' where '+filters.join(' and '):'';
    if(req.method==='GET'){
     const select=url.searchParams.get('select')||'*';const cols=select==='*'?'*':select.split(',').map(column).join(',');
     const order=url.searchParams.get('order');const sort=order?` order by ${column(order.split('.')[0])} ${order.endsWith('.desc')?'desc':'asc'}`:'';
     const limit=Number(url.searchParams.get('limit')||1000);
     if(!Number.isInteger(limit)||limit<1||limit>1000)throw new Error('Unsupported limit');
     return (await tx.query(`select ${cols} from public.${column(table)}${where}${sort} limit ${limit}`,values)).rows;
    }
    const entries=Object.entries(data);
    if(req.method==='POST')return(await tx.query(`insert into public.${column(table)}(${entries.map(([k])=>column(k)).join(',')}) values(${entries.map((_,i)=>'$'+(i+1)).join(',')}) returning *`,entries.map(([,v])=>typeof v==='object'&&v!==null?JSON.stringify(v):v))).rows;
    if(req.method==='PATCH'){
     const set=entries.map(([k,v])=>{values.push(typeof v==='object'&&v!==null?JSON.stringify(v):v);return `${column(k)}=$${values.length}`;}).join(',');
     return(await tx.query(`update public.${column(table)} set ${set}${where} returning *`,values)).rows;
    }
    if(req.method==='DELETE')return(await tx.query(`delete from public.${column(table)}${where} returning *`,values)).rows;
    throw new Error('Unsupported method');
   });
   return send(res,req.method==='POST'?201:200,result);
  }catch(e){return send(res,e.code==='23505'?409:e.code==='42501'?403:400,{code:e.code||'test_adapter_error'});}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const app=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,NODE_ENV:'development',PORT:'0',HOST:'127.0.0.1',TRUST_PROXY_HOPS:'0',SUPABASE_URL:`http://127.0.0.1:${server.address().port}`,SUPABASE_SERVICE_ROLE_KEY:'test-server-key',APP_ATOMIC_ACCOUNTS:'true',REGISTRATION_INVITE_CODE:'test-private-invitation-1234567890abcdef',BOOTSTRAP_ADMIN_SECRET:'',APP_DEPLOYMENT_MODE:'single',UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:'',REDIS_REST_URL:'',REDIS_REST_TOKEN:''},stdio:['ignore','pipe','pipe']});
 let stderr='';app.stderr.on('data',c=>stderr+=c);
 const base=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Startup timeout: '+stderr)),10000);app.stdout.on('data',c=>{output+=c;const m=output.match(/listening on 127\.0\.0\.1:(\d+)/);if(m){clearTimeout(timer);resolve('http://127.0.0.1:'+m[1]);}});app.once('exit',()=>{clearTimeout(timer);reject(new Error('App exited: '+stderr));});});
 return {db,base,password,adminId,invite:'test-private-invitation-1234567890abcdef',async close(){app.kill();await new Promise(r=>{if(app.exitCode!==null)return r();app.once('exit',r);});server.closeAllConnections();await new Promise(r=>server.close(r));await db.close();}};
}
module.exports={startPostgresStack};
