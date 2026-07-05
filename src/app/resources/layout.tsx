import type { Metadata } from "next";

// The resources page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Resources",
  description:
    "AI safety reading lists, program handbooks, and learning resources curated by WAISI.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
