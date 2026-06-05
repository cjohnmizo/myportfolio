import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/lib/env";
import { contactFormSchema } from "@/validators/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const contactRequestSchema = contactFormSchema.extend({
  website: z.string().max(200).optional(),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRecipient() {
  return env.CONTACT_TO_EMAIL ?? env.ADMIN_EMAIL;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid contact form payload." },
      { status: 400 },
    );
  }

  const parsed = contactRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the form fields and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const recipient = getRecipient();

  if (!env.RESEND_API_KEY || !recipient) {
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0a1931;">
      <h2 style="margin: 0 0 16px;">Portfolio enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border: 0; border-top: 1px solid #b3cfe5; margin: 20px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  let response: Response;

  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio enquiry: ${subject}`,
        text,
        html,
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed", error);

    return NextResponse.json(
      { error: "Unable to send the message right now." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      "Contact email delivery failed",
      response.status,
      errorBody.slice(0, 500),
    );

    return NextResponse.json(
      { error: "Unable to send the message right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
