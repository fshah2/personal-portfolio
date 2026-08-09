import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Contact form handler. Sends the submitted message as an email via Resend's
// REST API (no SDK dependency needed). Configure with environment variables:
//   RESEND_API_KEY    - required; your Resend API key
//   CONTACT_TO_EMAIL  - where messages are delivered (defaults below)
//   CONTACT_FROM_EMAIL- verified sender; falls back to Resend's onboarding
//                       address, which can only deliver to the account owner.
export async function POST(request: Request) {
  let payload: {
    contactName?: string;
    contactEmail?: string;
    contactMessage?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const contactName = payload.contactName?.trim();
  const contactEmail = payload.contactEmail?.trim();
  const contactMessage = payload.contactMessage?.trim();

  if (!contactName || !contactEmail || !contactMessage) {
    return NextResponse.json(
      { error: 'Please fill in your name, email, and message.' },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(contactEmail)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set.');
    return NextResponse.json(
      { error: 'The contact form is not configured yet.' },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || 'fdshah10@gmail.com';
  const from =
    process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: contactEmail,
        subject: `New portfolio message from ${contactName}`,
        text: `Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Contact form: Resend responded with', res.status, detail);
      return NextResponse.json(
        { error: 'Could not send your message right now. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form: unexpected error', error);
    return NextResponse.json(
      { error: 'Could not send your message right now. Please try again.' },
      { status: 502 },
    );
  }
}
