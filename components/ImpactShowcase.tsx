"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = { title: string; subtitle: string; points: string[]; note: string };

const t = { duration: 0.45, ease: "easeOut" } as const;

export default function ImpactShowcase({ title, subtitle, points, note }: Props) {
  const stats = [
    { label: "Tons per year", value: ">20,000" },
    { label: "Regions served", value: "EMEA • Far East • Asia" },
    { label: "Docs on-time", value: "100%" },
    { label: "Logistics", value: "End-to-end handled" },
  ];
  return (
    <section id="impact" className="border-t border-white/5 bg-[--panel]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={t} className="text-2xl sm:text-3xl font-bold">
            {title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.05 }} className="text-[--muted] mt-2">
            {subtitle}
          </motion.p>
          <motion.ul initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.1 }} className="mt-4 grid gap-2 text-sm text-slate-300 list-disc pl-5">
            {points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.15 + i * 0.06 }} className="rounded-xl border border-white/10 p-5 bg-[--bg]">
                <div className="text-2xl font-extrabold text-teal-300">{s.value}</div>
                <div className="text-sm text-slate-300">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.28 }} className="mt-3 text-xs text-[--muted]">
            {note}
          </motion.div>
        </div>
        <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b from-[#081018] to-[#0b0f14]">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(1200px 400px at 20% 20%, rgba(20,184,166,.25), transparent), radial-gradient(800px 300px at 80% 60%, rgba(14,165,233,.2), transparent)" }} />
          <div className="relative h-[360px]">
            <div className="wave wave1" />
            <div className="wave wave2" />
            <div className="wave wave3" />
            <div className="absolute inset-x-0 top-16 flex items-center justify-between px-6 text-xs text-slate-400">
              <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-1">Export lanes</div>
              <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-1">Casablanca • Tanger-Med</div>
            </div>
            <motion.div className="ship-track" initial={{ x: "-120%" }} animate={{ x: "120%" }} transition={{ duration: 24, ease: "linear", repeat: Infinity }}>
              <div className="ship">
                <svg viewBox="0 0 220 60" width="220" height="60" className="drop-shadow-[0_6px_10px_rgba(0,0,0,.4)]">
                  <g>
                    <rect x="0" y="30" width="200" height="18" rx="4" fill="#0ea5e9" />
                    <rect x="10" y="18" width="32" height="12" fill="#334155" />
                    <rect x="46" y="18" width="32" height="12" fill="#1f2937" />
                    <rect x="82" y="18" width="32" height="12" fill="#0f172a" />
                    <rect x="118" y="18" width="32" height="12" fill="#14b8a6" />
                    <rect x="154" y="18" width="32" height="12" fill="#0369a1" />
                    <rect x="190" y="24" width="18" height="6" fill="#94a3b8" />
                    <rect x="196" y="14" width="6" height="10" fill="#94a3b8" />
                    <circle cx="8" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="20" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="32" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="44" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="56" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="68" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="80" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="92" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="104" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="116" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="128" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="140" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="152" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="164" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="176" cy="38" r="2" fill="#0b0f14" />
                    <circle cx="188" cy="38" r="2" fill="#0b0f14" />
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wave{position:absolute;left:-20%;right:-20%;height:120px;border-radius:9999px;filter:blur(8px)}
        .wave1{bottom:16px;background:linear-gradient(180deg,rgba(20,184,166,.35),rgba(14,165,233,.25));animation:drift1 22s linear infinite}
        .wave2{bottom:6px;background:linear-gradient(180deg,rgba(14,165,233,.35),rgba(2,132,199,.2));opacity:.9;animation:drift2 28s linear infinite}
        .wave3{bottom:-10px;background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.9));height:140px;opacity:.9;animation:drift3 36s linear infinite}
        .ship-track{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden}
        @keyframes drift1{0%{transform:translateX(0)}100%{transform:translateX(-30%)}}
        @keyframes drift2{0%{transform:translateX(0)}100%{transform:translateX(25%)}}
        @keyframes drift3{0%{transform:translateX(0)}100%{transform:translateX(-15%)}}
      `}</style>
    </section>
  );
}
