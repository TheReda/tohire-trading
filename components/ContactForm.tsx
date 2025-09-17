"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
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
      const body = {
        name,
        email,
        // prepend company to the message for the email body
        message: (company ? `Company: ${company}\n\n` : "") + message,
        token,
        honey,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send");
      }
      setOk(true);
      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
      setToken(null);
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      {/* Honeypot field (hidden for bots) */}
      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          className="mt-1 w-full rounded-lg border px-3 py-2 min-h-[140px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
        />
      </div>

      <div className="mt-2">
        <Turnstile siteKey={siteKey} onSuccess={(t) => setToken(t)} options={{ theme: "auto" }} />
      </div>

      <button
        type="submit"
        disabled={loading || !token}
        className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 border"
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {ok && <p className="text-green-700">Thanks! Your message was sent.</p>}
      {ok === false && <p className="text-red-700">Error: {err ?? "please try again"}</p>}
    </form>
  );
}
