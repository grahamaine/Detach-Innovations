import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Studio cabins, glass-panel cabins and site offices, container conversions, modular steel furniture and shade lounges, built in Entebbe.',
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase">Our Products</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Every unit is drawn to scale, fabricated in our Entebbe yard and fitted on your site.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 100}>
            <Link
              href={`/products/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photos[0].src} alt={p.photos[0].alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand transition uppercase">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand uppercase">
                  View details <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="text-6xl animate-float">🔩</div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase">Need steel materials?</h2>
          <p className="mt-2 text-slate-600">We sell tube, angle, flat bar, pipe and sheets from our bulk stock.</p>
        </div>
        <Link href="/steel" className="btn-shine shrink-0 bg-steel hover:bg-steel-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide">
          Steel Supply →
        </Link>
      </Reveal>
    </div>
  );
}
