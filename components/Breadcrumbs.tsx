import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[--muted]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.href} className="inline-flex items-center gap-1">
            {i > 0 && <span className="opacity-60">/</span>}
            <Link href={it.href} className="hover:underline text-slate-200">{it.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
