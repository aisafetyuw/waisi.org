import test from 'node:test';
import assert from 'node:assert/strict';
import {AvailabilityFeed} from '../../public/coffee-chats/embed/live-availability.mjs';
import {publicConfig,configurationIssues} from '../../src/lib/coffee-chats/config.mjs';
const now=Date.parse('2026-10-23T12:00:00Z');
const snapshot=(start='2026-10-23')=>({kind:'live_public_sources',status:'ready',coverageStart:start,coverageEnd:'2026-10-31',expiresAt:new Date(now+300000).toISOString(),retryAt:new Date(now+60000).toISOString(),calendars:[],slots:[]});

test('a slow old week cannot replace the newly selected week',async()=>{
  const requests=[]; const f=new AvailabilityFeed({now:()=>now,fetchImpl:()=>new Promise(resolve=>requests.push(resolve))});
  const first=f.load({start:'2026-10-23',end:'2026-10-31'});
  const second=f.load({start:'2026-10-24',end:'2026-10-31'});
  requests[1](Response.json(snapshot('2026-10-24')));await second;
  requests[0](Response.json(snapshot()));await first;
  assert.equal(f.snapshot.coverageStart,'2026-10-24');
});
test('an expired feed removes times before the next response arrives',async()=>{
  let clock=now;const f=new AvailabilityFeed({now:()=>clock,fetchImpl:async()=>Response.json(snapshot())});
  await f.load({start:'2026-10-23',end:'2026-10-31'});assert.equal(f.ready,true);
  clock+=300001;f.expire();assert.equal(f.snapshot,null);assert.equal(f.ready,false);
});
test('a failed or malformed refresh removes previous availability',async()=>{
  let broken=false;const f=new AvailabilityFeed({now:()=>now,fetchImpl:async()=>broken?Response.json({slots:[]}):Response.json(snapshot())});
  await f.load({start:'2026-10-23',end:'2026-10-31'});broken=true;
  await f.load({start:'2026-10-23',end:'2026-10-31'});assert.equal(f.status,'error');assert.equal(f.snapshot,null);
});
test('Google configuration never enables an unregistered origin or exposes private environment values',()=>{
  const env={COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com',GOOGLE_PRIVATE_KEY:'DO-NOT-EXPOSE'};
  assert.equal(publicConfig(env,'https://waisi.org').googleClientId,env.GOOGLE_CALENDAR_CLIENT_ID);
  assert.equal(publicConfig(env,'https://preview.example').googleClientId,'');
  assert.ok(!JSON.stringify(publicConfig(env,'https://waisi.org')).includes('DO-NOT-EXPOSE'));
  assert.ok(configurationIssues({}).includes('google_client_missing'));
  assert.ok(configurationIssues({...env,COFFEE_CHAT_PUBLIC_ORIGIN:'http://waisi.org'}).includes('https_required'));
});

test('preview access does not enable the production route or Google on a preview origin',async()=>{
  const {enabled}=await import('../../src/lib/coffee-chats/config.mjs');
  assert.equal(enabled({COFFEE_CHAT_ENV:'preview',COFFEE_CHAT_ENABLED:'false'}),true);
  assert.equal(enabled({COFFEE_CHAT_ENV:'production',COFFEE_CHAT_ENABLED:'false'}),false);
  assert.equal(publicConfig({COFFEE_CHAT_ENV:'preview',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com'},'https://preview.netlify.app').googleClientId,'');
});
