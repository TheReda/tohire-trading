import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://www.tohire-trading.local";
  return [
    { url: `${site}/`, lastModified: new Date(), priority: 1 },
    { url: `${site}/#materials`, lastModified: new Date() },
    { url: `${site}/#solutions`, lastModified: new Date() },
    { url: `${site}/#impact`, lastModified: new Date() },
    { url: `${site}/#resources`, lastModified: new Date() },
    { url: `${site}/#contact`, lastModified: new Date() }
  ];
}