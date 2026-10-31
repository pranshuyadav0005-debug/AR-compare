// Optional browser regression: install Playwright separately, then npm run test:ui.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
const os=require('node:os');
(async()=>{
 const server=spawn(process.execPath,['server.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,NODE_ENV:'development',PORT:'0',HOST:'127.0.0.1'},stdio:['ignore','pipe','pipe']});
 let browser;
 try{
 const base=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Server start timeout')),5000);server.stdout.on('data',d=>{output+=d;const m=output.match(/listening on 127\.0\.0\.1:(\d+)/);if(m){clearTimeout(timer);resolve('http://127.0.0.1:'+m[1]);}});server.once('exit',()=>reject(new Error('Server exited')));});
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--single-process','--no-zygote']}:{})});
 const page=await browser.newPage({viewport:{width:1536,height:1080},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let mode='mixed',lastPayload,stored,quoteCalls=0,quoteActive=0,quotePeak=0,quoteDelay=0;const quotePayloads=[];
 function results(input){
  const idv=input.idv,policy=input.policy;
  const build=(id,source,od,extra={})=>{
   const addons=policy.selectedAddons.map(name=>({name,premium:500,available:true}));const tp=policy.policyType==='standalone'?0:3416;
   const base={insurerId:id,insurerName:id,rating:id==='Live B'?4.9:4.5,garageCount:1000,source,status:source==='api'?'success':'estimate',idv,returnedIdv:idv,requestedIdv:idv,policyType:policy.policyType,ncbPercent:policy.ncbPercent,odPremium:od,tpPremium:tp,gst:Math.round((od+tp+addons.length*500)*.18),addons,eligibleForComparison:true,comparisonIssues:[],...(source==='api'?{providerQuoteId:id+'-ref',expiresAt:new Date(Date.now()+60000).toISOString()}:{}),...extra};
   base.totalPremium=base.odPremium+base.tpPremium+base.gst+addons.length*500;return base;
  };
  return [build('Live A','api',Math.round(idv*.025)),build('Live B','api',Math.round(idv*.028)),build('Estimate A','estimate',Math.round(idv*.015*(1-(policy.advisorDiscount||0)/100))),build('Review','api',1000,{idv:idv+1000,returnedIdv:idv+1000,eligibleForComparison:false,comparisonIssues:['Returned IDV differs from requested IDV.']}),{insurerId:'Unavailable',insurerName:'Unavailable',source:'unavailable',status:'unavailable',totalPremium:null,eligibleForComparison:false,error:'Live quote unavailable.'}];
 }
 await page.route('**/api/**',async route=>{
  const url=route.request().url();let data,status=200;
  if(url.includes('/auth/me'))data={session:{name:'Demo Advisor',role:'advisor'}};
  else if(url.includes('/vehicle/lookup'))data={source:'manual',vehicle:null,verification:{status:'not_configured'}};
  else if(url.includes('/quotes/search'))data={results:stored?[stored]:[],count:stored?1:0};
  else if(url.endsWith('/api/quote')){
   quoteCalls++;quoteActive++;quotePeak=Math.max(quotePeak,quoteActive);lastPayload=JSON.parse(route.request().postData());quotePayloads.push(lastPayload);assert.match(route.request().headers()['idempotency-key'],/^[0-9a-f-]{36}$/i);
   if(quoteDelay)await new Promise(r=>setTimeout(r,quoteDelay));
   if(mode==='service-error'||mode==='auth-error'){status=mode==='auth-error'?401:503;data={error:mode==='auth-error'?'Your session has expired. Please sign in again.':'Quote service unavailable. Please retry.'};}
   else{data={results:results(lastPayload),quotation:mode==='save-failed'?null:{id:'a066b598-0064-4bbb-800f-43d862c884b2',quotationNumber:'ARQ-TEST',revision:(lastPayload.expectedRevision||0)+1},meta:{persistence:mode==='save-failed'?'failed':'saved',auditStatus:'recorded',maxAdvisorDiscountPercent:30}};}
  }else data={};
  await route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
  if(url.endsWith('/api/quote'))quoteActive--;
 });
 await page.goto(base+'/motor-insurance.html');await page.waitForSelector('#screen-dashboard.is-active');
 await page.evaluate(()=>{
  const brand='Maruti Suzuki',model=Object.keys(CAR_DATA[brand])[0],car=CAR_DATA[brand][model],fuelType=Object.keys(car.variantPrices)[0],variant=Object.keys(car.variantPrices[fuelType])[0];
  currentRegNumber='DL01AB1234';currentVehicleDetails={name:'Demo Customer',brand,model,variant,fuelType,registeredDate:'2023-04-01',policyExpiry:new Date(Date.now()+30*86400000).toISOString().slice(0,10)};
  currentPolicyDetails={policyType:'comprehensive',hadClaim:false,ncbPercent:20,prevPolicyCover:['none'],declaredAccurate:true,selectedAddons:[]};goToComparison();
 });
 await page.waitForSelector('#compareBody tr[data-plan-id]');
 assert.equal(await page.locator('#compareBody tr[data-plan-id]').count(),5);
 quoteDelay=100;quotePeak=0;const beforeCalls=quoteCalls;
 await page.evaluate(async()=>{
  const first=loadComparison();await new Promise(r=>setTimeout(r,20));
  vehicle.selectedAddons=['zero_dep'];const second=loadComparison();vehicle.selectedAddons=['engine_protection'];const third=loadComparison();
  await Promise.all([first,second,third]);renderComparison();
 });
 assert.equal(quotePeak,1);assert.equal(quoteCalls-beforeCalls,2);assert(quotePayloads.at(-1).expectedRevision>quotePayloads.at(-2).expectedRevision);assert.deepEqual(lastPayload.policy.selectedAddons,['engine_protection']);
 quoteDelay=0;await page.evaluate(async()=>{vehicle.selectedAddons=[];await loadComparison();renderComparison();});

 assert.equal(await page.locator('[data-plan-id="Unavailable"] .total-premium').innerText(),'—');
 assert(await page.locator('[data-plan-id="Live A"] .best-badge').isVisible());
 assert.equal(await page.locator('[data-plan-id="Estimate A"] .best-badge').innerText(),'Lowest estimate');
 assert.equal(await page.locator('[data-plan-id="Review"] .best-badge').count(),0);
 await page.locator('#insurerSearchInput').fill('Live B');assert.equal(await page.locator('#compareBody .best-badge').count(),0);await page.locator('#insurerSearchInput').fill('');
 await page.locator('#sortSelect').selectOption('rating');assert.equal(await page.locator('#compareBody tr[data-plan-id]').first().getAttribute('data-plan-id'),'Live B');await page.locator('#sortSelect').selectOption('price');
 await page.locator('[data-plan-id="Review"] .plan-details-btn').click();assert(await page.locator('#selectPlanBtn').isDisabled());assert((await page.locator('#planModalBody').innerText()).includes('Returned IDV differs'));await page.locator('#closePlanModal').click();
 await page.locator('[data-plan-id="Estimate A"] .plan-details-btn').click();assert.equal(await page.locator('#selectPlanBtn').innerText(),'Shortlist estimate');await page.locator('#closePlanModal').click();
 const downloadPromise=page.waitForEvent('download');await page.locator('[data-plan-id="Estimate A"] .insurer-export-btn').click();const dl=await downloadPromise;assert(fs.readFileSync(await dl.path(),'utf8').includes('ESTIMATE — requires insurer confirmation'));
 mode='save-failed';await page.locator('#comparisonStatus button').click();await page.waitForFunction(()=>document.querySelector('#comparisonStatus').textContent.includes('not saved'));assert(await page.locator('[data-plan-id="Live A"] .total-premium').isVisible());
 for(const failure of ['service-error','auth-error']){mode=failure;await page.locator('#comparisonStatus button').click();await page.waitForFunction(()=>currentComparisonMeta.error);assert.equal(await page.locator('#compareBody .total-premium').count(),0);assert(await page.locator('#exportBtn').isDisabled());}
 mode='mixed';await page.locator('#comparisonStatus button').click();await page.waitForSelector('#compareBody tr[data-plan-id]');
 await page.locator('#maxDiscountBtn').click();await page.waitForFunction(()=>!currentComparisonMeta.loading&&advisorDiscount===30);assert.equal(lastPayload.policy.advisorDiscount,30);
 await page.locator('#ownDiscountInput').fill('10');await page.locator('#applyOwnDiscountBtn').click();await page.waitForFunction(()=>!currentComparisonMeta.loading&&advisorDiscount===10);assert.equal(lastPayload.policy.advisorDiscount,10);
 await page.locator('#addonFilter input[value="Roadside Assistance"]').check();await page.waitForFunction(()=>!currentComparisonMeta.loading&&vehicle.selectedAddons.includes('Roadside Assistance'));
 await page.locator('#idvMinBtn').click();await page.waitForFunction(()=>!currentComparisonMeta.loading&&currentIDV===bounds.min);
 await page.evaluate(()=>{
  currentRegNumber='DL01AB1234';goToVehicleDetails();vdManufacturerCombo.setValue('Audi');populateCarNames('Audi');vdCarNameCombo.setValue('A4');populateFuelTypes('Audi','A4');vdFuelType.value='Petrol';populateVariants('Audi','A4','Petrol');vdVariantCombo.setValue('1.8 TFSI');
 });
 await page.locator('#vdName').fill('Demo Customer');await page.locator('#vdRegisteredDate').fill('2023-04-01');await page.locator('#vdPolicyExpiry').fill(new Date(Date.now()+30*86400000).toISOString().slice(0,10));await page.locator('#vdSaveBtn').click();await page.waitForSelector('.manual-idv-dialog[open]');
 await page.locator('#manualIdvInput').fill('0');await page.locator('.manual-idv-dialog button[type=submit]').click();assert(await page.locator('#manualIdvError').innerText());
 await page.locator('#manualIdvInput').fill('500000');assert((await page.locator('#manualIdvRange').innerText()).includes('4,25,000'));await page.locator('.manual-idv-dialog button[type=submit]').click();await page.waitForSelector('#screen-policy-details.is-active');
 await page.evaluate(()=>{pdPolicyType.value='comprehensive';pdClaim.value='no';pdNcb.value='20';pdPrevCoverInputs.find(i=>i.value==='none').checked=true;pdAccuracyCheckbox.checked=true;});await page.locator('#pdSaveBtn').click();await page.waitForFunction(()=>currentIDV===500000&&!currentComparisonMeta.loading&&currentResults.length>0);
 assert.deepEqual(await page.evaluate(()=>bounds),{min:425000,max:575000});assert.equal(lastPayload.vehicle.manualIDV,500000);
 stored=await page.evaluate(()=>({id:'a066b598-0064-4bbb-800f-43d862c884b2',quotation_number:'ARQ-SAVED',registration_number:currentRegNumber,owner_name:'Demo Customer',vehicle_details:{...vehicle,policyDetails:currentPolicyDetails},idv_auto_calculated:autoIDV,idv_value:currentIDV,comparison_result:{results:currentResults,meta:{persistence:'saved'}}}));
 await page.evaluate(()=>goToReports());await page.locator('.view-saved-quote-btn').click();await page.waitForSelector('#screen-comparison.is-active');assert((await page.locator('#comparisonStatus').innerText()).includes('saved comparison'));assert((await page.locator('#idvAutoNote').innerText()).includes('Manual base IDV'));
 await page.locator('#editVehicleBtn').click();await page.locator('#cancelVehicleEdit').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const output=process.env.UI_ARTIFACT_DIR||path.join(os.tmpdir(),'ar-advisors-ui');fs.mkdirSync(output,{recursive:true});
 await page.screenshot({path:path.join(output,'desktop.png'),fullPage:true});await page.emulateMedia({media:'print'});await page.pdf({path:path.join(output,'comparison.pdf'),preferCSSPageSize:true,printBackground:true});await page.emulateMedia({media:'screen'});
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(output,'mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);console.log('UI passed: source grouping, null prices, ranking, search/sort, mismatches, exports, save/service/auth failures, retry, discount, addons, IDV bounds, manual flow, saved history, desktop/mobile/print.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
