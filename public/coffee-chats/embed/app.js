import {dateKey, parseDate, addDays, weekStart, todayInZone, minutes, timeLabel, validRange} from './calendar-utils.mjs';
import {filterSlots, groupStarts} from './availability.mjs';
import {GoogleCalendarConnection, appointmentRange} from './personal-calendar.mjs';
import {AvailabilityFeed, emptyDayMessage} from './live-availability.mjs';

const $ = id => document.getElementById(id);
const narrow = matchMedia('(max-width: 39.99rem)');
const medium = matchMedia('(max-width: 59.99rem)');
const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Chicago';
const calendarHours = {start: 8 * 60, end: 24 * 60};
const withinCalendarHours = slot => slot.minute >= calendarHours.start && slot.minute < calendarHours.end;
const state = {zone: localZone, date: todayInZone(localZone), view: medium.matches ? 'day' : 'week', format: 'either', leaders: [], selectedLeaders: new Set(), snapshot: null, activeGroup: null, timeWindow: null, onlyFreeTimes: false};
let personalCalendar = null;
let calendarClientStatus = 'unconfigured';
let calendarSetupMessage = '';
let month = parseDate(state.date);
let manualView = false;
let leaderPanelStart = null;
let leadersExpanded = true;
let requestedRange = '';
const feed = new AvailabilityFeed({onChange: availabilityChanged});
const dateLabel = (key, options) => new Intl.DateTimeFormat('en-US', options).format(parseDate(key));
const shortZone = () => new Intl.DateTimeFormat('en-US', {timeZone: state.zone, timeZoneName: 'short'}).formatToParts(parseDate(state.date)).find(p => p.type === 'timeZoneName').value;
const currentView = () => narrow.matches ? 'day' : state.view;
const visibleDays = () => currentView() === 'day' ? [state.date] : Array.from({length: 7}, (_, i) => addDays(state.date, i));
const matchingSlots = () => {
  const slots = filterSlots((feed.ready ? state.snapshot?.slots : []) || [], {leaders:state.selectedLeaders, format:state.format, zone:state.zone, days:visibleDays(), timeWindow:state.timeWindow}).filter(withinCalendarHours);
  return state.onlyFreeTimes ? personalCalendar?.filter(slots) || [] : slots;
};
const matchingGroups = () => groupStarts(matchingSlots());
function button(text, className, label) {
  const node = document.createElement('button');
  node.type = 'button';
  node.textContent = text;
  node.className = className;
  if (label) node.setAttribute('aria-label', label);
  return node;
}
function setDate(date) {
  state.date = date;
  state.activeGroup = null;
  month = parseDate(date);
  renderCalendar();
  renderMiniCalendar();
  renderSummary();
  renderLeaders();
  scrollToCalendarTime();
  void loadAvailability();
}
function renderMiniCalendar() {
  $('mini-title').textContent = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(month);
  const first = dateKey(new Date(month.getFullYear(), month.getMonth(), 1, 12));
  const firstDay = weekStart(first);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 42; i++) {
    const key = addDays(firstDay, i);
    const day = parseDate(key);
    const node = button(day.getDate(), '', dateLabel(key, {dateStyle: 'full'}));
    if (day.getMonth() !== month.getMonth()) node.classList.add('outside');
    if (key === state.date) node.classList.add('selected');
    if (key === todayInZone(state.zone)) node.classList.add('is-today');
    node.setAttribute('aria-pressed', String(key === state.date));
    node.addEventListener('click', () => setDate(key));
    fragment.append(node);
  }
  $('mini-days').replaceChildren(fragment);
}
function renderCalendar() {
  const days = visibleDays();
  const first = days[0], last = days.at(-1);
  const isDay = days.length === 1;
  $('range-title').textContent = isDay ? dateLabel(first, {month: 'long', day: 'numeric'}) : `${dateLabel(first, {month: 'short', day: 'numeric'})} – ${dateLabel(last, {month: parseDate(first).getMonth() === parseDate(last).getMonth() ? undefined : 'short', day: 'numeric'})}`;
  $('range-title').title = dateLabel(first, {year: 'numeric'});
  $('previous').setAttribute('aria-label', isDay ? 'Previous day' : 'Previous week');
  $('next').setAttribute('aria-label', isDay ? 'Next day' : 'Next week');
  for (const view of ['week', 'day']) {
    $(view + '-view').classList.toggle('active', (isDay ? 'day' : 'week') === view);
    $(view + '-view').setAttribute('aria-pressed', String((isDay ? 'day' : 'week') === view));
  }
  $('zone-abbr').textContent = shortZone();
  const headers = document.createDocumentFragment();
  const columns = document.createDocumentFragment();
  const {start: firstMinute, end: lastMinute} = calendarHours;
  $('calendar-days').dataset.firstMinute = firstMinute;
  for (const key of days) {
    const head = document.createElement('div');
    head.className = 'day-heading' + (key === todayInZone(state.zone) ? ' is-today' : '');
    const name = document.createElement('span'); name.textContent = dateLabel(key, {weekday: isDay ? 'long' : 'short'});
    const number = document.createElement('strong'); number.textContent = parseDate(key).getDate();
    head.append(name, number); headers.append(head);
    const column = document.createElement('div');
    column.className = 'calendar-day'; column.dataset.date = key;
    for (let minute = firstMinute; minute < lastMinute; minute += 30) {
      const slot = document.createElement('div');
      slot.className = 'time-slot';
      slot.setAttribute('aria-hidden', 'true');
      column.append(slot);
    }
    columns.append(column);
  }
  $('day-headings').style.setProperty('--day-count', days.length);
  $('calendar-days').style.setProperty('--day-count', days.length);
  $('day-headings').replaceChildren(headers);
  $('calendar-days').replaceChildren(columns);
  const labels = document.createDocumentFragment();
  for (let minute = firstMinute; minute < lastMinute; minute += 60) {
    const label = document.createElement('div'); label.textContent = timeLabel(minute); labels.append(label);
  }
  $('time-labels').replaceChildren(labels);
  paintAvailability();
}
function paintAvailability() {
  const groups = matchingGroups();
  const height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slot-height'));
  for (const day of visibleDays()) {
    const column = $('calendar-days').querySelector(`.calendar-day[data-date="${day}"]`);
    const dayGroups = groups.filter(g => g.date === day);
    dayGroups.forEach((group, index) => {
      const count = group.leaders.length;
      const label = `${dateLabel(day,{weekday:'long',month:'short',day:'numeric'})}, ${timeLabel(group.minute)}: ${count} ${count === 1 ? 'leader' : 'leaders'}`;
      const block = button('', 'availability-block', label);
      const next = dayGroups[index + 1];
      const interval = Math.min(30, calendarHours.end - group.minute, next ? Math.max(15, next.minute - group.minute) : 30);
      block.style.top = ((group.minute - +$('calendar-days').dataset.firstMinute) / 30 * height) + 'px';
      block.style.height = (interval / 30 * height - 2) + 'px';
      block.classList.toggle('compact-block', interval < 30);
      block.classList.toggle('active-block', state.activeGroup?.id === group.id);
      block.dataset.start = group.id;
      block.setAttribute('aria-pressed', String(state.activeGroup?.id === group.id));
      const start = document.createElement('strong'); start.textContent = timeLabel(group.minute);
      const names = document.createElement('span'); names.textContent = count === 1 ? group.leaders[0].split(' ')[0] : `${count} leaders`;
      block.title = `${timeLabel(group.minute)} · ${group.slots.map(s=>`${s.leader} (${s.durationMinutes} min)`).join(', ')}`;
      block.append(start, names);
      block.addEventListener('click', () => {
        state.activeGroup = state.activeGroup?.id === group.id ? null : group;
        $('calendar-days').querySelectorAll('.availability-block').forEach(n => {
          const selected = n.dataset.start === state.activeGroup?.id;
          n.classList.toggle('active-block', selected);
          n.setAttribute('aria-pressed', String(selected));
        });
        renderSummary(); renderLeaders();
        $('clear-selection').hidden = !state.activeGroup && !state.timeWindow;
        if (narrow.matches && state.activeGroup) document.querySelector('.booking-panel').scrollIntoView({behavior:'smooth',block:'start'});
      });
      column.append(block);
    });
    if (!dayGroups.length) {
      const note = document.createElement('p'); note.className = 'empty-day';
      note.textContent = emptyDayMessage({
        snapshot: state.snapshot, feedStatus: feed.status, day, today: todayInZone(state.zone),
        leaders: state.selectedLeaders, onlyFreeTimes: state.onlyFreeTimes,
        personalReady: personalCalendar?.ready, personalStatus: personalCalendar?.status,
      });
      column.append(note);
    }
  }
  $('clear-selection').hidden = !state.activeGroup && !state.timeWindow;
}
function renderSummary() {
  const section = $('selection-summary'); section.replaceChildren();
  section.hidden = !state.activeGroup && !state.timeWindow;
  $('slot-details').hidden = section.hidden;
  if (section.hidden) return;
  const add = (text, className) => {const p = document.createElement('p'); p.className = className; p.textContent = text; section.append(p);};
  if (state.activeGroup) {
    add(dateLabel(state.activeGroup.date, {weekday:'long',month:'long',day:'numeric'}), 'chosen-date');
    add(timeLabel(state.activeGroup.minute), 'chosen-time');
  } else if (state.timeWindow) {
    add('Your time window', 'empty-selection');
    add(`${timeLabel(state.timeWindow.start)} – ${timeLabel(state.timeWindow.end)}`, 'chosen-time');
    add('The calendar shows meetings that fit fully inside this window.', 'selection-description');
  }
}
function leaderAvatar(name) {
  const avatar = document.createElement('span');
  avatar.className = 'leader-avatar';
  avatar.textContent = name.split(' ').map(part => part[0]).slice(0, 2).join('');
  avatar.setAttribute('aria-hidden', 'true');
  const photoUrl = state.leaders.find(leader => leader.name === name)?.photoUrl;
  if (photoUrl) {
    const photo = document.createElement('img');
    photo.alt = '';
    photo.width = 36;
    photo.height = 36;
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.addEventListener('error', () => photo.remove(), {once:true});
    photo.src = photoUrl;
    avatar.append(photo);
  }
  return avatar;
}
function createLeaderChoices() {
  const bookable = state.leaders.filter(l => l.bookingUrl);
  const fragment = document.createDocumentFragment();
  for (const leader of bookable) {
    const choice = button('', 'leader-choice', leader.name);
    choice.dataset.leader = leader.name;
    choice.setAttribute('aria-pressed', 'false');
    const avatar = leaderAvatar(leader.name);
    const info = document.createElement('span');
    const name = document.createElement('span'); name.className = 'leader-name'; name.textContent = leader.name;
    const check = document.createElement('span'); check.className = 'leader-check'; check.textContent = '✓'; check.setAttribute('aria-hidden', 'true');
    info.className = 'leader-info';
    info.append(name); choice.append(avatar, info, check); fragment.append(choice);
    choice.addEventListener('click', () => {
      if (state.selectedLeaders.has(leader.name)) state.selectedLeaders.delete(leader.name);
      else state.selectedLeaders.add(leader.name);
      refreshLeaderFilter();
    });
  }
  if (!bookable.length) {
    const empty = document.createElement('div'); empty.className = 'no-link';
    const title = document.createElement('strong'); title.textContent = 'No calendar link yet';
    const description = document.createElement('p'); description.textContent = 'The leadership sheet does not have any calendar links yet.';
    empty.append(title, description); fragment.append(empty);
  }
  $('booking-list').replaceChildren(fragment);
  const missing = state.leaders.filter(l => !l.bookingUrl);
  $('missing-title').textContent = `${missing.length} leaders without a link`;
  $('missing-list').replaceChildren(...missing.map(leader => {
    const row = document.createElement('div'); row.className = 'missing-leader';
    const name = document.createElement('span'); name.textContent = leader.name;
    row.append(leaderAvatar(leader.name), name);
    return row;
  }));
}
function renderLeaders() {
  const selectedStart = state.activeGroup?.id || null;
  if (selectedStart !== leaderPanelStart) {
    leadersExpanded = !selectedStart;
    leaderPanelStart = selectedStart;
  }
  for (const choice of $('booking-list').querySelectorAll('.leader-choice')) {
    choice.setAttribute('aria-pressed', String(state.selectedLeaders.has(choice.dataset.leader)));
  }
  renderLeaderPanel();
  renderSlotOptions();
}
function renderLeaderPanel() {
  $('toggle-leaders').setAttribute('aria-expanded', String(leadersExpanded));
  $('booking-list').hidden = !leadersExpanded;
  $('missing-details').hidden = !leadersExpanded || !state.leaders.length;
  $('clear-leaders').hidden = !leadersExpanded || !state.selectedLeaders.size;
  document.querySelector('.booking-panel').classList.toggle('leaders-collapsed', !leadersExpanded);
}
function refreshLeaderFilter() {
  const selectedStart = state.activeGroup?.id;
  state.activeGroup = selectedStart ? matchingGroups().find(group => group.id === selectedStart) || null : null;
  renderCalendar(); renderSummary(); renderLeaders(); scrollToCalendarTime();
}
function renderSlotOptions() {
  const options = $('slot-options');
  options.hidden = !feed.ready || !state.activeGroup || (state.onlyFreeTimes && !personalCalendar?.ready);
  if (options.hidden) { options.replaceChildren(); return; }
  const fragment = document.createDocumentFragment();
  for (const slot of state.activeGroup.slots) {
    const link = document.createElement('a'); link.className = 'slot-option'; link.href = slot.eventUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Book with ${slot.leader}, ${slot.durationMinutes} minutes`);
    const name = document.createElement('strong'); name.textContent = slot.leader;
    const person = document.createElement('div'); person.className = 'slot-person';
    person.append(leaderAvatar(slot.leader), name);
    const duration = document.createElement('span'); duration.textContent = `${slot.durationMinutes} min ↗`;
    const format = document.createElement('span'); format.className = 'slot-format'; format.textContent = slot.formatNote || 'Confirm the meeting format';
    link.append(person, duration, format); fragment.append(link);
  }
  options.replaceChildren(fragment);
}

$('previous').addEventListener('click', () => setDate(addDays(state.date, currentView() === 'day' ? -1 : -7)));
$('next').addEventListener('click', () => setDate(addDays(state.date, currentView() === 'day' ? 1 : 7)));
$('today').addEventListener('click', () => setDate(todayInZone(state.zone)));
for (const [id, offset] of [['mini-prev', -1], ['mini-next', 1]]) $(id).addEventListener('click', () => {month = new Date(month.getFullYear(), month.getMonth() + offset, 1, 12); renderMiniCalendar();});
for (const view of ['week', 'day']) $(view + '-view').addEventListener('click', () => {manualView = true; state.view = view; renderCalendar(); scrollToCalendarTime(); void loadAvailability();});
document.querySelectorAll('input[name="format"]').forEach(radio => radio.addEventListener('change', event => {state.format = event.target.value; state.activeGroup = null; renderCalendar(); renderSummary(); renderLeaders(); scrollToCalendarTime();}));
$('clear-selection').addEventListener('click', () => {state.activeGroup = null; state.timeWindow = null; renderCalendar(); renderSummary(); renderLeaders(); scrollToCalendarTime();});
$('toggle-leaders').addEventListener('click', () => {
  leadersExpanded = !leadersExpanded;
  renderLeaderPanel();
});
$('clear-leaders').addEventListener('click', () => {
  state.selectedLeaders.clear();
  refreshLeaderFilter();
  $('booking-list').querySelector('.leader-choice')?.focus({preventScroll:true});
});
$('time-form').addEventListener('submit', event => {
  event.preventDefault();
  const start = minutes($('start-time').value), end = minutes($('end-time').value);
  if (!validRange(start, end)) {
    $('time-error').textContent = 'Choose an end time after the start time on the same day.';
    $('end-time').setAttribute('aria-invalid', 'true');
    $('end-time').setAttribute('aria-describedby', 'time-error');
    return;
  }
  $('time-error').textContent = '';
  $('end-time').removeAttribute('aria-invalid');
  state.activeGroup = null;
  state.timeWindow = {start, end};
  renderCalendar();
  renderSummary();
  renderLeaders();
  $('time-filter').open = false;
  $('time-filter').querySelector('summary').focus();
  scrollToCalendarTime();
});
document.addEventListener('click', event => {
  if (!event.target.closest('#time-filter')) $('time-filter').open = false;
});
$('time-filter').addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    $('time-filter').open = false;
    $('time-filter').querySelector('summary').focus();
  }
});
const zones = [...new Set([localZone, 'America/Chicago', 'America/New_York', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'UTC'])];
for (const zone of zones) {
  const option = document.createElement('option');
  option.value = zone;
  option.textContent = zone.split('/').at(-1).replaceAll('_', ' ');
  option.title = zone;
  $('timezone').append(option);
}
$('timezone').value = state.zone;
$('timezone').addEventListener('change', event => {state.zone = event.target.value; state.activeGroup = null; renderCalendar(); renderMiniCalendar(); renderSummary(); renderLeaders(); scrollToCalendarTime();});

function personalCalendarChanged() {
  if (personalCalendar?.status === 'disconnected' || (personalCalendar?.status === 'error' && !personalCalendar.hasSession)) state.onlyFreeTimes = false;
  const selectedStart = state.activeGroup?.id;
  const checking = state.onlyFreeTimes && ['connecting', 'loading'].includes(personalCalendar?.status);
  // Keep the selected instant through a refresh, but hide booking links until it is checked.
  if (!checking) state.activeGroup = selectedStart ? matchingGroups().find(group => group.id === selectedStart) || null : null;
  renderCalendar(); renderSummary(); renderLeaders(); renderPersonalCalendar();
}

function renderPersonalCalendar() {
  const status = personalCalendar?.status || 'disconnected';
  const hasSession = personalCalendar?.hasSession;
  const isExpired = status === 'expired' || (status === 'ready' && !hasSession);
  $('connect-calendar').hidden = Boolean(hasSession);
  $('connect-calendar').disabled = status === 'connecting' || calendarClientStatus === 'loading' || !state.snapshot;
  $('connect-calendar').textContent = status === 'connecting' ? 'Connecting…' : isExpired ? 'Reconnect Google Calendar' : 'Connect Google Calendar';
  $('free-times-control').hidden = !hasSession && !state.onlyFreeTimes;
  $('only-free-times').checked = state.onlyFreeTimes;
  $('calendar-actions').hidden = !hasSession && !state.onlyFreeTimes;
  $('refresh-calendar').hidden = !hasSession;
  $('refresh-calendar').disabled = status === 'loading';
  const errors = {
    permission: 'Calendar access was not granted. Connect again to allow availability access.',
    authorization: 'Google could not connect. Try again.',
    cancelled: 'Connection cancelled.',
    popup: 'Allow the Google sign-in popup, then try again.',
    availability: 'Your calendar could not load. Refresh to try again.',
    api_disabled: 'Google Calendar access needs setup. Contact aisafetyuw@gmail.com.',
    rate_limit: 'Google has paused calendar requests. Wait a minute, then refresh.',
    range: 'Leader times have not loaded yet. Refresh the page.',
    revoke: 'Disconnected here. Remove app access in your Google Account to finish.',
  };
  const message = calendarSetupMessage || (isExpired ? 'Your connection expired. Reconnect to check your free times.' :
    status === 'loading' ? 'Checking your calendar…' : status === 'ready' ? 'Primary calendar connected.' :
    errors[personalCalendar?.error] || '');
  $('personal-calendar-status').textContent = message;
  $('personal-calendar-status').hidden = !message;
  $('personal-calendar-status').dataset.error = String(Boolean(calendarSetupMessage || personalCalendar?.error || isExpired));
}

$('connect-calendar').addEventListener('click', () => {
  if (!personalCalendar) {
    calendarSetupMessage = calendarClientStatus === 'error' ? 'Google could not load. Refresh the page to try again.' : 'Calendar connection is not set up yet.';
    renderPersonalCalendar(); return;
  }
  calendarSetupMessage = '';
  state.onlyFreeTimes = true;
  personalCalendar.connect();
});
$('only-free-times').addEventListener('change', event => {
  state.onlyFreeTimes = event.target.checked;
  personalCalendarChanged();
  if (state.onlyFreeTimes) void personalCalendar?.refresh();
});
$('refresh-calendar').addEventListener('click', () => { void personalCalendar?.refresh(true); });
$('disconnect-calendar').addEventListener('click', () => {
  state.onlyFreeTimes = false;
  personalCalendar?.disconnect();
});

async function initializePersonalCalendar() {
  let clientId = '';
  try {
    const response = await fetch('/api/coffee-chats/config', {cache:'no-store',credentials:'omit'});
    if (!response.ok) throw new Error('config');
    clientId = (await response.json()).googleClientId || '';
  } catch { calendarSetupMessage = 'Calendar connection settings could not load.'; }
  if (!clientId) { renderPersonalCalendar(); return; }
  calendarClientStatus = 'loading'; renderPersonalCalendar();
  try {
    if (!window.google?.accounts?.oauth2) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client'; script.async = true;
        const timeout = setTimeout(() => { script.remove(); reject(new Error('Google load timed out')); }, 15000);
        script.onload = () => { clearTimeout(timeout); resolve(); };
        script.onerror = () => { clearTimeout(timeout); script.remove(); reject(new Error('Google load failed')); };
        document.head.append(script);
      });
    }
    personalCalendar = new GoogleCalendarConnection({clientId, oauth: window.google.accounts.oauth2, onChange: personalCalendarChanged});
    personalCalendar.setRange(appointmentRange(state.snapshot?.slots || []));
    calendarClientStatus = 'ready';
  } catch {
    calendarClientStatus = 'error';
    calendarSetupMessage = 'Google could not load. Refresh the page to try again.';
  }
  renderPersonalCalendar();
}

function respond() {
  $('filters').open = !narrow.matches;
  if (!manualView) state.view = medium.matches ? 'day' : 'week';
  renderCalendar();
  scrollToCalendarTime();
  void loadAvailability();
}
narrow.addEventListener('change', respond); medium.addEventListener('change', respond);
$('filters').open = !narrow.matches;
renderCalendar(); renderMiniCalendar(); renderSummary(); renderPersonalCalendar();
try {
  const response = await fetch('/api/coffee-chats/roster');
  if (!response.ok) throw new Error('Roster response failed');
  state.leaders = (await response.json()).leaders;
  createLeaderChoices();
  renderLeaders();
} catch (error) {
  $('booking-list').textContent = 'The calendar list could not load. Refresh this page to try again.';
  $('missing-details').hidden = true;
  console.error(error);
}
await loadAvailability();
void initializePersonalCalendar();

function requestedDates() {
  const days = visibleDays();
  // The extra UTC day on each side covers all selected local dates and durations.
  return {start:addDays(days[0],-1),end:addDays(days.at(-1),2)};
}
async function loadAvailability(force=false) {
  const range=requestedDates(), key=range.start+'_'+range.end;
  if(!force&&key===requestedRange)return;
  requestedRange=key;
  await feed.load(range);
}
function availabilityChanged() {
  const selectedStart=state.activeGroup?.id;
  state.snapshot=feed.ready?feed.snapshot:null;
  document.body.classList.toggle('has-availability',Boolean(state.snapshot));
  if(feed.status!=='loading')state.activeGroup=selectedStart?matchingGroups().find(group=>group.id===selectedStart)||null:null;
  const failures=state.snapshot?.calendars.filter(c=>c.status!=='ready')||[];
  const status=$('availability-status');
  status.textContent=feed.status==='loading'?'Checking leader times…':feed.status==='error'?'Times could not load. Try again or choose another date.':feed.status==='expired'?'Times expired. Check again.':failures.length?'Some calendars need a direct check.':'';
  status.hidden=!status.textContent;
  $('retry-availability').hidden=!['error','expired'].includes(feed.status);
  const fallbacks=failures.length?failures:(feed.status==='error'?state.leaders.filter(l=>l.bookingUrl).map(l=>({...l,leader:l.name,eventUrl:l.bookingUrl})):[]);
  const unique=[...new Map(fallbacks.map(c=>[c.leader,c])).values()];
  $('unavailable-details').hidden=!unique.length;
  $('unavailable-list').replaceChildren(...unique.map(c=>{
    const link=document.createElement('a');link.textContent=c.leader+' ↗';link.href=c.eventUrl;link.target='_blank';link.rel='noopener noreferrer';return link;
  }));
  if(personalCalendar&&state.snapshot){
    const range=appointmentRange(state.snapshot.slots);
    if(JSON.stringify(range)!==JSON.stringify(personalCalendar.range))personalCalendar.setRange(range);
  }
  renderCalendar();renderSummary();renderLeaders();renderPersonalCalendar();
}
$('retry-availability').addEventListener('click',()=>void loadAvailability(true));
setInterval(()=>{
  feed.expire();
  if(document.hidden)return;
  if(feed.status!=='loading'&&(!feed.ready||Date.parse(feed.snapshot.retryAt)<=Date.now()))void loadAvailability(true);
  void personalCalendar?.refresh();
  if(state.activeGroup&&Date.parse(state.activeGroup.id)<=Date.now())state.activeGroup=null;
  renderCalendar();renderSummary();renderLeaders();renderPersonalCalendar();
},30000);
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden){feed.expire();if(!feed.ready)void loadAvailability(true);void personalCalendar?.refresh();}
});

function scrollToCalendarTime() {
  const minute = state.activeGroup && visibleDays().includes(state.activeGroup.date) ? state.activeGroup.minute : state.timeWindow?.start ?? calendarHours.start;
  const height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slot-height'));
  document.querySelector('.calendar-scroll').scrollTop = Math.max(0, (minute - +$('calendar-days').dataset.firstMinute) / 30 * height - 24);
}
