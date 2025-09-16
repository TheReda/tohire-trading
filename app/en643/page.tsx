// app/en643/page.tsx
import React from "react";

export const metadata = {
  title: "EN643 — Focus Grades • ToHiRe Trading Morocco",
  description: "Overview of focus wastepaper grades (OCC/NCC) aligned with EN643.",
};

export default function EN643Page() {
  return (
    <main className="min-h-screen bg-[--bg] text-[--fg] [--bg:#0b0f14] [--panel:#0f1520] [--muted:#94a3b8]">
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">EN643 — Focus Grades</h1>
          <p className="mt-3 text-[--muted] max-w-2xl">
            We trade mainly **OCC** and **NCC**. Specifications follow EN643. Moisture, non-paper components and other limits are as per the standard unless otherwise agreed in writing.
          </p>
          <div className="mt-6">
            <a className="underline text-teal-300" href="https://www.cepi.org/en643/" target="_blank" rel="noreferrer">
              Official EN643 reference (CEPI)
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[--panel]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-6">
          <GradeCard
            title="OCC 11 (1.05)"
            bullets={[
              "Old Corrugated Containers",
              "Baled, export-ready",
              "Tight bales, consistent weight/ties",
              "Specs aligned with EN643",
            ]}
          />
          <GradeCard
            title="OCC 95/5"
            bullets={[
              "Premium OCC",
              "Stricter non-paper components",
              "Photo documentation on request",
              "Specs aligned with EN643",
            ]}
          />
          <GradeCard
            title="NCC (1.02)"
            bullets={[
              "News & PAMS / Newspapers & Magazines",
              "Source-controlled supply preferred",
              "No prohibitives beyond EN643",
              "Specs aligned with EN643",
            ]}
          />
          <GradeCard
            title="Others (Mixed / SOP)"
            bullets={[
              "Mixed Paper (per EN643)",
              "SOP (1.11) upon availability",
              "Load list & bale tally if needed",
              "Specs aligned with EN643",
            ]}
          />
        </div>
      </section>

      <section className="bg-[--bg]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold">Bale & Logistics Guidelines</h2>
          <ul className="mt-4 grid gap-2 text-slate-300 list-disc pl-5 text-sm">
            <li>Uniform bale size & tie count; stable stacking for container loading.</li>
            <li>Moisture & contamination within EN643 tolerances; QC photos if requested.</li>
            <li>Export-ready documentation; inspections (PSI) when required by the destination.</li>
            <li>Incoterms agreed per shipment (FOB/CFR/CIF/EXW/DAP).</li>
          </ul>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
            <CaseCard
              title="Case — OCC to India"
              text="5000 tons/month OCC (11, 95/5) ex-Africa → India. Regular bookings, on-time docs."
            />
            <CaseCard
              title="Case — NCC to Far East"
              text="Monthly NCC flows to Far East. Source control + graded at origin."
            />
            <CaseCard
              title="Case — Mixed & SOP"
              text="Spot volumes of Mixed and SOP based on mill demand. Specs per EN643."
            />
          </div>

          <div className="mt-10">
            <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-semibold hover:bg-white/5">
              ← Back to homepage
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function GradeCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5 bg-[--bg] shadow-sm">
      <div className="font-semibold">{title}</div>
      <ul className="mt-3 grid gap-1.5 text-slate-300 list-disc pl-5 text-sm">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function CaseCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5 bg-[--panel] shadow-sm">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-[--muted]">{text}</p>
    </div>
  );
}
