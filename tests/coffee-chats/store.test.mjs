import test from 'node:test';
import assert from 'node:assert/strict';
import {availabilityStore} from '../../src/lib/coffee-chats/store.mjs';

test('availability and heartbeat use the active deployment store',async()=>{
  const calls=[];const data=new Map();
  const store=availabilityStore({COFFEE_CHAT_STORE:'netlify'},{getDeployStore:options=>{calls.push(options);return {get:async key=>data.get(key),setJSON:async(key,value)=>data.set(key,value)};}});
  await store.set('v1/week',{slots:[]});await store.set('monitor/latest',{status:'ready'});
  assert.deepEqual(await store.get('monitor/latest'),{status:'ready'});
  assert.equal(calls.length,3);assert.ok(calls.every(c=>c.name==='coffee-chat-availability'&&c.consistency==='strong'));
});
