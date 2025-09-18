import Link from "next/link";

export const metadata = {
  title: "HTML Sitemap • ToHiRe Trading Morocco",
  description: "Browse all pages: OCC, Mixed Paper, SOP, NCC, Morocco export, and more."
};

const routes = [
  { href: "/", label: "Home" },
  { href: "/en/occ", label: "EN • OCC 1.05" },
  { href: "/en/mixed-paper", label: "EN • Mixed Paper 1.02" },
  { href: "/en/sop-office-paper", label: "EN • SOP 2.05" },
  { href: "/en/shavings-ncc", label: "EN • NCC / Shavings 4.01" },
  { href: "/en/wastepaper-morocco", label: "EN • Wastepaper Morocco" },
  { href: "/fr/occ-carton-maroc", label: "FR • OCC Carton Maroc" },
  { href: "/fr/papiers-melanges", label: "FR • Papiers mélangés" }
];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Sitemap</h1>
      <p className="mt-2 text-slate-300">Quick access to all key pages.</p>
      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {routes.map((r) => (
          <li key={r.href} className="rounded-xl border border-white/10 bg-[--panel]">
            <Link href={r.href} className="block px-4 py-3 hover:underline">{r.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
