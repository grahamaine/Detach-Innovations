'use client';

import { useState } from 'react';
import { BRAND, waLink } from '@/lib/brand';
import { PRODUCTS } from '@/lib/products';

const OPTIONS = [...PRODUCTS.map((p) => p.title), 'Steel materials', 'Something else'];

// Saves the request (so it shows in the admin portal and is emailed to the team)
// and opens WhatsApp with the request filled in.
export default function QuoteForm({ initial }: { initial?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? '').trim();
    const lines = [
      `Hello ${BRAND.name}, my name is ${get('name')}.`,
      `Phone: ${get('phone')}`,
      `I need: ${get('type')}`,
      get('size') ? `Size / quantity: ${get('size')}` : '',
      get('location') ? `Location: ${get('location')}` : '',
      get('details') ? `Details: ${get('details')}` : '',
    ].filter(Boolean);
    // Open WhatsApp first, inside the tap, so phones don't block it.
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: get('name'),
        phone: get('phone'),
        email: get('email'),
        item: get('type'),
        size: get('size'),
        location: get('location'),
        details: get('details'),
        website: get('website'),
      }),
      keepalive: true,
    }).catch(() => {});
    setSent(true);
  }

  const field =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Your name
          <input name="name" required autoComplete="name" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Phone
          <input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ ()-]{7,}" title="Enter a phone number" className={`mt-1 ${field}`} />
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Email (optional)
        <input name="email" type="email" autoComplete="email" className={`mt-1 ${field}`} />
      </label>
      {/* Left empty by people; bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="block text-sm font-medium text-slate-700">
        What do you need?
        <select name="type" defaultValue={initial && OPTIONS.includes(initial) ? initial : OPTIONS[0]} className={`mt-1 ${field}`}>
          {OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Size or quantity
          <input name="size" placeholder="e.g. 3 × 6 m, or 20 lengths of box tube" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Delivery location
          <input name="location" placeholder="e.g. Kajjansi" className={`mt-1 ${field}`} />
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Details
        <textarea name="details" rows={4} placeholder="What it's for, when you need it, any drawings you have" className={`mt-1 ${field}`} />
      </label>
      <button
        type="submit"
        className="btn-shine w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide"
      >
        Send on WhatsApp
      </button>
      <p className="text-sm text-slate-500">
        {sent ? 'Request received. WhatsApp opened with your message too — press send there for a faster reply.' : 'We save your request and open WhatsApp with it filled in.'}
      </p>
    </form>
  );
}
