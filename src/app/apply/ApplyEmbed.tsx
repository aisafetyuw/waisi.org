"use client";

import { FilloutStandardEmbed } from "@fillout/react";
import { APPLICATION_CYCLE } from "@/constants";

// Fillout's official React embed (not a raw iframe): the component injects the
// form and listens for postMessage size updates. `dynamicResize` makes the
// embed grow to the form's full height so the *page* scrolls — the form is
// never clipped and never needs an inner scrollbar.
//
// Form: waisi.fillout.com/apply → forms.fillout.com/t/7k3KgFF5Pkus

export default function ApplyEmbed() {
  return (
    <div className="mt-8">
      <FilloutStandardEmbed
        filloutId={APPLICATION_CYCLE.fellowshipFormId}
        dynamicResize
        inheritParameters
      />
    </div>
  );
}
