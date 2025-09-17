import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tohiretrading.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more pages here as you create them:
    // { url: "https://tohiretrading.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
