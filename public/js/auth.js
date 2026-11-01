const loginForm=document.getElementById('loginForm'),loginBtn=document.getElementById('loginBtn');
const usernameField=document.getElementById('usernameField'),passwordField=document.getElementById('passwordField');
function showLoginError(message){document.getElementById('errorBannerText').textContent=message;document.getElementById('errorBanner').classList.add('is-visible');}
function clearLoginFieldErrors(){[usernameField,passwordField].forEach(f=>f.classList.remove('has-error'));document.getElementById('errorBanner').classList.remove('is-visible');}
function setLoginLoading(value){loginBtn.disabled=value;loginBtn.classList.toggle('is-loading',value);loginForm.setAttribute('aria-busy',String(value));}
loginForm.addEventListener('submit',async event=>{
 event.preventDefault();if(loginBtn.disabled)return;clearLoginFieldErrors();
 const username=document.getElementById('loginUsername').value.trim(),password=document.getElementById('loginPassword').value;
 if(!username){usernameField.classList.add('has-error');document.getElementById('loginUsername').focus();return;}
 if(!password){passwordField.classList.add('has-error');document.getElementById('loginPassword').focus();return;}
 setLoginLoading(true);
 try{
  const data=await apiFetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
  if(!data.session||!['admin','advisor'].includes(data.session.role))throw new Error('Sign-in response was incomplete. Please retry.');
  session=data.session;adminComparisonMode=false;updateRoleChips();document.getElementById('loginPassword').value='';
  if(session.role==='admin'){showScreen('screen-admin');await loadAdminPanel();}else location.assign('motor-insurance.html');
 }catch(error){showLoginError(error.message||'Could not sign in. Please retry.');}finally{setLoginLoading(false);}
});
document.getElementById('goToSignupLink').addEventListener('click',()=>{clearSignupFieldErrors();showScreen('screen-signup');document.getElementById('signupName').focus();});
document.getElementById('goToLoginLink').addEventListener('click',()=>{clearLoginFieldErrors();showScreen('screen-login');document.getElementById('loginUsername').focus();});
const signupForm=document.getElementById('signupForm'),signupBtn=document.getElementById('signupBtn');
const signupFields=['signupNameField','signupUsernameField','signupPasswordField'];
function clearSignupFieldErrors(){signupFields.forEach(id=>document.getElementById(id).classList.remove('has-error'));document.getElementById('signupErrorBanner').classList.remove('is-visible');document.getElementById('signupInfoBanner').classList.remove('is-visible');}
function showSignupError(message){document.getElementById('signupErrorBannerText').textContent=message;document.getElementById('signupErrorBanner').classList.add('is-visible');}
signupForm.addEventListener('submit',async event=>{
 event.preventDefault();if(signupBtn.disabled)return;clearSignupFieldErrors();
 const name=document.getElementById('signupName').value.trim(),username=document.getElementById('signupUsername').value.trim(),password=document.getElementById('signupPassword').value;
 const invalid=name.length<2||name.length>100?'signupName':!/^[a-z0-9._-]{3,40}$/i.test(username)?'signupUsername':password.length<15||password.length>128?'signupPassword':null;
 if(invalid){document.getElementById(invalid+'Field').classList.add('has-error');document.getElementById(invalid).focus();showSignupError('Use a name of 2–100 characters, a username of 3–40 letters, numbers, dots, underscores or hyphens, and a password of 15–128 characters.');return;}
 signupBtn.disabled=true;signupBtn.classList.add('is-loading');
 try{
  await apiFetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,username,password})});
  signupForm.reset();clearLoginFieldErrors();showScreen('screen-login');document.getElementById('loginUsername').value=username;
  document.getElementById('loginInfoText').textContent='Your account is ready. Sign in to continue.';document.getElementById('loginInfoBanner').classList.add('is-visible');document.getElementById('loginPassword').focus();
 }catch(error){showSignupError(error.message||'Could not create your account. Please retry.');}finally{signupBtn.disabled=false;signupBtn.classList.remove('is-loading');}
});

// Google uses a server redirect; provider tokens never enter browser storage.
for (const prefix of ['login','signup']) document.getElementById(prefix+'GoogleBtn')?.addEventListener('click',()=>location.assign('/api/auth/google/start'));
(async()=>{
 const buttons=['login','signup'];
 try{const options=await apiFetch('/api/auth/options');for(const prefix of buttons){const button=document.getElementById(prefix+'GoogleBtn'),note=document.getElementById(prefix+'GoogleNote');if(button)button.disabled=!options.googleEnabled;if(note)note.textContent=options.googleEnabled?'Use your Google account to join or sign in.':'Google sign-in is currently unavailable.';}}
 catch{for(const prefix of buttons){const note=document.getElementById(prefix+'GoogleNote');if(note)note.textContent='Google sign-in is currently unavailable.';}}
 const error=new URLSearchParams(location.search).get('auth_error');
 if(error){const messages={google_unavailable:'Google sign-in is currently unavailable. Use a username and password.',google_rate_limited:'Too many Google sign-in attempts. Please try again later.'};showLoginError(messages[error]||'Google sign-in could not be completed. Please try again.');history.replaceState(null,'',location.pathname);}
})();
