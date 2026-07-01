/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // better-sqlite3 to moduł natywny — trzymamy go poza bundlem webpacka,
  // żeby serwer ładował go bezpośrednio z node_modules.
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
