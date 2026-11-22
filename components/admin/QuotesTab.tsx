'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { btnDanger, btnPrimary, btnQuiet, card, field } from '@/components/admin/ui';

type Quote = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  item: string | null;
  size: string | null;
  location: string | null;
  details: string | null;
  status: string;
  notes: string | null;
};

const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'];
const STATUS_STYLE: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  contacted: 'bg-sky-100 text-sky-800',
  quoted: 'bg-indigo-100 text-indigo-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-slate-200 text-slate-700',
};

export default function QuotesTab() {
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [filter, setFilter] = useState('open');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase()!.from('quotes').select('*').order('created_at', { ascending: false }).limit(500);
    if (error) setError(error.message);
    setQuotes(data ?? []);
  }, []);

  useEffect(() => {
    queueMicrotask(load);
  }, [load]);

  async function update(id: string, patch: Partial<Quote>) {
    const { error } = await supabase()!.from('quotes').update(patch).eq('id', id);
    if (error) return setError(error.message);
    setQuotes((qs) => qs?.map((q) => (q.id === id ? { ...q, ...patch } : q)) ?? null);
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this quote request? This can’t be undone.')) return;
    const { error } = await supabase()!.from('quotes').delete().eq('id', id);
    if (error) return setError(error.message);
    setQuotes((qs) => qs?.filter((q) => q.id !== id) ?? null);
  }

  if (!quotes) return <p className="text-slate-500">Loading quote requests…</p>;
  const shown = quotes.filter((q) => (filter === 'open' ? !['won', 'lost'].includes(q.status) : filter === 'all' || q.status === filter));
  const count = (s: string) => quotes.filter((q) => q.status === s).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {[['open', 'Open'], ['all', 'All'], ...STATUSES.map((s) => [s, s])].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`min-h-[40px] rounded-full px-3.5 text-sm font-semibold capitalize ${filter === v ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
          >
            {label}
            {STATUSES.includes(v) && ` (${count(v)})`}
          </button>
        ))}
        <button className={`${btnQuiet} ml-auto`} onClick={load}>Refresh</button>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {shown.length === 0 && (
        <div className={card}>
          <p className="text-slate-600">No quote requests here yet. New requests from the website appear here.</p>
        </div>
      )}
      {shown.map((q) => (
        <QuoteCard key={q.id} q={q} onUpdate={update} onRemove={remove} />
      ))}
    </div>
  );
}

function QuoteCard({ q, onUpdate, onRemove }: { q: Quote; onUpdate: (id: string, p: Partial<Quote>) => void; onRemove: (id: string) => void }) {
  const [notes, setNotes] = useState(q.notes ?? '');
  const digits = q.phone.replace(/\D/g, '');
  const wa = digits.startsWith('0') ? `256${digits.slice(1)}` : digits;
  const when = new Date(q.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <article className={card}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{q.name}</h3>
          <p className="text-sm text-slate-500">{when} · {q.item || 'General request'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLE[q.status] ?? ''}`}>{q.status}</span>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        {q.size && <Row k="Size / quantity" v={q.size} />}
        {q.location && <Row k="Location" v={q.location} />}
        {q.email && <Row k="Email" v={q.email} />}
        <Row k="Phone" v={q.phone} />
      </dl>
      {q.details && <p className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{q.details}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <a className={btnPrimary} href={`https://wa.me/${wa}`} target="_blank" rel="noopener">WhatsApp</a>
        <a className={btnQuiet} href={`tel:${q.phone}`}>Call</a>
        {q.email && <a className={btnQuiet} href={`mailto:${q.email}`}>Email</a>}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[180px_1fr]">
        <label className="text-sm font-medium text-slate-700">
          Status
          <select className={`mt-1 ${field} capitalize`} value={q.status} onChange={(e) => onUpdate(q.id, { status: e.target.value })}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Notes for the team
          <textarea
            className={`mt-1 ${field}`}
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => notes !== (q.notes ?? '') && onUpdate(q.id, { notes: notes || null })}
            placeholder="Price given, site visit date…"
          />
        </label>
      </div>
      <div className="mt-3 text-right">
        <button className={btnDanger} onClick={() => onRemove(q.id)}>Delete</button>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-slate-500">{k}:</dt>
      <dd className="font-medium text-slate-800">{v}</dd>
    </div>
  );
}
