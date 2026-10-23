import test from 'node:test';
import assert from 'node:assert/strict';
import {readGoogleBooking, parseGoogleSlots} from '../../src/lib/coffee-chats/google-booking.mjs';
import {readSource} from '../../src/lib/coffee-chats/providers.mjs';

const range = {start:'2026-10-23', end:'2026-10-30'};
const source = {id:'Test:60', leader:'Test', provider:'Google Calendar', durationMinutes:60,
  eventUrl:'https://calendar.app.google/testSchedule', formats:['online']};
const page = 'https://calendar.google.com/calendar/appointments/schedules/public-test-token';
const rpc = 'https://calendar-pa.clients6.google.com/$rpc/google.internal.calendar.v1.AppointmentBookingService/ListAvailableSlots';
const key = 'AIza' + 'x'.repeat(35); // Synthetic public-page fixture, not a real key.
const config = (host='https://calendar-pa.clients6.google.com') => '<script>window.WIZ_global_data = '+JSON.stringify({
  m7LZgc:'%.@.'+JSON.stringify(['appointments.AppointmentsInitialData',null,null,null,key,host]).slice(1)
})+';</script>';
const html = body => new Response(body,{headers:{'content-type':'text/html; charset=utf-8'}});
const protobuf = body => new Response(JSON.stringify(body),{headers:{'content-type':'application/json+protobuf; charset=UTF-8'}});
const entry = (iso='2026-10-23T14:00:00Z',duration=30) => [[[String(Date.parse(iso)/1000)],duration]];
const invalid = e => e.code === 'invalid_response';
function fixture(pages, options={}) {
  const calls=[];
  return {calls, fetch:async (url,init)=>{
    calls.push({url:String(url),init});
    if(String(url)===source.eventUrl) return new Response(null,{status:302,headers:{location:options.redirect||page}});
    if(String(url)===page) return html(options.html??config());
    assert.equal(String(url),rpc);
    const result=pages.shift();
    assert.ok(result,'Unexpected extra request');
    return result;
  }};
}

