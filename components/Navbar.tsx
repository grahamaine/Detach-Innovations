'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BRAND, waLink } from '@/lib/brand';
import Logo from '@/components/Logo';

const links = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/projects', label: 'Projects' },
  { href: '/steel', label: 'Steel Supply' },
  { href: '/#how-we-build', label: 'How We Build' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  return (
    <nav className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          {!isHome && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to the previous page"
              title="Back"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-brand"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <Link href="/" className="flex items-center transition-transform hover:scale-105" aria-label={`${BRAND.fullName} home`}>
            <Logo />
          </Link>
        </div>

        <div className="hidden xl:flex items-center space-x-6 whitespace-nowrap text-sm font-medium text-slate-700 uppercase tracking-wide">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-underline hover:text-brand transition">
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            Admin login
          </Link>
          <Link
            href="/request"
            className="btn-shine bg-brand hover:bg-brand-dark text-white font-bold px-4 py-2 rounded transition"
          >
            Request a Quote
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
        <Link
          href="/admin"
          aria-label="Admin login"
          title="Admin login"
          className="flex h-10 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-brand hover:text-brand"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          <span className="hidden min-[360px]:inline">Admin</span>
        </Link>
        <button
          className="grid h-10 w-10 place-items-center text-slate-700"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-slate-200 px-6 py-4 space-y-3 text-sm text-slate-700 uppercase tracking-wide">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block hover:text-brand" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/request" className="block text-brand font-bold" onClick={() => setOpen(false)}>
            Request a Quote
          </Link>
          <a href={waLink(`Hello ${BRAND.name}, I'd like a quote.`)} className="block text-green-700 font-bold" target="_blank" rel="noopener">
            WhatsApp us
          </a>
          <Link href="/admin" className="flex items-center gap-2 border-t border-slate-200 pt-3 font-semibold text-slate-600 hover:text-brand" onClick={() => setOpen(false)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            Admin login
          </Link>
        </div>
      )}
    </nav>
  );
}
