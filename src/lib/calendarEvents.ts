import { EVENTS_CALENDAR_CSV_URL } from "@/constants";

// ---------------------------------------------------------------------------
// Shared calendar parser
//
// The ops team maintains a Google Sheet ("WAISI Calendar - Fall <year>") and
// publishes it to the web as CSV. This module turns that CSV into a normalized,
// chronologically sorted list of events that both the /events page and the Get
// Involved summary render. Nothing here throws on bad input: a malformed row is
// skipped with a console warning, and a failed fetch returns null so callers
// can show an explicit error state instead of a silently empty list.
//
// Sheet shape:
//   Row 1  merged title cell        -> ignored
//   Row 2  column headers           -> used to locate columns by name
//   Row 3+ one calendar day each
//
// Columns (located by header, with a fixed-index fallback):
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
export async function fetchCalendarEvents(
    now: Date = new Date(),
): Promise<CalendarEvent[] | null> {
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
        return normalizeEvents(text, now);
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
 * Parse a "Weekday, Month Day" string (e.g. "Saturday, August 8"). No year is
 * given, so: assume the current year, and if that date has already passed
 * relative to today, roll forward to next year. Returns null if unparseable.
 */
export function parseEventDate(raw: string, now: Date = new Date()): Date | null {
    if (!raw) return null;

    // Drop the leading weekday ("Saturday, ") if present.
    const withoutWeekday = raw.includes(",")
        ? raw.slice(raw.indexOf(",") + 1)
        : raw;
    const match = withoutWeekday.trim().match(/^([A-Za-z]+)\.?\s+(\d{1,2})$/);
    if (!match) return null;

    const monthName = match[1].toLowerCase();
    const monthIndex = MONTHS.findIndex((m) => m.startsWith(monthName));
    const day = parseInt(match[2], 10);
    if (monthIndex < 0 || day < 1 || day > 31) return null;

    // Compare on calendar days. Nudge "now" toward US Central (where Madison
    // is) so the year-rollover boundary tracks the local date, not UTC's.
    const local = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const todayMs = Date.UTC(
        local.getUTCFullYear(),
        local.getUTCMonth(),
        local.getUTCDate(),
    );

    let year = local.getUTCFullYear();
    if (Date.UTC(year, monthIndex, day) < todayMs) year += 1;

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

// Locate columns by header name, falling back to the documented fixed layout
// if a header has been renamed or removed.
function locateColumns(header: string[]): ColumnMap {
    const norm = header.map((h) => h.trim().toLowerCase());
    const find = (pred: (h: string) => boolean) => norm.findIndex(pred);

    const date = find((h) => h === "date");
    const payload = find((h) => h === "website calendar");

    return {
        date: date >= 0 ? date : 1,
        payload: payload >= 0 ? payload : 2,
    };
}

/**
 * Turn the raw CSV text into a normalized, chronologically sorted event list.
 * Rows 1 (title) and 2 (headers) are consumed for structure; every later row
 * may contribute one event from its "Website Calendar" cell. Malformed rows are
 * skipped with a console warning.
 */
export function normalizeEvents(
    csvText: string,
    now: Date = new Date(),
): CalendarEvent[] {
    const rows = parseCsv(csvText.replace(/^\uFEFF/, ""));
    if (rows.length < 3) return [];

    const cols = locateColumns(rows[1]);
    const events: CalendarEvent[] = [];

    for (let r = 2; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.every((cell) => !cell || !cell.trim())) continue;

        const rawPayload = (row[cols.payload] ?? "").trim();
        if (!rawPayload) continue;

        const rawDate = (row[cols.date] ?? "").trim();
        const date = parseEventDate(rawDate, now);

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
    const local = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return Date.UTC(
        local.getUTCFullYear(),
        local.getUTCMonth(),
        local.getUTCDate(),
    );
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
