import assert from "node:assert/strict";
import test from "node:test";
import { eventsWithin, normalizeEvents, parseCsv } from "../src/lib/calendarEvents";

function calendar(title: string, entries: [string, string][]) {
  const rows = [[title], ["Week", "Date", "Website Calendar"],
    ...entries.map(([date, name]) => ["", date, `{"${name}", "", "1800", "Campus", ""}`])];
  return rows.map(row => row.map(cell => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n");
}

test("past events keep the calendar's year and disappear from upcoming events", () => {
  const events = normalizeEvents(calendar("WAISI Calendar - Fall 2026", [["Monday, September 7", "Welcome"]]));
  assert.equal(events[0]?.date.toISOString(), "2026-09-07T00:00:00.000Z");
  assert.deepEqual(eventsWithin(events, 365, new Date("2026-11-01T18:00:00Z")), []);
});

test("an old semester calendar stays old after New Year's Day", () => {
  const events = normalizeEvents(calendar("WAISI Calendar - Fall 2020", [["September 7", "Old event"]]));
  assert.deepEqual(eventsWithin(events, 365, new Date("2027-01-01T18:00:00Z")), []);
  assert.equal(events[0]?.date.getUTCFullYear(), 2020);
});

test("explicit dates support events across a year boundary", () => {
  const events = normalizeEvents(calendar("WAISI 2026–2027", [
    ["January 8, 2027", "January"], ["Thursday, December 31, 2026", "December"],
    ["2027-02-01", "February"],
  ]));
  assert.deepEqual(events.map(e => e.date.toISOString()), [
    "2026-12-31T00:00:00.000Z", "2027-01-08T00:00:00.000Z", "2027-02-01T00:00:00.000Z",
  ]);
});

test("yearless dates require an unambiguous calendar year", () => {
  assert.throws(() => normalizeEvents(calendar("WAISI Calendar", [["September 7", "Unknown year"]])), /year/i);
  assert.throws(() => normalizeEvents(calendar("WAISI 2026–2027", [["September 7", "Ambiguous year"]])), /year/i);
});

test("impossible dates do not turn into events on another day", () => {
  const events = normalizeEvents(calendar("WAISI 2026", [["February 30", "Invalid"], ["April 31", "Invalid"], ["February 28", "Valid"]]));
  assert.deepEqual(events.map(e => e.title), ["Valid"]);
});

test("leap day uses the explicit year", () => {
  const events = normalizeEvents(calendar("WAISI Calendar", [["2028-02-29", "Leap day"], ["2027-02-29", "Invalid"]]));
  assert.deepEqual(events.map(e => e.date.toISOString()), ["2028-02-29T00:00:00.000Z"]);
});

test("CSV structure errors do not look like a valid empty calendar", () => {
  assert.throws(() => normalizeEvents("<html>Please sign in</html>"), /calendar|header/i);
  assert.throws(() => normalizeEvents('WAISI 2026\nWeek,Date,Internal notes\n1,September 7,Private'), /header/i);
  assert.throws(() => parseCsv('"unfinished'), /quote/i);
  assert.deepEqual(normalizeEvents(calendar("WAISI 2026", [])), []);
});

test("CSV parsing preserves embedded commas, quotes, and newlines", () => {
  assert.deepEqual(parseCsv('"a,b","say ""hi""\nagain"\r\n'), [["a,b", 'say "hi"\nagain']]);
});

test("the summer cutoff uses midnight in Madison, including daylight saving time", () => {
  const events = normalizeEvents(calendar("WAISI 2026", [["July 10", "Yesterday"], ["July 11", "Today"]]));
  assert.deepEqual(eventsWithin(events, 0, new Date("2026-07-11T05:30:00Z")).map(e => e.title), ["Today"]);
});

test("the winter cutoff stays on yesterday until midnight in Madison", () => {
  const events = normalizeEvents(calendar("WAISI 2026", [["January 10", "Today"], ["January 11", "Tomorrow"]]));
  assert.deepEqual(eventsWithin(events, 0, new Date("2026-01-11T05:30:00Z")).map(e => e.title), ["Today"]);
});
