import RelatedMaterials from "../../components/RelatedMaterials";
export const metadata = {
  title: "Mixed Paper 1.02 • EN643 Specs & Supply • ToHiRe Trading Morocco",
  description: "Sorted mixed papers and boards (1.02). Contract-based specs, contamination control, documented QA.",
  alternates: { canonical: "https://tohiretrading.com/en/mixed-paper", languages: { "en": "https://tohiretrading.com/en/mixed-paper", "fr": "https://tohiretrading.com/fr/papiers-melanges" } },
  openGraph: {
    title: "Mixed Paper 1.02 • EN643 Specs & Supply • ToHiRe Trading Morocco",
    description: "Sorted mixed papers and boards (1.02). Contract-based specs, contamination control, documented QA.",
    url: "https://tohiretrading.com/en/mixed-paper",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixed Paper 1.02 • EN643 Specs & Supply • ToHiRe Trading Morocco",
    description: "Sorted mixed papers and boards (1.02). Contract-based specs, contamination control, documented QA.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    
      <RelatedMaterials lang="en" items={[{"href":"/en/occ","label":"OCC 1.05 (Old Corrugated Containers)"},{"href":"/en/mixed-paper","label":"Mixed Paper 1.02"},{"href":"/en/sop-office-paper","label":"SOP 2.05 (Office Paper)"},{"href":"/en/shavings-ncc","label":"NCC / New Corrugated Shavings 4.01"},{"href":"/en/wastepaper-morocco","label":"Wastepaper Morocco (EN643 export)"}]} />
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Mixed Papers and Boards (1.02)</h1>
      <p className="mt-3 text-slate-300">Sorted mix with clear documentary trail and EN643 alignment.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    </main>
  );
}
