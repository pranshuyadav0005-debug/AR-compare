// Admin workspace. The server remains the authority for permissions and mutations.
const byId=id=>document.getElementById(id);
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
let adminRequests=[],adminUsers=[],adminSection='users',adminRefreshing=false;
let requestLoadSeq=0,userLoadSeq=0,actionBusy=false,createBusy=false,action=null,modalReturnFocus=null;
function showAdminBanner(message,kind='error'){
 const banner=byId('adminBanner');banner.classList.toggle('banner-error',kind==='error');banner.classList.toggle('banner-info',kind==='success');
 banner.setAttribute('role',kind==='error'?'alert':'status');byId('adminBannerText').textContent=message;banner.classList.add('is-visible');
}
function clearAdminBanner(){byId('adminBanner')?.classList.remove('is-visible');}
function matchesSearch(user,term){return `${user.name||''} ${user.username||''}`.toLowerCase().includes(term.trim().toLowerCase());}
function accountStatus(user){return user.approval_status!=='approved'?user.approval_status:user.is_active===false?'inactive':'active';}
function renderAdvisorUsers(){
 if(byId('advisorUserLoading').style.display!=='none'||!byId('userLoadError').hidden)return;
 ['userCount','sidebarUserCount','adminTotalStat'].forEach(id=>byId(id).textContent=adminUsers.length);
 byId('adminActiveStat').textContent=adminUsers.filter(u=>accountStatus(u)==='active').length;
 const term=byId('userSearch').value,status=byId('userFilter').value;
 const rows=adminUsers.filter(u=>matchesSearch(u,term)&&(status==='all'||accountStatus(u)===status));
 byId('advisorUserList').innerHTML=rows.map(u=>{const state=accountStatus(u),approved=u.approval_status==='approved',active=u.is_active!==false;return `<div class="user-row" data-user-id="${escapeHtml(u.id)}"><div class="user-avatar">${escapeHtml((u.name||u.username||'A')[0].toUpperCase())}</div><div class="user-main"><div class="user-name">${escapeHtml(u.name||u.username)}</div><div class="user-meta">@${escapeHtml(u.username)}</div></div><div class="user-status-wrap"><span class="user-status ${escapeHtml(state)}">${escapeHtml(state)}</span>${approved?`<button type="button" class="btn btn-secondary" data-active="${!active}">${active?'Deactivate':'Activate'}</button><button type="button" class="btn btn-secondary" data-reset-user>Reset password</button>`:'<span class="user-waiting">Access unavailable</span>'}</div></div>`;}).join('');
 byId('advisorUserList').style.display=rows.length?'grid':'none';byId('advisorUserEmpty').style.display=rows.length?'none':'block';
}
function listState(kind,loading){
 const approval=kind==='approval';byId(approval?'advisorApprovalLoading':'advisorUserLoading').style.display=loading?'block':'none';
 if(loading){byId(approval?'advisorApprovalLoading':'advisorUserLoading').textContent=approval?'Loading requests…':'Loading advisors…';byId(approval?'advisorApprovalList':'advisorUserList').style.display='none';byId(approval?'advisorApprovalEmpty':'advisorUserEmpty').style.display='none';}
 byId(kind+'LoadError').hidden=true;
}
function listError(kind,error){
 listState(kind,false);const box=byId(kind+'LoadError');box.hidden=false;box.replaceChildren();
 const text=document.createElement('span');text.textContent=error.status===401?'Your session expired. Sign in again.':error.message||'Could not load this list.';
 const retry=document.createElement('button');retry.type='button';retry.className='btn btn-secondary';retry.textContent=error.status===401?'Sign in again':'Retry';retry.addEventListener('click',()=>error.status===401?location.assign('index.html'):refreshAdminWorkspace());box.append(text,retry);
}
async function loadAdvisorUsers(){
 const seq=++userLoadSeq;listState('user',true);
 try{const data=await apiFetch('/api/admin/users');if(!Array.isArray(data.users))throw new Error('Advisors response was incomplete. Please retry.');if(seq!==userLoadSeq||session?.role!=='admin')return false;adminUsers=data.users;listState('user',false);renderAdvisorUsers();return true;}
 catch(error){if(seq===userLoadSeq){adminUsers=[];['userCount','sidebarUserCount','adminTotalStat','adminActiveStat'].forEach(id=>byId(id).textContent='—');listError('user',error);}return false;}
}
async function refreshAdminWorkspace(){
 if(adminRefreshing)return;adminRefreshing=true;byId('adminRefreshBtn').disabled=true;byId('adminRefreshStatus').textContent='Refreshing workspace…';
 try{const loaded=await Promise.all([loadAdvisorUsers()]);byId('adminRefreshStatus').textContent=loaded.every(Boolean)?`Updated at ${new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`:'Some information could not be refreshed. Retry the failed list.';}
 finally{adminRefreshing=false;byId('adminRefreshBtn').disabled=false;}
}
function activateAdminSection(section){
 if(section!=='users')return;adminSection=section;
 document.querySelectorAll('[data-admin-section]').forEach(el=>el.classList.toggle('is-active',el.dataset.adminSection===section));
 document.querySelectorAll('[data-admin-target]').forEach(el=>{el.classList.toggle('is-active',el.dataset.adminTarget===section);el.setAttribute('aria-current',el.dataset.adminTarget===section?'page':'false');});
 const copy=['Your advisory team','Manage accounts and keep your team ready to work.'];byId('adminSectionTitle').textContent=copy[0];byId('adminSectionSubtitle').textContent=copy[1];
}
async function loadAdminPanel(){if(session?.role!=='admin')return;clearAdminBanner();activateAdminSection(adminSection);await refreshAdminWorkspace();}
byId('adminRefreshBtn')?.addEventListener('click',refreshAdminWorkspace);
document.querySelectorAll('[data-admin-target]').forEach(button=>button.addEventListener('click',()=>activateAdminSection(button.dataset.adminTarget)));
byId('adminRegistrationLink')?.addEventListener('click',()=>enterAdminRegistrationFlow());

