const formatters = new Map();
export function localParts(iso, zone) {
  if (!formatters.has(zone)) formatters.set(zone, new Intl.DateTimeFormat('en-US', {timeZone: zone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}));
  const parts = formatters.get(zone).formatToParts(new Date(iso));
  const get = key => parts.find(p => p.type === key).value;
  return {date:`${get('year')}-${get('month')}-${get('day')}`, minute:Number(get('hour')) * 60 + Number(get('minute'))};
}
export function filterSlots(slots, {leaders=[], format='either', zone='America/Chicago', days, now=Date.now(), timeWindow=null} = {}) {
  const daySet = days ? new Set(days) : null;
  const leaderSet = new Set(leaders);
  return slots.filter(slot => Date.parse(slot.start) > now)
    .filter(slot => !leaderSet.size || leaderSet.has(slot.leader))
    .filter(slot => format === 'either' || slot.formats.includes(format))
    .map(slot => ({...slot, ...localParts(slot.start, zone)}))
    .filter(slot => !daySet || daySet.has(slot.date))
    .filter(slot => !timeWindow || (slot.minute >= timeWindow.start && slot.minute + slot.durationMinutes <= timeWindow.end));
}
export function groupStarts(slots) {
  const groups = new Map();
  for (const slot of slots) {
    // Use the instant, not wall-clock text: repeated DST hours remain separate.
    const key = slot.start;
    if (!groups.has(key)) groups.set(key, {id:key, date:slot.date, minute:slot.minute, slots:[], leaders:[]});
    const group = groups.get(key);
    group.slots.push(slot);
    if (!group.leaders.includes(slot.leader)) group.leaders.push(slot.leader);
  }
  return [...groups.values()].sort((a,b)=>Date.parse(a.id)-Date.parse(b.id));
}

// An hour summarizes starts within it. It does not promise continuous availability.
export function groupHours(slots) {
  const hours = new Map();
  for (const group of groupStarts(slots)) {
    const minute = Math.floor(group.minute / 60) * 60;
    const id = `${group.date}/${minute}`;
    if (!hours.has(id)) hours.set(id, {id, date:group.date, minute, groups:[], leaders:[]});
    const hour = hours.get(id);
    hour.groups.push(group);
    for (const leader of group.leaders) if (!hour.leaders.includes(leader)) hour.leaders.push(leader);
  }
  return [...hours.values()].sort((a,b)=>a.date.localeCompare(b.date) || a.minute-b.minute);
}

export function reconcileHourSelection(hours, {activeHour, activeGroup}) {
  const hour = hours.find(candidate=>candidate.id===activeHour?.id) || null;
  const group = hour?.groups.find(candidate=>candidate.id===activeGroup?.id) || null;
  return {activeHour:hour, activeGroup:group};
}
