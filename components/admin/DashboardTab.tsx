'use client';

import { useEffect, useState } from 'react';
import {
  Inbox,
  Clock,
  Trophy,
  Images,
  ArrowRight,
  Upload,
  ExternalLink,
  Package,
  MessageCircle,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PRODUCTS } from '@/lib/products';
import { PROJECTS } from '@/lib/projects';
import { BRAND, waLink } from '@/lib/brand';
import { card } from '@/components/admin/ui';
import type { AdminTab } from '@/components/admin/AdminApp';

type Q = { id: string; created_at: string; name: string; item: string | null; status: string };
type P = { id: string; title: string; image_url: string };

const STATUS_STYLE: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  contacted: 'bg-sky-100 text-sky-800',
  quoted: 'bg-indigo-100 text-indigo-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-slate-200 text-slate-700',
};

function timeAgo(iso: string) {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 60) return `${Math.max(m, 1)} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}

export default function DashboardTab({ go }: { go: (t: AdminTab) => void }) {
  const [quotes, setQuotes] = useState<Q[] | null>(null);
  const [photos, setPhotos] = useState<P[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [priced, setPriced] = useState(0);

  useEffect(() => {
    const db = supabase()!;
    db.from('quotes').select('id, created_at, name, item, status').order('created_at', { ascending: false }).limit(500)
      .then(({ data }) => setQuotes(data ?? []));
    db.from('projects').select('id, title, image_url', { count: 'exact' }).eq('published', true).order('created_at', { ascending: false }).limit(3)
      .then(({ data, count }) => {
        setPhotos(data ?? []);
        setPhotoCount(count ?? 0);
      });
    db.from('product_overrides').select('slug', { count: 'exact', head: true }).not('price_note', 'is', null)
      .then(({ count }) => setPriced(count ?? 0));
  }, []);

  const q = quotes ?? [];
  const count = (s: string) => q.filter((x) => x.status === s).length;
  const open = q.filter((x) => !['won', 'lost'].includes(x.status)).length;

  // requests per day, last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const perDay = days.map((d) => {
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    return q.filter((x) => {
      const t = new Date(x.created_at);
      return t >= d && t < next;
    }).length;
  });
  const max = Math.max(1, ...perDay);
  const week = perDay.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Inbox} label="New requests" value={quotes ? count('new') : '–'} tone="amber" onClick={() => go('Quotes')} />
        <Stat icon={Clock} label="Open requests" value={quotes ? open : '–'} tone="sky" onClick={() => go('Quotes')} />
        <Stat icon={Trophy} label="Jobs won" value={quotes ? count('won') : '–'} tone="emerald" onClick={() => go('Quotes')} />
        <Stat icon={Images} label="Photos on site" value={PROJECTS.length + photoCount} tone="brand" onClick={() => go('Projects')} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Widget icon={Inbox} title="Latest requests" action={{ label: 'All requests', onClick: () => go('Quotes') }}>
          {!quotes && <p className="p-4 text-slate-500">Loading…</p>}
          {quotes?.length === 0 && (
            <p className="p-4 text-slate-600">No requests yet. They appear here as soon as someone sends the quote form.</p>
          )}
          <ul>
            {q.slice(0, 5).map((x, i) => (
              <li key={x.id}>
                <button
                  onClick={() => go('Quotes')}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 ${i ? 'border-t border-slate-100' : ''}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-sm font-bold text-brand">
                    {x.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-slate-900">{x.name}</span>
                    <span className="block truncate text-sm text-slate-500">{x.item || 'General request'} · {timeAgo(x.created_at)}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${STATUS_STYLE[x.status] ?? ''}`}>{x.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget icon={FileText} title="Requests this week">
          <div className="p-4">
            <p className="text-3xl font-bold text-slate-900">{quotes ? week : '–'}</p>
            <p className="text-sm text-slate-500">in the last 7 days</p>
            <div className="mt-4 flex h-28 items-end gap-2" role="img" aria-label={`Requests per day: ${perDay.join(', ')}`}>
              {perDay.map((n, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">{n || ''}</span>
                  <div className="w-full rounded-t bg-brand/85" style={{ height: `${Math.max(4, (n / max) * 80)}px`, opacity: n ? 1 : 0.25 }} />
                  <span className="text-[11px] text-slate-500">{days[i].toLocaleDateString('en-GB', { weekday: 'narrow' })}</span>
                </div>
              ))}
            </div>
          </div>
        </Widget>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Widget icon={Images} title="Latest photos" action={{ label: 'Manage', onClick: () => go('Projects') }}>
          <div className="p-4">
            {photos.length ? (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} src={p.image_url} alt={p.title} className="aspect-square w-full rounded-lg object-cover" />
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No uploaded photos yet.</p>
            )}
            <button onClick={() => go('Projects')} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand">
              <Upload size={18} aria-hidden="true" /> Add a photo
            </button>
          </div>
        </Widget>

        <Widget icon={Package} title="Products" action={{ label: 'Edit', onClick: () => go('Products') }}>
          <div className="p-4">
            <p className="text-3xl font-bold text-slate-900">
              {priced} <span className="text-base font-medium text-slate-500">of {PRODUCTS.length} priced</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brand" style={{ width: `${(priced / PRODUCTS.length) * 100}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-600">Showing a starting price helps customers decide before they ask.</p>
          </div>
        </Widget>

        <Widget icon={ExternalLink} title="Quick links">
          <ul className="p-2">
            <QuickLink href="/" icon={ExternalLink} label="Open the website" />
            <QuickLink href="/projects" icon={Images} label="Projects page" />
            <QuickLink href="/request" icon={FileText} label="Quote form" />
            <QuickLink href={waLink(`Hello ${BRAND.name}`)} icon={MessageCircle} label="Business WhatsApp" />
          </ul>
        </Widget>
      </div>
    </div>
  );
}

const TONES: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-700',
  sky: 'bg-sky-100 text-sky-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  brand: 'bg-brand-light text-brand',
};

function Stat({ icon: Icon, label, value, tone, onClick }: { icon: LucideIcon; label: string; value: number | string; tone: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`${card} flex flex-col items-start gap-3 text-left transition hover:border-brand`}>
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${TONES[tone]}`}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-3xl font-bold text-slate-900">{value}</span>
        <span className="block text-sm text-slate-500">{label}</span>
      </span>
    </button>
  );
}

function Widget({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: LucideIcon;
  title: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <Icon size={18} className="text-brand" aria-hidden="true" />
        <h2 className="flex-1 text-sm font-bold uppercase tracking-wide text-slate-800">{title}</h2>
        {action && (
          <button onClick={action.onClick} className="inline-flex min-h-[36px] items-center gap-1 text-sm font-semibold text-brand">
            {action.label} <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </header>
      {children}
    </section>
  );
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  const external = href.startsWith('http');
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 text-slate-700 hover:bg-slate-50 hover:text-brand"
      >
        <Icon size={18} aria-hidden="true" /> {label}
      </a>
    </li>
  );
}
