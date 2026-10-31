function validAmount(value, positive=false) { return typeof value === 'number' && Number.isFinite(value) && (positive ? value>0 : value>=0); }
function assessQuote(quote, vehicle, requestedIdv, policy) {
  if (!validAmount(quote.totalPremium,true) || !validAmount(quote.idv,true) || !validAmount(quote.odPremium) || !validAmount(quote.tpPremium) || !validAmount(quote.gst)) throw new Error('Provider returned incomplete or invalid premium/IDV figures.');
  if (!Array.isArray(quote.addons) || quote.addons.some(a=>!validAmount(a.premium))) throw new Error('Provider returned invalid add-on amounts.');
  const sum=quote.odPremium+quote.tpPremium+quote.gst+quote.addons.reduce((s,a)=>s+a.premium,0);
  if (Math.abs(sum-quote.totalPremium)>2) throw new Error('Provider premium breakdown does not match its total.');
  const issues=[];
  if (Math.abs(quote.idv-requestedIdv)>.5) issues.push('Returned IDV differs from requested IDV.');
  if (quote.policyType!==policy.policyType) issues.push('Requested policy type is not confirmed.');
  if (quote.ncbPercent!==policy.ncbPercent) issues.push('Requested NCB is not confirmed.');
  for (const name of policy.selectedAddons) {
    if (!quote.addons.some(a=>a.name===name&&a.available!==false)) issues.push(`${name} is not confirmed.`);
  }
  const now=Date.now();
  const expiresAt=quote.expiresAt || null;
  if (quote.source === 'api' && !expiresAt) issues.push('Provider quote expiry is not confirmed.');
  if (expiresAt && (!Number.isFinite(Date.parse(expiresAt)) || Date.parse(expiresAt)<=now)) issues.push('Quote has expired or has an invalid expiry.');
  return {...quote,requestedIdv,returnedIdv:quote.idv,generatedAt:quote.generatedAt || new Date().toISOString(),expiresAt,comparisonIssues:issues,eligibleForComparison:issues.length===0,source:quote.source==='api'?'api':'estimate',status:quote.source==='api'?'success':'estimate'};
}
module.exports={assessQuote,validAmount};
