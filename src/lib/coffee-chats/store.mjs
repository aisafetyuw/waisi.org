import {getDeployStore} from '@netlify/blobs';
export function availabilityStore(env=process.env,blobs={getDeployStore}) {
  if(env.COFFEE_CHAT_STORE==='netlify'){
    // A preview must never populate a production cache or heartbeat.
    const store=()=>blobs.getDeployStore({name:'coffee-chat-availability',consistency:'strong'});
    return {get:key=>store().get(key,{type:'json'}),set:(key,value)=>store().setJSON(key,value)};
  }
  const memory=new Map();
  return {get:async key=>memory.get(key),set:async(key,value)=>{
    if(memory.size>=80&&!memory.has(key))memory.delete(memory.keys().next().value);
    memory.set(key,value);
  }};
}
