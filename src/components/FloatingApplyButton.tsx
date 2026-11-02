"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { APPLICATION_CYCLE, primaryCta } from "@/constants";

// Persistent bottom-right CTA on every page except /apply itself. Dismissible
// for the current tab session only (sessionStorage, so it returns on the next
// visit / new session). z-40 keeps it above page content but below the nav and
// mobile menu overlay (z-50); nothing else on the site is fixed near the
// bottom-right corner, so there's no chat-widget / cookie-banner overlap.
const DISMISS_KEY = "waisi:apply-cta-dismissed";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export default function FloatingApplyButton() {
  const pathname = usePathname();
  // The server snapshot keeps the first render hidden until storage is available.
  const storedHidden = useSyncExternalStore(subscribe, wasDismissed, () => true);
  const [dismissed, setDismissed] = useState(false);

  if (storedHidden || dismissed || pathname === "/apply") return null;
  const cta = primaryCta();

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode / storage disabled — just hide for now */
    }
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-stretch overflow-hidden rounded-full bg-brand text-white shadow-lg shadow-black/20 sm:bottom-6 sm:right-6">
      <Link
        href={cta.href}
        className="flex items-center gap-2 py-3 pl-4 pr-3 text-sm font-semibold leading-tight transition-colors hover:bg-[#5B21B6]"
      >
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
        <span className="hidden sm:inline">
          {APPLICATION_CYCLE.status === "open" ? "Applications open now! Click here to apply." : "Get notified about the next fellowship."}
        </span>
        <span className="sm:hidden">{cta.label}</span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the application banner"
        className="flex items-center border-l border-white/25 px-3 transition-colors hover:bg-[#5B21B6]"
      >
        <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
      </button>
    </div>
  );
}
