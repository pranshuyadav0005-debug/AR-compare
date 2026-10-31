const {responseText} = require('./response-body');
const BASE = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const {BoundedPool}=require('../../services/bounded-pool');
const budget=require('../../services/request-budget');
const config=require('./config');
const pool=new BoundedPool(config.databaseConcurrency,config.databaseQueueLimit);
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function assertConfigured() {
  if (!BASE || !KEY) throw new Error('Server is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the server.');
}

function headers(extra = {}) {
  assertConfigured();
  return { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...extra };
}

async function request(path, options = {}) {
  assertConfigured();
  const current=budget.context();
  const signal=current?.signal || AbortSignal.timeout(8000);
  try {
    return await pool.run(async()=>{
      signal.throwIfAborted();
      const response=await fetch(`${BASE}${path}`,{...options,redirect:'error',headers:headers(options.headers||{}),signal});
      const text=await responseText(response, 4 * 1024 * 1024);
      let data;try{data=text?JSON.parse(text):null;}catch{throw new Error('Invalid database response');}
      if(!response.ok){const err=new Error('Database operation failed. Please try again.');err.status=503;err.data={code:data?.code||'database_error'};throw err;}
      return data;
    },signal);
  }catch(error){
    if(error.status)throw error;
    throw Object.assign(new Error(current?.signal.aborted?'Database request exceeded the response window. Please retry.':'Database service is unavailable. Please try again.'),{status:503});
  }
}

function enc(v) { return encodeURIComponent(String(v)); }
function eq(column, value) { return `${column}=eq.${enc(value)}`; }
function select(table, params = '') { return request(`/rest/v1/${table}?${params}`); }
function insert(table, rows, prefer = 'return=representation') { return request(`/rest/v1/${table}`, { method: 'POST', headers: { Prefer: prefer }, body: JSON.stringify(rows) }); }
function update(table, params, patch, prefer = 'return=representation') { return request(`/rest/v1/${table}?${params}`, { method: 'PATCH', headers: { Prefer: prefer }, body: JSON.stringify(patch) }); }
function remove(table, params) { return request(`/rest/v1/${table}?${params}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } }); }

module.exports = { capacity:()=>pool.snapshot(), request, select, insert, update, remove, eq, enc };
