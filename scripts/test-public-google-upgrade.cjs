const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {PGlite}=require('@electric-sql/pglite');
const {hashPasswordAsync}=require('../server/functions/lib/app-auth');
test('005 upgrades the prior testing schema without deleting credentials, quotes or sessions',async()=>{
 const db=new PGlite();
 try{
  await db.exec('create role anon;create role authenticated;create role service_role bypassrls;');
  await db.exec(fs.readFileSync('scripts/support/pre-google-schema.sql','utf8'));
  const id=crypto.randomUUID(),hash=await hashPasswordAsync('Preserved-password-123');
  await db.query("insert into advisors(id,name,username,role) values($1,'Preserved Tester','preserved.user','advisor')",[id]);
  await db.query('insert into app_passwords(advisor_id,password_hash) values($1,$2)',[id,hash]);
  await db.query("insert into app_sessions(token_hash,advisor_id,auth_version,csrf_token,expires_at) values($1,$2,1,$3,now()+interval '1 day')",['a'.repeat(64),id,'b'.repeat(64)]);
  await db.query("insert into quotes(advisor_id,quotation_number,owner_name,registration_number,vehicle_details,idv_value) values($1,'TESTQ-PRESERVED','Test Owner','DL01AB1234','{}',500000)",[id]);
  const migration=fs.readFileSync('migrations/005_public_google_auth.sql','utf8');
  await db.exec(migration);await db.exec(migration);
  assert.equal((await db.query('select password_hash from app_passwords where advisor_id=$1',[id])).rows[0].password_hash,hash);
  assert.equal((await db.query('select revoked_at from app_sessions where advisor_id=$1',[id])).rows[0].revoked_at,null);
  assert.equal((await db.query('select * from quotes where advisor_id=$1',[id])).rows.length,1);
  const user=await db.transaction(async tx=>{await tx.exec('set local role service_role');return tx.query('select app_sign_in_google($1,$2)',['c'.repeat(64),'Google Tester']);});
  assert.equal((await db.query('select role from advisors where id=$1',[user.rows[0].app_sign_in_google])).rows[0].role,'advisor');
  await db.exec(fs.readFileSync('security/verify-database.sql','utf8'));
 }finally{await db.close();}
});
