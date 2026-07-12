import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Ścieżki bez wartości SEO — nie marnuj budżetu crawlowania.
      disallow: [
        "/panel",
        "/admin",
        "/login",
        "/register",
        "/koszyk",
        "/en/cart",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
