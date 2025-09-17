import Link from "next/link";
export const metadata = {
  title: "Mixed Papers and Boards (1.02) Morocco | ToHiRe Trading",
  description: "Sorted mixed papers and boards with prohibitives removed. Contract-based specs, export logistics handled.",
  alternates: {
    canonical: "https://tohiretrading.com/en/mixed-paper",
    languages: {
      "en": "https://tohiretrading.com/en/mixed-paper",
      "fr": "https://tohiretrading.com/fr/papiers-melanges"
    }
  },
  openGraph: {
    title: "Mixed Papers and Boards (1.02) Morocco | ToHiRe Trading",
    description: "Sorted mixed papers and boards with prohibitives removed. Contract-based specs, export logistics handled.",
    url: "https://tohiretrading.com/en/mixed-paper",
    images: ["https://tohiretrading.com/og.png"],
    type: "website"
  }
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Mixed Papers and Boards (1.02)</h1>
      <p className="mt-3 text-slate-300">Sorted mix with clear documentary trail and EN643 alignment.</p>
      <Link href="/#contact" className="inline-block mt-8 rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold">Contact us</Link>
    </main>
  );
}
