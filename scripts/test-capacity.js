const {test}=require('node:test');
const assert=require('node:assert/strict');
const {BoundedPool}=require('../server/services/bounded-pool');
const capacity=require('../server/services/provider-capacity');
const {withBudget,context}=require('../server/services/request-budget');
const {setTimeout:delay}=require('node:timers/promises');
test('bounded queue cancels waiting requests and never starts expired work',async()=>{
 const pool=new BoundedPool(1,1),release=await pool.acquire(),controller=new AbortController();
 const waiting=pool.run(()=>assert.fail('Expired work started'),controller.signal);
 await assert.rejects(pool.acquire(),{code:'busy'});controller.abort();await assert.rejects(waiting);release();release();
 assert.deepEqual(pool.snapshot(),{active:0,queued:0,peak:1,limit:1});
});
test('provider global and per-host caps hold across independent comparisons',async()=>{
 const jobs=Array.from({length:100},(_,i)=>capacity.run(`https://host${i%8}.example/quote`,undefined,()=>delay(15)));
 await Promise.all(jobs);const state=capacity.snapshot();assert.equal(state.global.peak,50);assert.equal(state.global.active,0);assert.equal(state.global.queued,0);for(const pool of Object.values(state.providers)){assert(pool.peak<=10);assert.equal(pool.active,0);assert.equal(pool.queued,0);}
});
test('request budgets abort in-flight work and isolate concurrent requests',async()=>{
 const results=await Promise.allSettled([withBudget(20,()=>delay(200,undefined,{signal:context().signal})),withBudget(100,()=>delay(25))]);assert.equal(results[0].status,'rejected');assert.equal(results[1].status,'fulfilled');
});
