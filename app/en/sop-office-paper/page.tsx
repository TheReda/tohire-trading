import Link from "next/link";
export const metadata = {
  title: "SOP 2.05 • Sorted Office Paper • EN643 • ToHiRe Trading Morocco",
  description: "SOP 2.05 (mostly wood-free office paper). Consistent quality, bale documentation, export handled end-to-end.",
  alternates: { canonical: "https://tohiretrading.com/en/sop-office-paper", languages: { "en": "https://tohiretrading.com/en/sop-office-paper" } }
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
