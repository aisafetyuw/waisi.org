import sources from './sources.json' with {type:'json'};
import {availabilityStore} from './store.mjs';
import {createAvailabilityService} from './service.mjs';
export const availability=createAvailabilityService({sources,cache:availabilityStore()});
export function currentRange(now=Date.now()){
  const day=Math.floor(now/86400000)*86400000;
  return {start:new Date(day-86400000).toISOString().slice(0,10),end:new Date(day+8*86400000).toISOString().slice(0,10)};
}
