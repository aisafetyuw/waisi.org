import assert from "node:assert/strict";
import test from "node:test";
import { parseMemberRows, parseResearchRows } from "../src/lib/sheetRows";

const memberHeader = ["Name", "Pronouns", "Role", "Email", "LinkedIn", "Team"];
const researchHeader = ["Author", "Title", "Link", "Authors", "Date", "Conference"];

test("blank research rows cannot reach the page's author and author-list operations", () => {
  const papers = parseResearchRows([researchHeader, [], ["  "], ["Ada", "Paper", "https://example.org/paper", "Ada, Ben", "2026"]]);
  assert.equal(papers.length, 1);
  assert.deepEqual(papers.map(p => p.author.trim()), ["Ada"]);
  assert.deepEqual(papers[0].authors.split(", "), ["Ada", "Ben"]);
});

test("research requires an owner, title, and HTTP(S) paper link", () => {
  const papers = parseResearchRows([researchHeader,
    ["", "Paper", "https://example.org"], ["Ada", "", "https://example.org"],
    ["Ada", "Unsafe", "javascript:alert(1)"], ["Ada", "Missing link"], null,
    ["Ada", "Valid", "https://example.org"],
  ]);
  assert.deepEqual(papers.map(p => p.name), ["Valid"]);
});

test("optional research fields remain safe and text values are trimmed", () => {
  const [paper] = parseResearchRows([researchHeader, [" Ada ", " Paper ", " https://example.org "]]);
  assert.deepEqual(paper, {author: "Ada", name: "Paper", link: "https://example.org", authors: "Ada", date: "", conference: undefined});
});

test("members require a name, role, and supported team", () => {
  const members = parseMemberRows([memberHeader, [], [""], null,
    ["Ada", "", "", "", "", "0"], ["Ada", "", "Lead", "", "", "7"],
    ["Ada", "", "Lead", "", "", "0"],
  ]);
  assert.deepEqual(members.map(m => m.name), ["Ada"]);
});

test("member cells normalize text and numeric team values", () => {
  const [member] = parseMemberRows([memberHeader, [" Ada ", null, " Lead ", undefined, " javascript:alert(1) ", 0]]);
  assert.deepEqual(member, {name: "Ada", pronouns: "", role: "Lead", email: "", linkedin: undefined, team: "0"});
});

test("valid optional member links survive validation", () => {
  const members = parseMemberRows([memberHeader, ["Ada", "she/her", "Lead", "ada@example.org", "https://www.linkedin.com/in/ada", "3"]]);
  assert.equal(members[0].linkedin, "https://www.linkedin.com/in/ada");
});

test("header-only spreadsheets produce empty lists", () => {
  assert.deepEqual(parseMemberRows([memberHeader]), []);
  assert.deepEqual(parseResearchRows([researchHeader]), []);
});
