'use client';

import { useEffect, useState } from 'react';
import { Save, Check, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductIcon from '@/components/ProductIcon';
import { PRODUCTS, type Product } from '@/lib/products';
import { btnPrimary, card, field } from '@/components/admin/ui';

type Edit = { slug: string; price_note: string | null; summary: string | null; hidden: boolean };

export default function ProductsTab() {
  const [edits, setEdits] = useState<Record<string, Edit> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase()!
      .from('product_overrides')
      .select('slug, price_note, summary, hidden')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setEdits(Object.fromEntries((data ?? []).map((r) => [r.slug, r])));
      });
  }, []);

  if (!edits) return <p className="text-slate-500">Loading products…</p>;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Add a price, change a product&apos;s short description, or hide it from the website. Changes show on the site within a minute.
      </p>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {PRODUCTS.map((p) => (
        <ProductCard key={p.slug} p={p} edit={edits[p.slug]} />
      ))}
    </div>
  );
}

function ProductCard({ p, edit }: { p: Product; edit?: Edit }) {
  const [price, setPrice] = useState(edit?.price_note ?? '');
  const [summary, setSummary] = useState(edit?.summary ?? p.summary);
  const [hidden, setHidden] = useState(edit?.hidden ?? false);
  const [state, setState] = useState<'' | 'saving' | 'saved' | 'error'>('');

  async function save() {
    setState('saving');
    const { error } = await supabase()!.from('product_overrides').upsert({
      slug: p.slug,
      price_note: price.trim() || null,
      summary: summary.trim() && summary.trim() !== p.summary ? summary.trim() : null,
      hidden,
      updated_at: new Date().toISOString(),
    });
    setState(error ? 'error' : 'saved');
  }

  return (
    <div className={`${card} flex flex-col gap-4 sm:flex-row`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.photos[0].src} alt="" className="h-28 w-full rounded-lg object-cover sm:w-36" />
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-bold uppercase text-slate-900"><ProductIcon slug={p.slug} size={18} className="text-brand" />{p.title}{hidden && <EyeOff size={16} className="text-slate-400" aria-label="Hidden" />}</h3>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="h-5 w-5" />
            Hide from website
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-700">
          Price shown on the site
          <input value={price} onChange={(e) => setPrice(e.target.value)} maxLength={80} placeholder="From UGX 8,500,000" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Short description
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} maxLength={600} className={`mt-1 ${field}`} />
        </label>
        <div className="flex items-center gap-3">
          <button className={btnPrimary} onClick={save} disabled={state === 'saving'}>
            <Save size={18} aria-hidden="true" /> {state === 'saving' ? 'Saving…' : 'Save'}
          </button>
          {state === 'saved' && <span className="inline-flex items-center gap-1 text-sm text-emerald-700"><Check size={16} aria-hidden="true" /> Saved</span>}
          {state === 'error' && <span className="text-sm text-red-700">Couldn&apos;t save. Try again.</span>}
        </div>
      </div>
    </div>
  );
}
