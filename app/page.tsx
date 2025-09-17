"use client";

import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactDock from "../components/ContactDock";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXX";

export default function Home() {
  const [consent, setConsent] = useState<"unknown" | "accepted" | "declined">("unknown");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cookieConsent") : null;
    if (saved === "accepted" || saved === "declined") setConsent(saved as any);
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
    <div className="min-h-screen bg-[--bg] text-[--fg] [--bg:#0b0f14] [--panel:#0f1520] [--muted:#94a3b8] [--brand:#14b8a6]">
      {/* Simple header */}
      <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur bg-[--bg]/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold tracking-wide">TOHIRE TRADING MOROCCO</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#contact" className="hover:text-[--brand] transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute -inset-x-20 -top-24 h-80 bg-[conic-gradient(at_30%_20%,theme(colors.teal.500),theme(colors.sky.500),theme(colors.lime.400),transparent)] blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">Turning Waste into Worth</h1>
            <p className="mt-4 text-[--muted] text-base sm:text-lg max-w-xl">
              Wastepaper as a core focus — plastics & metals on request. We connect reliable generators with qualified
              buyers and manage the logistics in between.
            </p>
            <div className="mt-6">
              <a href="#contact" className="inline-flex rounded-xl bg-[--brand] text-black px-5 py-3 font-semibold shadow hover:opacity-90">
                Contact us
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[--panel] p-6 shadow-sm">
            {/* Mini contact card */}
            <div className="text-sm font-semibold text-slate-300">Quick contact</div>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Email:</span>
                <a className="hover:underline" href="mailto:contact@tohiretrading.com">contact@tohiretrading.com</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Phone:</span>
                <a className="hover:underline" href="tel:+31621939420">+31 6 21 93 94 20</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/5 bg-[--panel]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
          <p className="text-[--muted] mt-2">Tell us about the material you want to buy or sell.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[--bg]">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-[--muted]">
          © {new Date().getFullYear()} ToHiRe Trading Morocco — All rights reserved.
        </div>
      </footer>

      {/* Floating quick actions */}
      <ContactDock />

      {/* Cookie consent */}
      {consent === "unknown" && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-50">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[--panel] p-4 shadow-lg">
            <div className="text-sm text-slate-200 font-semibold">We use cookies</div>
            <p className="text-xs text-[--muted] mt-1">We use cookies for basic site functionality and analytics (if you accept).</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { localStorage.setItem("cookieConsent", "accepted"); setConsent("accepted"); }}
                className="rounded-lg bg-[--brand] text-black px-4 py-2 text-sm font-semibold"
              >
                Accept
              </button>
              <button
                onClick={() => { localStorage.setItem("cookieConsent", "declined"); setConsent("declined"); }}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
