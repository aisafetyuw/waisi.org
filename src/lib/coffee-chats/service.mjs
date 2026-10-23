import {readSource as defaultReader,SourceError} from './providers.mjs';
export const MAX_AGE_MS=300000;
const DAY=86400000;
export function validateRange(start,end,now=Date.now()) {
  const validDate=d=>typeof d==='string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && Number.isFinite(Date.parse(d)) && new Date(d).toISOString().slice(0,10)===d;
  const today=Math.floor(now/DAY)*DAY;
  if(!validDate(start)||!validDate(end)||Date.parse(end)<=Date.parse(start)||Date.parse(end)-Date.parse(start)>10*DAY||Date.parse(start)<today-2*DAY||Date.parse(end)>today+62*DAY)throw new Error('invalid_range');
  return {start,end};
}
export function createAvailabilityService({sources,cache,readSource=defaultReader,now=Date.now,logger=console.warn}) {
  const pending=new Map();
  async function collect(range) {
    const checkedAt=now(),calendars=[],slots=[];
    let index=0;
    await Promise.all(Array.from({length:4},async()=>{
      while(index<sources.length){const source=sources[index++];
        try {
          const found=await readSource(source,range);
          slots.push(...found.filter(s=>Date.parse(s.start)>now()));
          calendars.push({...source,status:'ready',checkedAt:new Date(checkedAt).toISOString(),slotCount:found.length});
        }catch(error){
          const code=error instanceof SourceError?error.code:'provider_error';
          calendars.push({...source,status:'unavailable',error:code,checkedAt:null,slotCount:0});
          logger(JSON.stringify({event:'coffee_source_unavailable',source:source.id,code}));
        }
      }
    }));
    const successes=calendars.filter(c=>c.status==='ready').length;
    const retryAt=checkedAt+(successes===sources.length?MAX_AGE_MS:60000);
    return {kind:'live_public_sources',status:successes===sources.length?'ready':successes?'partial':'unavailable',capturedAt:new Date(checkedAt).toISOString(),expiresAt:new Date(checkedAt+MAX_AGE_MS).toISOString(),retryAt:new Date(retryAt).toISOString(),timeZone:'UTC',coverageStart:range.start,coverageEnd:range.end,calendars:calendars.sort((a,b)=>a.id.localeCompare(b.id)),slots:slots.sort((a,b)=>a.start.localeCompare(b.start))};
  }
  async function load(range,force) {
    const key=`v1/${range.start}_${range.end}`;
    if(!force){try{const saved=await cache.get(key);if(saved?.kind==='live_public_sources' && Date.parse(saved.expiresAt)>now() && Date.parse(saved.retryAt)>now())return saved;}catch{logger(JSON.stringify({event:'coffee_cache_unavailable',operation:'read'}));}}
    const snapshot=await collect(range);
    try {await cache.set(key,snapshot);}catch{logger(JSON.stringify({event:'coffee_cache_unavailable',operation:'write'}));}
    return snapshot;
  }
  return {get(range,{force=false}={}) {
    validateRange(range.start,range.end,now());
    const key=range.start+'_'+range.end;
    if(!pending.has(key)) pending.set(key,load(range,force).finally(()=>pending.delete(key)));
    return pending.get(key);
  }};
}
