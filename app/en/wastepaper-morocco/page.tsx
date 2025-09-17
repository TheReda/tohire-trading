import Link from "next/link";
export const metadata = {
  title: "Wastepaper Trading in Morocco: OCC, NCC, SOP | ToHiRe Trading",
  description: "Morocco-focused wastepaper sourcing and export. OCC, NCC, mixed paper, SOP. EN643 specs, ports Casablanca and Tanger-Med.",
  alternates: {
    canonical: "https://tohiretrading.com/en/wastepaper-morocco",
    languages: {
      "en": "https://tohiretrading.com/en/wastepaper-morocco",
      "fr": "https://tohiretrading.com/en/wastepaper-morocco"
    }
  },
  openGraph: {
    title: "Wastepaper Trading in Morocco: OCC, NCC, SOP | ToHiRe Trading",
    description: "Morocco-focused wastepaper sourcing and export. OCC, NCC, mixed paper, SOP. EN643 specs, ports Casablanca and Tanger-Med.",
    url: "https://tohiretrading.com/en/wastepaper-morocco",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  }
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
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
    </main>
  );
}
