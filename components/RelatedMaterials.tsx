import Link from "next/link";

export default function RelatedMaterials({ lang = "en", items = [] as {href:string,label:string}[] }) {
  const title = lang === "fr" ? "Matériaux liés" : "Related materials";
  const note  = lang === "fr"
    ? "Explorez d’autres grades EN643 et demandes d’export (Europe • Afrique • Asie)."
    : "Explore other EN643 grades and export requests (Europe • Africa • Asia).";
  return (
    <section id="related-materials" className="mt-10">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-[--muted] mt-1">{note}</p>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="rounded-xl border border-white/10 bg-[--panel] p-4 hover:border-[--brand] hover:bg-white/5">
            <div className="font-medium">{it.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
