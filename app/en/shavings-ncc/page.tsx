import Link from "next/link";
export const metadata = {
  title: "New Corrugated Cuttings (NCC 4.01) Morocco | ToHiRe Trading",
  description: "New shavings of corrugated board (post-industrial). Clean stream, stable quality, EN643 4.01.",
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">New Corrugated Cuttings (4.01)</h1>
      <p className="mt-3 text-slate-300">Unused trimmings from corrugated production. Very low contamination, contract-based specs.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    </main>
  );
}
