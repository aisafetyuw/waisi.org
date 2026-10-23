import {enabled} from '@/lib/coffee-chats/config.mjs';
import roster from '@/lib/coffee-chats/roster.json';
export function GET(){
  if(!enabled())return Response.json({error:'unavailable'},{status:503});
  // Send only the public fields used by the interface.
  return Response.json({leaders:roster.leaders.map(({name,bookingUrl,provider,photoUrl})=>({name,bookingUrl,provider,photoUrl}))},{headers:{'Cache-Control':'public, max-age=300'}});
}
