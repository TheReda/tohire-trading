export const metadata = {
  title: "OCC 1.05 • EN643 Specs & Export • ToHiRe Trading Morocco",
  description: "Old Corrugated Containers (OCC 1.05) per EN643. Sourcing, QA and logistics for exports to Europe, Africa and Asia.",
  alternates: { canonical: "https://tohiretrading.com/en/occ", languages: { "en": "https://tohiretrading.com/en/occ", "fr": "https://tohiretrading.com/fr/occ-carton-maroc" } },
  openGraph: {
    title: "OCC 1.05 • EN643 Specs & Export • ToHiRe Trading Morocco",
    description: "Old Corrugated Containers (OCC 1.05) per EN643. Sourcing, QA and logistics for exports to Europe, Africa and Asia.",
    url: "https://tohiretrading.com/en/occ",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OCC 1.05 • EN643 Specs & Export • ToHiRe Trading Morocco",
    description: "Old Corrugated Containers (OCC 1.05) per EN643. Sourcing, QA and logistics for exports to Europe, Africa and Asia.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">OCC 1.05 Wastepaper — Morocco</h1>
      <p className="mt-3 text-slate-300">EN643-aligned OCC with strict contamination control, moisture per EN643, export-ready packing.</p>
      <h2 className="mt-8 text-xl font-semibold">Specifications</h2>
      <ul className="mt-2 list-disc pl-5 text-slate-300">
        <li>Non-paper ≤1.5%, total unwanted ≤2.5%</li>
        <li>Moisture per EN643</li>
        <li>Baled, export-ready</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold">Logistics</h2>
      <ul className="mt-2 list-disc pl-5 text-slate-300">
        <li>Incoterms FOB, CFR, CIF, EXW, DAP</li>
        <li>Casablanca, Tanger-Med and other ports on request</li>
      </ul>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    </main>
  );
}
