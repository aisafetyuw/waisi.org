import {availabilityStore} from '@/lib/coffee-chats/store.mjs';
import {healthReport} from '@/lib/coffee-chats/operations.mjs';
export const dynamic='force-dynamic';
export async function GET(){
  let latest=null;
  try{latest=await availabilityStore().get('monitor/latest');}catch{
    console.warn(JSON.stringify({event:'coffee_health_cache_unavailable'}));
  }
  const report=healthReport(latest,process.env);
  return Response.json(report,{status:report.status==='ok'?200:503,headers:{'Cache-Control':'no-store'}});
}
