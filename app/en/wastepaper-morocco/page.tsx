import BreadcrumbsLd from "../../../components/BreadcrumbsLd";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import RelatedMaterials from "../../../components/RelatedMaterials";
export const metadata = {
  title: "Wastepaper Morocco (OCC) • EN643 Export • ToHiRe Trading Morocco",
  description: "Buy or sell EN643 wastepaper from Morocco (OCC 1.05, Mixed Paper 1.02, SOP 2.05). Fast decisions, compliant export, Europe • Africa • Asia.",
  alternates: { canonical: "https://tohiretrading.com/en/wastepaper-morocco", languages: { "en": "https://tohiretrading.com/en/wastepaper-morocco" } },
  openGraph: {
    title: "Wastepaper Morocco (OCC) • EN643 Export • ToHiRe Trading Morocco",
    description: "Buy or sell EN643 wastepaper from Morocco (OCC 1.05, Mixed Paper 1.02, SOP 2.05). Fast decisions, compliant export, Europe • Africa • Asia.",
    url: "https://tohiretrading.com/en/wastepaper-morocco",
    siteName: "ToHiRe Trading Morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Wastepaper Morocco (OCC) • EN643 Export • ToHiRe Trading Morocco",
    description: "Buy or sell EN643 wastepaper from Morocco (OCC 1.05, Mixed Paper 1.02, SOP 2.05). Fast decisions, compliant export, Europe • Africa • Asia.",
    images: ["https://tohiretrading.com/og.png"]
  }
};
import Link from "next/link";

export default function Page() {
  return (
    
      <main className="max-w-3xl mx-auto px-4 py-14">
      <BreadcrumbsLd items={[{name:"Home",url:"https://tohiretrading.com/"},{name:"Materials",url:"https://tohiretrading.com/#materials"},{name:document?.title||"",url:"https://tohiretrading.com/en/wastepaper-morocco"}]} />

      <Breadcrumbs items={[{name: "Home", href: "/"}, {name: "Materials", href: "/#materials"}]} />
      <h1 className="text-3xl font-bold">Wastepaper Trading in Morocco</h1>
      <p className="mt-3 text-slate-300">OCC 1.05, 4.01 shavings, mixed paper 1.02, SOP 2.05. EN643 alignment and full export logistics.</p>
      <h2 className="mt-8 text-xl font-semibold">Why ToHiRe</h2>
      <ul className="mt-2 list-disc pl-5 text-slate-300">
        <li>Quality control and grading</li>
        <li>KYC/AML and export compliance</li>
        <li>End-to-end documentation and bookings</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold">FAQ</h2>
      <details className="mt-3">
        <summary className="cursor-pointer">Which ports do you serve?</summary>
        <div className="mt-2 text-slate-300">Casablanca and Tanger-Med by default; others on request.</div>
      </details>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    
      <RelatedMaterials lang="en" items={[{"href":"/en/occ","label":"OCC 1.05 (Old Corrugated Containers)"},{"href":"/en/mixed-paper","label":"Mixed Paper 1.02"},{"href":"/en/sop-office-paper","label":"SOP 2.05 (Office Paper)"},{"href":"/en/shavings-ncc","label":"NCC / New Corrugated Shavings 4.01"},{"href":"/en/wastepaper-morocco","label":"Wastepaper Morocco (EN643 export)"}]} />
    </main>
  );
}
