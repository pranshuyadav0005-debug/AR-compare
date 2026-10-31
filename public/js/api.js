// Same-origin cookie sessions. All state changes carry the session-bound CSRF token.
function getCsrfToken(){const cookies=document.cookie.split(';').map(x=>x.trim());const item=cookies.find(x=>x.startsWith('__Host-test_csrf='))||cookies.find(x=>x.startsWith('test_csrf='));if(!item)return '';try{return decodeURIComponent(item.slice(item.indexOf('=')+1));}catch{return '';}}
async function apiFetch(path,options={}){
 const opts={...options,credentials:'same-origin',signal:options.signal||AbortSignal.timeout(10000),headers:{...(options.headers||{})}};
 if(!['GET','HEAD','OPTIONS'].includes((opts.method||'GET').toUpperCase()))opts.headers['x-csrf-token']=getCsrfToken();
 let response;
 try{response=await fetch(path,opts);}catch(error){throw new Error(error.name==='TimeoutError'||error.name==='AbortError'?'The request timed out. Check the current status before retrying.':'Unable to reach the service. Check your connection and retry.');}
 if(response.status===204)return{};
 let data;try{data=await response.json();}catch{throw new Error('The service returned an incomplete response. Please retry.');}
 if(!response.ok){const error=new Error(data.error||`Request failed (${response.status}).`);error.status=response.status;error.code=data.code;throw error;}
 return data;
}
