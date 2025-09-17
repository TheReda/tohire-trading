import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // Expect: { to, subject, html?, text?, from? }
    const body = await req.json().catch(() => ({} as any));
    const {
      to,
      subject,
      html,
      text,
      from = "no-reply@tohiretrading.com",
    } = body || ({} as any);

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result: any = await resend.emails.send({
      to,
      subject,
      html,
      text,
      from,
    });

    return NextResponse.json({ ok: true, id: result?.id ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
