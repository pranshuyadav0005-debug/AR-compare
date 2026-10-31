const {json}=require('./lib/http');
const {select,update,insert}=require('./lib/supabase');
const {requireAuth}=require('./lib/app-auth');
exports.handler=async event=>{
 try{
  if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed'});
  const auth=await requireAuth(event,['admin']);const id=event.path.split('/').filter(Boolean).at(-2);
  let body;try{body=JSON.parse(event.body||'{}');}catch{return json(400,{error:'Invalid JSON.'});}
  if(!body||typeof body!=='object'||!['approved','rejected'].includes(body.status))return json(400,{error:'Invalid approval status.'});
  const target=await select('advisors',`id=eq.${encodeURIComponent(id)}&role=eq.advisor&select=id,approval_status&limit=1`);
  if(!target?.length)return json(404,{error:'Advisor not found.'});
  const rows=await update('advisors',`id=eq.${encodeURIComponent(id)}&role=eq.advisor&approval_status=eq.pending`,{approval_status:body.status},'return=representation');
  if(!rows?.length)return json(409,{error:'This request has already been reviewed. Refresh the workspace.'});
  await insert('audit_logs',{actor_id:auth.advisor.id,action:`advisor_${body.status}`,target_id:id,metadata:{}},'return=minimal').catch(()=>{});
  return json(200,{ok:true});
 }catch(error){return json(error.status||500,{error:error.status?error.message:'Could not update advisor approval.'});}
};
