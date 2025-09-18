import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base='https://tohiretrading.com';
  const now=new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: base+'/', changeFrequency: 'weekly', priority: 1, lastModified: now },
    { url: base+'/en/occ',            changeFrequency: 'weekly', lastModified: now, alternates: { languages: { en: base+'/en/occ',            fr: base+'/fr/occ-carton-maroc' } } },
    { url: base+'/fr/occ-carton-maroc',changeFrequency: 'weekly', lastModified: now, alternates: { languages: { fr: base+'/fr/occ-carton-maroc', en: base+'/en/occ' } } },
    { url: base+'/en/mixed-paper',    changeFrequency: 'weekly', lastModified: now, alternates: { languages: { en: base+'/en/mixed-paper',    fr: base+'/fr/papiers-melanges' } } },
    { url: base+'/fr/papiers-melanges',changeFrequency: 'weekly', lastModified: now, alternates: { languages: { fr: base+'/fr/papiers-melanges', en: base+'/en/mixed-paper' } } },
    { url: base+'/en/wastepaper-morocco', changeFrequency: 'weekly', lastModified: now, alternates: { languages: { en: base+'/en/wastepaper-morocco' } } },
    { url: base+'/en/shavings-ncc',       changeFrequency: 'weekly', lastModified: now, alternates: { languages: { en: base+'/en/shavings-ncc' } } },
    { url: base+'/en/sop-office-paper',    changeFrequency: 'weekly', lastModified: now, alternates: { languages: { en: base+'/en/sop-office-paper' } } }
  ];
  return urls;
}