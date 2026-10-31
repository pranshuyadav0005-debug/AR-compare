const assert = require('assert');
function idFrom(path) { const parts = path.split('/').filter(Boolean); return parts[parts.length - 2]; }
assert.strictEqual(idFrom('/api/admin/users/a066b598-0064-4bbb-800f-43d862c884b2/reset-password'),'a066b598-0064-4bbb-800f-43d862c884b2');
assert.strictEqual(idFrom('/api/admin/users/a066b598-0064-4bbb-800f-43d862c884b2/status'),'a066b598-0064-4bbb-800f-43d862c884b2');
assert.strictEqual(idFrom('/api/admin/advisors/a066b598-0064-4bbb-800f-43d862c884b2/approval'),'a066b598-0064-4bbb-800f-43d862c884b2');
console.log('Admin dynamic route ID tests passed.');
