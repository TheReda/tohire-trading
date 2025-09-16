// app/api/mail/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_TO = process.env.EMAIL_TO ?? "reda.elhattab@outlook.com";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev"; // or your verified sender

export async function POST(req: Request) {
  try {
    const { kind, form } = (await req.json()) as {
      kind: "buy" | "sell";
      form: {
        name: string;
        company?: string;
        email: string;
        phone?: string;
        country?: string;
        material: string;
        grade: string;
        qty?: string;
        incoterm?: string;
        port?: string;
        message?: string;
      };
    };

    const subject = `${kind === "sell" ? "Offer to SELL" : "Request to BUY"} — ${form.material} ${form.grade}`;

    const lines = [
      `Name: ${form.name}`,
      `Company: ${form.company || "-"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "-"}`,
      `Country: ${form.country || "-"}`,
      `Material: ${form.material}`,
      `Grade: ${form.grade}`,
      `Quantity: ${form.qty || "-"}`,
      `Incoterm: ${form.incoterm || "-"}`,
      `Port: ${form.port || "-"}`,
      `Message:`,
      `${form.message || "-"}`,
    ];
    const text = lines.join("\n");
    const html = lines.map((l) => l.replace(/^(.+?): /, "<b>$1:</b> ")).join("<br/>");

    const { error } = await resend.emails.send({
      from: `ToHiRe Website <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: form.email, // ← fixed here
      subject,
      text,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
