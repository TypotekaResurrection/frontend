/** @type {import('next').NextConfig} */
// next.config.js
const removeImports = require("next-remove-imports")();
const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  env: {
    API_DOMEN: "https://django.typoteka.link/api",
  },
});

module.exports = nextConfig;
