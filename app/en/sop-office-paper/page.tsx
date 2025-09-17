import Link from "next/link";
export const metadata = {
  title: "Sorted Office Paper (2.05) Morocco | ToHiRe Trading",
  description: "SOP 2.05 supply with consistent quality. Predominantly wood-free office paper, export-ready.",
  alternates: {
    canonical: "https://tohiretrading.com/en/sop-office-paper",
    languages: {
      "en": "https://tohiretrading.com/en/sop-office-paper",
      "fr": "https://tohiretrading.com/en/sop-office-paper"
    }
  },
  openGraph: {
    title: "Sorted Office Paper (2.05) Morocco | ToHiRe Trading",
    description: "SOP 2.05 supply with consistent quality. Predominantly wood-free office paper, export-ready.",
    url: "https://tohiretrading.com/en/sop-office-paper",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  }
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Sorted Office Paper (2.05)</h1>
      <p className="mt-3 text-slate-300">Consistent SOP feedstock for mills. Documentation and QA included.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    </main>
  );
}
