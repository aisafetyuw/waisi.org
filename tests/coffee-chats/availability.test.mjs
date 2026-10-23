import test from 'node:test';
import assert from 'node:assert/strict';
import {filterSlots, groupStarts, localParts} from '../../public/coffee-chats/embed/availability.mjs';
const sample = [
  {leader:'A',start:'2026-10-23T14:00:00Z',durationMinutes:30,formats:['online']},
  {leader:'B',start:'2026-10-23T14:00:00Z',durationMinutes:60,formats:[]},
  {leader:'A',start:'2026-10-23T14:00:00Z',durationMinutes:15,formats:['online']},
  {leader:'C',start:'2026-10-23T15:00:00Z',durationMinutes:30,formats:['in-person']},
];
test('simultaneous options group without counting one leader twice',()=>{
  const groups=groupStarts(filterSlots(sample,{now:0}));
  assert.equal(groups.length,2); assert.equal(groups[0].leaders.length,2); assert.equal(groups[0].slots.length,3);
});
test('format filters exclude unknown formats and leader filters select the right person',()=>{
  assert.equal(filterSlots(sample,{now:0,format:'online'}).length,2);
  assert.equal(filterSlots(sample,{now:0,leaders:['B'],format:'online'}).length,0);
  assert.equal(filterSlots(sample,{now:0,leaders:['C']}).length,1);
});
test('multiple leaders include either person, and an empty selection includes everyone',()=>{
  const matches = filterSlots(sample,{now:0,leaders:['A','C']});
  assert.deepEqual(matches.map(slot=>slot.leader),['A','A','C']);
  assert.equal(groupStarts(matches).length,2);
  assert.equal(filterSlots(sample,{now:0,leaders:[]}).length,sample.length);
  assert.equal(filterSlots(sample,{now:0,leaders:['A','B','C']}).length,sample.length);
});
test('leader selection combines with format and hours without changing the date range',()=>{
  const matches = filterSlots(sample,{
    now:0,leaders:['A','C'],format:'online',days:['2026-10-23'],timeWindow:{start:540,end:570},
  });
  assert.equal(matches.length,2);
  assert.ok(matches.every(slot=>slot.leader==='A'));
});
test('time filters contain the whole meeting and expired slots disappear',()=>{
  assert.equal(filterSlots(sample,{now:0,timeWindow:{start:540,end:570}}).length,2);
  assert.equal(filterSlots(sample,{now:Date.parse('2026-10-23T16:00:00Z')}).length,0);
});
test('time windows apply to each visible date in the selected time zone',()=>{
  const slots = [
    ...sample,
    {...sample[0],start:'2026-10-24T14:00:00Z'},
    {...sample[0],start:'2026-10-24T15:00:00Z'},
    {...sample[0],start:'2026-10-25T14:00:00Z'},
  ];
  const options = {now:0,days:['2026-10-23','2026-10-24'],timeWindow:{start:540,end:570}};
  const matches = filterSlots(slots,options);
  assert.equal(matches.length,3);
  assert.deepEqual([...new Set(matches.map(slot=>slot.date))],['2026-10-23','2026-10-24']);
  assert.ok(matches.every(slot=>slot.minute===540 && slot.durationMinutes<=30));
  assert.equal(filterSlots(slots,{...options,zone:'America/New_York'}).length,0);
});
test('timezone conversion changes calendar dates and respects daylight saving',()=>{
  assert.deepEqual(localParts('2026-10-23T02:00:00Z','America/Chicago'),{date:'2026-10-22',minute:1260});
  assert.equal(localParts('2026-11-01T06:30:00Z','America/Chicago').minute,90);
  assert.equal(localParts('2026-11-01T07:30:00Z','America/Chicago').minute,90);
  const groups=groupStarts(filterSlots([{...sample[0],start:'2026-11-01T06:30:00Z'},{...sample[0],start:'2026-11-01T07:30:00Z'}],{now:0}));
  assert.equal(groups.length,2);
});
