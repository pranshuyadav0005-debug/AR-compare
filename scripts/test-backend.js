const fs=require('fs');const path=require('path');
const required=['server/functions/auth-login.js','server/functions/auth-register.js','server/functions/auth-logout.js','server/functions/auth-me.js','server/functions/admin-requests.js','server/functions/admin-approval.js','server/functions/admin-users.js','server/functions/admin-user-status.js','server/functions/admin-reset-password.js','server/functions/vehicle-lookup.js','server/functions/quote.js','server/functions/quote-search.js'];
for(const f of required){if(!fs.existsSync(path.join(process.cwd(),f))) throw new Error('Missing '+f);require('../'+f)}
for(const f of fs.readdirSync('public/js').filter(x=>x.endsWith('.js'))){const t=fs.readFileSync('public/js/'+f,'utf8');if(/supabaseClient|window\.supabase|supabase\.js/.test(t)) throw new Error('Browser Supabase reference remains in '+f)}
const html=fs.readFileSync('public/index.html','utf8');if(/supabase-js|signupEmail|adminNewUserEmail/.test(html))throw new Error('Email/Supabase browser dependency remains in index.html');
console.log('Backend security structure checks passed.');
