import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyDayMessage} from '../../public/coffee-chats/embed/live-availability.mjs';

const context = {
  day: '2026-10-24', today: '2026-10-23', feedStatus: 'ready',
  snapshot: {
    coverageStart: '2026-10-23', coverageEnd: '2026-10-31',
    calendars: [
      {leader: 'Eva', status: 'unavailable', error: 'unsupported_source'},
      {leader: 'Arya', status: 'unavailable', error: 'unsupported_source'},
      {leader: 'Jigyasa', status: 'ready'},
    ],
  },
};
const message = options => emptyDayMessage({...context, ...options});

test('unavailable selected calendars direct fellows to booking pages, even with personal filtering', () => {
  assert.equal(message({leaders: new Set(['Eva', 'Arya'])}), 'Check booking pages');
  assert.equal(message({leaders: ['Eva'], onlyFreeTimes: true, personalReady: true}), 'Check booking pages');
});

test('partial calendar coverage does not claim there are no matching or shared times', () => {
  assert.equal(message({leaders: ['Eva', 'Jigyasa']}), 'Some times unavailable');
  assert.equal(message({leaders: [], onlyFreeTimes: true, personalReady: true}), 'Some times unavailable');
});

test('an unrelated failed calendar does not hide a checked empty result for the selected leader', () => {
  assert.equal(message({leaders: ['Jigyasa']}), 'No matching times');
  assert.equal(message({leaders: ['Jigyasa'], onlyFreeTimes: true, personalReady: true}), 'No shared times');
});

test('a missing selected source cannot count as checked', () => {
  assert.equal(message({leaders: ['Missing']}), 'Check booking pages');
  assert.equal(message({leaders: ['Missing', 'Jigyasa']}), 'Some times unavailable');
});

test('each selected event type must be checked before an empty result is conclusive', () => {
  const snapshot = {...context.snapshot, calendars: [
    {leader: 'Jigyasa', status: 'ready'},
    {leader: 'Jigyasa', status: 'unavailable', error: 'provider_error'},
  ]};
  assert.equal(message({snapshot, leaders: ['Jigyasa']}), 'Some times unavailable');
});

test('loading, failures, past days, and uncovered dates retain their specific states', () => {
  assert.equal(message({snapshot: null, feedStatus: 'loading'}), 'Load times…');
  assert.equal(message({snapshot: null, feedStatus: 'error'}), 'Times unavailable');
  assert.equal(message({snapshot: null, feedStatus: 'expired'}), 'Times unavailable');
  assert.equal(message({day: '2026-10-31'}), 'Not checked');
  assert.equal(message({day: '2026-10-23', today: '2026-10-24'}), 'Past date');
});

test('personal calendar loading and errors cannot become a confirmed empty intersection', () => {
  assert.equal(message({leaders: ['Jigyasa'], onlyFreeTimes: true, personalStatus: 'loading'}), 'Checking your calendar…');
  assert.equal(message({leaders: ['Jigyasa'], onlyFreeTimes: true, personalStatus: 'error'}), 'Calendar check unavailable');
});
