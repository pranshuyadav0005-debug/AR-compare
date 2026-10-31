const {json}=require('./lib/http');
const google=require('./lib/google-auth');
const {rateLimit,clientKey}=require('./lib/rate-limit');
const {sameOrigin,createSession,authCookies}=require('./lib/app-auth');
const {rpc}=require('./lib/accounts');
const {select}=require('./lib/supabase');
const redirect=(location,cookies=[])=>({statusCode:303,headers:{location,'cache-control':'no-store','referrer-policy':'no-referrer','set-cookie':cookies},body:''});
exports.options=async event=>event.httpMethod==='GET'?json(200,{publicRegistration:true,googleEnabled:google.settings().enabled}):json(405,{error:'Method not allowed'});
exports.start=async event=>{
 if(event.httpMethod!=='GET')return json(405,{error:'Method not allowed'});
 if(!sameOrigin(event))return json(403,{error:'Cross-origin request blocked.'});
 const rl=await rateLimit(`google-start:${clientKey(event)}`,30,900);if(!rl.allowed)return redirect('/index.html?auth_error=google_rate_limited');
 if(!google.settings().enabled)return redirect('/index.html?auth_error=google_unavailable');
 try{
  const {challenge,cookie}=google.startFlow(event),url=new URL(google.settings().base+'/auth/v1/authorize');
  url.searchParams.set('provider','google');url.searchParams.set('redirect_to',google.originFor(event)+'/api/auth/google/callback');
  url.searchParams.set('code_challenge',challenge);url.searchParams.set('code_challenge_method','s256');
  return redirect(url.href,[cookie]);
 }catch{return redirect('/index.html?auth_error=google_unavailable');}
};
exports.callback=async event=>{
 if(event.httpMethod!=='GET')return json(405,{error:'Method not allowed'});
 const clear=google.flowCookie('',event,0);
 if(!sameOrigin(event))return redirect('/index.html?auth_error=google_failed',[clear]);
 const rl=await rateLimit(`google-callback:${clientKey(event)}`,60,900);if(!rl.allowed)return redirect('/index.html?auth_error=google_rate_limited',[clear]);
 let stage='configuration';
 try{
  if(!google.settings().enabled)throw new Error();
  const code=event.queryStringParameters?.code;
  if(event.queryStringParameters?.error||typeof code!=='string'||!code||code.length>2048)throw new Error();
  stage='flow';const {verifier}=google.readFlow(event);
  stage='identity';const identity=await google.verifiedIdentity(code,verifier);
  stage='account';const id=await rpc('app_sign_in_google',{p_subject_hash:identity.subjectHash,p_name:identity.name});
  const rows=await select('advisors',`id=eq.${encodeURIComponent(id)}&select=id,name,username,role,approval_status,is_active,auth_version&limit=1`);
  const account=rows?.[0];
  if(!account||account.role!=='advisor'||!account.is_active||account.approval_status!=='approved')throw new Error();
  stage='session';const session=await createSession(account);
  return redirect('/insurance-selection.html',[clear,...authCookies(session,event)]);
 }catch(error){
  console.warn(JSON.stringify({event:'google_sign_in_failed',stage,requestId:event.headers?.['x-request-id'],remoteStatus:Number.isInteger(error.status)?error.status:undefined}));
  return redirect('/index.html?auth_error=google_failed',[clear]);
 }
};
