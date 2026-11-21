import Link from 'next/link';
import type { Metadata } from 'next';
import { BRAND, telLink, waLink } from '@/lib/brand';
import { STEEL_ITEMS } from '@/lib/products';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';

export const metadata: Metadata = {
  title: 'Steel Supply',
  description: 'Steel materials sold from our bulk stock in Entebbe: box and square tube, angle line, flat bar, round pipe, sheets and roofing, cut to length on request.',
};

export default function SteelPage() {
  return (
    <div>
      <header className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/workshop-grinding.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06122a]/95 via-slate-900/75 to-brand-dark/80 animate-gradient" />
        <BlueprintGrid variant="overlay" />
        <div className="relative max-w-4xl mx-auto text-center text-white animate-fade-in-up">
          <span className="text-xs font-semibold text-spark uppercase tracking-widest">Steel Supply</span>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold uppercase drop-shadow-xl">Steel Materials in Bulk</h1>
          <p className="mt-5 text-lg text-slate-100 max-w-2xl mx-auto">
            We buy steel in large quantities for our own fabrication and sell from the same stock to
            builders, welders, workshops and contractors.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 uppercase">What we stock</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Stock and sizes change with each delivery — ask us for what&apos;s in the yard today and current prices.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEEL_ITEMS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="text-xl font-bold text-slate-900 uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.note}</p>
                <a
                  href={waLink(`Hello ${BRAND.name}, what sizes and prices do you have for ${s.title.toLowerCase()}?`)}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex text-sm font-bold text-brand hover:underline uppercase"
                >
                  Ask price →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-16 px-6 text-center text-white">
        <BlueprintGrid />
        <Reveal className="relative max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold uppercase">Buying for a project?</h2>
          <p className="mt-3 text-slate-300">
            Send your list of sizes and quantities and we&apos;ll price the lot. We can also fabricate the frames for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request?item=Steel%20materials" className="btn-shine bg-spark hover:bg-amber-400 text-steel font-bold px-8 py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide">
              Send my steel list
            </Link>
            <a href={telLink(BRAND.phones[0])} className="border border-white/50 bg-white/10 hover:bg-white/20 font-medium px-8 py-3.5 rounded-xl transition uppercase tracking-wide">
              Call {BRAND.phones[0]}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
