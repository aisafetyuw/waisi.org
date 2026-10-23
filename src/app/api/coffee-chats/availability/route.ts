import {enabled} from '@/lib/coffee-chats/config.mjs';
import {availability} from '@/lib/coffee-chats/runtime.mjs';
import {validateRange} from '@/lib/coffee-chats/service.mjs';
export const dynamic='force-dynamic';
export async function GET(request:Request){
  if(!enabled())return Response.json({error:'unavailable'},{status:503});
  const params=new URL(request.url).searchParams;
  let range;
  try{range=validateRange(params.get('start'),params.get('end'));}catch{
    return Response.json({error:'Choose dates within the next 60 days.'},{status:400,headers:{'Cache-Control':'no-store'}});
  }
  const data=await availability.get(range);
  return Response.json(data,{headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
