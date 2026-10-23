import type { NextConfig } from "next";
import {
  DISCORD_URL,
  INSTAGRAM_URL,
  INTEREST_URL,
  TWITTER_URL,
} from "./src/constants";

const nextConfig: NextConfig = {
  // Dev uses its own dist dir (.next-dev) so `npm run build` (which wipes
  // .next) can never clobber a running dev server.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async headers() {
    return [
      { source: "/coffee-chats/:path*", headers: [
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ] },
      { source: "/coffee-chats/embed/:path*", headers: [
        { key: "Content-Security-Policy", value: [
          "default-src 'self'", "script-src 'self' https://accounts.google.com/gsi/client",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com/gsi/style",
          "font-src 'self' https://fonts.gstatic.com", "img-src 'self' data:",
          "connect-src 'self' https://accounts.google.com/gsi/ https://oauth2.googleapis.com https://www.googleapis.com",
          "frame-src https://accounts.google.com/gsi/", "frame-ancestors 'self'", "object-src 'none'", "base-uri 'none'",
        ].join('; ') },
      ] },
    ];
  },
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
