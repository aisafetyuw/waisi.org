/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer AVIF (30-50% smaller than WebP for photos); WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Allowed quality values; 60 is used by the homepage hero (dimmed by an
    // overlay, so the lower quality is imperceptible).
    qualities: [60, 75],
  },
}

module.exports = nextConfig
