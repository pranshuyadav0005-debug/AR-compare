'use strict';
const crypto=require('node:crypto');
const {fetchJson}=require('./http');
const {parseCookies,isSecureRequest}=require('./app-auth');
const COOKIE=process.env.NODE_ENV==='production'?'__Host-test_google':'test_google';
function settings(){
 const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY||'';
 let role;try{role=JSON.parse(Buffer.from(key.split('.')[1]||'','base64url').toString()).role;}catch{}
 const enabled=process.env.GOOGLE_AUTH_ENABLED==='true'&&!!key&&key!==process.env.SUPABASE_SERVICE_ROLE_KEY&&!key.startsWith('sb_secret_')&&role!=='service_role';
 return{enabled,key,base:(process.env.SUPABASE_URL||'').replace(/\/$/,''),origin:process.env.APP_ORIGIN||''};
}
function originFor(event){
 if(process.env.APP_ORIGIN)return new URL(process.env.APP_ORIGIN).origin;
 if(process.env.NODE_ENV==='production')throw new Error('Missing canonical origin');
 const host=event.headers?.host||'';
 if(!/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host))throw new Error('Configure APP_ORIGIN');
 return `http://${host}`;
}
function signingKey(){return crypto.createHmac('sha256',process.env.SUPABASE_SERVICE_ROLE_KEY||'development-only').update('test-portal/google-pkce-cookie/v1').digest();}
function sign(payload){return crypto.createHmac('sha256',signingKey()).update(payload).digest('base64url');}
function flowCookie(value,event,maxAge=600){return `${COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; ${process.env.NODE_ENV==='production'||isSecureRequest(event)?'Secure; ':''}SameSite=Lax`;}
function startFlow(event){
 const verifier=crypto.randomBytes(32).toString('base64url');
 const payload=Buffer.from(JSON.stringify({verifier,created:Date.now()})).toString('base64url');
 return{verifier,challenge:crypto.createHash('sha256').update(verifier).digest('base64url'),cookie:flowCookie(payload+'.'+sign(payload),event)};
}
function readFlow(event){
 const raw=parseCookies(event)[COOKIE];if(!raw||raw.length>1024)throw new Error('Missing flow');
 const [payload,signature,...extra]=raw.split('.');if(extra.length||!signature)throw new Error('Invalid flow');
 const expected=Buffer.from(sign(payload)),given=Buffer.from(signature);
 if(expected.length!==given.length||!crypto.timingSafeEqual(expected,given))throw new Error('Invalid flow');
 const data=JSON.parse(Buffer.from(payload,'base64url').toString());
 if(!/^[A-Za-z0-9_-]{43}$/.test(data.verifier)||!Number.isFinite(data.created)||Date.now()-data.created>600000||data.created>Date.now()+30000)throw new Error('Expired flow');
 return data;
}
async function verifiedIdentity(code,verifier){
 const {key,base}=settings();
 const {data:tokens}=await fetchJson(`${base}/auth/v1/token?grant_type=pkce`,{method:'POST',headers:{apikey:key,'content-type':'application/json'},body:JSON.stringify({auth_code:code,code_verifier:verifier})},{timeoutMs:5000});
 if(typeof tokens.access_token!=='string'||!tokens.access_token||tokens.access_token.length>16384)throw new Error('Invalid exchange');
 // Authoritative server request: never accept browser-decoded claims or user_metadata.sub.
 const {data:user}=await fetchJson(`${base}/auth/v1/user`,{headers:{apikey:key,authorization:`Bearer ${tokens.access_token}`}},{timeoutMs:5000});
 const identity=Array.isArray(user.identities)?user.identities.find(i=>i.provider==='google'):null;
 const subject=identity?.identity_data?.sub;
 if(typeof subject!=='string'||!subject||subject.length>255||!user.email_confirmed_at||identity.identity_data.email_verified===false)throw new Error('Google identity is not verified');
 const trimmed=String(user.user_metadata?.full_name||user.user_metadata?.name||'Public tester').trim().slice(0,100);
 return{subjectHash:crypto.createHash('sha256').update('google\0'+subject).digest('hex'),name:trimmed.length>=2?trimmed:'Public tester'};
}
module.exports={settings,originFor,startFlow,readFlow,flowCookie,verifiedIdentity,COOKIE};
