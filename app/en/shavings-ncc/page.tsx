import BreadcrumbsLd from "../../../components/BreadcrumbsLd";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import RelatedMaterials from "../../../components/RelatedMaterials";
export const metadata = {
  title: "NCC / New Corrugated Shavings 4.01 • EN643 • ToHiRe Trading Morocco",
  description: "New shavings of corrugated board (EN643 4.01). Clean, post-industrial stream with export-ready logistics.",
  alternates: { canonical: "https://tohiretrading.com/en/shavings-ncc", languages: { "en": "https://tohiretrading.com/en/shavings-ncc" } },
  openGraph: {
    title: "NCC / New Corrugated Shavings 4.01 • EN643 • ToHiRe Trading Morocco",
    description: "New shavings of corrugated board (EN643 4.01). Clean, post-industrial stream with export-ready logistics.",
    url: "https://tohiretrading.com/en/shavings-ncc",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NCC / New Corrugated Shavings 4.01 • EN643 • ToHiRe Trading Morocco",
    description: "New shavings of corrugated board (EN643 4.01). Clean, post-industrial stream with export-ready logistics.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    
      <main className="max-w-3xl mx-auto px-4 py-14">
      <BreadcrumbsLd items={[{name:"Home",url:"https://tohiretrading.com/"},{name:"Materials",url:"https://tohiretrading.com/#materials"},{name:"New Corrugated Cuttings (4.01)",url:"https://tohiretrading.com/en/shavings-ncc"}]} />

      <Breadcrumbs items={[{name: "Home", href: "/"}, {name: "Materials", href: "/#materials"}]} />
      <BreadcrumbsLd items={[{name:"Home",url:"https://tohiretrading.com/"},{name:"Materials",url:"https://tohiretrading.com/#materials"},{name:"New Corrugated Cuttings (4.01)",url:"https://tohiretrading.com/en/shavings-ncc"}]} />

      <Breadcrumbs items={[{name: "Home", href: "/"}, {name: "Materials", href: "/#materials"}]} />
      <h1 className="text-3xl font-bold">New Corrugated Cuttings (4.01)</h1>
      <p className="mt-3 text-slate-300">Unused trimmings from corrugated production. Very low contamination, contract-based specs.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    
      <RelatedMaterials lang="en" items={[{"href":"/en/occ","label":"OCC 1.05 (Old Corrugated Containers)"},{"href":"/en/mixed-paper","label":"Mixed Paper 1.02"},{"href":"/en/sop-office-paper","label":"SOP 2.05 (Office Paper)"},{"href":"/en/shavings-ncc","label":"NCC / New Corrugated Shavings 4.01"},{"href":"/en/wastepaper-morocco","label":"Wastepaper Morocco (EN643 export)"}]} />
    </main>
  );
}
