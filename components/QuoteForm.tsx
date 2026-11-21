'use client';

import { useState } from 'react';
import { BRAND, waLink } from '@/lib/brand';
import { PRODUCTS } from '@/lib/products';

const OPTIONS = [...PRODUCTS.map((p) => p.title), 'Steel materials', 'Something else'];

// Builds a WhatsApp message from the form and opens WhatsApp. No server needed.
export default function QuoteForm({ initial }: { initial?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      `Hello ${BRAND.name}, my name is ${d.get('name')}.`,
      d.get('phone') ? `Phone: ${d.get('phone')}` : '',
      `I need: ${d.get('type')}`,
      d.get('size') ? `Size / quantity: ${d.get('size')}` : '',
      d.get('location') ? `Location: ${d.get('location')}` : '',
      d.get('details') ? `Details: ${d.get('details')}` : '',
    ].filter(Boolean);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
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
          Phone (optional)
          <input name="phone" type="tel" autoComplete="tel" className={`mt-1 ${field}`} />
        </label>
      </div>
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
        {sent ? 'WhatsApp opened with your message — press send there to reach us.' : 'Opens WhatsApp with your request filled in.'}
      </p>
    </form>
  );
}
