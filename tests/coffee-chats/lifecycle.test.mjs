import test from 'node:test';
import assert from 'node:assert/strict';
import {AvailabilityFeed} from '../../public/coffee-chats/embed/live-availability.mjs';
import {publicConfig,configurationIssues,requestOrigin} from '../../src/lib/coffee-chats/config.mjs';
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
  const env={COFFEE_CHAT_ENV:'production',COFFEE_CHAT_GOOGLE_READY:'true',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com',GOOGLE_PRIVATE_KEY:'DO-NOT-EXPOSE'};
  assert.equal(publicConfig(env,'https://waisi.org').googleClientId,env.GOOGLE_CALENDAR_CLIENT_ID);
  assert.equal(publicConfig(env,'https://preview.example').googleClientId,'');
  assert.ok(!JSON.stringify(publicConfig(env,'https://waisi.org')).includes('DO-NOT-EXPOSE'));
  assert.ok(configurationIssues({}).includes('google_client_missing'));
  assert.ok(configurationIssues({...env,COFFEE_CHAT_PUBLIC_ORIGIN:'http://waisi.org'}).includes('https_required'));
});

test('production personal-calendar access stays unavailable until its separate release check passes',()=>{
  const env={COFFEE_CHAT_ENV:'production',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com'};
  for(const ready of [undefined,'false']){
    const result=publicConfig({...env,COFFEE_CHAT_GOOGLE_READY:ready},'https://waisi.org');
    assert.equal(result.googleClientId,'');
    assert.equal(result.status,'unavailable');
  }
  assert.equal(publicConfig({...env,COFFEE_CHAT_GOOGLE_READY:'true'},'https://waisi.org').status,'ready');
});

test('local development can check personal calendars without enabling production access',()=>{
  const env={COFFEE_CHAT_ENV:'development',COFFEE_CHAT_GOOGLE_READY:'false',COFFEE_CHAT_PUBLIC_ORIGIN:'http://localhost:4180',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com'};
  assert.equal(publicConfig(env,'http://localhost:4180').googleClientId,env.GOOGLE_CALENDAR_CLIENT_ID);
  assert.equal(publicConfig(env,'https://waisi.org').googleClientId,'');
});

test('personal connection uses this request host when a warm server retains another hostname',()=>{
  const env={COFFEE_CHAT_ENV:'production',COFFEE_CHAT_GOOGLE_READY:'true',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com'};
  const onWaisi=new Request('https://waisi.netlify.app/api/coffee-chats/config',{headers:{host:'waisi.org'}});
  assert.equal(publicConfig(env,requestOrigin(onWaisi)).status,'ready');
  for(const host of ['waisi.netlify.app','deploy-preview-11--waisi.netlify.app','waisi.org.evil.test','waisi.org@evil.test','']){
    const onOtherHost=new Request('https://waisi.org/api/coffee-chats/config',{headers:{host,origin:'https://waisi.org','x-forwarded-host':'waisi.org'}});
    assert.equal(publicConfig(env,requestOrigin(onOtherHost)).googleClientId,'');
  }
});

test('request origins retain the protocol and local port without trusting forwarded host headers',()=>{
  const local=new Request('http://localhost:4180/api/coffee-chats/config',{headers:{host:'localhost:4180'}});
  assert.equal(requestOrigin(local),'http://localhost:4180');
  const http=new Request('http://waisi.netlify.app/api/coffee-chats/config',{headers:{host:'waisi.org','x-forwarded-proto':'https'}});
  assert.equal(requestOrigin(http),'http://waisi.org');
  assert.equal(requestOrigin(new Request('https://waisi.org/api/coffee-chats/config')),'https://waisi.org');
});

test('preview access does not enable the production route or Google on a preview origin',async()=>{
  const {enabled}=await import('../../src/lib/coffee-chats/config.mjs');
  assert.equal(enabled({COFFEE_CHAT_ENV:'preview',COFFEE_CHAT_ENABLED:'false'}),true);
  assert.equal(enabled({COFFEE_CHAT_ENV:'production',COFFEE_CHAT_ENABLED:'false'}),false);
  assert.equal(publicConfig({COFFEE_CHAT_ENV:'preview',COFFEE_CHAT_PUBLIC_ORIGIN:'https://waisi.org',GOOGLE_CALENDAR_CLIENT_ID:'123-example.apps.googleusercontent.com'},'https://preview.netlify.app').googleClientId,'');
});
