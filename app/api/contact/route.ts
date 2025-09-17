import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  country: z.string().optional().default(""),
  material: z.string().optional().default(""),
  grade: z.string().optional().default(""),
  qty: z.string().optional().default(""),
  incoterm: z.string().optional().default(""),
  port: z.string().optional().default(""),
  message: z.string().min(1),
});

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!));
}

function renderHtml(title: string, body: string) {
  return `<!doctype html><html><head><meta charset="utf-8"/></head><body style="font-family:Inter,Arial,system-ui,sans-serif;background:#0b0f14;color:#e5eef9;padding:24px">
  <div style="max-width:720px;margin:0 auto;background:#0f1520;border:1px solid rgba(255,255,255,.08);border-radius:16px">
    <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600">${htmlEscape(title)}</div>
    <div style="padding:20px;font-size:14px;line-height:1.6">${body}</div>
  </div>
</body></html>`;
}

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    const tr = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_PORT) === "465",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const toAddr = process.env.MAIL_TO || "contact@tohiretrading.com";
    const fromAddr = process.env.MAIL_FROM || "ToHiRe TRADING MOROCCO <contact@tohiretrading.com>";

    const subject = `[Contact] ${data.name} • ${data.material || "General"}${data.qty ? " ("+data.qty+")" : ""}`;

    const lines = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Country: ${data.country}`,
      `Material: ${data.material}`,
      `Grade: ${data.grade}`,
      `Quantity: ${data.qty}`,
      `Incoterm: ${data.incoterm}`,
      `Port: ${data.port}`,
      `Message: ${data.message}`,
    ].join("\n");

    await tr.sendMail({
      from: fromAddr,
      to: toAddr,
      replyTo: data.email,
      subject,
      text: lines,
      html: renderHtml("New website contact", lines.replace(/\n/g, "<br/>")),
    });

    const autoText = [
      `Hello ${data.name},`,
      ``,
      `We received your message and will reply within one business day.`,
      ``,
      `Summary:`,
      `Material: ${data.material}`,
      `Grade: ${data.grade}`,
      `Quantity: ${data.qty}`,
      `Incoterm: ${data.incoterm}`,
      `Port: ${data.port}`,
      ``,
      `Your message:`,
      data.message,
      ``,
      `— ToHiRe Trading Morocco`,
      `contact@tohiretrading.com`,
    ].join("\n");

    await tr.sendMail({
      from: fromAddr,
      to: data.email,
      subject: "We received your message — ToHiRe Trading Morocco",
      text: autoText,
      html: renderHtml("We received your message", autoText.replace(/\n/g, "<br/>")),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 400 });
  }
}
