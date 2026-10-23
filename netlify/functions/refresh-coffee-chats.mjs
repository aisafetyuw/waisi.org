import {availability,currentRange} from '../../src/lib/coffee-chats/runtime.mjs';
import {availabilityStore} from '../../src/lib/coffee-chats/store.mjs';
export default async function(){
  if(process.env.COFFEE_CHAT_ENABLED!=='true')return;
  const snapshot=await availability.get(currentRange(),{force:true});
  // The health endpoint checks this scheduled heartbeat; visits cannot hide a failed schedule.
  await availabilityStore().set('monitor/latest',{...snapshot,slots:[]});
  console.log(JSON.stringify({event:'coffee_refresh',status:snapshot.status,sources:snapshot.calendars.length,available:snapshot.calendars.filter(c=>c.status==='ready').length}));
  if(snapshot.status!=='ready')throw new Error('coffee_refresh_incomplete');
}
export const config={schedule:'*/5 * * * *'};
