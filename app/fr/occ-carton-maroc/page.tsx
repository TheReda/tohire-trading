import Link from "next/link";
export const metadata = {
  title: "OCC 1.05 Maroc • Spécifications EN643 • Export • ToHiRe Trading Morocco",
  description: "Carton ondulé usagé (OCC 1.05) conforme EN643. Sourcing, contrôle qualité et logistique d’export vers l’Europe, l’Afrique et l’Asie.",
  alternates: { canonical: "https://tohiretrading.com/fr/occ-carton-maroc", languages: { "fr": "https://tohiretrading.com/fr/occ-carton-maroc" } }
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">OCC 1.05 Carton Ondulé — Maroc</h1>
      <p className="mt-3 text-slate-300">Flux aligné EN643, contrôle de contamination, humidité conforme, emballage export.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Nous contacter</Link>
    </main>
  );
}
