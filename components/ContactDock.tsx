"use client";

export default function ContactDock() {
  const EMAIL = "contact@tohiretrading.com";
  const PHONE = "+31621939420";
  const WA    = "31621939420"; // international format without leading +

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="rounded-2xl border border-white/10 bg-[--panel]/95 backdrop-blur px-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2.5">
          <A href={`mailto:${EMAIL}`} label="Email" />
          <A href={`https://wa.me/${WA}`} label="WhatsApp" target="_blank" />
          <A href={`tel:${PHONE}`} label="Call" />
          <A href="#contact" label="Contact" />
        </div>
      </div>
    </div>
  );
}

function A({
  href,
  label,
  target,
}: {
  href: string;
  label: string;
  target?: "_blank";
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-100/90 border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition"
    >
      {label}
    </a>
  );
}
