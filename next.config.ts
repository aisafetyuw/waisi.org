import type { NextConfig } from "next";
import {
  DISCORD_URL,
  INSTAGRAM_URL,
  INTEREST_URL,
  TWITTER_URL,
} from "./src/constants";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (30-50% smaller than WebP for photos); WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Allowed quality values; 60 is used by the homepage hero (dimmed by an
    // overlay, so the lower quality is imperceptible).
    qualities: [60, 75],
  },
  async redirects() {
    // Destinations (Discord invite, Google Forms) get rotated, so these are
    // temporary (307) — a cached permanent redirect would outlive the URL.
    return [
      { source: "/discord", destination: DISCORD_URL, permanent: false },
      { source: "/interest", destination: INTEREST_URL, permanent: false },
      { source: "/twitter", destination: TWITTER_URL, permanent: false },
      { source: "/instagram", destination: INSTAGRAM_URL, permanent: false },
      { source: "/qrcode", destination: DISCORD_URL, permanent: false },
    ];
  },
};

export default nextConfig;
