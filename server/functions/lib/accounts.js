// Production always uses database transactions; stand-in-only development may use legacy writes.
const db=require('./supabase');
function atomicAccounts(){return process.env.NODE_ENV==='production'||process.env.APP_ATOMIC_ACCOUNTS==='true';}
async function rpc(name,args){
 try{return await db.request(`/rest/v1/rpc/${name}`,{method:'POST',body:JSON.stringify(args)});}
 catch(e){
  const code=e.data?.code;
  if(code==='23505')throw Object.assign(new Error('That username is already taken.'),{status:409});
  if(code==='P0002')throw Object.assign(new Error('Advisor not found.'),{status:404});
  if(code==='42501')throw Object.assign(new Error('Access changed. Sign in again.'),{status:403});
  throw e;
 }
}
module.exports={atomicAccounts,rpc};
