'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const fs=require('node:fs');
let server,browser,base;
const session={id:'public-ui-user',name:'Demo User',username:'demo.user',role:'advisor'};
before(async()=>{
 server=spawn(process.execPath,['server.js'],{cwd:process.cwd(),env:{...process.env,NODE_ENV:'development',APP_ORIGIN:'',HOST:'127.0.0.1',PORT:'0'},stdio:['ignore','pipe','pipe']});
 base=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Startup timeout')),10000);server.stdout.on('data',d=>{output+=d;const match=output.match(/listening on 127\.0\.0\.1:(\d+)/);if(match){clearTimeout(timer);resolve('http://127.0.0.1:'+match[1]);}});server.once('exit',()=>{clearTimeout(timer);reject(new Error('Server exited'));});});
});
after(async()=>{await browser?.close();server?.kill();});
async function fixture(signedIn=false){
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--single-process','--no-zygote']}:{})});

 const context=await browser.newContext(),page=await context.newPage(),errors=[],requests=[];
 const state={signedIn,googleEnabled:true,lookupError:false,searchError:false,logoutError:false};
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{
  const url=new URL(route.request().url());requests.push({path:url.pathname,query:url.search});let status=200,data={};
  if(url.pathname==='/api/auth/me'){status=state.signedIn?200:401;data=state.signedIn?{session}:{error:'Not signed in'};}
  else if(url.pathname==='/api/auth/options')data={publicRegistration:true,googleEnabled:state.googleEnabled};
  else if(url.pathname==='/api/auth/login'){const body=route.request().postDataJSON();state.signedIn=body.password==='correct-password-for-public-ui';status=state.signedIn?200:401;data=state.signedIn?{session}:{error:'Invalid username or password.'};}
  else if(url.pathname==='/api/auth/logout'){status=state.logoutError?503:200;if(!state.logoutError)state.signedIn=false;data=state.logoutError?{error:'Service temporarily unavailable.'}:{ok:true};}
  else if(url.pathname==='/api/quotes/search'){status=state.searchError?503:200;data=state.searchError?{error:'Saved quotations temporarily unavailable.'}:{results:[],count:0};}
  else if(url.pathname==='/api/vehicle/lookup'){status=state.lookupError?503:404;data={error:state.lookupError?'Vehicle service temporarily unavailable.':'Vehicle not found.'};}
  await route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
 });
 return{page,context,errors,requests,state};
}
async function fits(page,selectors){
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Document overflows horizontally');
 for(const selector of selectors){const rect=await page.locator(selector).boundingBox();assert(rect,selector+' must be visible');assert(rect.x>=-1&&rect.x+rect.width<=await page.evaluate(()=>innerWidth)+1,selector+' must fit the viewport');}
}
test('professional login and signup retain working validation, password toggle and desktop/mobile layouts',async()=>{
 const f=await fixture();try{
  await f.page.goto(base);await f.page.waitForFunction(()=>!document.getElementById('loginGoogleBtn').disabled);
  for(const width of [1440,1024,768,390,320]){
   await f.page.setViewportSize({width,height:900});await fits(f.page,['.is-active .auth-brand','#loginUsername','#loginPassword','#loginGoogleBtn','#loginBtn','#goToSignupLink']);
  }
  await f.page.setViewportSize({width:1440,height:900});await f.page.screenshot({path:'/tmp/coverscope-login-desktop.png',fullPage:true});
  await f.page.locator('#loginBtn').click();assert(await f.page.locator('#usernameField.has-error').count());
  await f.page.locator('#loginUsername').fill('demo.user');await f.page.locator('#loginBtn').click();assert(await f.page.locator('#passwordField.has-error').count());
  await f.page.locator('#loginPassword').fill('wrong-password');await f.page.locator('[data-target="loginPassword"]').click();assert.equal(await f.page.locator('#loginPassword').getAttribute('type'),'text');await f.page.locator('[data-target="loginPassword"]').click();assert.equal(await f.page.locator('#loginPassword').getAttribute('type'),'password');
  await f.page.locator('#loginBtn').click();await f.page.waitForSelector('#errorBanner.is-visible');assert.match(await f.page.locator('#errorBannerText').innerText(),/Invalid username/);
  await f.page.locator('#goToSignupLink').click();await f.page.locator('#signupBtn').click();assert(await f.page.locator('#signupNameField.has-error').count());
  for(const width of [1440,768,390,320]){await f.page.setViewportSize({width,height:900});await fits(f.page,['#signupName','#signupUsername','#signupPassword','#signupBtn','#goToLoginLink']);}
  await f.page.screenshot({path:'/tmp/coverscope-signup-mobile.png',fullPage:true});
  await f.page.locator('#goToLoginLink').click();await f.page.locator('#loginPassword').fill('correct-password-for-public-ui');await f.page.locator('#loginBtn').click();await f.page.waitForURL('**/motor-insurance.html');await f.page.waitForSelector('#screen-dashboard.is-active');assert.match(await f.page.locator('#greeting').innerText(),/Demo User/);assert.deepEqual(f.errors,[]);
 }finally{await f.context.close();await browser.close();}
});
test('dashboard has no notification or dummy menu controls; saved quotes and search remain usable at all sizes',async()=>{
 const f=await fixture(true);try{
  await f.page.goto(base+'/motor-insurance.html');await f.page.waitForSelector('#screen-dashboard.is-active');assert(await f.page.locator('.dashboard-side').evaluate(el=>el.parentElement.classList.contains('dashboard-workspace')&&!el.closest('.topbar')));assert.equal(await f.page.locator('.notif-btn,[aria-label="Notifications"],button.advisor-menu,.daily-quote-card,.trust-bar').count(),0);
  for(const width of [1440,1280,1024,850,768,520,390,320]){
   await f.page.setViewportSize({width,height:900});await fits(f.page,['#screen-dashboard .topbar-nav','#screen-dashboard .topbar-search-form','#regTypeChoices','#regNumber','#lookupBtn','.saved-quotes-card button']);const form=await f.page.locator('#regForm').boundingBox(),saved=await f.page.locator('.saved-quotes-card').boundingBox(),header=await f.page.locator('#screen-dashboard .topbar').boundingBox();assert(header.height<200,'Header must not contain content cards');if(width>850)assert(saved.x>form.x+form.width,'Desktop saved quotes must sit beside the form');else assert(saved.y>form.y+form.height,'Stacked saved quotes must follow the form');
   const nav=f.page.locator('#screen-dashboard .topbar-nav [data-nav-reports]');await nav.click();await f.page.waitForSelector('#screen-reports.is-active');await f.page.waitForSelector('#reportsSearchResults .quote-result-card');assert.match(await f.page.locator('#reportsSearchResults').innerText(),/No quotations/);await f.page.locator('#homeBtnReports').click();await f.page.waitForSelector('#screen-dashboard.is-active');
  }
  await f.page.setViewportSize({width:1440,height:1000});await f.page.screenshot({path:'/tmp/coverscope-workspace-desktop.png',fullPage:true});await f.page.setViewportSize({width:390,height:844});await f.page.screenshot({path:'/tmp/coverscope-workspace-mobile.png',fullPage:true});
  await f.page.locator('.saved-quotes-card button').click();await f.page.waitForSelector('#screen-reports.is-active');await f.page.locator('#screen-reports [data-nav-dashboard]').click();await f.page.waitForSelector('#screen-dashboard.is-active');
  const search=f.page.locator('#screen-dashboard .topbar-search-input');await search.fill('MH12AB1234');await search.press('Enter');await f.page.waitForSelector('#screen-reports.is-active');assert.equal(await f.page.locator('#reportsSearchInput').inputValue(),'MH12AB1234');assert(f.requests.some(r=>r.path==='/api/quotes/search'&&r.query.includes('MH12AB1234')));assert.deepEqual(f.errors,[]);
 }finally{await f.context.close();await browser.close();}
});
test('registration controls validate normal and BH plates and support manual fallback without a broken dashboard',async()=>{
 const f=await fixture(true);try{
  await f.page.goto(base+'/motor-insurance.html');await f.page.waitForSelector('#screen-dashboard.is-active');await f.page.locator('#lookupBtn').click();assert(await f.page.locator('#regTypeField.has-error').count());await f.page.locator('#regTypeChoices [data-value="normal"]').click();assert.equal(await f.page.locator('#regTypeChoices [data-value="normal"]').getAttribute('aria-pressed'),'true');await f.page.locator('#regNumber').fill('invalid');await f.page.locator('#lookupBtn').click();assert(await f.page.locator('#regField.has-error').count());
  for(const [type,reg]of [['normal','MH12AB1234'],['bh','24BH1234AA']]){
   await f.page.locator('#regTypeChoices [data-value="'+type+'"]').click();await f.page.locator('#regNumber').fill(reg.toLowerCase());assert.equal(await f.page.locator('#regNumber').inputValue(),reg);await f.page.locator('#lookupBtn').click();await f.page.waitForSelector('#screen-vehicle-details.is-active');assert(f.requests.some(r=>r.path==='/api/vehicle/lookup'));await f.page.locator('#homeBtnVehicleDetails').click();await f.page.waitForSelector('#screen-dashboard.is-active');
  }
  f.state.lookupError=true;await f.page.locator('#lookupBtn').click();await f.page.waitForSelector('#lookupError.is-visible');assert.match(await f.page.locator('#lookupErrorText').innerText(),/temporarily unavailable/);assert(!await f.page.locator('#lookupBtn').isDisabled());assert(await f.page.locator('#screen-dashboard').evaluate(e=>e.classList.contains('is-active')));assert.deepEqual(f.errors,[]);
 }finally{await f.context.close();await browser.close();}
});
test('saved-quote and logout errors remain recoverable; privacy link and actual sign-out work',async()=>{
 const f=await fixture(true);try{
  await f.page.goto(base+'/motor-insurance.html');await f.page.waitForSelector('#screen-dashboard.is-active');
  const privacy=await Promise.all([f.context.waitForEvent('page'),f.page.locator('.workspace-guide a').click()]);await privacy[0].waitForLoadState('domcontentloaded');assert.match(await privacy[0].title(),/Privacy/);await privacy[0].close();
  f.state.searchError=true;await f.page.locator('.saved-quotes-card button').click();await f.page.waitForFunction(()=>document.getElementById('reportsSearchMessage').textContent.includes('temporarily unavailable'));assert(!await f.page.locator('#reportsSearchBtn').isDisabled());f.state.searchError=false;await f.page.locator('#reportsSearchBtn').click();await f.page.waitForSelector('#reportsSearchResults .quote-result-card');await f.page.locator('#homeBtnReports').click();
  f.state.logoutError=true;await f.page.locator('#signOutBtn1').click();await f.page.waitForSelector('#logoutNotice');assert.match(await f.page.locator('#logoutNotice').innerText(),/Sign out failed/);assert(!await f.page.locator('#signOutBtn1').isDisabled());f.state.logoutError=false;await f.page.locator('#signOutBtn1').click();await f.page.waitForURL('**/index.html');await f.page.waitForSelector('#screen-login.is-active');assert.deepEqual(f.errors,[]);
 }finally{await f.context.close();await browser.close();}
});
test('both entry pages ship the same notification-free functional dashboard and public login',()=>{
 for(const name of ['index.html','motor-insurance.html']){
  const html=fs.readFileSync('public/'+name,'utf8');assert(html.includes('css/public-workspace.css'));assert(!html.includes('Notifications'));assert(!html.includes('class="advisor-menu"'));assert(html.includes('class="dashboard-workspace"'));assert(html.includes('id="loginGoogleBtn"'));assert(html.includes('id="signupGoogleBtn"'));assert(html.includes('id="regForm"'));assert(!html.includes('auth-illustration-art'));assert(!html.includes('id="dailyQuote"'));
 }
});
