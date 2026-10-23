export function emptyDayMessage({snapshot, feedStatus, day, today, leaders=[], onlyFreeTimes=false, personalReady=false, personalStatus}) {
  if (!snapshot) return ['error', 'expired'].includes(feedStatus) ? 'Times unavailable' : 'Load times…';
  if (day < snapshot.coverageStart || day >= snapshot.coverageEnd) return 'Not checked';
  if (day < today) return 'Past date';
  const selected = new Set(leaders);
  const calendars = snapshot.calendars.filter(calendar => !selected.size || selected.has(calendar.leader));
  if (!calendars.some(calendar => calendar.status === 'ready')) return 'Check booking pages';
  const missingLeader = [...selected].some(leader => !calendars.some(calendar => calendar.leader === leader));
  if (missingLeader || calendars.some(calendar => calendar.status !== 'ready')) return 'Some times unavailable';
  if (onlyFreeTimes) {
    return personalReady ? 'No shared times' : ['loading', 'connecting'].includes(personalStatus) ? 'Checking your calendar…' : 'Calendar check unavailable';
  }
  return 'No matching times';
}

export class AvailabilityFeed {
  constructor({fetchImpl=fetch,onChange=()=>{},now=Date.now}={}) {
    this.fetch=(...args)=>fetchImpl(...args);this.onChange=onChange;this.now=now;
    this.snapshot=null;this.status='idle';this.generation=0;this.abort=null;
  }
  get ready(){return Boolean(this.snapshot)&&Date.parse(this.snapshot.expiresAt)>this.now();}
  expire(){if(this.snapshot&&!this.ready){this.snapshot=null;this.status='expired';this.onChange();}}
  async load(range){
    const generation=++this.generation;this.abort?.abort();this.abort=new AbortController();const abort=this.abort;
    this.snapshot=null;this.status='loading';this.onChange();
    const timeout=setTimeout(()=>abort.abort(),25000);
    try{
      const response=await this.fetch('/api/coffee-chats/availability?'+new URLSearchParams(range),{signal:this.abort.signal,cache:'no-store',credentials:'omit'});
      if(!response.ok)throw new Error('unavailable');
      const data=await response.json();
      if(generation!==this.generation)return;
      if(data.kind!=='live_public_sources'||!Array.isArray(data.slots)||!Array.isArray(data.calendars)||data.coverageStart!==range.start||data.coverageEnd!==range.end||!(Date.parse(data.expiresAt)>this.now()))throw new Error('invalid_response');
      this.snapshot=data;this.status='ready';
    }catch{
      if(generation!==this.generation)return;
      this.snapshot=null;this.status='error';
    }finally{clearTimeout(timeout);if(generation===this.generation)this.onChange();}
  }
}
