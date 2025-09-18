import Link from "next/link";
export const metadata = {
  title: "Papiers mélangés 1.02 • Spécifications EN643 • ToHiRe Trading Morocco",
  description: "Mélange trié 1.02, spécifications contractuelles, contrôle de contamination, documents de QA pour l’export.",
  alternates: { canonical: "https://tohiretrading.com/fr/papiers-melanges", languages: { "fr": "https://tohiretrading.com/fr/papiers-melanges" } }
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
