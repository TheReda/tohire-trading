import Link from "next/link";
export const metadata = {
  title: "Papiers et Cartons Mélangés 1.02 — Maroc | ToHiRe Trading",
  description: "Mélange trié avec retrait des prohibés. Spécifications contractuelles, logistique export gérée.",
  alternates: {
    canonical: "https://tohiretrading.com/en/mixed-paper",
    languages: {
      "en": "https://tohiretrading.com/en/mixed-paper",
      "fr": "https://tohiretrading.com/fr/papiers-melanges"
    }
  },
  openGraph: {
    title: "Papiers et Cartons Mélangés 1.02 — Maroc | ToHiRe Trading",
    description: "Mélange trié avec retrait des prohibés. Spécifications contractuelles, logistique export gérée.",
    url: "https://tohiretrading.com/en/mixed-paper",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  }
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Papiers et Cartons Mélangés (1.02)</h1>
      <p className="mt-3 text-slate-300">Flux trié, conformité EN643, documentation claire.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Nous contacter</Link>
    </main>
  );
}
