const crypto = require('crypto');
const {atomicAccounts,rpc}=require('./lib/accounts');
const { json } = require('./lib/http');
const { select, insert, update } = require('./lib/supabase');
const { requireAuth, hashPasswordAsync } = require('./lib/app-auth');
exports.handler = async event => {
  try {
    const auth=await requireAuth(event,['admin']);
    if(event.httpMethod==='GET') { const users=await select('advisors','role=eq.advisor&select=id,name,username,role,approval_status,is_active,created_at&order=created_at.desc&limit=500'); return json(200,{users:users||[]}); }
    if(event.httpMethod!=='POST') return json(405,{error:'Method not allowed'});
    let b; try{b=JSON.parse(event.body||'{}')}catch{return json(400,{error:'Invalid JSON.'})};
    if(!b||typeof b!=='object'||Array.isArray(b))return json(400,{error:'Invalid request.'});if(['name','username','password'].some(k=>typeof b[k]!=='string'))return json(400,{error:'Account fields must be strings.'});const name=String(b.name||'').trim(), username=String(b.username||'').trim().toLowerCase(), password=String(b.password||'');
    if(name.length<2||name.length>100) return json(400,{error:'Enter a valid full name.'});
    if(!/^[a-z0-9._-]{3,40}$/.test(username)) return json(400,{error:'Username must be 3–40 characters and use letters, numbers, dot, underscore or hyphen.'});
    if(password.length<15||password.length>128) return json(400,{error:'Password must be 15–128 characters.'});
    const taken=await select('advisors',`username=eq.${encodeURIComponent(username)}&select=id&limit=1`); if(taken?.length) return json(409,{error:'That username is already taken.'});
    const id=crypto.randomUUID();
    if(atomicAccounts()){await rpc('app_provision_advisor',{p_id:id,p_name:name,p_username:username,p_password_hash:await hashPasswordAsync(password),p_actor:auth.advisor.id});return json(201,{ok:true,user:{id,name,username}});}
    await insert('advisors',{id,name,username,role:'advisor',approval_status:'approved',is_active:true},'return=minimal');
    try {
      await insert('app_passwords',{advisor_id:id,password_hash:await hashPasswordAsync(password),updated_at:new Date().toISOString()},'return=minimal');
    } catch (err) {
      await require('./lib/supabase').remove('advisors', `id=eq.${encodeURIComponent(id)}`).catch(() => {});
      throw err;
    }
    await insert('audit_logs',{actor_id:auth.advisor.id,action:'admin_create_user',target_id:id,metadata:{username}},'return=minimal').catch(()=>{});
    return json(201,{ok:true,user:{id,name,username}});
  } catch(e){return json(e.status||500,{error:e.status?e.message:'Internal server error.'});}
};
