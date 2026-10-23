import test from 'node:test';
import assert from 'node:assert/strict';
import {healthReport,preflight} from '../../src/lib/coffee-chats/operations.mjs';
const now=Date.parse('2026-10-23T12:00:00Z');
const env={COFFEE_CHAT_ENV:'production',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com',COFFEE_CHAT_STORE:'netlify',COFFEE_CHAT_GOOGLE_READY:'true'};
const fresh={capturedAt:new Date(now-30000).toISOString(),expiresAt:new Date(now+270000).toISOString(),status:'ready',calendars:[{id:'a',status:'ready'}],slots:[{private:'do not report'}]};
test('health rejects missing or expired scheduled updates and reports no raw calendar data',()=>{
  assert.equal(healthReport(null,env,now).status,'unavailable');
  assert.equal(healthReport(fresh,env,now).status,'ok');
  assert.equal(healthReport(fresh,env,now+600000).status,'unavailable');
  assert.ok(!JSON.stringify(healthReport(fresh,env,now)).includes('private'));
});
test('partial provider coverage and incomplete public configuration block readiness',()=>{
  const result=healthReport({...fresh,status:'partial',calendars:[{id:'a',status:'ready'},{id:'b',status:'unavailable',error:'unsupported_source'}]},env,now);
  assert.equal(result.status,'degraded');assert.equal(result.sources.available,1);assert.equal(result.sources.total,2);
  assert.equal(healthReport(fresh,{},now).status,'degraded');
});
test('preflight accepts supported public providers but rejects unknown providers and missing configuration',()=>{
  assert.deepEqual(preflight(env,[{provider:'Cal.com'},{provider:'Calendly'},{provider:'Google Calendar'}]),[]);
  assert.ok(preflight(env,[{provider:'Unknown'}]).includes('unsupported_leader_provider'));
  assert.ok(preflight({},[]).includes('origin_missing'));
});

test('public booking can launch and remain healthy without personal Google Calendar access',()=>{
  const publicOnly={...env,COFFEE_CHAT_GOOGLE_READY:'false',GOOGLE_CALENDAR_CLIENT_ID:''};
  assert.deepEqual(preflight(publicOnly,[{provider:'Google Calendar'}]),[]);
  assert.equal(healthReport(fresh,publicOnly,now).status,'ok');
  assert.ok(preflight({...publicOnly,COFFEE_CHAT_PUBLIC_ORIGIN:'http://waisi.org'},[]).includes('https_required'));
  assert.ok(preflight({...publicOnly,COFFEE_CHAT_STORE:''},[]).includes('persistent_cache_required'));
});

test('health allows scheduler jitter but rejects empty or failed heartbeats',()=>{
  assert.equal(healthReport(fresh,env,now+300000).status,'ok');
  assert.equal(healthReport({...fresh,calendars:[]},env,now).status,'degraded');
  assert.equal(healthReport({...fresh,status:'unavailable'},env,now).status,'degraded');
});
