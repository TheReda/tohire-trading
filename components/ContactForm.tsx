"use client";

import { useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const INCOTERMS = ["FOB","CFR","CIF","EXW","DAP"] as const;
const INTENTS   = ["buy","sell","general"] as const;
const GRADES    = [
  "1.05 — Old corrugated containers (OCC)",
  "4.01 — New shavings of corrugated board",
  "1.02 — Mixed papers and boards (sorted)",
  "2.05 — Sorted office paper",
];

export default function ContactForm() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>("general");

  // Contact
  const [name, setName]       = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [country, setCountry] = useState("");

  // Trade
  const [material, setMaterial] = useState("Wastepaper");
  const [grade, setGrade]       = useState(GRADES[0]);
  const [qty, setQty]           = useState("");
  const [incoterm, setIncoterm] = useState<(typeof INCOTERMS)[number]>(INCOTERMS[0]);
  const [port, setPort]         = useState("");

  // Message
  const [message, setMessage] = useState("");

  // UX
  const [token, setToken]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk]         = useState<null | boolean>(null);
  const [err, setErr]       = useState<string | null>(null);
  const [honey, setHoney]   = useState(""); // honeypot

  const isWastepaper = useMemo(() => material === "Wastepaper", [material]);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setOk(null); setErr(null);

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
      setMaterial("Wastepaper"); setGrade(GRADES[0]); setQty("");
      setIncoterm(INCOTERMS[0]); setPort(""); setMessage(""); setToken(null);
    } catch (e: any) {
      setOk(false); setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  /* ——— Airbnb-ish styles ——— */
  // softer surfaces, subtle borders, roomy line-height, clear hierarchy
  const wrapCls   = "rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]";
  const titleCls  = "text-xl font-semibold tracking-tight text-slate-100";
  const subCls    = "text-sm text-slate-300";
  const labelCls  = "text-[13px] font-semibold text-slate-200";
  const inputCls  = "mt-1.5 w-full rounded-xl border border-white/15 bg-white/7 backdrop-blur px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[--brand]/50 focus:border-[--brand]/40";
  const selectCls = inputCls + " bg-[--panel]";
  const hintCls   = "mt-1 text-[12px] text-slate-400";

  return (
    <div className={wrapCls}>
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[--brand]" />
          <div className={titleCls}>Tell us about your request</div>
        </div>
        <p className={subCls + " mt-1"}>We’ll reply within one business day.</p>

        {/* Intent pill switch */}
        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {INTENTS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIntent(i)}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition ${
                intent === i
                  ? "bg-[--brand] text-black shadow"
                  : "text-slate-300 hover:bg-white/10"
              }`}
              aria-pressed={intent === i}
            >
              {i === "buy" ? "Buy" : i === "sell" ? "Sell" : "General"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="px-6 pb-6 pt-4 grid gap-6">
        {/* Honeypot (hidden) */}
        <input type="text" name="website" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Name *</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required minLength={2} />
          </div>
          <div>
            <label className={labelCls}>Company</label>
            <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" />
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 ..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Country</label>
            <input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Morocco, Netherlands, ..." />
          </div>
        </div>

        {/* Trade */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Material</label>
            <select className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option>Wastepaper</option>
              <option>Plastics</option>
              <option>Metals</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Grade</label>
            <select
              className={selectCls + (isWastepaper ? "" : " opacity-50 cursor-not-allowed")}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              disabled={!isWastepaper}
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {!isWastepaper && (
              <p className={hintCls}>For plastics/metals, please mention the exact grade in your message.</p>
            )}
          </div>

          <div>
            <label className={labelCls}>Incoterm</label>
            <select className={selectCls} value={incoterm} onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}>
              {INCOTERMS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Port</label>
            <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Quantity</label>
            <input className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} placeholder={`e.g., 10 x 40' HQ`} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelCls}>Message *</label>
          <textarea
            className={inputCls + " min-h-[160px] resize-y leading-6"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short description — specs, timings, constraints…"
            required
            minLength={10}
          />
        </div>

        {/* Turnstile + actions */}
        <div className="grid sm:grid-cols-[1fr_auto] items-center gap-4">
          <div className="opacity-90">
            <Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} />
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-[--brand] text-black hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send message"}
          </button>
        </div>

        {/* Status */}
        {ok && <p className="text-teal-300 text-sm">Thanks! Your message was sent.</p>}
        {ok === false && <p className="text-red-400 text-sm">Error: {err ?? "please try again"}</p>}
      </form>
    </div>
  );
}
