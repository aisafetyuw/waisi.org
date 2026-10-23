import {SourceError} from './provider-error.mjs';

// This is the anonymous appointment page's read-only method, not the private
// Calendar API. Its unpublished wire format may change; fail closed if it does.
const API_ORIGIN = 'https://calendar-pa.clients6.google.com';
const SLOTS_URL = API_ORIGIN + '/$rpc/google.internal.calendar.v1.AppointmentBookingService/ListAvailableSlots';
const MAX_BYTES = 2_000_000;
const MAX_PAGES = 10;
const PAGE_SIZE = 200;
const invalid = () => { throw new SourceError('invalid_response'); };

function bookingUrl(value) {
  let url;
  try { url = new URL(value); } catch { throw new SourceError('invalid_source'); }
  const short = url.hostname === 'calendar.app.google' && /^\/[a-zA-Z0-9_-]+$/.test(url.pathname);
  const canonical = url.hostname === 'calendar.google.com' && /^\/(?:calendar\/)?appointments\/schedules\/[a-zA-Z0-9_-]+$/.test(url.pathname);
  if (url.protocol !== 'https:' || url.port || url.username || url.password || url.search || url.hash || (!short && !canonical)) {
    throw new SourceError('invalid_source');
  }
  return url;
}

async function readBody(response, contentType) {
  if (!response.ok) throw new SourceError(response.status === 429 ? 'rate_limited' : response.status === 403 ? 'provider_blocked' : 'provider_error');
  if (response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== contentType) invalid();
  const reader = response.body?.getReader();
  if (!reader) invalid();
  const chunks = [];
  let bytes = 0;
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > MAX_BYTES) { await reader.cancel(); invalid(); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function publicPageKey(html) {
  // Parse only the published JSON assignment. Never evaluate page JavaScript.
  const match = html.match(/window\.WIZ_global_data\s*=\s*(\{[^]*?\});\s*<\/script>/);
  try {
    const initial = JSON.parse(match?.[1]).m7LZgc;
    if (typeof initial !== 'string' || !initial.startsWith('%.@.')) invalid();
    const data = JSON.parse('[' + initial.slice(4));
    if (!Array.isArray(data) || data[0] !== 'appointments.AppointmentsInitialData' ||
        typeof data[4] !== 'string' || !/^AIza[a-zA-Z0-9_-]{35}$/.test(data[4]) || data[5] !== API_ORIGIN) invalid();
    return data[4];
  } catch { invalid(); }
}

export function parseGoogleSlots(payload, source, range) {
  if (!Array.isArray(payload) || (payload[0] != null && !Array.isArray(payload[0]))) invalid();
  const nextPageToken = payload[1] === '' ? null : payload[1] ?? null;
  if (nextPageToken !== null && (typeof nextPageToken !== 'string' || nextPageToken.length > 8192)) invalid();
  const entries = payload[0] ?? [];
  if (entries.length > PAGE_SIZE) invalid();
  const rangeStart = Date.parse(range.start), rangeEnd = Date.parse(range.end);
  if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd) || rangeEnd <= rangeStart) invalid();
  const slots = entries.map(entry => {
    if (!Array.isArray(entry) || !Array.isArray(entry[0]) || !Array.isArray(entry[0][0])) invalid();
    const [timestamp, duration] = entry[0];
    const [seconds, nanos = 0] = timestamp;
    if (typeof seconds !== 'string' || !/^\d{1,12}$/.test(seconds) || !Number.isInteger(nanos) || nanos < 0 || nanos >= 1e9 ||
        !Number.isInteger(duration) || duration < 1 || duration > 480) invalid();
    const start = Number(seconds) * 1000 + Math.floor(nanos / 1e6);
    if (start < rangeStart || start >= rangeEnd) invalid();
    return {...source, calendarId:source.id, start:new Date(start).toISOString(),
      end:new Date(start + duration * 60000).toISOString(), durationMinutes:duration};
  });
  return {slots, nextPageToken};
}

export async function readGoogleBooking(source, range, fetchImpl = fetch) {
  let page = bookingUrl(source.eventUrl);
  // One deadline includes redirects, page load, and every pagination request.
  const options = {credentials:'omit', cache:'no-store', signal:AbortSignal.timeout(8000)};
  const visited = new Set();
  let apiKey;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (visited.has(page.href)) throw new SourceError('invalid_source');
    visited.add(page.href);
    const response = await fetchImpl(page, {...options, redirect:'manual', headers:{Accept:'text/html'}});
    if ([301,302,303,307,308].includes(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) throw new SourceError('invalid_source');
      page = bookingUrl(new URL(location, page).href);
      continue;
    }
    if (page.hostname !== 'calendar.google.com') throw new SourceError('invalid_source');
    apiKey = publicPageKey(await readBody(response, 'text/html'));
    break;
  }
  if (!apiKey) throw new SourceError('invalid_source');

  const body = [null, null, page.pathname.split('/').pop(), null,
    [[String(Date.parse(range.start) / 1000), 0], [String(Date.parse(range.end) / 1000), 0]], String(PAGE_SIZE)];
  const tokens = new Set(), slots = new Map();
  for (let i = 0; i < MAX_PAGES; i++) {
    const response = await fetchImpl(SLOTS_URL, {...options, method:'POST', redirect:'error',
      headers:{'Content-Type':'application/json+protobuf', 'X-Goog-Api-Key':apiKey, Referer:page.href}, body:JSON.stringify(body)});
    const raw = await readBody(response, 'application/json+protobuf');
    let payload;
    try { payload = JSON.parse(raw); } catch { invalid(); }
    const result = parseGoogleSlots(payload, source, range);
    for (const slot of result.slots) slots.set(slot.start + '/' + slot.durationMinutes, slot);
    if (!result.nextPageToken) return [...slots.values()].sort((a,b) => a.start.localeCompare(b.start));
    if (tokens.has(result.nextPageToken)) invalid();
    tokens.add(result.nextPageToken);
    body[6] = result.nextPageToken;
  }
  invalid(); // Never return an incomplete page sequence as complete availability.
}
