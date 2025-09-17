import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),

  // NEW “mini-CRM” fields (all optional)
  intent: z.enum(["buy","sell","general"]).optional().default("general"),
  company: z.string().max(200).optional().default(""),
  phone: z.string().max(100).optional().default(""),
  country: z.string().max(120).optional().default(""),
  material: z.string().max(120).optional().default(""),
  grade: z.string().max(240).optional().default(""),
  qty: z.string().max(120).optional().default(""),
  incoterm: z.string().max(20).optional().default(""),
  port: z.string().max(160).optional().default(""),

  // Turnstile + honeypot
  token: z.string().min(10),
  honey: z.string().optional().default(""),
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]!));
}

export async function POST(req: Request) {
  try {
    const {
      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO,
      TURNSTILE_SECRET_KEY,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SMTP_TO) {
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 503 });
    }
    if (!TURNSTILE_SECRET_KEY) {
      return NextResponse.json({ ok: false, error: "Captcha not configured" }, { status: 503 });
    }

    const json = await req.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const data = parsed.data;

    // Honeypot
    if (data.honey && data.honey.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Turnstile verify
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}` +
        `&response=${encodeURIComponent(data.token)}` +
        (ip ? `&remoteip=${encodeURIComponent(ip)}` : ""),
    });
    const verifyJson: any = await verifyRes.json();
    if (!verifyJson.success) {
      return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 400 });
    }

    // SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject =
      (data.intent === "buy" ? "BUY request" : data.intent === "sell" ? "SELL offer" : "Contact") +
      ` — ${data.name}`;

    // Build HTML with the new fields
    const fields: [string, string][] = [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company || "-"],
      ["Phone", data.phone || "-"],
      ["Country", data.country || "-"],
      ["Intent", data.intent],
      ["Material", data.material || "-"],
      ["Grade", data.grade || "-"],
      ["Quantity", data.qty || "-"],
      ["Incoterm", data.incoterm || "-"],
      ["Port", data.port || "-"],
    ];

    const html =
      `<h2>New website contact</h2>` +
      `<table style="border-collapse:collapse">` +
      fields.map(([k,v]) =>
        `<tr><td style="padding:4px 8px;color:#64748b">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 8px"><strong>${escapeHtml(v)}</strong></td></tr>`
      ).join("") +
      `</table>` +
      `<p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

    const text =
      `New website contact\n\n` +
      fields.map(([k,v]) => `${k}: ${v}`).join("\n") +
      `\n\nMessage:\n${data.message}`;

    // Send to you
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject,
      text,
      html,
      replyTo: data.email,
    });

    // Auto-reply (best-effort; ignore failures)
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: data.email,
        subject: "Thanks — we received your message (ToHiRe Trading Morocco)",
        text:
`Hi ${data.name},

Thanks for contacting ToHiRe Trading Morocco. We received your message and will get back to you shortly.

Copy of your message:
${data.message}

— ToHiRe Trading Morocco
contact@tohiretrading.com
https://tohiretrading.com`,
        html:
`<p>Hi ${escapeHtml(data.name)},</p>
<p>Thanks for contacting <strong>ToHiRe Trading Morocco</strong>. We received your message and will get back to you shortly.</p>
<p><em>Copy of your message:</em></p>
<blockquote style="border-left:3px solid #e5e7eb;padding-left:12px;color:#334155">${escapeHtml(data.message).replace(/\n/g,"<br>")}</blockquote>
<p>— ToHiRe Trading Morocco<br>
<a href="mailto:contact@tohiretrading.com">contact@tohiretrading.com</a><br>
<a href="https://tohiretrading.com">tohiretrading.com</a></p>`,
        replyTo: SMTP_TO,
      });
    } catch {}

    return NextResponse.json({ ok: true, id: (info as any)?.messageId ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
