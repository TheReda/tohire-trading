"use client";

import * as React from "react";
import { motion } from "framer-motion";

/** ---------- Config ---------- */
const MATERIALS = ["Wastepaper", "Plastics", "Metals"] as const;
type Material = (typeof MATERIALS)[number];

const INCOTERMS = ["FOB", "CFR", "CIF", "EXW", "DAP"] as const;
type Incoterm = (typeof INCOTERMS)[number];

const WASTE_GRADES = [
  "1.05 — Old corrugated containers (OCC)",
  "4.01 — New shavings of corrugated board",
  "1.02 — Mixed papers and boards (sorted)",
  "2.05 — Sorted office paper",
] as const;

const trans = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

/** ---------- UI Primitives ---------- */
function Card(props: React.PropsWithChildren<{ title: string; hint?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={trans}
      className="rounded-2xl border border-white/10 bg-[--panel] p-5 md:p-6 shadow-sm"
    >
      <div className="mb-4">
        <div className="text-sm font-semibold text-slate-200">{props.title}</div>
        {props.hint && <div className="text-xs text-[--muted] mt-1">{props.hint}</div>}
      </div>
      {props.children}
    </motion.div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  // True two-column row with clear gutter and vertical rhythm
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">{children}</div>;
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="text-[13px] font-medium text-slate-200 mb-1.5">
        {label} {required && <span className="text-teal-300">*</span>}
      </div>
      {children}
      {hint && <div className="mt-1 text-xs text-[--muted]">{hint}</div>}
    </label>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[.03] px-3.5 text-[15px] outline-none transition " +
  "placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500/30 focus:border-white/20";

/** ---------- Form ---------- */
export default function ContactForm() {
  const [material, setMaterial] = React.useState<Material>("Wastepaper");
  const [grade, setGrade] = React.useState<string>(WASTE_GRADES[0]);
  const [incoterm, setIncoterm] = React.useState<Incoterm>(INCOTERMS[0]);

  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [port, setPort] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const gradeDisabled = material !== "Wastepaper";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErr("Please fill name, email and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          country,
          material,
          grade: gradeDisabled ? "(Specify in message for plastics/metals)" : grade,
          qty,
          incoterm,
          port,
          message,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Failed to send.");
      setSent(true);
      // light reset except name/email (nice UX)
      setMessage("");
      setQty("");
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:gap-6 text-[15px]">
      {/* Tabs removed for simplicity; grouped cards feel calmer */}
      <Card title="Contact" hint="We’ll reply within one business day.">
        <Row>
          <Field label="Name" required>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Company">
            <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" />
          </Field>

          <Field label="Email" required>
            <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Phone">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 …" />
          </Field>

          <Field label="Country">
            <input className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Morocco, Netherlands, …" />
          </Field>
          <div />{/* spacer keeps rhythm on md+ */}
        </Row>
      </Card>

      <Card title="Trade" hint="Tell us what you want to buy or sell.">
        <Row>
          <Field label="Material">
            <select className={inputCls} value={material} onChange={(e) => setMaterial(e.target.value as Material)}>
              {MATERIALS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Grade"
            hint={gradeDisabled ? "For plastics or metals, mention grade/specs in your message." : undefined}
          >
            <select
              className={inputCls + (gradeDisabled ? " opacity-60 cursor-not-allowed" : "")}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              disabled={gradeDisabled}
            >
              {WASTE_GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>

          <Field label="Quantity">
            <input className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g., 10 x 40' HQ" />
          </Field>
          <div />{/* keep grid balance */}
        </Row>
      </Card>

      <Card title="Logistics">
        <Row>
          <Field label="Incoterm">
            <select className={inputCls} value={incoterm} onChange={(e) => setIncoterm(e.target.value as Incoterm)}>
              {INCOTERMS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Port">
            <input className={inputCls} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Casablanca / Tanger-Med" />
          </Field>
        </Row>
      </Card>

      <Card title="Message" hint="Specs, timings, constraints… (required)">
        <Field label="Message" required>
          <textarea
            rows={5}
            className={inputCls + " resize-y"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short description — specs, timings, constraints…"
          />
        </Field>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={loading}
          type="submit"
          className="rounded-xl bg-[--brand] text-black px-5 py-2.5 font-semibold disabled:opacity-60 hover:opacity-90 transition"
        >
          {loading ? "Sending…" : "Send"}
        </button>
        {sent && <div className="text-sm text-teal-300">Thanks — we received your message.</div>}
        {err && <div className="text-sm text-red-400">{err}</div>}
        <div className="ml-auto text-xs text-[--muted]">
          By sending this form you agree that we may contact you about your request.
        </div>
      </div>
    </form>
  );
}
