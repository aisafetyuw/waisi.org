"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PROJECTS_RFP } from "@/constants";

// Persistent bottom-right CTA banner driven by PROJECTS_RFP: advertises the
// Scholars' Projects request for proposals. Dismissible for the current tab
// session only (sessionStorage, so it returns on the next visit / new session).
// z-40 keeps it above page content but below the nav and mobile menu overlay
// (z-50); nothing else on the site is fixed near the bottom-right corner, so
// there's no chat-widget / cookie-banner overlap.
const DISMISS_KEY = "waisi:projects-rfp-cta-dismissed";

export default function FloatingApplyButton() {
  // Start hidden so the server render and first client render match; reveal
  // once we've checked sessionStorage on mount.
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  if (hidden || PROJECTS_RFP.status !== "open") return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode / storage disabled — just hide for now */
    }
    setHidden(true);
  };

  // Fellowship-applications version — restore (and re-add Link/usePathname imports) when apps reopen. See docs/ARCHIVE.md.
  /*
  <Link
    href="/apply"
    className="flex items-center gap-2 py-3 pl-4 pr-3 text-sm font-semibold leading-tight transition-colors hover:bg-[#5B21B6]"
  >
    <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
    <span className="hidden sm:inline">
      Applications open now! Click here to apply.
    </span>
    <span className="sm:hidden">Apply now</span>
  </Link>
  */

  return (
    <div data-site-promotion className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-stretch overflow-hidden rounded-full bg-brand text-white shadow-lg shadow-black/20 sm:bottom-6 sm:right-6">
      <a
        href={PROJECTS_RFP.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-3 pl-4 pr-3 text-sm font-semibold leading-tight transition-colors hover:bg-[#5B21B6]"
      >
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
        <span className="hidden sm:inline">
          Project proposals are open! Submit an idea.
        </span>
        <span className="sm:hidden">Submit a project</span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the project proposals banner"
        className="flex items-center border-l border-white/25 px-3 transition-colors hover:bg-[#5B21B6]"
      >
        <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
      </button>
    </div>
  );
}