['userSearch','userFilter'].forEach(id=>byId(id)?.addEventListener(id.endsWith('Search')?'input':'change',renderAdvisorUsers));

// Native dialog gives confirmation/reset flows keyboard focus and Escape support.
function openAdminAction(details,trigger){
 if(actionBusy)return;clearAdminBanner();action=details;modalReturnFocus=trigger;
 byId('adminActionTitle').textContent=details.title;byId('adminActionDescription').textContent=details.description;
 byId('resetPasswordField').hidden=!details.reset;byId('resetPasswordInput').required=!!details.reset;byId('resetPasswordInput').value='';
 byId('adminActionError').classList.remove('is-visible');byId('confirmAdminAction').textContent=details.label;byId('adminActionDialog').showModal();
 (details.reset?byId('resetPasswordInput'):byId('cancelAdminAction')).focus();
}
byId('advisorUserList')?.addEventListener('click',event=>{
 const button=event.target.closest('[data-active],[data-reset-user]');if(!button)return;const id=button.closest('[data-user-id]').dataset.userId,user=adminUsers.find(u=>u.id===id);if(!user)return;
 const reset=button.hasAttribute('data-reset-user'),active=button.dataset.active==='true',verb=active?'Activate':'Deactivate';
 openAdminAction({title:reset?'Reset advisor password?':`${verb} advisor?`,description:reset?`Set a new password for ${user.name} (@${user.username}). Existing sessions will be revoked.`:`${user.name} (@${user.username}) ${active?'will regain access.':'will lose access. Saved records will be retained.'}`,label:reset?'Reset password':`${verb} advisor`,reset,url:`/api/admin/users/${encodeURIComponent(id)}/${reset?'reset-password':'status'}`,body:{is_active:active},success:reset?'Password reset. The advisor must sign in again.':`Advisor ${active?'activated':'deactivated'}.`},button);
});
byId('cancelAdminAction')?.addEventListener('click',()=>{if(!actionBusy)byId('adminActionDialog').close();});
byId('adminActionDialog')?.addEventListener('cancel',event=>{if(actionBusy)event.preventDefault();});
byId('adminActionDialog')?.addEventListener('close',()=>{byId('resetPasswordInput').value='';action=null;modalReturnFocus?.isConnected&&modalReturnFocus.focus();});
byId('adminActionForm')?.addEventListener('submit',async event=>{
 event.preventDefault();if(actionBusy||!action)return;actionBusy=true;const current=action;
 byId('confirmAdminAction').disabled=true;byId('cancelAdminAction').disabled=true;byId('adminActionError').classList.remove('is-visible');
 try{await apiFetch(current.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(current.reset?{password:byId('resetPasswordInput').value}:current.body)});byId('adminActionDialog').close();showAdminBanner(current.success,'success');await refreshAdminWorkspace();}
 catch(error){byId('adminActionError').textContent=error.message;byId('adminActionError').classList.add('is-visible');}
 finally{actionBusy=false;byId('confirmAdminAction').disabled=false;byId('cancelAdminAction').disabled=false;}
});

