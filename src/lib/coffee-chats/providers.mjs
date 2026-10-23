// Public booking readers. No login cookies, private calendar access, or bookings.
import {SourceError} from './provider-error.mjs';
import {readGoogleBooking} from './google-booking.mjs';
export {SourceError} from './provider-error.mjs';
const invalid = () => { throw new SourceError('invalid_response'); };
const instant = value => typeof value === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? Date.parse(value) : NaN;
function slot(source, startValue, duration, range) {
  const start = instant(startValue);
  if (!Number.isFinite(start) || !Number.isInteger(duration) || duration < 1 || duration > 480 ||
      start < Date.parse(range.start) || start >= Date.parse(range.end)) invalid();
  return {...source, calendarId:source.id, start:new Date(start).toISOString(),
    end:new Date(start + duration * 60000).toISOString(), durationMinutes:duration};
}
export function parseCalendly(payload, source, duration, range) {
  if (payload?.invitee_publisher_error !== false || !Array.isArray(payload.days)) invalid();
  const slots=[];
  for (const day of payload.days) {
    if (!Array.isArray(day.spots)) invalid();
    for (const spot of day.spots) {
      if (!['available','unavailable','full'].includes(spot.status)) invalid();
      if (spot.status === 'available') {
        if (!Number.isInteger(spot.invitees_remaining) || spot.invitees_remaining < 1) invalid();
        slots.push(slot(source,spot.start_time,duration,range));
      }
    }
  }
  return slots;
}
export function parseCalcom(payload, source, range) {
  if (payload?.status !== 'success' || !payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) invalid();
  const slots=[];
  for (const day of Object.values(payload.data)) {
    if (!Array.isArray(day)) invalid();
    for (const entry of day) {
      const duration=(instant(entry.end)-instant(entry.start))/60000;
      slots.push(slot(source,entry.start,duration,range));
    }
  }
  return slots;
}
async function json(url, fetchImpl, headers={}) {
  const response=await fetchImpl(url,{headers:{Accept:'application/json',...headers},credentials:'omit',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new SourceError(response.status===429?'rate_limited':response.status===403?'provider_blocked':'provider_error');
  if (!response.headers.get('content-type')?.includes('application/json')) invalid();
  const reader=response.body?.getReader(); if(!reader) invalid();
  let bytes=0;const chunks=[];
  while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>2_000_000){await reader.cancel();invalid();}chunks.push(value);}
  try {return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{invalid();}
}
export async function readSource(source, range, fetchImpl=fetch) {
  if(source.provider==='Google Calendar') return readGoogleBooking(source,range,fetchImpl);
  const url=new URL(source.eventUrl);
  const expected=source.provider==='Calendly'?'calendly.com':source.provider==='Cal.com'?'cal.com':'';
  if(url.protocol!=='https:' || url.hostname!==expected || url.port || url.username || url.password || !/^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) throw new SourceError('invalid_source');
  const [profile,slug]=url.pathname.split('/').filter(Boolean);
  if(source.provider==='Calendly') {
    // This is the public booking-page endpoint, not Calendly's authenticated API.
    const lookup=new URL('https://calendly.com/api/booking/event_types/lookup');
    lookup.search=new URLSearchParams({profile_slug:profile,event_type_slug:slug});
    const event=await json(lookup,fetchImpl);
    if(!/^[a-f0-9-]{36}$/i.test(event.uuid) || !Number.isInteger(event.duration) || event.duration<1 || event.duration>480) invalid();
    const endpoint=new URL(`https://calendly.com/api/booking/event_types/${event.uuid}/calendar/range`);
    endpoint.search=new URLSearchParams({timezone:'UTC',range_start:range.start,range_end:new Date(Date.parse(range.end)-86400000).toISOString().slice(0,10)});
    return parseCalendly(await json(endpoint,fetchImpl),source,event.duration,range);
  }
  const endpoint=new URL('https://api.cal.com/v2/slots');
  endpoint.search=new URLSearchParams({username:profile,eventTypeSlug:slug,start:range.start+'T00:00:00Z',end:new Date(Date.parse(range.end)-1000).toISOString(),timeZone:'UTC',format:'range'});
  return parseCalcom(await json(endpoint,fetchImpl,{'cal-api-version':'2024-09-04'}),source,range);
}
