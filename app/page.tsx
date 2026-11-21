import Link from 'next/link';
import BuildImg from '@/components/BuildImg';
import { BRAND, waLink } from '@/lib/brand';
import { PRODUCTS, STEEL_ITEMS, STEPS } from '@/lib/products';
import GallerySlideshow from '@/components/GallerySlideshow';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';

export default function Home() {
  return (
    <div className="bg-white text-slate-800">
      {/* HERO with photo background */}
      <header className="relative px-6 py-28 md:py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 hero-build"
          style={{ backgroundImage: "url('/images/studio-red-deck.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06122a]/90 via-slate-900/70 to-brand-dark/80 animate-gradient" />
        <BlueprintGrid variant="overlay" />
        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase max-w-4xl drop-shadow-xl">
            {BRAND.fullName}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed drop-shadow">
            Studio cabins, site offices, container conversions and steel furniture — fabricated in
            Entebbe, delivered and fitted anywhere in Uganda. Plus steel materials sold in bulk.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="btn-shine animate-glow bg-gradient-to-r from-brand to-brand-dark hover:opacity-95 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition hover:-translate-y-0.5 uppercase tracking-wide"
            >
              Explore Products
            </Link>
            <Link
              href="/request"
              className="btn-shine border border-white/50 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-medium text-lg px-8 py-4 rounded-xl transition hover:-translate-y-0.5 uppercase tracking-wide"
            >
              Request a Quote
            </Link>
          </div>
          <a
            href={waLink(`Hello ${BRAND.name}, I'd like a quote.`)}
            target="_blank"
            rel="noopener"
            className="mt-8 text-sm text-white/80 hover:text-white underline underline-offset-4"
          >
            Or chat with us on WhatsApp
          </a>
        </div>
      </header>

      {/* PRODUCTS */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase">What We Build</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Mobile temporary units built on steel frames — finished in our yard, set down on yours.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-brand hover:shadow-xl hover:-translate-y-1 transition">
                <Link href={`/products/${p.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={`${p.title} details`} />
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                                    <BuildImg src={p.photos[0].src} alt={p.photos[0].alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand transition uppercase">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{p.summary}</p>
                  <Link
                    href={`/request?item=${encodeURIComponent(p.title)}`}
                    className="btn-shine relative z-10 mt-5 text-center bg-brand hover:bg-brand-dark text-white font-bold px-4 py-2.5 rounded-lg transition hover:-translate-y-0.5 uppercase tracking-wide"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Steel supply card */}
          <Reveal delay={200}>
            <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-steel bg-steel text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition">
              <Link href="/steel" className="absolute inset-0 z-0 rounded-2xl" aria-label="Steel supply details" />
              <div className="relative aspect-[4/3] overflow-hidden">
                                <BuildImg src="/images/workshop-grinding.webp" alt="Fabricator cutting steel with an angle grinder" loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-spark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-steel shadow">
                  Steel supply
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold uppercase">Steel Materials</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed flex-1">
                  We buy steel in bulk for our own work and sell from the same stock — tube, angle, flat bar, pipe and sheets.
                </p>
                <Link
                  href="/steel"
                  className="btn-shine relative z-10 mt-5 text-center bg-spark hover:bg-amber-400 text-steel font-bold px-4 py-2.5 rounded-lg transition hover:-translate-y-0.5 uppercase tracking-wide"
                >
                  See Steel Stock
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 px-6">
        <Reveal className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['Entebbe', 'Workshop & yard'],
            ['Nationwide', 'Delivery & fitting'],
            ['Custom', 'Drawn to your plan'],
            ['Bulk', 'Steel supply'],
          ].map(([big, small]) => (
            <div key={small}>
              <p className="text-3xl md:text-4xl font-black text-brand uppercase">{big}</p>
              <p className="text-sm text-slate-500 uppercase tracking-wider mt-1">{small}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* HOW WE BUILD */}
      <section id="how-we-build" className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase">How We Build</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">From a scaled drawing to a finished unit on your plot.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover-lift">
                <div className="relative aspect-[4/3] bg-slate-100">
                                    <BuildImg src={s.photo.src} alt={s.photo.alt} loading="lazy" className={`h-full w-full ${i === 0 ? 'object-contain bg-white' : 'object-cover'}`} />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-brand text-white font-bold text-lg shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STEEL SUPPLY BAND */}
      <section className="relative overflow-hidden py-20 px-6">
        <BlueprintGrid />
        <div className="relative max-w-7xl mx-auto grid gap-10 md:grid-cols-2 items-center">
          <Reveal>
            <span className="text-xs font-semibold text-spark uppercase tracking-widest">Steel Supply</span>
            <h2 className="mt-1 text-3xl md:text-4xl font-bold text-white uppercase">Steel materials, sold from our stock</h2>
            <p className="mt-4 text-slate-200 max-w-xl leading-relaxed">
              We buy steel in large quantities for our own fabrication and sell from the same stock to
              builders, welders and workshops. Tell us what you need and we&apos;ll confirm what&apos;s in the yard and the price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/steel" className="btn-shine bg-spark hover:bg-amber-400 text-steel font-bold px-8 py-3 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide">
                View Steel Stock
              </Link>
              <a
                href={waLink(`Hello ${BRAND.name}, I'd like steel prices. I need: `)}
                target="_blank"
                rel="noopener"
                className="border border-white/50 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-xl transition uppercase tracking-wide"
              >
                Ask for Prices
              </a>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3">
            {STEEL_ITEMS.map((s) => (
              <div key={s.title} className="rounded-xl border border-white/15 bg-white/5 backdrop-blur p-4">
                <p className="font-bold text-white uppercase">{s.title}</p>
                <p className="mt-1 text-xs text-slate-300">{s.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative overflow-hidden py-20 px-6">
        <BlueprintGrid />
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase">Our Work</h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">Real units, real welding, real sites across Uganda.</p>
          </Reveal>
          <Reveal>
            <GallerySlideshow />
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section id="about" className="bg-brand-light border-y border-slate-200 py-20 px-6">
        <Reveal className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 uppercase">Why {BRAND.name}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We fabricate in our own yard with steel from our own stock, so we control the quality and
              the timeline from the first cut to the final coat of paint.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              'Drawn to scale and approved before we cut',
              'Steel from our own bulk stock',
              'No slab needed — units sit on blocks and can move',
              'Delivered and fitted anywhere in Uganda',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 text-brand font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-brand-dark animate-gradient py-20 px-6 text-center text-white">
        <Reveal className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">Ready to build?</h2>
          <p className="mt-3 text-orange-50">Send us a rough size, where it&apos;s going and what it&apos;s for. We&apos;ll come back with a drawing and a price.</p>
          <Link
            href="/request"
            className="btn-shine inline-block mt-8 bg-white hover:bg-orange-50 text-brand font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide"
          >
            Request a Quote
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
