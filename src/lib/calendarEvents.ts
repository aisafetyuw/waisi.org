import { EVENTS_CALENDAR_CSV_URL } from "@/constants";

// ---------------------------------------------------------------------------
// Shared calendar parser
//
// The ops team maintains a Google Sheet ("WAISI Calendar - Fall <year>") and
// publishes it to the web as CSV. This module turns that CSV into a normalized,
// chronologically sorted list of events for /events. Malformed rows are skipped
// with a warning. Invalid sheet structure or an ambiguous year fails the fetch
// so the page shows an error instead of empty or incorrectly dated events.
//
// Sheet shape:
//   Row 1  merged title cell        -> supplies the year for yearless dates
//   Row 2  column headers           -> used to locate columns by name
//   Row 3+ one calendar day each
//
// Columns (located by header):
//   Week | Date | Website Calendar | School Calendar | Outreach... | Intro | ...
// Only "Website Calendar" feeds the site; every other column is ops-internal
// planning and ignored here. A row yields 0 or 1 event.
//
// The "Website Calendar" cell holds a brace-wrapped, comma-separated list of
// quoted strings in fixed positions (NOT keyed JSON):
//   {"<title>", "<description>", "<time>", "<location>", "<pin>"}
// e.g. {"Student Org Fair", "", "1700-2000", "Kohl Center", ""}
// Trailing positions may be omitted. `time` is 24h ("1800") or a 24h range
// ("1700-1900"). `pin` is a non-empty marker ("PIN", "PINNED", ...) to surface
// the event in the "Don't miss" callout.
// ---------------------------------------------------------------------------

export type CalendarEvent = {
    title: string;
    date: Date; // resolved to a concrete year, normalized to UTC midnight
    pinned: boolean;
    description: string;
    time: string; // formatted for display, e.g. "6:00 PM" or "5:00 – 8:00 PM"
    location: string;
};

const DAY_MS = 86_400_000;
// Matches the /events page ISR window. Also Google's own cache floor on the
// published CSV, so a shorter value would just re-fetch identical data.
const REVALIDATE_SECONDS = 300;

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

/**
 * Fetch and parse the published calendar CSV. Returns the normalized events
 * (possibly empty), or null if the CSV could not be fetched/read.
 */
export async function fetchCalendarEvents(): Promise<CalendarEvent[] | null> {
    try {
        const res = await fetch(EVENTS_CALENDAR_CSV_URL, {
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) {
            console.error(
                `[calendar] CSV fetch failed: ${res.status} ${res.statusText}`,
            );
            return null;
        }
        const text = await res.text();
        return normalizeEvents(text);
    } catch (error) {
        console.error("[calendar] Failed to fetch calendar CSV:", error);
        return null;
    }
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/**
 * Minimal RFC-4180-ish CSV parser: handles quoted fields, embedded commas and
 * newlines, and "" escapes. Returns an array of rows, each an array of cells.
 */
export function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];

        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') {
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += c;
            }
            continue;
        }

        if (c === '"') {
            inQuotes = true;
        } else if (c === ",") {
            row.push(field);
            field = "";
        } else if (c === "\n") {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else if (c !== "\r") {
            field += c;
        }
    }

    if (inQuotes) throw new Error("Calendar CSV contains an unterminated quote");

    // Flush a final row that wasn't newline-terminated.
    if (field !== "" || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows;
}

const MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

/**
 * Parse a named date or ISO date, always keeping its recorded year.
 * Yearless dates use the sheet's year; never infer a year from today's date.
 */
export function parseEventDate(raw: string, calendarYear?: number): Date | null {
    if (!raw) return null;

    const value = raw.trim().replace(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i, "");
    const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const named = value.match(/^([A-Za-z]{3,})\.?\s+(\d{1,2})(?:,?\s+(\d{4}))?$/);
    if (!iso && !named) return null;

    const year = iso ? Number(iso[1]) : named?.[3] ? Number(named[3]) : calendarYear;
    if (year === undefined) {
        throw new Error("Calendar year is missing or ambiguous; include a year in the title or event date");
    }
    const monthIndex = iso ? Number(iso[2]) - 1 : MONTHS.findIndex(m => m.startsWith(named![1].toLowerCase()));
    const day = Number(iso ? iso[3] : named![2]);
    if (year < 1000 || year > 9999 || monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) return null;

    const date = new Date(Date.UTC(year, monthIndex, day));
    // Reject impossible dates that JS would silently roll over (e.g. Feb 30).
    if (date.getUTCMonth() !== monthIndex || date.getUTCDate() !== day) {
        return null;
    }
    return date;
}

export type EventPayload = {
    title: string;
    description: string;
    time: string;
    location: string;
    pinned: boolean;
};

// Values that, in the `pin` slot, mean "not pinned" despite being non-empty.
const PIN_NEGATIVES = new Set(["", "no", "n", "false", "0", "-"]);

/**
 * Parse a "Website Calendar" cell: a brace-wrapped, comma-separated list of
 * quoted strings in fixed positions — {title, description, time, location, pin}.
 * Trailing positions may be missing. Not keyed JSON, so we split it ourselves.
 * Any absent field comes back as "" (or false for `pinned`). Never throws.
 */
export function parsePayload(raw: string): EventPayload {
    const empty: EventPayload = {
        title: "",
        description: "",
        time: "",
        location: "",
        pinned: false,
    };
    if (!raw || !raw.trim()) return empty;

    // Strip the outer braces, then pull out the quoted values in order.
    const inner = raw.trim().replace(/^\{/, "").replace(/\}$/, "");
    const quoted: string[] = [];
    const re = /"((?:[^"]|"")*)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(inner)) !== null) {
        quoted.push(m[1].replace(/""/g, '"').trim());
    }
    // Fall back to a bare comma split if the cell wasn't quoted at all.
    const parts =
        quoted.length > 0 ? quoted : inner.split(",").map((s) => s.trim());

    const [title = "", description = "", time = "", location = "", pin = ""] =
        parts;

    return {
        title,
        description,
        time: formatTime(time),
        location,
        pinned: !PIN_NEGATIVES.has(pin.trim().toLowerCase()),
    };
}

