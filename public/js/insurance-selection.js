const motorButton=document.getElementById('motorInsuranceBtn'),selectionStatus=document.getElementById('selectionStatus'),selectionRetry=document.getElementById('selectionRetry');
async function checkSelectionSession(){
 motorButton.disabled=true;selectionRetry.hidden=true;selectionStatus.textContent='Checking your access…';
 try{const data=await apiFetch('/api/auth/me');if(data.session?.role==='admin'){location.replace('index.html');return;}if(data.session?.role!=='advisor')throw new Error('Your account cannot access this desk.');window.__advisorSession=data.session;motorButton.disabled=false;selectionStatus.textContent=`Signed in as ${data.session.name||data.session.username}`;}
 catch(error){if(error.status===401){location.replace('index.html');return;}selectionStatus.textContent=error.message||'Could not check your access.';selectionRetry.hidden=false;}
}
checkSelectionSession();selectionRetry.addEventListener('click',checkSelectionSession);
motorButton.addEventListener('click',()=>{if(window.__advisorSession)location.assign('motor-insurance.html');});
document.getElementById('selectionSignOut').addEventListener('click',async event=>{
 if(event.currentTarget.disabled)return;const button=event.currentTarget;button.disabled=true;
 try{await apiFetch('/api/auth/logout',{method:'POST'});location.replace('index.html');}
 catch(error){selectionStatus.textContent='Sign out failed. '+error.message;button.disabled=false;}
});
