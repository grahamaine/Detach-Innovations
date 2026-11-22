import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import ProductIcon from '@/components/ProductIcon';
import BuildImg from '@/components/BuildImg';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS, getProduct } from '@/lib/products';
import { getProducts } from '@/lib/data';
import { BRAND, waLink } from '@/lib/brand';

export const revalidate = 60;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: 'Product not found' };
  return { title: p.title, description: p.summary, openGraph: { images: [p.photos[0].src] } };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const [hero, ...rest] = p.photos;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/products" className="text-sm text-brand hover:underline uppercase tracking-wide">← All products</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 items-start">
        <div className="animate-fade-in-up">
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
                        <BuildImg src={hero.src} alt={hero.alt} frameClass="w-full" className="w-full aspect-[4/5] object-cover" />
          </div>
          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {rest.map((ph) => (
                <BuildImg key={ph.src} src={ph.src} alt={ph.alt} loading="lazy" frameClass="rounded-xl ring-1 ring-slate-200" className="aspect-square w-full object-cover" />
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand"><ProductIcon slug={p.slug} size={24} /></span>
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">{p.category}</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 uppercase">{p.title}</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{p.summary}</p>
          {p.priceNote && <p className="mt-3 text-xl font-bold text-brand">{p.priceNote}</p>}
          {p.body.map((para) => (
            <p key={para} className="mt-4 text-slate-600 leading-relaxed">{para}</p>
          ))}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900 uppercase">What&apos;s included</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><CircleCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-brand-light p-5">
              <h2 className="font-bold text-slate-900 uppercase">Popular uses</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {p.uses.map((u) => (
                  <li key={u} className="flex gap-2"><span className="text-brand">•</span>{u}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/request?item=${encodeURIComponent(p.title)}`}
              className="btn-shine animate-glow text-center bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5 uppercase tracking-wide"
            >
              Request a Quote
            </Link>
            <a
              href={waLink(`Hello ${BRAND.name}, I'm interested in ${p.title}.`)}
              target="_blank"
              rel="noopener"
              className="text-center border border-brand text-brand hover:bg-brand-light font-bold px-8 py-3.5 rounded-xl transition uppercase tracking-wide"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-bold text-slate-900 uppercase">Other products</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((o) => o.slug !== p.slug).map((o) => (
            <Link key={o.slug} href={`/products/${o.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white hover-lift">
                            <BuildImg src={o.photos[0].src} alt={o.photos[0].alt} loading="lazy" frameClass="w-full" className="aspect-[4/3] w-full object-cover" />
              <p className="p-4 font-bold text-slate-900 group-hover:text-brand uppercase text-sm">{o.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
