import type { MemberData, ResearchData } from "@/types";

function cell(value: unknown): string {
  if (typeof value === "string") return value.trim();
  return typeof value === "number" && Number.isFinite(value) ? String(value) : "";
}

function httpUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? value : undefined;
  } catch {
    return undefined;
  }
}

function cells(row: unknown): string[] {
  return Array.isArray(row) ? row.map(cell) : [];
}

// Sheets can omit trailing cells and return empty arrays for interior blank rows.
// Validate here so rendering code always receives the strings its types promise.
export function parseMemberRows(rows: unknown[]): MemberData[] {
  return rows.slice(1).flatMap((row, index) => {
    const values = cells(row);
    if (values.every(value => !value)) return [];
    const [name = "", pronouns = "", role = "", email = "", linkedin = "", team = ""] = values;
    if (!name || !role || !["0", "1", "2", "3"].includes(team)) {
      console.warn(`[members] Skipping invalid spreadsheet row ${index + 2}`);
      return [];
    }
    return [{ name, pronouns, role, email, linkedin: httpUrl(linkedin), team }];
  });
}

export function parseResearchRows(rows: unknown[]): ResearchData[] {
  return rows.slice(1).flatMap((row, index) => {
    const values = cells(row);
    if (values.every(value => !value)) return [];
    const [author = "", name = "", rawLink = "", authors = "", date = "", conference = ""] = values;
    const link = httpUrl(rawLink);
    if (!author || !name || !link) {
      console.warn(`[research] Skipping invalid spreadsheet row ${index + 2}`);
      return [];
    }
    return [{ author, name, link, authors: authors || author, date, conference: conference || undefined }];
  });
}
