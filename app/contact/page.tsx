"use client";

import { useState } from "react";
import Turnstile from "@marsidev/react-turnstile";

export default function ContactPage() {
  const [name, setName] = useState("");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          token,
          honey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send");
      }
      setOk(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-2 text-gray-600">
        Send us a message and we’ll get back to you shortly.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {/* Honeypot field (hidden from humans) */}
        <input
          type="text"
          name="website"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

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
          <Turnstile
            siteKey={siteKey}
            onSuccess={(t) => setToken(t)}
            options={{ theme: "auto" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 border"
        >
          {loading ? "Sending..." : "Send message"}
        </button>

        {ok && (
          <p className="text-green-700">Thanks! Your message was sent.</p>
        )}
        {ok === false && (
          <p className="text-red-700">Error: {err ?? "please try again"}</p>
        )}

        <p className="mt-4 text-sm text-gray-500">
          Prefer email? Write to <a className="underline" href="mailto:contact@tohiretrading.com">contact@tohiretrading.com</a>.
        </p>
      </form>
    </main>
  );
}
