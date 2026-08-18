/** @type {import('tailwindcss').Config} */
// The CDN build (cdn.tailwindcss.com) shipped no inline `tailwind.config`, so no custom
// theme, colours or fonts need carrying over — the site's palette and typography live in
// each page's inline <style> block, which continues to load after this stylesheet.
module.exports = {
  content: [
    "./*.html",
    "./articles/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
