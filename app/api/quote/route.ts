import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { BRAND } from '@/lib/brand';

const LIMITS: Record<string, number> = { name: 120, phone: 40, email: 160, item: 120, size: 200, location: 160, details: 3000 };

function clean(v: unknown, max: number) {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, max);
  return s || null;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

// Saves a quote request and, when email is set up, emails the team.
// The form opens WhatsApp as well, so a failure here never loses the request.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // bot trap field: filled in only by bots

  const q = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)]));
  if (!q.name || !q.phone || q.phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Enter your name and a phone number.' }, { status: 422 });
  }

  let saved = false;
  const db = supabase();
  if (db) {
    const { error } = await db.from('quotes').insert(q);
    saved = !error;
    if (error) console.error('quote insert failed', error.message);
  }

  let emailed = false;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_EMAIL;
  if (key && to) {
    const rows = Object.entries(q)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${k}</td><td style="padding:4px 0">${escapeHtml(v!)}</td></tr>`)
      .join('');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || `${BRAND.name} website <onboarding@resend.dev>`,
        to: to.split(',').map((s) => s.trim()),
        reply_to: q.email || undefined,
        subject: `New quote request: ${q.item || 'website'} from ${q.name}`,
        html: `<h2 style="font-family:sans-serif">New quote request</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table><p style="font-family:sans-serif;font-size:13px">Open the admin portal: ${BRAND.siteUrl}/admin</p>`,
      }),
    }).catch(() => null);
    emailed = Boolean(res?.ok);
  }

  return NextResponse.json({ ok: true, saved, emailed });
}
