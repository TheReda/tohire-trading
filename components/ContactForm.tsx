"use client";

import { useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";

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

  // Logistics
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
          material, grade, qty, incoterm, port, message, token, honey,
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

  /* —— Styling —— */
  const wrapCls   = "rounded-2xl border border-white/10 bg-white/7 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.22)]";
  const titleCls  = "text-[20px] font-semibold tracking-tight text-slate-100";
  const subCls    = "text-[13px] text-slate-300";
  const cardCls   = "rounded-xl border border-white/10 bg-[--panel] p-5";
  const labelCls  = "text-[11px] font-semibold text-slate-200";
  const inputBase = "w-full rounded-xl border border-white/12 bg-white/5 text-[13px] text-slate-100 placeholder:text-slate-400 outline-none transition-all duration-200";
  const inputCls  = inputBase + " px-3 py-1.5 focus:ring-2 focus:ring-[--brand]/55 focus:border-[--brand]/40 hover:border-white/20";
  const selectCls = inputCls + " bg-[--panel]";
  const hintCls   = "mt-1 text-[11px] text-slate-400";
  const trans = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={trans} className={wrapCls}>
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[--brand] shadow-[0_0_0_6px_rgba(20,184,166,0.08)]" />
          <div className={titleCls}>Tell us about your request</div>
        </div>
        <p className={subCls + " mt-1"}>We’ll reply within one business day.</p>
        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {(["buy","sell","general"] as const).map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIntent(i)}
              className={`px-3 py-1.5 text-[13px] font-semibold rounded-full transition-all ${
                intent === i ? "bg-[--brand] text-black shadow" : "text-slate-300 hover:bg-white/10"
              }`}
              aria-pressed={intent === i}
            >
              {i === "buy" ? "Buy" : i === "sell" ? "Sell" : "General"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="px-6 pb-6 pt-4 grid gap-6">
        {/* Honeypot */}
        <input type="text" name="website" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Blocks grid — 2 columns on xl screens (so we use screen width) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Contact block */}
          <section className={cardCls}>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Name *"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required minLength={2} /></Field>
              <Field label="Company"><input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" /></Field>
              <Field label="Email *"><input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></Field>
              <Field label="Phone"><input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 ..." /></Field>
              <Field className="md:col-span-2" label="Country"><input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Morocco, Netherlands, ..." /></Field>
            </div>
          </section>

          {/* Trade block */}
          <section className={cardCls}>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Trade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {!isWastepaper && <p className={hintCls}>For plastics/metals, please mention the exact grade in your message.</p>}
              </Field>

              <Field className="md:col-span-2" label="Quantity">
                <input className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} placeholder={`e.g., 10 x 40' HQ`} />
              </Field>
            </div>
          </section>

          {/* Logistics block */}
          <section className={cardCls}>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Logistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Incoterm">
                <select className={selectCls} value={incoterm} onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}>
                  {INCOTERMS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
              <Field label="Port">
                <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
              </Field>
            </div>
          </section>

          {/* Message block — spans both columns on xl */}
          <section className={`${cardCls} xl:col-span-2`}>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Message</h3>
            <Field label="Message *">
              <textarea
                className={inputCls + " min-h-[120px] resize-y leading-6"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a short description — specs, timings, constraints…"
                required
                minLength={10}
              />
            </Field>
          </section>
        </div>

        {/* Turnstile + actions */}
        <div className="grid sm:grid-cols-[1fr_auto] items-center gap-4">
          <div className="opacity-90">
            <Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            disabled={loading || !token}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-[--brand] text-black hover:opacity-95 disabled:opacity-60 shadow-[0_8px_24px_rgba(20,184,166,0.25)]"
          >
            {loading ? "Sending…" : "Send message"}
          </motion.button>
        </div>

        {/* Status */}
        {ok && <p className="text-teal-300 text-sm">Thanks! Your message was sent.</p>}
        {ok === false && <p className="text-red-400 text-sm">Error: {err ?? "please try again"}</p>}
      </form>
    </motion.div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  const trans = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <motion.label
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={trans}
      className={`grid gap-2 mb-2 ${className}`}
    >
      <span className="text-[11px] font-semibold text-slate-200">{label}</span>
      <div className="group/input relative">
        {children}
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-focus-within/input:ring-2 group-focus-within/input:ring-[--brand]/40 transition-all duration-200" />
      </div>
    </motion.label>
  );
}
