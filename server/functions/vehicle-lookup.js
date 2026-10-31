const { json }=require('./lib/http'); const { select }=require('./lib/supabase'); const { requireAuth }=require('./lib/app-auth'); const { verifyVehicle }=require('./lib/vehicle-verify');
exports.handler=async event=>{try{if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed'});const auth=await requireAuth(event,['advisor','admin']);let b;try{b=JSON.parse(event.body||'{}')}catch{return json(400,{error:'Invalid JSON.'})};const reg=String(b.registrationNumber||'').replace(/\s+/g,'').toUpperCase();if(!/^[A-Z0-9-]{6,15}$/.test(reg))return json(400,{error:'Enter a valid registration number.'});const rows=await select('vehicles',`advisor_id=eq.${encodeURIComponent(auth.advisor.id)}&registration_number=eq.${encodeURIComponent(reg)}&select=*&limit=1`);
  // Best-effort: an RTO/VAHAN-style provider check, entirely separate from the
  // advisor's own saved-vehicle history above. Never blocks the response —
  // if it's not configured yet, or the provider call fails, `verification`
  // just reports that so the client can show "unverified, please confirm"
  // instead of silently claiming a check that never happened.
  let verification={status:'not_configured'};
  try{verification=await verifyVehicle(reg, b.enteredDetails||{});}catch{verification={status:'unavailable',reason:'Verification check failed.'}}
  if(rows?.length)return json(200,{source:'saved',vehicle:rows[0],verification});
  return json(200,{source:'manual',vehicle:null,verification});
}catch(e){return json(e.status||500,{error:e.status?e.message:'Internal server error.'});}};
