import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  token: z.string().min(10),
  // honeypot (should stay empty)
  honey: z.string().optional().default(""),
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]!));
}

export async function POST(req: Request) {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      SMTP_TO,
      TURNSTILE_SECRET_KEY,
    } = process.env;

    // Basic config check
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
    const { name, email, message, token, honey } = parsed.data;

    // Honeypot check
    if (honey && honey.trim() !== "") {
      // Silently accept (pretend success) to waste bot time.
      return NextResponse.json({ ok: true });
    }

    // Verify Turnstile token
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}` +
        `&response=${encodeURIComponent(token)}` +
        (ip ? `&remoteip=${encodeURIComponent(ip)}` : ""),
    });
    const verifyJson: any = await verifyRes.json();
    if (!verifyJson.success) {
      return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 400 });
    }

    // Send email via Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New website contact — ${name}`;
    const text = `From: ${name} <${email}>\n\n${message}`;
    const html =
      `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>` +
      `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, id: (info as any)?.messageId ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