test('Google slots use absolute timestamps and the current meeting duration',()=>{
  const result=parseGoogleSlots([[entry()]],source,range);
  assert.equal(result.nextPageToken,null);
  assert.deepEqual(result.slots,[{...source,calendarId:source.id,start:'2026-10-23T14:00:00.000Z',end:'2026-10-23T14:30:00.000Z',durationMinutes:30}]);
});
test('empty Google protobuf responses are valid, malformed data is not an empty calendar',()=>{
  for(const payload of [[],[null],[[]]]) assert.deepEqual(parseGoogleSlots(payload,source,range),{slots:[],nextPageToken:null});
  for(const payload of [{},null,[7,'permission denied'],[[{}]],[[[[]]]],[[entry('2026-10-23T14:00:00Z',0)]],[[entry('2026-10-30T00:00:00Z')]],[[entry()],123]]) {
    assert.throws(()=>parseGoogleSlots(payload,source,range),invalid);
  }
  for(const token of [0,false,{}]) assert.throws(()=>parseGoogleSlots([[],token],source,range),invalid);
});
test('Google timestamps preserve both instants across daylight-saving changes',()=>{
  const result=parseGoogleSlots([[entry('2026-11-01T06:30:00Z'),entry('2026-11-01T07:30:00Z')]],source,{start:'2026-10-31',end:'2026-11-03'});
  assert.equal(Date.parse(result.slots[1].start)-Date.parse(result.slots[0].start),3600000);
  const format=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'numeric',timeZoneName:'short'});
  assert.match(format.format(new Date(result.slots[0].start)),/1:30 AM CDT/);
  assert.match(format.format(new Date(result.slots[1].start)),/1:30 AM CST/);
});
test('Google reader follows only public redirects and paginates with no account credentials',async()=>{
  const f=fixture([protobuf([[entry()],'opaque-token']),protobuf([[entry('2026-10-23T14:30:00Z')]])]);
  const slots=await readSource(source,range,f.fetch);
  assert.equal(slots.length,2);
  assert.equal(f.calls.length,4);
  for(const {init} of f.calls) {
    assert.equal(init.credentials,'omit');assert.equal(init.cache,'no-store');assert.ok(init.signal);
    const headers=new Headers(init.headers);
    assert.equal(headers.has('authorization'),false);assert.equal(headers.has('cookie'),false);assert.equal(headers.has('x-goog-authuser'),false);
  }
  assert.equal(f.calls[0].init.redirect,'manual');
  assert.equal(f.calls[2].init.redirect,'error');
  assert.equal(f.calls[2].init.headers.Referer,page);
  assert.equal(f.calls[2].init.headers['X-Goog-Api-Key'],key);
  const body=JSON.parse(f.calls[2].init.body);
  assert.equal(body[2],'public-test-token');
  assert.deepEqual(body[4],[[String(Date.parse(range.start)/1000),0],[String(Date.parse(range.end)/1000),0]]);
  assert.equal(JSON.parse(f.calls[3].init.body)[6],'opaque-token');
  assert.ok(!JSON.stringify(slots).includes(key));
});
test('a canonical Google booking URL needs no short-link redirect',async()=>{
  const f=fixture([protobuf([[]])]);
  assert.deepEqual(await readGoogleBooking({...source,eventUrl:page},range,f.fetch),[]);
  assert.equal(f.calls.length,2);
});
test('Google short links also use the public /appointments/schedules path',async()=>{
  const alternate=page.replace('/calendar/appointments','/appointments');
  const calls=[];
  const slots=await readGoogleBooking(source,range,async(url,init)=>{
    calls.push(String(url));
    if(String(url)===source.eventUrl) return new Response(null,{status:302,headers:{location:alternate}});
    if(String(url)===alternate) return new Response(null,{status:302,headers:{location:page}});
    if(String(url)===page) return html(config());
    assert.equal(String(url),rpc);assert.equal(init.headers.Referer,page);
    return protobuf([[entry()]]);
  });
  assert.equal(slots.length,1);assert.equal(calls.length,4);
});
test('Google reader rejects unapproved source URLs before requesting them',async()=>{
  for(const url of ['http://calendar.app.google/test','https://calendar.app.google.evil.test/test',
    'https://user:pass@calendar.app.google/test','https://calendar.app.google:444/test',
    'https://calendar.google.com/calendar/u/0/r','https://calendar.google.com/calendar/appointments/schedules/token?authuser=0',
    'https://calendar.app.google/test#fragment','https://127.0.0.1/test']) {
    await assert.rejects(readGoogleBooking({...source,eventUrl:url},range,()=>assert.fail('Unexpected request')),e=>e.code==='invalid_source');
  }
});
test('Google reader rejects private, off-host, or looping redirects before following them',async()=>{
  for(const redirect of ['https://accounts.google.com/login','https://calendar.google.com/calendar/u/0/r','https://evil.test/',source.eventUrl]) {
    const f=fixture([],{redirect});
    await assert.rejects(readGoogleBooking(source,range,f.fetch),e=>e.code==='invalid_source');
    assert.equal(f.calls.length,1);
  }
});
test('Google page configuration must be JSON with the expected type, key, and API host',async()=>{
  for(const body of ['<html>Sign in</html>','<script>window.WIZ_global_data = executeSomething();</script>',
    config('https://evil.test'),config().replace('appointments.AppointmentsInitialData','unknown'),config().replace(key,'')]) {
    const f=fixture([],{html:body});
    await assert.rejects(readGoogleBooking(source,range,f.fetch),invalid);
    assert.equal(f.calls.length,2);
  }
});
test('Google reader rejects errors and incomplete pagination instead of returning partial slots',async()=>{
  for(const [status,code] of [[429,'rate_limited'],[403,'provider_blocked'],[500,'provider_error']]) {
    const f=fixture([protobuf([[entry()],'next']),new Response('failure',{status})]);
    await assert.rejects(readGoogleBooking(source,range,f.fetch),e=>e.code===code);
  }
  const repeated=fixture([protobuf([[entry()],'same']),protobuf([[entry()],'same'])]);
  await assert.rejects(readGoogleBooking(source,range,repeated.fetch),invalid);
  const endless=fixture(Array.from({length:10},(_,i)=>protobuf([[entry()],'page-'+i])));
  await assert.rejects(readGoogleBooking(source,range,endless.fetch),invalid);
  assert.equal(endless.calls.length,12);
});
test('Google reader rejects wrong content types and oversized bodies',async()=>{
  for(const response of [new Response('[]',{headers:{'content-type':'text/html'}}),
    new Response('x'.repeat(2_000_001),{headers:{'content-type':'application/json+protobuf'}}),protobuf({error:'bad'})]) {
    const f=fixture([response]);await assert.rejects(readGoogleBooking(source,range,f.fetch),invalid);
  }
});
test('Google reader removes duplicate slots at page boundaries',async()=>{
  const f=fixture([protobuf([[entry()],'next']),protobuf([[entry(),entry('2026-10-23T14:30:00Z')]])]);
  assert.equal((await readGoogleBooking(source,range,f.fetch)).length,2);
});
