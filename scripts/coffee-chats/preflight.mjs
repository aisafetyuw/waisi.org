import sources from '../../src/lib/coffee-chats/sources.json' with {type:'json'};
import {preflight} from '../../src/lib/coffee-chats/operations.mjs';
if(process.argv.includes('--if-enabled')&&process.env.COFFEE_CHAT_ENABLED!=='true'){
  console.log('Coffee chat production launch remains disabled.');
}else{
  const issues=preflight(process.env,sources);
  if(issues.length){console.error('Coffee chat launch blocked:\n'+issues.map(code=>' - '+code).join('\n'));process.exitCode=1;}
  else console.log('Coffee chat configuration passed. Verify live checks before release.');
}
