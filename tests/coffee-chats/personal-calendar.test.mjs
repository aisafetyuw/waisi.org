import test from 'node:test';
import assert from 'node:assert/strict';
import {GOOGLE_CALENDAR_SCOPE, GoogleCalendarConnection, appointmentRange, readBusyPeriods, freeAppointments} from '../../public/coffee-chats/embed/personal-calendar.mjs';

const slot = (start, durationMinutes = 30) => ({start, durationMinutes});
const slots = [slot('2026-10-23T14:00:00Z', 15), slot('2026-10-23T14:00:00Z', 30), slot('2026-10-23T14:30:00Z')];
const range = appointmentRange(slots);
const payload = busy => ({...range, calendars: {primary: {busy}}});
const response = data => ({ok: true, status: 200, json: async () => data});

test('free-time matching checks each duration and allows meetings beside busy periods', () => {
  const busy = readBusyPeriods(payload([{start: '2026-10-23T14:15:00Z', end: '2026-10-23T14:30:00Z'}]), range);
  assert.deepEqual(freeAppointments(slots, busy, range), [slots[0], slots[2]]);
});

test('all-day busy periods and UTC offsets block the same instants', () => {
  const busy = readBusyPeriods(payload([{start: '2026-10-23T00:00:00-05:00', end: '2026-10-24T00:00:00-05:00'}]), range);
  assert.deepEqual(freeAppointments(slots, busy, range), []);
});

test('unchecked intervals never count as free', () => {
  assert.deepEqual(freeAppointments([...slots, slot('2026-10-23T15:00:00Z')], [], range), slots);
  assert.deepEqual(freeAppointments(slots, [], null), []);
  assert.throws(() => readBusyPeriods({...payload([]), timeMax: '2026-10-23T14:30:00Z'}, range));
  assert.throws(() => readBusyPeriods({...range, calendars: {}}, range));
  assert.throws(() => readBusyPeriods({...range, calendars: {primary: {errors: [{reason: 'notFound'}], busy: []}}}, range));
  assert.throws(() => readBusyPeriods(payload([{start: 'bad date', end: 'bad date'}]), range));
});

test('request coverage includes the end of the longest appointment', () => {
  assert.deepEqual(range, {timeMin: '2026-10-23T14:00:00.000Z', timeMax: '2026-10-23T15:00:00.000Z'});
  assert.equal(appointmentRange([]), null);
  assert.throws(() => appointmentRange([slot('bad date')]));
});

function fixture(fetchImpl = async () => response(payload([]))) {
  let config, clock = Date.parse('2026-10-22T18:00:00Z');
  const requests = [], revocations = [];
  const oauth = {
    initTokenClient(value) { config = value; return {requestAccessToken(options) { requests.push(options); }}; },
    hasGrantedAllScopes(token, scope) { return token.scope === scope; },
    revoke(token, done) { revocations.push(token); done({successful: true}); },
  };
  const connection = new GoogleCalendarConnection({clientId: 'test-client', oauth, fetchImpl, now: () => clock});
  connection.setRange(range);
  return {connection, requests, revocations, get config() { return config; },
    advance(ms) { clock += ms; },
    authorize(overrides = {}) { return config.callback({access_token: 'test-token', expires_in: 3600, scope: GOOGLE_CALENDAR_SCOPE, ...overrides}); },
  };
}

test('connect asks only for free/busy access and loads the primary calendar', async () => {
  let request;
  const f = fixture(async (url, options) => { request = {url, options}; return response(payload([])); });
  f.connection.connect();
  assert.equal(f.config.scope, GOOGLE_CALENDAR_SCOPE);
  assert.equal(f.config.include_granted_scopes, false);
  assert.equal(f.requests.length, 1);
  assert.deepEqual(f.connection.filter(slots), []);
  await f.authorize();
  assert.equal(request.url, 'https://www.googleapis.com/calendar/v3/freeBusy');
  assert.deepEqual(JSON.parse(request.options.body), {...range, timeZone: 'UTC', items: [{id: 'primary'}]});
  assert.equal(request.options.headers.Authorization, 'Bearer test-token');
  assert.equal(f.connection.status, 'ready');
  assert.deepEqual(f.connection.filter(slots), slots);
});

test('browser fetch keeps its native invocation context when loading availability', async () => {
  const f = fixture(function () {
    // Window.fetch rejects a connection object as its receiver; Node's fetch does not.
    if (this !== undefined) throw new TypeError('Illegal invocation');
    return Promise.resolve(response(payload([])));
  });
  f.connection.connect();
  await f.authorize();
  assert.equal(f.connection.status, 'ready');
  assert.deepEqual(f.connection.filter(slots), slots);
});

test('denied permissions and closed popups do not load calendar data', async () => {
  let calls = 0;
  const f = fixture(async () => { calls++; return response(payload([])); });
  f.connection.connect();
  await f.authorize({scope: ''});
  assert.equal(f.connection.error, 'permission');
  assert.equal(calls, 0);
  f.connection.connect();
  f.config.error_callback({type: 'popup_closed'});
  assert.equal(f.connection.error, 'cancelled');
  assert.deepEqual(f.connection.filter(slots), []);
});

test('disconnect clears data and ignores a late response', async () => {
  let resolve;
  const f = fixture(() => new Promise(done => { resolve = done; }));
  f.connection.connect();
  const pending = f.authorize();
  f.connection.disconnect();
  resolve(response(payload([])));
  await pending;
  assert.equal(f.connection.status, 'disconnected');
  assert.equal(f.connection.hasSession, false);
  assert.deepEqual(f.connection.busy, []);
  assert.deepEqual(f.connection.filter(slots), []);
  assert.deepEqual(f.revocations, ['test-token']);
});

test('expired tokens and API failures never show unchecked slots as free', async () => {
  const f = fixture();
  f.connection.connect(); await f.authorize();
  f.advance(3600000);
  assert.deepEqual(f.connection.filter(slots), []);
  await f.connection.refresh();
  assert.equal(f.connection.status, 'expired');
  const failed = fixture(async () => ({ok: false, status: 503}));
  failed.connection.connect(); await failed.authorize();
  assert.equal(failed.connection.status, 'error');
  assert.deepEqual(failed.connection.filter(slots), []);
  const partial = fixture(async () => response({...range, calendars: {primary: {errors: [{reason: 'internalError'}]}}}));
  partial.connection.connect(); await partial.authorize();
  assert.equal(partial.connection.status, 'error');
  assert.deepEqual(partial.connection.filter(slots), []);
});

test('Google errors distinguish setup, permission, quota, and temporary failures', async () => {
  for (const [status, reason, expected] of [[403, 'accessNotConfigured', 'api_disabled'], [403, 'insufficientPermissions', 'permission'], [403, 'rateLimitExceeded', 'rate_limit'], [429, '', 'rate_limit'], [503, '', 'availability']]) {
    const f = fixture(async () => ({ok: false, status, json: async () => ({error: {errors: [{reason}]}})}));
    f.connection.connect(); await f.authorize();
    assert.equal(f.connection.error, expected);
    assert.deepEqual(f.connection.filter(slots), []);
  }
});

test('range changes during Google consent use the latest range and keep popup callbacks live', async () => {
  const f=fixture();f.connection.connect();f.connection.setRange(range);await f.authorize();
  assert.equal(f.connection.status,'ready');
  const cancelled=fixture();cancelled.connection.connect();cancelled.connection.setRange(range);
  cancelled.config.error_callback({type:'popup_closed'});
  assert.equal(cancelled.connection.status,'error');assert.equal(cancelled.connection.error,'cancelled');
});
