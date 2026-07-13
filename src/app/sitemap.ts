import type { MetadataRoute } from "next";

// robots.txt points crawlers at /sitemap.xml — this generates it.
// The redirect stubs (/discord, /twitter, /instagram, /interest, /qrcode)
// are intentionally excluded; robots.txt disallows them.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1.0 },
    { path: "/programs", priority: 0.9 },
    { path: "/team", priority: 0.8 },
    { path: "/research", priority: 0.8 },
    { path: "/resources", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `https://waisi.org${path}`,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
