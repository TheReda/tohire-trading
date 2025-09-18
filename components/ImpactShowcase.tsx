"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = { title: string; subtitle: string; points: string[]; note: string };

const t = { duration: 0.45, ease: "easeOut" } as const;

export default function ImpactShowcase({ title, subtitle, points, note }: Props) {
  const stats = [
    { label: "Tons per year", value: ">20,000" },
    { label: "Regions served", value: "Europe • Africa • Asia" },
    { label: "Docs on-time", value: "100%" },
    { label: "Logistics", value: "End-to-end handled" },
  ];

  return (
    <section id="impact" className="border-t border-white/5 bg-[--panel]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
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
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.12 + i * 0.06 }} className="rounded-xl border border-white/10 p-5 bg-[--bg]">
                <div className="text-2xl font-extrabold text-teal-300">{s.value}</div>
                <div className="text-sm text-slate-300">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...t, delay: 0.2 }} className="mt-12 relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b from-[#081018] to-[#0b0f14]">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(1200px 400px at 20% 20%, rgba(20,184,166,.25), transparent), radial-gradient(800px 300px at 80% 60%, rgba(14,165,233,.2), transparent)" }} />
          <div className="relative h-[140px] md:h-[160px]">
            <div className="wave wave1" />
            <div className="wave wave2" />
            <div className="wave wave3" />
            <motion.div className="ship-track" initial={{ x: "-60vw" }} animate={{ x: "60vw" }} transition={{ duration: 9, ease: "linear", repeat: Infinity }}>
              <motion.div animate={{ y: [0, -2, 0], rotate: [0, -0.4, 0] }} transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}>
                <svg viewBox="0 0 320 90" width="300" height="84" className="drop-shadow-[0_6px_12px_rgba(0,0,0,.45)]">
                  <defs>
                    <linearGradient id="hull" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="deck" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#111827" />
                      <stop offset="100%" stopColor="#0b1220" />
                    </linearGradient>
                    <filter id="blurSmall" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" />
                    </filter>
                  </defs>

                  <g transform="translate(8,16)">
                    <path d="M0,44 L210,44 C230,44 255,32 268,28 L300,28 L300,40 C300,46 296,52 288,52 L24,52 C13,52 5,49 0,44 Z" fill="url(#hull)" />
                    <rect x="18" y="22" width="220" height="12" rx="2" fill="url(#deck)" />
                    <g>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <rect key={i} x={22 + i * 24} y={10} width="20" height="12" fill={["#334155", "#0f172a", "#1f2937", "#14b8a6", "#0ea5e9"][i % 5]} />
                      ))}
                    </g>
                    <g>
                      <rect x="254" y="6" width="28" height="18" rx="2" fill="#94a3b8" />
                      <rect x="264" y="0" width="6" height="10" fill="#94a3b8" />
                      <circle cx="268" cy="0" r="2" fill="#94a3b8" />
                    </g>
                    <g filter="url(#blurSmall)">
                      <path d="M300,40 c10,0 14,4 14,6 s-6,6 -18,6 h-78" stroke="rgba(20,184,166,.55)" strokeWidth="3" fill="none" strokeLinecap="round" className="wake-line" />
                      <path d="M6,54 c18,0 26,6 42,6 h46" stroke="rgba(14,165,233,.35)" strokeWidth="3" fill="none" strokeLinecap="round" className="wake-line delay" />
                    </g>
                    <g className="smoke">
                      <circle cx="267" cy="0" r="2.2" fill="rgba(148,163,184,.55)" />
                      <circle cx="267" cy="-5" r="2.8" fill="rgba(148,163,184,.45)" />
                      <circle cx="267" cy="-10" r="3.2" fill="rgba(148,163,184,.35)" />
                    </g>
                    <g fill="#0b0f14">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <circle key={i} cx={14 + i * 14} cy="48" r="2" />
                      ))}
                    </g>
                  </g>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...t, delay: 0.25 }} className="mt-3 text-xs text-[--muted]">
          {note}
        </motion.div>
      </div>

      <style jsx>{`
        .wave{position:absolute;left:-20%;right:-20%;height:120px;border-radius:9999px;filter:blur(8px)}
        .wave1{bottom:16px;background:linear-gradient(180deg,rgba(20,184,166,.35),rgba(14,165,233,.25));animation:drift1 22s linear infinite}
        .wave2{bottom:6px;background:linear-gradient(180deg,rgba(14,165,233,.35),rgba(2,132,199,.2));opacity:.9;animation:drift2 28s linear infinite}
        .wave3{bottom:-10px;background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.9));height:140px;opacity:.9;animation:drift3 36s linear infinite}
        .ship-track{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden}
        .wake-line{stroke-dasharray:8 12;animation:wake 2.4s linear infinite}
        .wake-line.delay{animation-delay:.9s}
        .smoke circle{animation:smoke 2.2s ease-out infinite}
        @keyframes wake{to{stroke-dashoffset:-120}}
        @keyframes smoke{0%{transform:translateY(0) scale(1);opacity:.6}100%{transform:translateY(-18px) scale(1.6);opacity:0}}
        @keyframes drift1{0%{transform:translateX(0)}100%{transform:translateX(-30%)}}
        @keyframes drift2{0%{transform:translateX(0)}100%{transform:translateX(25%)}}
        @keyframes drift3{0%{transform:translateX(0)}100%{transform:translateX(-15%)}}
      `}</style>
    </section>
  );
}
