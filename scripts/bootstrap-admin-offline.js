// Run once from the secured server shell. Password is read from stdin, not argv/logs.
const fs = require('node:fs');
const path = require('node:path');
const env = path.resolve(__dirname, '../.env');
if (fs.existsSync(env)) process.loadEnvFile(env);
const {select, insert} = require('../server/functions/lib/supabase');
const {hashPasswordAsync} = require('../server/functions/lib/app-auth');
(async () => {
  const username = String(process.env.ADMIN_USERNAME || '').trim().toLowerCase();
  const password = fs.readFileSync(0, 'utf8').replace(/\r?\n$/, '');
  if (!/^[a-z0-9._-]{3,40}$/.test(username) || password.length < 15 || password.length > 128) throw new Error('Set ADMIN_USERNAME and provide a 15–128 character password on stdin.');
  const users = await select('advisors', `username=eq.${encodeURIComponent(username)}&role=eq.admin&select=id&limit=1`);
  if (!users?.length) throw new Error('Create the intended admin record through the database owner first.');
  const existing = await select('app_passwords', `advisor_id=eq.${encodeURIComponent(users[0].id)}&select=advisor_id&limit=1`);
  if (existing?.length) throw new Error('Admin already initialized. This command cannot reset a password.');
  await insert('app_passwords', {advisor_id:users[0].id, password_hash:await hashPasswordAsync(password), updated_at:new Date().toISOString()}, 'return=minimal');
  console.log('Admin initialized.');
})().catch(() => { console.error('Admin initialization failed. Check configuration and whether this administrator already has a password.'); process.exitCode = 1; });
