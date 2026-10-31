// Anonymous release probes only. Does not create users or send real quotations.
const fs = require('node:fs');
(async () => {
  const origin = new URL(process.env.SECURITY_TARGET || 'invalid');
  if (origin.protocol !== 'https:' || origin.origin !== process.env.SECURITY_TARGET) throw new Error('SECURITY_TARGET must be the exact HTTPS origin without a trailing slash.');
  const checks = [];
  async function probe(name, route, options, validate) {
    try {
      const r = await fetch(origin.origin + route, {...options,redirect:'error',signal:AbortSignal.timeout(12000)});
      checks.push({name,passed:!!validate(r),status:r.status});
      await r.body?.cancel();
    } catch { checks.push({name,passed:false,error:'Request failed'}); }
  }
  await probe('HTTPS response security headers', '/', {}, r => r.status === 200 && /max-age=/.test(r.headers.get('strict-transport-security')||'') && /frame-ancestors 'none'/.test(r.headers.get('content-security-policy')||'') && r.headers.get('x-content-type-options') === 'nosniff');
  await probe('Database migrations and required coordination ready', '/api/ready', {}, r=>r.status===200);
  await probe('Anonymous administration denied', '/api/admin/users', {}, r=>r.status===401);
  await probe('Anonymous quotation history denied', '/api/quotes/search', {}, r=>r.status===401);
  const post = {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'};
  await probe('Registration needs invitation or is closed','/api/auth/register',post,r=>r.status===403);
  await probe('Web bootstrap disabled','/api/bootstrap-admin',post,r=>r.status===404);
  await probe('Approval queue removed','/api/admin/advisors/requests',{},r=>r.status===404);
  await probe('Environment file inaccessible','/.env',{},r=>r.status===404);
  const report={generatedAt:new Date().toISOString(),target:origin.origin,checks,probeStatus:checks.every(x=>x.passed)?'PASSED':'FAILED',securityApproval:'NOT_APPROVED',reason:'Anonymous probes alone cannot approve access isolation, database privileges, backup restore, infrastructure or authenticated workflows.'};
  fs.writeFileSync('security/live-probes.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  if (report.probeStatus!=='PASSED') process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
