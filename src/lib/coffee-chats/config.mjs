function originIssues(env={}) {
  const issues=[];
  try{
    const origin=new URL(env.COFFEE_CHAT_PUBLIC_ORIGIN);
    const local=env.COFFEE_CHAT_ENV==='development' && ['localhost','127.0.0.1'].includes(origin.hostname);
    if(origin.protocol!=='https:'&&!local)issues.push('https_required');
    if(origin.origin!==env.COFFEE_CHAT_PUBLIC_ORIGIN||origin.username||origin.password)issues.push('invalid_origin');
  }catch{issues.push('origin_missing');}
  return issues;
}
export function configurationIssues(env={}) {
  return [...originIssues(env),...(!/^\d+-[a-zA-Z0-9_-]+\.apps\.googleusercontent\.com$/.test(env.GOOGLE_CALENDAR_CLIENT_ID||'')?['google_client_missing']:[])];
}
export function publicConfig(env={},origin='') {
  const valid=configurationIssues(env).length===0&&origin===env.COFFEE_CHAT_PUBLIC_ORIGIN;
  const released=env.COFFEE_CHAT_ENV==='development'||env.COFFEE_CHAT_GOOGLE_READY==='true';
  return {googleClientId:valid&&released?env.GOOGLE_CALENDAR_CLIENT_ID:'',privacyUrl:'/coffee-chats/privacy',status:!valid?'unconfigured':released?'ready':'unavailable'};
}
export function launchIssues(env={}) {
  // Public leader availability does not require personal-calendar OAuth.
  return [...originIssues(env),...(env.COFFEE_CHAT_ENV!=='production'?['production_environment_required']:[]),...(env.COFFEE_CHAT_STORE!=='netlify'?['persistent_cache_required']:[])];
}

export function enabled(env=process.env){return env.COFFEE_CHAT_ENABLED==='true'||['development','preview'].includes(env.COFFEE_CHAT_ENV);}
