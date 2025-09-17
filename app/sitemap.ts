export default function sitemap() {
  const base = "https://tohiretrading.com";
  const routes = [
    "/",
    "/en/occ",
    "/en/shavings-ncc",
    "/en/mixed-paper",
    "/en/sop-office-paper",
    "/en/wastepaper-morocco",
    "/fr/occ-carton-maroc",
    "/fr/papiers-melanges",
  ];
  const now = new Date().toISOString();
  return routes.map((p) => ({ url: base + p, lastModified: now, changefreq: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.8 }));
}
