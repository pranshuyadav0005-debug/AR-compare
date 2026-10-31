const { json } = require('./lib/http');
const { select } = require('./lib/supabase');
const { requireAuth } = require('./lib/app-auth');
exports.handler = async event => { try { if(event.httpMethod!=='GET') return json(405,{error:'Method not allowed'}); await requireAuth(event,['admin']); const rows=await select('advisors','role=eq.advisor&select=id,name,username,approval_status,created_at&order=created_at.desc'); return json(200,{requests:rows||[]}); } catch(e){ return json(e.status||500,{error:e.status?e.message:'Internal server error.'}); } };
