import type { MetadataRoute } from "next";

const base = "https://tohiretrading.com";

const routes = [
  "/",
  "/en/occ",
  "/en/mixed-paper",
  "/en/sop-office-paper",
  "/en/shavings-ncc",
  "/en/wastepaper-morocco",
  "/fr/occ-carton-maroc",
  "/fr/papiers-melanges"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
    alternates: {
      languages: {
        en: `${base}${path.replace(/^\/fr/, "/en").replace(/^\/$/, "/")}`,
        fr: `${base}${path.replace(/^\/en/, "/fr").replace(/^\/$/, "/")}`
      }
    }
  }));
}
