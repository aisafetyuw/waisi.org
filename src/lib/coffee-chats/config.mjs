export function configurationIssues(env={}) {
  const issues=[];
  if(!/^\d+-[a-zA-Z0-9_-]+\.apps\.googleusercontent\.com$/.test(env.GOOGLE_CALENDAR_CLIENT_ID||''))issues.push('google_client_missing');
  try{
    const origin=new URL(env.COFFEE_CHAT_PUBLIC_ORIGIN);
    const local=env.COFFEE_CHAT_ENV==='development' && ['localhost','127.0.0.1'].includes(origin.hostname);
    if(origin.protocol!=='https:'&&!local)issues.push('https_required');
    if(origin.origin!==env.COFFEE_CHAT_PUBLIC_ORIGIN||origin.username||origin.password)issues.push('invalid_origin');
  }catch{issues.push('origin_missing');}
  return issues;
}
export function publicConfig(env={},origin='') {
  const valid=configurationIssues(env).length===0&&origin===env.COFFEE_CHAT_PUBLIC_ORIGIN;
  return {googleClientId:valid?env.GOOGLE_CALENDAR_CLIENT_ID:'',privacyUrl:'/coffee-chats/privacy',status:valid?'ready':'unconfigured'};
}
export function launchIssues(env={}) {
  return [...configurationIssues(env),...(env.COFFEE_CHAT_ENV!=='production'?['production_environment_required']:[]),...(env.COFFEE_CHAT_STORE!=='netlify'?['persistent_cache_required']:[]),...(env.COFFEE_CHAT_GOOGLE_READY!=='true'?['google_production_review_pending']:[])];
}

export function enabled(env=process.env){return env.COFFEE_CHAT_ENABLED==='true'||['development','preview'].includes(env.COFFEE_CHAT_ENV);}
