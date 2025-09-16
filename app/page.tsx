"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/* ---------- Types & constants ---------- */
type LangKey = "en" | "fr";
const EMAIL_TO = "reda.elhattab@outlook.com";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXX";

/* ---------- EN643 grades (with photos in /public/images/grades) ---------- */
type GradeCode = "1.05" | "4.01" | "1.02" | "2.05";
type Grade = {
  code: GradeCode;
  title: string;
  desc: { en: string; fr: string };
  img: string;
  alt: string;
};

const GRADES: Grade[] = [
  {
    code: "1.05",
    title: "Old corrugated containers (OCC)",
    desc: {
      en: "Used corrugated boxes/sheets. Typical limits: ≤1.5% non-paper, ≤2.5% total unwanted. Moisture per EN643.",
      fr: "Cartons ondulés usagés. Limites usuelles : ≤1,5 % non-papier, ≤2,5 % indésirables. Humidité selon EN643.",
    },
    img: "/images/grades/occ.jpg",
    alt: "OCC bales",
  },
  {
    code: "4.01",
    title: "New shavings of corrugated board",
    desc: {
      en: "Unused trimmings/post-industrial cuttings. Very clean stream.",
      fr: "Chutes neuves (post-industriel). Flux très propre.",
    },
    img: "/images/grades/shavings.jpg",
    alt: "New corrugated shavings",
  },
  {
    code: "1.02",
    title: "Mixed papers and boards (sorted)",
    desc: {
      en: "Sorted mix, prohibitives removed; contract-based spec (often ≤3% non-paper).",
      fr: "Mélange trié, prohibés retirés ; spécification contractuelle (souvent ≤3 % non-papier).",
    },
    img: "/images/grades/mixed.jpg",
    alt: "Mixed paper bales",
  },
  {
    code: "2.05",
    title: "Sorted office paper",
    desc: {
      en: "Predominantly wood-free office paper; consistent quality.",
      fr: "Papier de bureau majoritairement sans bois ; qualité régulière.",
    },
    img: "/images/grades/sop.jpg",
    alt: "Sorted office paper",
  },
];

const GRADE_SPECS: Record<
  GradeCode,
  { moisture: string; prohibitives: string; nonProhibitives: string; packing: string }
> = {
  "1.05": {
    moisture: "Per EN643",
    prohibitives: "Zero tolerance",
    nonProhibitives: "Non-paper ≤1.5% • Total unwanted ≤2.5%",
    packing: "Baled, export-ready",
  },
  "4.01": {
    moisture: "Per EN643",
    prohibitives: "Zero tolerance",
    nonProhibitives: "Very low",
    packing: "Baled / bundled",
  },
  "1.02": {
    moisture: "Per EN643",
    prohibitives: "Removed / contract-based",
    nonProhibitives: "Typically ≤3%",
    packing: "Baled",
  },
  "2.05": {
    moisture: "Per EN643",
    prohibitives: "Zero tolerance",
    nonProhibitives: "≤2% total unwanted",
    packing: "Baled / palletized",
  },
};

