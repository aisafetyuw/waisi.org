import "../styles/globals.css";
import { Suspense } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Icons are tree-shaken React components; inject their CSS here once
// instead of letting each icon add a <style> tag at runtime.
config.autoAddCss = false;

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://waisi.org"),
  title: {
    default: "Wisconsin AI Safety Initiative",
    template: "%s | Wisconsin AI Safety Initiative",
  },
  description:
    "A community at UW–Madison dedicated to making AI safe and beneficial for all.",
  openGraph: {
    type: "website",
    siteName: "Wisconsin AI Safety Initiative",
    url: "https://waisi.org",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aisafetyuw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense
          fallback={
            <div
              className="fixed top-0 left-0 right-0 z-50 h-20"
              style={{ backgroundColor: "var(--bg-page)" }}
            />
          }
        >
          <Nav />
        </Suspense>
        <div
          id="content"
          className="flex flex-col min-h-screen pt-20"
          style={{
            minHeight: "calc(100vh - 210px)",
            backgroundColor: "var(--bg-page)",
          }}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
