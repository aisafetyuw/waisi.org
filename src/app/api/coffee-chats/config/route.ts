import {enabled} from '@/lib/coffee-chats/config.mjs';
import {publicConfig} from '@/lib/coffee-chats/config.mjs';
export const dynamic='force-dynamic';
export function GET(request:Request){
  if(!enabled())return Response.json({error:'unavailable'},{status:503});
  return Response.json(publicConfig(process.env,new URL(request.url).origin),{headers:{'Cache-Control':'no-store'}});
}