/**
 * Format a 24-hour time ("1800") or 24-hour range ("1700-1900") for display:
 * "6:00 PM" / "5:00 – 7:00 PM". Anything that doesn't look like a 24h time is
 * passed through untouched (e.g. "TBD").
 */
export function formatTime(raw: string): string {
    const value = (raw ?? "").trim();
    if (!value) return "";

    const range = value.match(/^(\d{1,2}:?\d{2})\s*[-–—]\s*(\d{1,2}:?\d{2})$/);
    if (range) {
        const start = parseClock(range[1]);
        const end = parseClock(range[2]);
        if (start && end) {
            // Collapse a shared AM/PM suffix: "5:00 – 7:00 PM".
            return start.suffix === end.suffix
                ? `${start.bare} – ${end.label}`
                : `${start.label} – ${end.label}`;
        }
    }

    const single = parseClock(value);
    return single ? single.label : value;
}

function parseClock(
    raw: string,
): { label: string; bare: string; suffix: string } | null {
    const m = raw.match(/^(\d{1,2}):?(\d{2})$/);
    if (!m) return null;
    let hours = parseInt(m[1], 10);
    const minutes = parseInt(m[2], 10);
    if (hours > 23 || minutes > 59) return null;

    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const bare = `${hours}:${m[2]}`;
    return { label: `${bare} ${suffix}`, bare, suffix };
}

type ColumnMap = {
    date: number;
    payload: number;
};

// Require the public columns so a changed layout cannot expose internal notes.
function locateColumns(header: string[]): ColumnMap {
    const norm = header.map((h) => h.trim().toLowerCase());
    const find = (pred: (h: string) => boolean) => norm.findIndex(pred);

    const date = find((h) => h === "date");
    const payload = find((h) => h === "website calendar");

    if (date < 0 || payload < 0) throw new Error("Calendar headers must include Date and Website Calendar");
    return { date, payload };
}

/**
 * Turn the raw CSV text into a normalized, chronologically sorted event list.
 * Rows 1 (title) and 2 (headers) are consumed for structure; every later row
 * may contribute one event from its "Website Calendar" cell. Malformed rows are
 * skipped with a console warning.
 */
export function normalizeEvents(csvText: string): CalendarEvent[] {
    const rows = parseCsv(csvText.replace(/^\uFEFF/, ""));
    if (rows.length < 2) throw new Error("Calendar CSV is missing its title or header row");

    const cols = locateColumns(rows[1]);
    const years = Array.from(new Set(rows[0].join(" ").match(/\b[1-9]\d{3}\b/g) ?? []));
    const calendarYear = years.length === 1 ? Number(years[0]) : undefined;
    const events: CalendarEvent[] = [];

    for (let r = 2; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.every((cell) => !cell || !cell.trim())) continue;

        const rawPayload = (row[cols.payload] ?? "").trim();
        if (!rawPayload) continue;

        const rawDate = (row[cols.date] ?? "").trim();
        const date = parseEventDate(rawDate, calendarYear);

        const { title, description, time, location, pinned } =
            parsePayload(rawPayload);

        if (!title) {
            console.warn(
                `[calendar] row ${r + 1}: skipping — no title in ` +
                    `${JSON.stringify(rawPayload)}`,
            );
            continue;
        }
        if (!date) {
            console.warn(
                `[calendar] row ${r + 1}: skipping "${title}" — ` +
                    `unparseable date ${JSON.stringify(rawDate)}`,
            );
            continue;
        }

        events.push({ title, date, pinned, description, time, location });
    }

    events.sort(
        (a, b) =>
            a.date.getTime() - b.date.getTime() ||
            a.title.localeCompare(b.title),
    );
    return events;
}

// ---------------------------------------------------------------------------
// Selection helpers (shared by both views)
// ---------------------------------------------------------------------------

function startOfTodayMs(now: Date): number {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(now);
    const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find(p => p.type === type)?.value);
    return Date.UTC(part("year"), part("month") - 1, part("day"));
}

/** Events from today through `days` days out, inclusive, in chronological order. */
export function eventsWithin(
    events: CalendarEvent[],
    days: number,
    now: Date = new Date(),
): CalendarEvent[] {
    const start = startOfTodayMs(now);
    const end = start + days * DAY_MS;
    return events.filter((e) => {
        const t = e.date.getTime();
        return t >= start && t <= end;
    });
}

/** Every event from today onward, in chronological order. */
export function upcomingEvents(
    events: CalendarEvent[],
    now: Date = new Date(),
): CalendarEvent[] {
    const start = startOfTodayMs(now);
    return events.filter((e) => e.date.getTime() >= start);
}

/** Stable reorder putting pinned events first, each group still chronological. */
export function pinnedFirst(events: CalendarEvent[]): CalendarEvent[] {
    return [...events].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.date.getTime() - b.date.getTime();
    });
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** "Saturday, August 8" (long) or "Sat, Aug 8" (short). Always in UTC, since
 *  event dates are stored as UTC-midnight calendar days. */
export function formatEventDate(date: Date, short = false): string {
    return date.toLocaleDateString("en-US", {
        weekday: short ? "short" : "long",
        month: short ? "short" : "long",
        day: "numeric",
        timeZone: "UTC",
    });
}
