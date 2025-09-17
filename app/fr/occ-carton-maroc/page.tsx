import Link from "next/link";
export const metadata = {
  title: "OCC 1.05 Carton Ondulé — Maroc | ToHiRe Trading",
  description: "Achat/vente d’OCC 1.05 au Maroc. Spécifications EN643, balles prêtes à l’export, logistique complète.",
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
