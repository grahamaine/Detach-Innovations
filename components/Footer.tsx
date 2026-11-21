import Link from 'next/link';
import { AGENCY, BRAND, telLink, waLink } from '@/lib/brand';
import { PRODUCTS } from '@/lib/products';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-steel text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="inline-flex items-center bg-white rounded-md px-3 py-2">
            <Logo />
          </span>
          <p className="mt-4 text-sm max-w-md leading-relaxed">{BRAND.description}</p>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>📍 {BRAND.address}</li>
            {BRAND.phones.map((p) => (
              <li key={p}>
                📞 <a href={telLink(p)} className="hover:text-white">{p}</a>
              </li>
            ))}
            <li>
              ✉️ <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
            </li>
            <li>🕗 {BRAND.hours}</li>
          </ul>
        </div>

        <div className="space-y-3">
          <details className="group rounded-lg border border-white/15 bg-white/5">
            <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-white font-semibold text-sm uppercase tracking-wide">
              Product Catalogue
              <span className="transition-transform group-open:rotate-180">▾</span>
            </summary>
            <ul className="px-3 pb-3 space-y-2 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="hover:text-white">{p.title}</Link>
                </li>
              ))}
              <li className="pt-1"><Link href="/products" className="text-white/90 hover:text-white font-medium">All products →</Link></li>
            </ul>
          </details>

          <Link href="/steel" className="block rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/10 transition">
            🔩 Steel Supply →
          </Link>
          <Link href="/request" className="block rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/10 transition">
            📝 Request a Quote →
          </Link>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wide text-sm">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/#gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li>
              <a href={waLink(`Hello ${BRAND.name}, I'd like a quote.`)} target="_blank" rel="noopener" className="hover:text-white">
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p>
            Powered and rendered by{' '}
            <a href={`https://wa.me/${AGENCY.whatsapp}`} target="_blank" rel="noopener" className="font-semibold text-white hover:text-spark">
              {AGENCY.name}
            </a>{' '}
            — {AGENCY.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
