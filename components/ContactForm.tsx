"use client";

import { useState, useMemo } from "react";
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
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [material, setMaterial] = useState("Wastepaper");
  const [grade, setGrade] = useState(GRADES[0]);
  const [qty, setQty] = useState("");
  const [incoterm, setIncoterm] = useState<(typeof INCOTERMS)[number]>(INCOTERMS[0]);
  const [port, setPort] = useState("");
  const [message, setMessage] = useState("");

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [honey, setHoney] = useState(""); // honeypot

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;
  const isWastepaper = useMemo(() => material === "Wastepaper", [material]);

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
      // reset fields
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

  const inputCls = "mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-base outline-none focus:ring-2 focus:ring-teal-500/40";
  const selectCls = inputCls + " bg-[--panel]";
  const labelCls = "block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-5">
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

      {/* Row 1 */}
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label className={labelCls}>Intent</label>
          <select className={selectCls} value={intent} onChange={(e) => setIntent(e.target.value as (typeof INTENTS)[number])}>
            {INTENTS.map(i => <option key={i} value={i}>{i.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Name</label>
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
        </div>
        <div>
          <label className={labelCls}>Company</label>
          <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 ..." />
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid md:grid-cols-3 gap-5">
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
            <p className="mt-1 text-xs text-slate-400">
              For plastics/metals, please mention the exact grade in your message.
            </p>
          )}
        </div>

        <div>
          <label className={labelCls}>Quantity</label>
          <input className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} placeholder={`e.g., 10 x 40' HQ`} />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label className={labelCls}>Incoterm</label>
          <select
            className={selectCls}
            value={incoterm}
            onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}
          >
            {INCOTERMS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Port</label>
          <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
        </div>
        <div className="hidden md:block" />
      </div>

      {/* Message */}
      <div>
        <label className={labelCls}>Message</label>
        <textarea className={inputCls + " min-h-[160px]"} value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} />
      </div>

      {/* Turnstile */}
      <div className="mt-1">
        <Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading || !token} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/15 font-semibold">
          {loading ? "Sending..." : "Send"}
        </button>
        {ok && <p className="text-teal-300 text-sm">Thanks! Your message was sent.</p>}
        {ok === false && <p className="text-red-400 text-sm">Error: {err ?? "please try again"}</p>}
      </div>
    </form>
  );
}
