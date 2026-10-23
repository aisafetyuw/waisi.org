import test from 'node:test';
import assert from 'node:assert/strict';
import * as availability from '../../public/coffee-chats/embed/availability.mjs';
import {freeAppointments} from '../../public/coffee-chats/embed/personal-calendar.mjs';

const slots = [
  {leader:'A',start:'2026-10-23T14:00:00Z',durationMinutes:30,formats:['online']},
  {leader:'A',start:'2026-10-23T14:00:00Z',durationMinutes:60,formats:['online']},
  {leader:'A',start:'2026-10-23T14:15:00Z',durationMinutes:30,formats:['online']},
  {leader:'B',start:'2026-10-23T14:45:00Z',durationMinutes:15,formats:[]},
  {leader:'C',start:'2026-10-23T15:00:00Z',durationMinutes:30,formats:['in-person']},
  {leader:'A',start:'2026-10-24T14:00:00Z',durationMinutes:30,formats:['online']},
];
const filtered = options => availability.filterSlots(slots,{now:0,...options});

test('hourly counts deduplicate leaders while retaining every exact start and duration',()=>{
  const hours=availability.groupHours?.(filtered()) ?? [];
  assert.deepEqual(hours.map(h=>[h.id,h.leaders,h.groups.length]),[
    ['2026-10-23/540',['A','B'],3],['2026-10-23/600',['C'],1],['2026-10-24/540',['A'],1],
  ]);
  assert.deepEqual(hours[0].groups[0].slots.map(s=>s.durationMinutes),[30,60]);
  assert.deepEqual(hours[0].groups.map(g=>g.minute),[540,555,585]);
});

test('hour summaries reflect combined leader, format, time-window and busy-period filters',()=>{
  const matches=filtered({leaders:['A','B'],format:'online',timeWindow:{start:540,end:600},days:['2026-10-23']});
  const free=freeAppointments(matches,[{start:Date.parse('2026-10-23T14:35:00Z'),end:Date.parse('2026-10-23T15:00:00Z')}],
    {timeMin:'2026-10-23T14:00:00Z',timeMax:'2026-10-23T16:00:00Z'});
  const hours=availability.groupHours?.(free) ?? [];
  assert.deepEqual(hours.map(h=>[h.leaders,h.groups.map(g=>g.id)]),[[['A'],['2026-10-23T14:00:00Z']]]);
  assert.deepEqual(hours[0].groups[0].slots.map(s=>s.durationMinutes),[30]);
});

test('hour buckets use local dates and preserve distinct instants during a repeated clock hour',()=>{
  const source=[
    {...slots[0],start:'2026-11-01T06:30:00Z'},
    {...slots[0],start:'2026-11-01T07:30:00Z'},
  ];
  const hours=availability.groupHours?.(availability.filterSlots(source,{now:0,zone:'America/Chicago'})) ?? [];
  assert.equal(hours.length,1);
  assert.equal(hours[0].id,'2026-11-01/60');
  assert.deepEqual(hours[0].groups.map(g=>g.id),['2026-11-01T06:30:00Z','2026-11-01T07:30:00Z']);
  const inIndia=availability.groupHours(availability.filterSlots([slots[0]],{now:0,zone:'Asia/Kolkata'}));
  assert.equal(inIndia[0].minute,1140);
  assert.equal(inIndia[0].groups[0].minute,1170);
});

test('refreshing an hour removes a vanished exact start but retains the remaining choices',()=>{
  const activeHour={id:'2026-10-23/540'},activeGroup={id:'2026-10-23T14:00:00Z'};
  const fresh=availability.groupHours?.(filtered().filter(s=>s.start!=='2026-10-23T14:00:00Z')) ?? [];
  const selection=availability.reconcileHourSelection?.(fresh,{activeHour,activeGroup}) ?? {};
  assert.equal(selection.activeHour?.id,'2026-10-23/540');
  assert.equal(selection.activeGroup,null);
  assert.deepEqual(selection.activeHour.groups.map(g=>g.minute),[555,585]);
});

test('refreshing cannot keep a stale meeting option or a selection outside the current hour',()=>{
  const hours=availability.groupHours?.(filtered({leaders:['B']})) ?? [];
  const selection=availability.reconcileHourSelection?.(hours,{activeHour:{id:'2026-10-23/540'},activeGroup:{id:'2026-10-23T14:45:00Z'}}) ?? {};
  assert.deepEqual(selection.activeGroup?.slots.map(s=>s.leader),['B']);
  assert.deepEqual(availability.reconcileHourSelection([],selection),{activeHour:null,activeGroup:null});
  assert.equal(availability.reconcileHourSelection(hours,{activeHour:{id:'2026-10-23/540'},activeGroup:{id:'2026-10-23T15:00:00Z'}}).activeGroup,null);
});
