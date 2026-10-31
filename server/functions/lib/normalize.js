function numberOrNull(value) {
  if (!['number','string'].includes(typeof value) || String(value).trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getPath(obj, path) {
  if (!path) return undefined;
  return String(path).split('.').reduce((v, k) => (v == null ? undefined : v[k]), obj);
}

function normalizeQuote(insurer, raw, mapping = {}) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.success === false || raw.status === 'rejected' || raw.error) throw new Error('Provider did not return an accepted quote.');
  const odPremium = numberOrNull(getPath(raw, mapping.odPremiumPath) ?? raw.od_premium ?? raw.odPremium);
  const tpPremium = numberOrNull(getPath(raw, mapping.tpPremiumPath) ?? raw.tp_premium ?? raw.tpPremium);
  const idv = numberOrNull(getPath(raw, mapping.idvPath) ?? raw.idv);
  const totalPremium = numberOrNull(getPath(raw, mapping.totalPremiumPath) ?? raw.total_premium ?? raw.totalPremium);
  const gst = numberOrNull(getPath(raw, mapping.gstPath) ?? raw.gst);
  const rawAddons = getPath(raw, mapping.addonsPath) ?? raw.addons ?? [];
  const addons = Array.isArray(rawAddons) ? rawAddons.map((a) => ({
    name: String(a.name ?? a.title ?? a.addon ?? 'Add-on'),
    premium: numberOrNull(a.premium ?? a.amount ?? a.price),
    available: a.available !== false,
  })) : [];

  return {
    insurerId: insurer.id,
    insurerName: insurer.name,
    rating: insurer.rating ?? null,
    garageCount: insurer.garage_count ?? null,
    garageUrl: insurer.garage_url || insurer.garageUrl || null,
    idv,
    odPremium,
    tpPremium,
    addons,
    gst,
    totalPremium,
    ncbPercent: numberOrNull(getPath(raw, mapping.ncbPath) ?? raw.ncb_percent ?? raw.ncbPercent),
    claimRatio: numberOrNull(getPath(raw, mapping.claimRatioPath) ?? raw.claim_ratio ?? raw.claimRatio),
    source: 'api',
    status: 'success',
    policyType: getPath(raw, mapping.policyTypePath) ?? raw.policyType ?? raw.policy_type ?? null,
    providerQuoteId: getPath(raw, mapping.quoteIdPath) ?? raw.quote_id ?? raw.quoteId ?? null,
    generatedAt: getPath(raw, mapping.generatedAtPath) ?? raw.generatedAt ?? null,
    expiresAt: getPath(raw, mapping.expiresAtPath) ?? raw.expiresAt ?? raw.expires_at ?? null,
    rawMeta: { requestId: getPath(raw, mapping.requestIdPath) ?? raw.request_id ?? raw.requestId ?? null },
  };
}

module.exports = { normalizeQuote, getPath };
