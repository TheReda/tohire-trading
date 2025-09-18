import BreadcrumbsLd from "../../../components/BreadcrumbsLd";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import RelatedMaterials from "../../../components/RelatedMaterials";
export const metadata = {
  title: "SOP 2.05 • Sorted Office Paper • EN643 • ToHiRe Trading Morocco",
  description: "SOP 2.05 (mostly wood-free office paper). Consistent quality, bale documentation, export handled end-to-end.",
  alternates: { canonical: "https://tohiretrading.com/en/sop-office-paper", languages: { "en": "https://tohiretrading.com/en/sop-office-paper" } },
  openGraph: {
    title: "SOP 2.05 • Sorted Office Paper • EN643 • ToHiRe Trading Morocco",
    description: "SOP 2.05 (mostly wood-free office paper). Consistent quality, bale documentation, export handled end-to-end.",
    url: "https://tohiretrading.com/en/sop-office-paper",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SOP 2.05 • Sorted Office Paper • EN643 • ToHiRe Trading Morocco",
    description: "SOP 2.05 (mostly wood-free office paper). Consistent quality, bale documentation, export handled end-to-end.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    
      <main className="max-w-3xl mx-auto px-4 py-14">
      <BreadcrumbsLd items={[{name:"Home",url:"https://tohiretrading.com/"},{name:"Materials",url:"https://tohiretrading.com/#materials"},{name:document?.title||"",url:"https://tohiretrading.com/en/sop-office-paper"}]} />

      <Breadcrumbs items={[{name: "Home", href: "/"}, {name: "Materials", href: "/#materials"}]} />
      <BreadcrumbsLd items={[{name:"Home",url:"https://tohiretrading.com/"},{name:"Materials",url:"https://tohiretrading.com/#materials"},{name:document?.title||"",url:"https://tohiretrading.com/en/sop-office-paper"}]} />

      <Breadcrumbs items={[{name: "Home", href: "/"}, {name: "Materials", href: "/#materials"}]} />
      <h1 className="text-3xl font-bold">Sorted Office Paper (2.05)</h1>
      <p className="mt-3 text-slate-300">Consistent SOP feedstock for mills. Documentation and QA included.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    
      <RelatedMaterials lang="en" items={[{"href":"/en/occ","label":"OCC 1.05 (Old Corrugated Containers)"},{"href":"/en/mixed-paper","label":"Mixed Paper 1.02"},{"href":"/en/sop-office-paper","label":"SOP 2.05 (Office Paper)"},{"href":"/en/shavings-ncc","label":"NCC / New Corrugated Shavings 4.01"},{"href":"/en/wastepaper-morocco","label":"Wastepaper Morocco (EN643 export)"}]} />
    </main>
  );
}
