export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function parseDate(key) { return new Date(`${key}T12:00:00`); }
export function addDays(key, count) {
  const date = parseDate(key);
  date.setDate(date.getDate() + count);
  return dateKey(date);
}
export function weekStart(key) {
  return addDays(key, -((parseDate(key).getDay() + 6) % 7));
}
export function todayInZone(zone) {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date());
  const part = type => parts.find(p => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function minutes(time) {
  if (!/^\d{2}:\d{2}$/.test(time)) return NaN;
  const [hour, minute] = time.split(':').map(Number);
  return hour < 24 && minute < 60 ? hour * 60 + minute : NaN;
}
export function timeValue(value) { return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`; }
export function timeLabel(value) {
  const hour = Math.floor(value / 60);
  return `${hour % 12 || 12}${value % 60 ? ':' + String(value % 60).padStart(2, '0') : ''} ${hour >= 12 ? 'pm' : 'am'}`;
}
export function validRange(start, end) { return Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end <= 1439 && end > start; }
export function selectionFromDrag(date, from, to) { return {date, start: Math.min(from, to), end: Math.min(1439, Math.max(from, to) + 30)}; }
