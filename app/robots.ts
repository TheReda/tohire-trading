import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site = "https://www.tohire-trading.local";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site}/sitemap.xml`,
    host: site
  };
}