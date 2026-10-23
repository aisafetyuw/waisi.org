import test from 'node:test';
import assert from 'node:assert/strict';
import {addDays, weekStart, minutes, validRange, selectionFromDrag} from '../../public/coffee-chats/embed/calendar-utils.mjs';
test('weeks start on Monday across month and year boundaries', () => {
  assert.equal(weekStart('2027-01-01'), '2026-12-28');
  assert.equal(weekStart('2026-10-25'), '2026-10-19');
  assert.equal(weekStart('2026-10-26'), '2026-10-26');
});
test('date navigation handles daylight saving and leap days', () => {
  assert.equal(addDays('2026-11-01', 1), '2026-11-02');
  assert.equal(addDays('2028-02-28', 1), '2028-02-29');
  assert.equal(addDays('2027-01-01', -1), '2026-12-31');
});
test('reverse drags select the whole range', () => {
  assert.deepEqual(selectionFromDrag('2026-10-22', 660, 600), {date: '2026-10-22', start: 600, end: 690});
  assert.equal(selectionFromDrag('2026-10-22', 1410, 1410).end, 1439);
});
test('exact time rejects invalid and overnight ranges', () => {
  assert.equal(validRange(minutes('10:00'), minutes('10:30')), true);
  for (const range of [['10:00', '09:00'], ['10:00', '10:00'], ['23:00', '01:00'], ['10:60', '11:30'], ['', '11:30']]) assert.equal(validRange(...range.map(minutes)), false);
});
