import test from 'node:test';
import assert from 'node:assert/strict';
import {readSource, parseCalendly, parseCalcom} from '../../src/lib/coffee-chats/providers.mjs';
import {createAvailabilityService, validateRange} from '../../src/lib/coffee-chats/service.mjs';

const now = Date.parse('2026-10-23T12:00:00Z');
const range = {start:'2026-10-23',end:'2026-10-30'};
const source = {id:'Test:30',leader:'Test',provider:'Calendly',eventUrl:'https://calendly.com/test/coffee',durationMinutes:30,formats:['online'],formatNote:'Online meeting'};
const available = {days:[{date:'2026-10-23',status:'available',spots:[{status:'available',start_time:'2026-10-23T18:00:00Z',invitees_remaining:1},{status:'unavailable',start_time:'2026-10-23T19:00:00Z',invitees_remaining:0}]}],invitee_publisher_error:false};
const cache = () => {const data=new Map();return {get:async k=>data.get(k),set:async(k,v)=>data.set(k,v)}};

test('Calendly uses current duration and excludes unavailable spots',()=>{
  const slots=parseCalendly(available,source,15,range);
  assert.equal(slots.length,1);
  assert.equal(slots[0].end,'2026-10-23T18:15:00.000Z');
  assert.equal(slots[0].durationMinutes,15);
});
test('failed and malformed provider responses never mean an empty available calendar',()=>{
  for(const payload of [{},{days:[] ,invitee_publisher_error:true},{days:[{spots:[{status:'available',start_time:'invalid'}]}]}]) assert.throws(()=>parseCalendly(payload,source,30,range));
  assert.throws(()=>parseCalcom({status:'success'},source,range));
  assert.throws(()=>parseCalcom({status:'success',data:{'2026-10-23':[{start:'bad'}]}},source,range));
  assert.deepEqual(parseCalendly({days:[],invitee_publisher_error:false},source,30,range),[]);
  assert.deepEqual(parseCalcom({status:'success',data:{}},source,range),[]);
});
test('Cal.com dates remain absolute and out-of-range slots are rejected',()=>{
  const payload={status:'success',data:{'2026-10-23':[{start:'2026-10-23T18:00:00.000Z',end:'2026-10-23T18:30:00.000Z'}]}};
  assert.equal(parseCalcom(payload,source,range)[0].start,'2026-10-23T18:00:00.000Z');
  assert.throws(()=>parseCalcom({...payload,data:{'2026-10-22':[{start:'2026-10-22T18:00:00Z'}]}},source,range));
});
test('provider requests allow only source hosts and never use cookies or redirects',async()=>{
  await assert.rejects(readSource({...source,eventUrl:'https://calendly.com.evil.test/test/coffee'},range),/source/);
  await assert.rejects(readSource({...source,eventUrl:'http://calendly.com/test/coffee'},range),/source/);
  const requests=[];
  const slots=await readSource(source,range,async (url,options)=>{
    requests.push({url:String(url),options});
    assert.equal(options.credentials,'omit'); assert.equal(options.redirect,'error');
    return Response.json(requests.length===1?{uuid:'65ba208e-f61d-4204-81e6-fa8a7fbe4d29',duration:15}:available);
  });
  assert.equal(slots[0].durationMinutes,15);
  assert.equal(new URL(requests[0].url).searchParams.get('profile_slug'),'test');
  assert.equal(new URL(requests[1].url).searchParams.get('range_end'),'2026-10-29');
});
test('ranges reject invalid dates, expensive windows, and distant dates',()=>{
  assert.deepEqual(validateRange('2026-10-23','2026-10-30',now),range);
  for(const pair of [['2026-02-30','2026-03-03'],['2026-10-23','2026-11-23'],['2028-01-01','2028-01-03'],['2026-10-24','2026-10-23']]) assert.throws(()=>validateRange(...pair,now));
});
test('concurrent readers share one refresh and failures replace expired slots',async()=>{
  let clock=now,calls=0,fail=false;
  const service=createAvailabilityService({sources:[source],cache:cache(),now:()=>clock,readSource:async()=>{calls++;if(fail)throw new Error('SECRET must not appear');return parseCalendly(available,source,30,range)},logger:()=>{}});
  const [a,b]=await Promise.all([service.get(range),service.get(range)]);
  assert.equal(calls,1);assert.equal(a.slots.length,1);assert.deepEqual(a,b);
  clock+=300001;fail=true;
  const broken=await service.get(range);
  assert.equal(calls,2);assert.deepEqual(broken.slots,[]);assert.equal(broken.calendars[0].status,'unavailable');assert.ok(!JSON.stringify(broken).includes('SECRET'));
});
test('one failed source does not remove successful source availability',async()=>{
  const service=createAvailabilityService({sources:[source,{...source,id:'missing',leader:'Missing'}],cache:cache(),now:()=>now,readSource:async s=>{if(s.id==='missing')throw new Error('failed');return parseCalendly(available,s,30,range)},logger:()=>{}});
  const result=await service.get(range);assert.equal(result.slots.length,1);assert.equal(result.calendars.filter(c=>c.status==='ready').length,1);assert.equal(result.status,'partial');
});