/* ---------- i18n (shortened where possible) ---------- */
const en = {
  nav: { materials: "Materials", solutions: "Solutions", impact: "Impact", resources: "Resources", contact: "Contact" },
  cta: { sell: "Sell material", buy: "Buy material", explore: "Explore materials" },
  hero: {
    badge: "Wastepaper • OCC & NCC",
    title: "Turning Waste into Worth",
    subtitle:
      "Wastepaper as a core focus — plastics & metals on request. We connect reliable generators with qualified buyers and manage the logistics in between.",
    p1: "Quality control",
    p2: "Global logistics",
    p3: "Fast decisions",
    cardTitle: "Contact details",
    cardNote: "Prefer WhatsApp for a faster response.",
  },
  materials: {
    title: "Focus grades (EN643)",
    subtitle: "Four EN643 grades with clear specs. Moisture per EN643; prohibited materials have zero tolerance unless agreed.",
    disclaimer: "Definitions are indicative — full specifications available on request.",
  },
  solutions: {
    title: "Solutions for generators, suppliers & mills",
    subtitle: "From on-site collection to compliant export logistics — a transparent, circular approach.",
    cards: [
      { title: "Collection & Sourcing", body: "We source from printers, retailers, municipalities and MRFs.", points: ["Baled or loose", "Regular pick-ups", "Photo documentation"] },
      { title: "Grading & QA", body: "Clear, documented specs aligned to EN643.", points: ["Moisture checks", "Contamination control", "Load lists & bale tallies"] },
      { title: "Export & Docs", body: "End-to-end booking and paperwork.", points: ["Incoterms FOB/CFR/CIF", "KYC/AML", "PSI / inspections if needed"] },
    ],
  },
  impact: {
    title: "Impact & KPIs",
    subtitle: ">20,000 tons per year worldwide. Full logistics handled in between.",
    points: ["Aligned with EN643", "KYC, sanctions & AML checks", "Radiation & contamination control", "Export permits & EPR when applicable"],
    note: "KPIs indicative — audited figures upon request.",
  },
  resources: {
    title: "Resources",
    subtitle: "Company documents and external guides.",
    cta: "View",
    items: [
      { title: "Company Profile (PDF)", desc: "About ToHiRe Trading Morocco.", href: "/docs/tohire-company-profile.pdf" },
      { title: "KYC Checklist (PDF)", desc: "Information required to onboard.", href: "/docs/tohire-kyc-checklist.pdf" },
      { title: "EN643 Guide (external)", desc: "European list of standard grades.", href: "/docs/en643.pdf" }
    ],
  },
  contact: { title: "Contact us", subtitle: "Tell us about the material you want to buy or sell.", quick: "Quick actions" },
  footer: {
    tagline: "Connecting reliable suppliers and buyers of recyclables across EMEA and Asia.",
    disclaimer: "ToHiRe Trading Morocco SARL trades only non-hazardous recyclable materials and complies with applicable export regulations.",
    quicklinks: "Quick links",
    legal: "Legal",
    company: "Company",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
  },
  form: {
    name: "Name", company: "Company", email: "Email", phone: "Phone", country: "Country",
    material: "Material", grade: "Grade", qty: "Quantity", incoterm: "Incoterm", port: "Port",
    portPH: "e.g., Casablanca / Tanger-Med", anyReq: "Any specific requests?", message: "Message",
    send: "Send", sent: "Thanks — we received your message.",
    privacy: "By sending this form you agree that we may contact you about your request."
  },
  sell: { title: "Sell material", mailSubject: "Offer to SELL" },
  buy:  { title: "Buy material",  mailSubject: "Request to BUY"  },
  cookies: { title: "We use cookies", body: "We use cookies for basic site functionality and analytics (if you accept).", accept: "Accept", decline: "Decline", learn: "Learn more" },
  privacy: {
    title: "Privacy Policy (Draft)",
    intro: "We collect and process only the information you submit through our forms or send via email/WhatsApp.",
    whatTitle: "What we collect",
    what1: "Contact details (name, email, phone, company)",
    what2: "Trade-related information (material, specs, ports)",
    what3: "Technical analytics (if cookies accepted)",
    useTitle: "How we use it",
    use1: "To respond to your inquiries and operate the service",
    use2: "To prevent fraud and ensure compliance",
    use3: "To analyze traffic (aggregated)",
    note: "We will update this draft with company identifiers (ICE/RC, VAT) and contact email once confirmed."
  }
} as const;

const fr = {
  ...en,
  nav: { materials: "Matériaux", solutions: "Solutions", impact: "Impact", resources: "Ressources", contact: "Contact" },
  hero: {
    ...en.hero,
    subtitle:
      "Papier/carton (OCC, NCC) en priorité — plastiques & métaux sur demande. Nous connectons des producteurs fiables à des acheteurs qualifiés et gérons la logistique intermédiaire."
  },
  materials: {
    ...en.materials,
    title: "Grades cibles (EN643)",
    subtitle:
      "Quatre grades EN643 avec des spécifications claires. Humidité selon EN643 ; matières prohibées : tolérance zéro sauf accord."
  },
  contact: { ...en.contact, title: "Nous contacter", subtitle: "Décrivez le matériau que vous souhaitez acheter ou vendre.", quick: "Actions rapides" },
  footer: { ...en.footer, quicklinks: "Raccourcis", legal: "Mentions légales", company: "Société", privacy: "Politique de confidentialité" },
  form: {
    ...en.form,
    name: "Nom", company: "Société", phone: "Téléphone", country: "Pays",
    portPH: "ex. Casablanca / Tanger-Med", anyReq: "Demandes spécifiques ?",
    send: "Envoyer", sent: "Merci — nous avons bien reçu votre message."
  }
} as const;