const addUserModal=byId('addUserModal'),addUserForm=byId('addUserForm');
function setAdminModalInert(value){document.querySelectorAll('#screen-admin > .topbar,#screen-admin > .admin-shell').forEach(el=>el.inert=value);}
function openAddUserModal(){
 if(createBusy)return;modalReturnFocus=document.activeElement;addUserForm.reset();byId('adminNewUserPassword').type='password';byId('toggleAdminNewPassword').textContent='Show';byId('createdPassword').textContent='';byId('createdUsername').textContent='';byId('addUserError').classList.remove('is-visible');byId('createdUserResult').style.display='none';addUserForm.style.display='block';
 addUserModal.classList.add('is-open');addUserModal.setAttribute('aria-hidden','false');setAdminModalInert(true);byId('adminNewUserName').focus();
}
function closeAddUserModal(){
 if(createBusy)return;addUserModal.classList.remove('is-open');addUserModal.setAttribute('aria-hidden','true');addUserForm.reset();byId('createdPassword').textContent='';byId('createdUsername').textContent='';setAdminModalInert(false);modalReturnFocus?.isConnected&&modalReturnFocus.focus();
}
function showAddUserError(message){byId('addUserErrorText').textContent=message;byId('addUserError').classList.add('is-visible');}
byId('addUserBtn')?.addEventListener('click',openAddUserModal);
['closeAddUser','cancelAddUser','addUserBackdrop','doneAddUser'].forEach(id=>byId(id)?.addEventListener('click',closeAddUserModal));
byId('toggleAdminNewPassword')?.addEventListener('click',event=>{const input=byId('adminNewUserPassword');input.type=input.type==='password'?'text':'password';event.currentTarget.textContent=input.type==='password'?'Show':'Hide';});
addUserModal?.addEventListener('keydown',event=>{
 if(event.key==='Escape'){event.preventDefault();closeAddUserModal();}
 if(event.key==='Tab'){const targets=[...addUserModal.querySelectorAll('button,input')].filter(el=>!el.disabled&&el.getClientRects().length);const first=targets[0],last=targets.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
});
addUserForm?.addEventListener('submit',async event=>{
 event.preventDefault();if(createBusy)return;byId('addUserError').classList.remove('is-visible');
 const name=byId('adminNewUserName').value.trim(),username=byId('adminNewUsername').value.trim(),password=byId('adminNewUserPassword').value;
 if(name.length<2||name.length>100||!/^[a-z0-9._-]{3,40}$/i.test(username)||password.length<15||password.length>128){showAddUserError('Check the name, username and password lengths.');return;}
 createBusy=true;byId('createUserBtn').disabled=true;byId('createUserBtn').textContent='Creating advisor…';
 try{
  const result=await apiFetch('/api/admin/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,username,password})});
  if(!result.user?.username)throw new Error('The creation response was incomplete. Refresh the advisor list before retrying.');
  byId('createdUsername').textContent=result.user.username;byId('createdPassword').textContent=password;byId('adminNewUserPassword').value='';addUserForm.style.display='none';byId('createdUserResult').style.display='block';byId('doneAddUser').focus();await refreshAdminWorkspace();
 }catch(error){showAddUserError(error.message||'Could not create advisor.');}
 finally{createBusy=false;byId('createUserBtn').disabled=false;byId('createUserBtn').textContent='Create User';}
});
