import {launchIssues} from './config.mjs';
export function preflight(env,sources){
  return [...launchIssues(env),...(sources.some(s=>!['Cal.com','Calendly','Google Calendar'].includes(s.provider))?['unsupported_leader_provider']:[])];
}
export function healthReport(snapshot,env,now=Date.now()){
  const issues=launchIssues(env);
  // Health allows one missed five-minute schedule. Slot expiry remains five minutes.
  const age=now-Date.parse(snapshot?.capturedAt);
  const fresh=age>=0&&age<10*60000;
  const sources={available:snapshot?.calendars?.filter(c=>c.status==='ready').length||0,total:snapshot?.calendars?.length||0};
  return {status:!fresh?'unavailable':issues.length||!sources.total||snapshot.status!=='ready'||sources.available!==sources.total?'degraded':'ok',issues,checkedAt:snapshot?.capturedAt||null,expiresAt:snapshot?.expiresAt||null,sources};
}
