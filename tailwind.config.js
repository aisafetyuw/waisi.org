/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'system-ui'", "sans-serif"],
      },
      // Design tokens — defined once as CSS variables in globals.css.
      // Use these classes (text-heading, bg-page, shadow-card, ...) instead
      // of inline style={{}} color values.
      colors: {
        page: "var(--bg-page)",
        card: "var(--bg-card)",
        "card-alt": "var(--bg-card-alt)",
        primary: "var(--text-primary)",
        heading: "var(--text-heading)",
        link: "var(--text-link)",
        subtle: "var(--border-subtle)",
        // Aliases: the brand violet doubles as a background (footer, nav
        // hamburger); cream is the legacy palette's off-white, kept only for
        // text/icons over the violet footer and the homepage hero photo.
        brand: "var(--text-heading)",
        cream: "#FFF9F0",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      borderRadius: {
        card: "12px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
