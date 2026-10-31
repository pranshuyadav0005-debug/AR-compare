// ===========================================================
// Small shared helpers with no DOM dependencies. Used by
// vehicle-details.js (price estimate) and comparison.js
// (mock premiums, mock vehicle age).
// ===========================================================
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0; }
  return Math.abs(hash);
}