/* ---------- Page ---------- */
export default function Home() {
  const [lang, setLang] = useState<LangKey>("en");
  const t = useMemo(() => (lang === "en" ? en : fr), [lang]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const [consent, setConsent] = useState<"unknown" | "accepted" | "declined">("unknown");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cookieConsent") : null;
    if (saved === "accepted" || saved === "declined") setConsent(saved);
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      const GA_ID = GA_MEASUREMENT_ID.trim();
      if (GA_ID && GA_ID !== "G-XXXXXXX") {
        const s1 = document.createElement("script");
        s1.async = true;
        s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s1);
        const s2 = document.createElement("script");
        s2.innerHTML =
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());" +
          `gtag('config','${GA_ID}');`;
        document.head.appendChild(s2);
      }
    }
  }, [consent]);

  return (
    <div className="min-h-screen bg-[--bg] text-[--fg] [--bg:#0b0f14] [--panel:#0f1520] [--muted:#94a3b8] [--brand:#14b8a6] [--brand-2:#0ea5e9]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur bg-[--bg]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-[--brand]" />
            <span className="font-semibold tracking-wide">TOHIRE TRADING MOROCCO</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#materials" className="hover:text-[--brand] transition">{t.nav.materials}</a>
            <a href="#solutions" className="hover:text-[--brand] transition">{t.nav.solutions}</a>
            <a href="#impact" className="hover:text-[--brand] transition">{t.nav.impact}</a>
            <a href="#resources" className="hover:text-[--brand] transition">{t.nav.resources}</a>
            <a href="#contact" className="hover:text-[--brand] transition">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LangSwitcher lang={lang} setLang={setLang} />
            <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden p-2 rounded-lg hover:bg-white/5" aria-label="Menu">
              <BurgerIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[--panel]">
            <div className="max-w-7xl mx-auto px-4 py-3 grid gap-2 text-sm">
              {(["materials","solutions","impact","resources","contact"] as const).map(id => (
                <a key={id} onClick={() => setMobileOpen(false)} href={`#${id}`} className="py-2 capitalize">{t.nav[id]}</a>
              ))}
              <div className="flex gap-2 pt-2">
                <button onClick={() => setSellOpen(true)} className="flex-1 rounded-xl border border-white/10 py-2 font-medium hover:bg-white/5">{t.cta.sell}</button>
                <button onClick={() => setBuyOpen(true)} className="flex-1 rounded-xl bg-[--brand] text-black py-2 font-semibold hover:opacity-90">{t.cta.buy}</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute -inset-x-20 -top-24 h-80 bg-[conic-gradient(at_30%_20%,theme(colors.teal.500),theme(colors.sky.500),theme(colors.lime.400),transparent)] blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 text-teal-300 px-3 py-1 text-xs font-semibold ring-1 ring-teal-500/30">
              <Sparkles className="h-3.5 w-3.5" /> {t.hero.badge}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">{t.hero.title}</h1>
            <p className="mt-4 text-[--muted] text-base sm:text-lg max-w-xl">{t.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setSellOpen(true)} className="rounded-xl bg-[--brand] text-black px-5 py-3 font-semibold shadow hover:opacity-90">{t.cta.sell}</button>
              <button onClick={() => setBuyOpen(true)} className="rounded-xl border border-white/10 px-5 py-3 font-semibold hover:bg-white/5">{t.cta.buy}</button>
              <a href="#materials" className="rounded-xl px-5 py-3 font-semibold hover:underline">{t.cta.explore}</a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-[--muted]">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4" />{t.hero.p1}</div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" />{t.hero.p2}</div>
              <div className="flex items-center gap-2"><Bolt className="h-4 w-4" />{t.hero.p3}</div>
            </div>
          </div>
          <div className="lg:justify-self-end w-full"><HeroCard t={t} /></div>
        </div>
      </section>

      {/* Materials (cards with photos) */}
      <section id="materials" className="border-t border-white/5 bg-[--panel]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{t.materials.title}</h2>
              <p className="text-[--muted] mt-2 max-w-2xl">{t.materials.subtitle}</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => setSellOpen(true)} className="rounded-lg border border-white/10 px-4 py-2 font-medium hover:bg-white/5">{t.cta.sell}</button>
              <button onClick={() => setBuyOpen(true)} className="rounded-lg bg-[--brand] text-black px-4 py-2 font-semibold">{t.cta.buy}</button>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRADES.map((g) => <GradeCard key={g.code} g={g} lang={lang} />)}
          </div>

          <p className="mt-4 text-xs text-[--muted]">{t.materials.disclaimer}</p>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="border-t border-white/5 bg-[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">{t.solutions.title}</h2>
          <p className="text-[--muted] mt-2 max-w-3xl">{t.solutions.subtitle}</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {t.solutions.cards.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-6 bg-[--panel] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 grid place-items-center rounded-lg bg-teal-400/10 text-teal-300"><Sparkles className="h-5 w-5" /></div>
                  <div className="font-semibold">{c.title}</div>
                </div>
                <p className="mt-3 text-sm text-[--muted]">{c.body}</p>
                <ul className="mt-3 grid gap-1.5 text-sm text-slate-300 list-disc pl-5">
                  {c.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="border-t border-white/5 bg-[--panel]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{t.impact.title}</h2>
            <p className="text-[--muted] mt-2">{t.impact.subtitle}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300 list-disc pl-5">
              {t.impact.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-6 bg-[--bg] shadow-sm">
            <Stats />
            <div className="mt-3 text-xs text-[--muted]">{t.impact.note}</div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="border-t border-white/5 bg-[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">{t.resources.title}</h2>
          <p className="text-[--muted] mt-2 max-w-2xl">{t.resources.subtitle}</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {t.resources.items.map((r, i) => (
              <a key={i} href={r.href} className="group rounded-2xl border border-white/10 p-5 hover:bg-white/5 bg-[--panel]">
                <div className="font-semibold group-hover:underline">{r.title}</div>
                <div className="mt-1 text-sm text-[--muted]">{r.desc}</div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-[--brand]">
                  {t.resources.cta} <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/5 bg-[--panel]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{t.contact.title}</h2>
            <p className="text-[--muted] mt-2">{t.contact.subtitle}</p>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Envelope className="h-4 w-4" />
                <a className="hover:underline" href={`mailto:${EMAIL_TO}`}>{EMAIL_TO}</a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <a className="hover:underline" href="tel:+31621939420">+31 6 21 93 94 20</a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsApp className="h-4 w-4" />
                <a className="hover:underline" href="https://wa.me/31621939420" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
              <button onClick={() => setPrivacyOpen(true)} className="text-left inline-flex items-center gap-2 text-sm text-[--muted] hover:text-slate-200 underline mt-2">
                {t.footer.privacy}
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 p-6 bg-[--bg] text-sm">
              <div className="font-semibold">{t.contact.quick}</div>
              <div className="mt-2 grid sm:grid-cols-2 gap-3">
                <button onClick={() => setSellOpen(true)} className="rounded-xl bg-[--brand] text-black px-4 py-2 font-semibold">{t.cta.sell}</button>
                <button onClick={() => setBuyOpen(true)} className="rounded-xl border border-white/10 px-4 py-2 font-semibold hover:bg-white/5">{t.cta.buy}</button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 bg-[--bg] shadow-sm">
            <ContactForm t={t} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <Logo className="h-8 w-8 text-[--brand]" />
                <div className="font-semibold">ToHiRe Trading Morocco</div>
              </div>
              <p className="mt-3 text-[--muted] max-w-md">{t.footer.tagline}</p>
              <div className="mt-3 text-xs text-[--muted]">{t.footer.disclaimer}</div>
            </div>
            <div>
              <div className="font-semibold">{t.footer.quicklinks}</div>
              <ul className="mt-2 grid gap-2">
                <li><a className="hover:underline" href="#materials">{t.nav.materials}</a></li>
                <li><a className="hover:underline" href="#solutions">{t.nav.solutions}</a></li>
                <li><a className="hover:underline" href="#contact">{t.nav.contact}</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">{t.footer.legal}</div>
              <ul className="mt-2 grid gap-2 text-[--muted]">
                <li>{t.footer.company}: <span className="text-slate-200">ToHiRe Trading Morocco SARL</span></li>
                <li>ICE / RC: <span className="text-slate-200">TBD</span></li>
                <li>VAT: <span className="text-slate-200">TBD</span></li>
                <li>© {new Date().getFullYear()} ToHiRe. {t.footer.rights}</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {sellOpen && (
        <Modal onClose={() => setSellOpen(false)} title={t.sell.title}>
          <TradeForm kind="sell" t={t} onDone={() => setSellOpen(false)} />
        </Modal>
      )}
      {buyOpen && (
        <Modal onClose={() => setBuyOpen(false)} title={t.buy.title}>
          <TradeForm kind="buy" t={t} onDone={() => setBuyOpen(false)} />
        </Modal>
      )}
      {privacyOpen && (
        <Modal onClose={() => setPrivacyOpen(false)} title={t.privacy.title}>
          <PrivacyDraft t={t} />
        </Modal>
      )}


      {/* Cookie consent */}
      {consent === "unknown" && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-50">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[--panel] p-4 shadow-lg">
            <div className="text-sm text-slate-200 font-semibold">{t.cookies.title}</div>
            <p className="text-xs text-[--muted] mt-1">{t.cookies.body}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { localStorage.setItem("cookieConsent", "accepted"); setConsent("accepted"); }}
                className="rounded-lg bg-[--brand] text-black px-4 py-2 text-sm font-semibold"
              >
                {t.cookies.accept}
              </button>
              <button
                onClick={() => { localStorage.setItem("cookieConsent", "declined"); setConsent("declined"); }}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5"
              >
                {t.cookies.decline}
              </button>
              <button onClick={() => setPrivacyOpen(true)} className="ml-auto text-xs underline text-slate-300 hover:text-slate-100">
                {t.cookies.learn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI bits ---------- */
function LangSwitcher({ lang, setLang }: { lang: LangKey; setLang: (v: LangKey) => void }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-white/10 overflow-hidden">
      {(["en","fr"] as const).map((id) => (
        <button
          key={id}
          onClick={() => setLang(id)}
          className={`px-3 py-1.5 text-sm font-semibold ${lang === id ? "bg-[--brand] text-black" : "bg-transparent text-slate-300 hover:bg-white/5"}`}
          aria-pressed={lang === id}
        >
          {id.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function HeroCard({ t }: { t: typeof en }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[--panel] p-6 shadow-sm">
      <div className="absolute -top-4 -left-4 h-24 w-24 rounded-3xl bg-teal-400/10 blur-2xl" />
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-3xl bg-sky-400/10 blur-2xl" />
      <div className="relative">
        <div className="text-sm font-semibold text-slate-300">{t.hero.cardTitle}</div>
        <div className="mt-3 grid gap-2 text-sm">
          <KVRow icon={<Envelope className="h-4 w-4" />} label="Email" value={<a className="truncate hover:underline" href={`mailto:${EMAIL_TO}`}>{EMAIL_TO}</a>} />
          <KVRow icon={<PhoneIcon className="h-4 w-4" />} label="Phone" value={<a className="truncate hover:underline" href="tel:+31621939420">+31 6 21 93 94 20</a>} />
          <a href="https://wa.me/31621939420" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-teal-400 text-black px-4 py-3 font-semibold hover:opacity-90">
            <WhatsApp className="h-4 w-4" /> WhatsApp
          </a>
        </div>
        <div className="mt-4 text-xs text-[--muted]">{t.hero.cardNote}</div>
      </div>
    </div>
  );
}

function KVRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 p-3">
      <div className="flex items-center gap-2 min-w-0">
        {icon}
        <div className="min-w-0">
          <div className="text-xs text-slate-400">{label}</div>
          <div className="truncate text-slate-200">{value}</div>
        </div>
      </div>
    </div>
  );
}

function GradeCard({ g, lang }: { g: Grade; lang: LangKey }) {
  const s = GRADE_SPECS[g.code];
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-[--bg] shadow-sm">
      <div className="rounded-xl overflow-hidden aspect-[4/3] bg-white/5 border border-white/10 relative">
        <Image
          src={g.img}
          alt={g.alt}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={g.code === "1.05"}
        />
      </div>
      <div className="mt-3 font-semibold">{g.code} — {g.title}</div>
      <p className="mt-1 text-sm text-[--muted]">{g.desc[lang]}</p>

      <div className="mt-3 rounded-lg border border-white/10 p-3 bg-[--panel]">
        <div className="text-xs text-slate-400 mb-2">Indicative specs (EN643-aligned)</div>
        <SpecRow k="Moisture"        v={s.moisture} />
        <SpecRow k="Prohibitives"    v={s.prohibitives} />
        <SpecRow k="Non-prohibitives" v={s.nonProhibitives} />
        <SpecRow k="Packing"         v={s.packing} />
      </div>
    </div>
  );
}
function SpecRow({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between text-xs text-slate-300"><span className="text-slate-400">{k}</span><span>{v}</span></div>;
}

/* ---------- Modal & forms ---------- */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative h-full w-full grid place-items-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-[--panel] text-white shadow-xl border border-white/10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="font-semibold">{title}</div>
            <button aria-label="Close" onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><Close className="h-5 w-5" /></button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ t }: { t: typeof en }) {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const res = await fetch("/api/mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: "contact", form: { ...form, material: "Contact", grade: "N/A" } }),
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok && j.ok) setSent(true);
    else setErr(j.error || "Failed to send. Try again.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.form.name}><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500/30" /></Field>
        <Field label={t.form.company}><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500/30" /></Field>
      </div>
      <Field label={t.form.email}><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500/30" /></Field>
      <Field label={t.form.message}><textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500/30" /></Field>
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={loading} type="submit" className="rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold disabled:opacity-60">{loading ? "Sending…" : t.form.send}</button>
        {sent && <div className="text-sm text-teal-300">{t.form.sent}</div>}
        {err && <div className="text-sm text-red-400">{err}</div>}
      </div>
      <p className="text-xs text-[--muted]">{t.form.privacy}</p>
    </form>
  );
}

function Stats() {
  const stats = [
    { label: "Tons per year",  value: ">100,000" },
    { label: "Regions served", value: "EMEA • Far East • Asia" },
    { label: "Docs on-time",   value: "100%" },
    { label: "Logistics",      value: "End-to-end handled" },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-5 bg-[--panel]">
          <div className="text-2xl font-extrabold text-teal-300">{s.value}</div>
          <div className="text-sm text-slate-300">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function TradeForm({ kind, t, onDone }: { kind: "buy" | "sell"; t: typeof en; onDone: () => void }) {
  const [f, setF] = useState({
    name: "", company: "", email: "", phone: "", country: "",
    material: "Wastepaper", grade: "1.05 — Old corrugated containers (OCC)",
    qty: "", incoterm: "FOB", port: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const res = await fetch("/api/mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, form: f }),
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok && j.ok) { setOk(true); onDone(); }
    else setErr(j.error || "Failed to send. Try again.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.form.name}><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-500/30" /></Field>
        <Field label={t.form.company}><input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-500/30" /></Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.form.email}><input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-500/30" /></Field>
        <Field label={t.form.phone}><input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-500/30" /></Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.form.country}><input value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-500/30" /></Field>
        <Field label={t.form.incoterm}>
          <select value={f.incoterm} onChange={(e) => setF({ ...f, incoterm: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[--panel] px-3 py-2">
            {["FOB","CFR","CIF","EXW","DAP"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label={t.form.material}>
          <select
            value={f.material}
            onChange={(e) => setF({ ...f, material: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-[--panel] px-3 py-2"
          >
            <option>Wastepaper</option>
          </select>
        </Field>
        <Field label={t.form.grade}>
          <select value={f.grade} onChange={(e) => setF({ ...f, grade: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[--panel] px-3 py-2">
            {[
              "1.05 — Old corrugated containers (OCC)",
              "4.01 — New shavings of corrugated board",
              "1.02 — Mixed papers and boards (sorted)",
              "2.05 — Sorted office paper",
            ].map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
        <Field label={t.form.qty}><input value={f.qty} onChange={(e) => setF({ ...f, qty: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="e.g., 10 x 40' HQ" /></Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.form.port}><input value={f.port} onChange={(e) => setF({ ...f, port: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder={t.form.portPH} /></Field>
        <Field label={t.form.message}><input value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder={t.form.anyReq} /></Field>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button disabled={loading} className="rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold disabled:opacity-60" type="submit">
          {loading ? "Sending…" : t.form.send}
        </button>
        {err && <span className="text-sm text-red-400">{err}</span>}
        {ok && <span className="text-sm text-teal-300">{t.form.sent}</span>}
        <span className="text-xs text-[--muted]">{t.form.privacy}</span>
      </div>
    </form>
  );
}

/* ---------- Icons ---------- */
function BurgerIcon({ className = "h-5 w-5" }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" /></svg>); }
function PhoneIcon({ className = "h-5 w-5" })   { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0  0 1-6-6A19.86 19.86 0 0 1 2.1 4.18 2 2 0  0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.66 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.23a2 2 0 0 1 2.11-.45c.83.32 1.7.54 2.6.66A2 2 0  0 1 22 16.92z" /></svg>); }
function Close({ className = "h-5 w-5" })      { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>); }
function Sparkles({ className = "h-5 w-5" })   { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" transform="translate(6 1)" /></svg>); }
function Shield({ className = "h-5 w-5" })     { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>); }
function Globe({ className = "h-5 w-5" })      { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></svg>); }
function Bolt({ className = "h-5 w-5" })       { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>); }
function ArrowRight({ className = "h-4 w-4" }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 5l7 7-7 7" /></svg>); }
function Envelope({ className = "h-4 w-4" })   { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 4h16v16H4z" /><path d="M4 7l8 6 8-6" /></svg>); }
function WhatsApp({ className = "h-4 w-4" })   { return (<svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden><path d="M19.11 17.14c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.62-1.53-1.9-.16-.28-.02-.43.12-.56.12-.12.28-.32.41-.48.14-.16.18-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.61-1.48-.83-2.03-.22-.55-.46-.47-.61-.47-.16 0-.35-.02-.53-.02-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34 0 1.38 1 2.72 1.14 2.9.14.18 1.95 2.98 4.72 4.17.66.28 1.18.45 1.58.57.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" /><path d="M26.41 5.59A13.93 13.93 0 0016 .5C7.44.5.5 7.44.5 16c0 2.45.62 4.87 1.8 7.01L.5 31.5l8.68-1.77A15.42 15.42 0 0016 31.5c8.56 0 15.5-6.94 15.5-15.5 0-4.14-1.61-8.03-4.59-10.91z" /></svg>); }

/* ---------- Logo ---------- */
function Logo({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M52 32a20 20 0 1 1-6.1-14.4" strokeLinecap="round" />
      <path d="M45 12l4 8 8-4" strokeLinecap="round" />
      <rect x="18" y="26" width="8" height="8" rx="1" />
      <rect x="28" y="26" width="8" height="8" rx="1" />
      <rect x="23" y="36" width="8" height="8" rx="1" />
      <path d="M40 44h-14l-3-6h20l-3 6z" />
      <path d="M18 50c4 3 8 3 12 0 4 3 8 3 12 0" />
    </svg>
  );
}