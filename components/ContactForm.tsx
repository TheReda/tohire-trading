"use client";

import { useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const INCOTERMS = ["FOB","CFR","CIF","EXW","DAP"] as const;
const INTENTS = ["buy","sell","general"] as const;
const GRADES = [
  "1.05 — Old corrugated containers (OCC)",
  "4.01 — New shavings of corrugated board",
  "1.02 — Mixed papers and boards (sorted)",
  "2.05 — Sorted office paper",
];

export default function ContactForm() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>("general");

  // Identity / Contact
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  // Trade details
  const [material, setMaterial] = useState("Wastepaper");
  const [grade, setGrade] = useState(GRADES[0]);
  const [qty, setQty] = useState("");
  const [incoterm, setIncoterm] = useState<(typeof INCOTERMS)[number]>(INCOTERMS[0]);
  const [port, setPort] = useState("");

  // Message
  const [message, setMessage] = useState("");

  // UX
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [honey, setHoney] = useState(""); // honeypot

  const isWastepaper = useMemo(() => material === "Wastepaper", [material]);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent, name, company, email, phone, country,
          material, grade, qty, incoterm, port,
          message, token, honey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to send");

      setOk(true);
      // reset
      setIntent("general");
      setName(""); setCompany(""); setEmail(""); setPhone(""); setCountry("");
      setMaterial("Wastepaper"); setGrade(GRADES[0]); setQty(""); setIncoterm(INCOTERMS[0]); setPort("");
      setMessage(""); setToken(null);
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  // Styles
  const sectionCls = "rounded-2xl border border-white/10 bg-[--bg] p-5";
  const labelCls   = "block text-xs font-semibold tracking-wide text-slate-300";
  const inputCls   = "mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-base outline-none focus:ring-2 focus:ring-teal-500/40";
  const selectCls  = inputCls + " bg-[--panel]";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Top bar: Intent switch */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm font-semibold text-slate-200">Intent</div>
        <div className="inline-flex rounded-xl overflow-hidden border border-white/10">
          {INTENTS.map((i) => (
            <label key={i} className={`px-3 py-1.5 text-sm font-semibold cursor-pointer ${intent === i ? "bg-[--brand] text-black" : "text-slate-300 hover:bg-white/5"}`}>
              <input
                type="radio"
                name="intent"
                value={i}
                checked={intent === i}
                onChange={() => setIntent(i)}
                className="sr-only"
              />
              {i.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Section 1: Contact */}
      <section className={sectionCls}>
        <Header title="Contact details" subtitle="How can we reach you?" />
        <div className="mt-4 grid md:grid-cols-2 gap-5">
          <Field label="Name *"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} /></Field>
          <Field label="Company"><input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} /></Field>
          <Field label="Email *"><input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <Field label="Phone"><input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 ..." /></Field>
          <Field label="Country"><input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} /></Field>
        </div>
      </section>

      {/* Section 2: Trade details */}
      <section className={sectionCls}>
        <Header title="Trade details" subtitle="Tell us what you want to buy or sell" />
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          <Field label="Material">
            <select className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option>Wastepaper</option>
              <option>Plastics</option>
              <option>Metals</option>
            </select>
          </Field>

          <Field label="Grade">
            <select
              className={selectCls + (isWastepaper ? "" : " opacity-50 cursor-not-allowed")}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              disabled={!isWastepaper}
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {!isWastepaper && (
              <p className="mt-1 text-xs text-slate-400">
                For plastics/metals, please mention the exact grade in your message.
              </p>
            )}
          </Field>

          <Field label="Quantity">
            <input className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} placeholder={`e.g., 10 x 40' HQ`} />
          </Field>

          <Field label="Incoterm">
            <select
              className={selectCls}
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}
            >
              {INCOTERMS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </Field>

          <Field label="Port">
            <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
          </Field>
        </div>
      </section>

      {/* Section 3: Message */}
      <section className={sectionCls}>
        <Header title="Message" subtitle="Share any specs, timings, or constraints" />
        <div className="mt-4">
          <textarea className={inputCls + " min-h-[180px] resize-y"} value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} placeholder="Write your message here..." />
          <p className="mt-2 text-xs text-[--muted]">We’ll reply within 1 business day.</p>
        </div>
      </section>

      {/* Turnstile + actions */}
      <div className="grid md:grid-cols-[1fr_auto] items-center gap-4">
        <div><Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} /></div>
        <button type="submit" disabled={loading || !token} className="inline-flex items-center justify-center rounded-xl px-6 py-3 border border-white/15 font-semibold">
          {loading ? "Sending..." : "Send message"}
        </button>
      </div>

      {/* Status */}
      {ok && <p className="text-teal-300 text-sm">Thanks! Your message was sent.</p>}
      {ok === false && <p className="text-red-400 text-sm">Error: {err ?? "please try again"}</p>}
    </form>
  );
}

/* ---------- Small helpers ---------- */
function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <div className="inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[--brand]" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">{title}</h3>
      </div>
      {subtitle && <p className="mt-1 text-xs text-[--muted]">{subtitle}</p>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="block text-xs font-semibold tracking-wide text-slate-300">{label}</span>
      {children}
    </label>
  );
}
