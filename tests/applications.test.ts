import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_CYCLE, primaryCta } from "../src/constants";

test("open applications lead to the shared fellowship form", () => {
  assert.deepEqual(primaryCta({ ...APPLICATION_CYCLE, status: "open" }), { label: "Apply now", href: "/apply" });
});

test("closed applications lead to the interest form", () => {
  assert.deepEqual(primaryCta({ ...APPLICATION_CYCLE, status: "closed" }), {
    label: "Get notified", href: APPLICATION_CYCLE.interestFormUrl,
  });
});
