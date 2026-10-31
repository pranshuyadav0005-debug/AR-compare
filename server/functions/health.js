const {json}=require('./lib/http');
exports.handler=async event=>event.httpMethod==='GET'?json(200,{ok:true}):json(405,{error:'Method not allowed'});
