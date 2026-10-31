// A bounded FIFO admission queue. A cancelled waiter is removed immediately;
// it must never start work after its response window has expired.
class BoundedPool{
 constructor(limit,queueLimit){this.limit=limit;this.queueLimit=queueLimit;this.active=0;this.queue=[];this.peak=0;}
 acquire(signal){
  if(signal?.aborted)return Promise.reject(signal.reason||new Error('Cancelled'));
  if(this.active<this.limit){this.active++;this.peak=Math.max(this.peak,this.active);return Promise.resolve(this.releaseHandle());}
  if(this.queue.length>=this.queueLimit)return Promise.reject(Object.assign(new Error('Capacity is busy. Please retry.'),{status:503,code:'busy'}));
  return new Promise((resolve,reject)=>{
   const item={resolve,reject,signal,onAbort:null};
   item.onAbort=()=>{const i=this.queue.indexOf(item);if(i>=0)this.queue.splice(i,1);reject(signal.reason||new Error('Cancelled'));};
   signal?.addEventListener('abort',item.onAbort,{once:true});this.queue.push(item);
  });
 }
 releaseHandle(){let released=false;return()=>{if(released)return;released=true;this.active--;this.drain();};}
 drain(){while(this.active<this.limit&&this.queue.length){const item=this.queue.shift();item.signal?.removeEventListener('abort',item.onAbort);if(item.signal?.aborted){item.reject(item.signal.reason||new Error('Cancelled'));continue;}this.active++;this.peak=Math.max(this.peak,this.active);item.resolve(this.releaseHandle());}}
 async run(fn,signal){const release=await this.acquire(signal);try{return await fn();}finally{release();}}
 snapshot(){return{active:this.active,queued:this.queue.length,peak:this.peak,limit:this.limit};}
}
module.exports={BoundedPool};
