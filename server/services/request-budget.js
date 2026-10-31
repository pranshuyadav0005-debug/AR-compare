const {AsyncLocalStorage}=require('node:async_hooks');
const storage=new AsyncLocalStorage();
function context(){return storage.getStore();}
function remaining(){const current=context();return current?Math.max(0,current.deadline-Date.now()):8000;}
async function withBudget(milliseconds,fn){
 const controller=new AbortController();
 const deadline=Date.now()+milliseconds;
 const timer=setTimeout(()=>controller.abort(Object.assign(new Error('Request response window exceeded.'),{code:'deadline'})),milliseconds);
 try{return await storage.run({deadline,signal:controller.signal},fn);}finally{clearTimeout(timer);}
}
module.exports={context,remaining,withBudget};
