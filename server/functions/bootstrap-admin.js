const {json}=require('./lib/http');
// Administrator credentials are initialized from a secured shell only.
exports.handler=async()=>json(404,{error:'Not found'});
