import RelatedMaterials from "../../components/RelatedMaterials";
export const metadata = {
  title: "Papiers mélangés 1.02 • Spécifications EN643 • ToHiRe Trading Morocco",
  description: "Mélange trié 1.02, spécifications contractuelles, contrôle de contamination, documents de QA pour l’export.",
  alternates: { canonical: "https://tohiretrading.com/fr/papiers-melanges", languages: { "fr": "https://tohiretrading.com/fr/papiers-melanges", "en": "https://tohiretrading.com/en/mixed-paper" } },
  openGraph: {
    title: "Papiers mélangés 1.02 • Spécifications EN643 • ToHiRe Trading Morocco",
    description: "Mélange trié 1.02, spécifications contractuelles, contrôle de contamination, documents de QA pour l’export.",
    url: "https://tohiretrading.com/fr/papiers-melanges",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Papiers mélangés 1.02 • Spécifications EN643 • ToHiRe Trading Morocco",
    description: "Mélange trié 1.02, spécifications contractuelles, contrôle de contamination, documents de QA pour l’export.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    
      <RelatedMaterials lang="fr" items={[{"href":"/fr/occ-carton-maroc","label":"OCC 1.05 (Carton ondulé usagé)"},{"href":"/fr/papiers-melanges","label":"Papiers mélangés 1.02"}]} />
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Papiers et Cartons Mélangés (1.02)</h1>
      <p className="mt-3 text-slate-300">Flux trié, conformité EN643, documentation claire.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Nous contacter</Link>
    </main>
  );
}
