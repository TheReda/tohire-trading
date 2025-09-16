import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// very light validation to keep it simple & robust
function required(v?: string) {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const { kind, form } = (await req.json()) as {
      kind: "buy" | "sell";
      form: {
        name: string;
        company: string;
        email: string;
        phone: string;
        country: string;
        material: string;
        grade: string;
        qty: string;
        incoterm: string;
        port: string;
        message: string;
      };
    };

    // minimal checks
    if (kind !== "buy" && kind !== "sell") {
      return NextResponse.json({ ok: false, error: "Invalid kind." }, { status: 400 });
    }
    const must = ["name", "email", "material", "grade"] as const;
    for (const k of must) {
      if (!required((form as any)[k])) {
        return NextResponse.json({ ok: false, error: `Missing field: ${k}` }, { status: 400 });
      }
    }

    const to = process.env.MAIL_TO!;
    const from = process.env.MAIL_FROM!;
    if (!to || !from) {
      return NextResponse.json(
        { ok: false, error: "Missing MAIL_TO or MAIL_FROM env vars." },
        { status: 500 }
      );
    }

    const subject = `${kind === "sell" ? "Offer to SELL" : "Request to BUY"} — ${form.material} ${form.grade}`;
    const text = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Country: ${form.country}`,
      `Material: ${form.material}`,
      `Grade: ${form.grade}`,
      `Quantity: ${form.qty}`,
      `Incoterm: ${form.incoterm}`,
      `Port: ${form.port}`,
      `Message:`,
      `${form.message || "-"}`,
    ].join("\n");

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial,sans-serif;line-height:1.4;">
        <h2 style="margin:0 0 12px">${subject}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          ${[
            ["Name", form.name],
            ["Company", form.company || "-"],
            ["Email", form.email],
            ["Phone", form.phone || "-"],
            ["Country", form.country || "-"],
            ["Material", form.material],
            ["Grade", form.grade],
            ["Quantity", form.qty || "-"],
            ["Incoterm", form.incoterm || "-"],
            ["Port", form.port || "-"],
          ]
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 8px;color:#64748b">${k}</td><td style="padding:6px 8px;color:#e2e8f0;background:#0f1520;border-radius:8px">${String(
                  v
                )}</td></tr>`
            )
            .join("")}
        </table>
        <div style="margin-top:12px;color:#94a3b8">Message:</div>
        <pre style="margin:6px 0 0;padding:10px;background:#0f1520;border-radius:8px;color:#e2e8f0;white-space:pre-wrap">${(form.message || "-")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      reply_to: form.email, // allows you to reply directly to the sender
    });

    if (error) {
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
