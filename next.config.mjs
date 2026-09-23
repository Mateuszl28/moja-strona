/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // AVIF jest zwykle ~20–30% lżejszy od WebP; przeglądarki bez AVIF dostaną WebP.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // better-sqlite3 to moduł natywny — trzymamy go poza bundlem webpacka,
  // żeby serwer ładował go bezpośrednio z node_modules.
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
