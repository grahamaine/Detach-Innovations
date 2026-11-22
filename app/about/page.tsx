import Link from 'next/link';
import BuildImg from '@/components/BuildImg';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { STEPS } from '@/lib/products';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${BRAND.fullName}: an Entebbe fabrication workshop building mobile temporary units and supplying steel.`,
};

export default function AboutPage() {
  return (
    <div>
      <header className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105 hero-build" style={{ backgroundImage: "url('/images/container-mural.webp')" }} />
        <BlueprintGrid variant="overlay" />
        <div className="relative max-w-4xl mx-auto text-center text-slate-900 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase">About {BRAND.name}</h1>
          <p className="mt-5 text-lg text-slate-700 max-w-2xl mx-auto">{BRAND.tagline}.</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 items-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-slate-900 uppercase">Who we are</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {BRAND.fullName} — {BRAND.tagline} — is a fabrication workshop on Berkely Rd, Entebbe, building mobile temporary units — studio
            cabins, site offices, container conversions, shade lounges and modular steel furniture.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We buy steel in bulk for our own work and sell from that stock too, so builders and
            workshops can source materials and fabrication from one yard.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-brand-light p-5">
            <p className="text-xs font-semibold text-brand uppercase tracking-wider">Founder</p>
            <p className="mt-1 text-xl font-bold text-slate-900 uppercase">{BRAND.owner}</p>
            <p className="text-sm text-slate-600">{BRAND.ownerTitle} — designer of our modular steel furniture that turns one set of frames into a bedroom, living room, dining room, library and storage closet.</p>
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3">
                    <BuildImg src="/images/on-site-fitting.webp" alt="Fabricator measuring on site" frameClass="rounded-2xl shadow-lg" className="aspect-[3/4] w-full object-cover" />
                    <BuildImg src="/images/workshop-grinding.webp" alt="Cutting steel with an angle grinder" frameClass="rounded-2xl shadow-lg mt-8" className="aspect-[3/4] w-full object-cover" />
        </Reveal>
      </section>

      <section className="bg-slate-50 border-y border-slate-200 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 uppercase text-center">How we work</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <li className="h-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white font-bold">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-slate-200 py-16 px-6 text-center text-slate-900">
        <BlueprintGrid />
        <h2 className="relative text-3xl font-bold uppercase">Let&apos;s build something</h2>
        <Link href="/request" className="relative btn-shine inline-block mt-6 bg-brand hover:bg-brand-dark text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide">
          Request a Quote
        </Link>
      </section>
    </div>
  );
}
