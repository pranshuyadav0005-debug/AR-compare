// Restore an existing server session instead of leaving admins at login on reload.
(async()=>{
 setLoginLoading(true);
 try{
  const data=await apiFetch('/api/auth/me');
  if(!data.session||!['admin','advisor'].includes(data.session.role))throw new Error('Could not restore your session. Please sign in.');
  session=data.session;updateRoleChips();
  if(session.role==='admin'){showScreen('screen-admin');await loadAdminPanel();}
  else location.replace('insurance-selection.html');
 }catch(error){if(error.status!==401)showLoginError(error.message||'Unable to check your session. Please retry.');}
 finally{setLoginLoading(false);}
})();
