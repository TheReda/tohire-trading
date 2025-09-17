"use client";

import { useState } from "react";
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

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      {/* Honeypot field (hidden) */}
      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Intent</label>
          <select className="mt-1 w-full rounded-lg border px-3 py-2"
            value={intent} onChange={(e) => setIntent(e.target.value as any)}>
            {INTENTS.map(i => <option key={i} value={i}>{i.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border px-3 py-2"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 ..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Material</label>
          <select className="mt-1 w-full rounded-lg border px-3 py-2"
            value={material} onChange={(e) => setMaterial(e.target.value)}>
            <option>Wastepaper</option>
            <option>Plastics</option>
            <option>Metals</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Grade</label>
          <select className="mt-1 w-full rounded-lg border px-3 py-2"
            value={grade} onChange={(e) => setGrade(e.target.value)}>
            {GRADES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={qty} onChange={(e) => setQty(e.target.value)} placeholder={`e.g., 10 x 40' HQ`} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Incoterm</label>
          <select className="mt-1 w-full rounded-lg border px-3 py-2"
            value={incoterm} onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}>
            {INCOTERMS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Port</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2"
            value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
        </div>
        <div className="hidden sm:block" />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea className="mt-1 w-full rounded-lg border px-3 py-2 min-h-[140px]"
          value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} />
      </div>

      <div className="mt-2">
        <Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} />
      </div>

      <button type="submit" disabled={loading || !token}
        className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 border">
        {loading ? "Sending..." : "Send"}
      </button>

      {ok && <p className="text-green-700">Thanks! Your message was sent.</p>}
      {ok === false && <p className="text-red-700">Error: {err ?? "please try again"}</p>}
    </form>
  );
}
