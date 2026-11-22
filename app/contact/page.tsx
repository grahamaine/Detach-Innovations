import type { Metadata } from 'next';
import { BRAND, telLink, waLink } from '@/lib/brand';
import QuoteForm from '@/components/QuoteForm';
import { HardHat, Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Call, WhatsApp or visit ${BRAND.name} in Entebbe, Uganda.`,
};

export default function ContactPage() {
  const cards = [
    { icon: HardHat, label: `${BRAND.ownerTitle}`, value: BRAND.owner },
    { icon: Phone, label: 'Call', value: BRAND.phones[0], href: telLink(BRAND.phones[0]) },
    { icon: MessageCircle, label: 'WhatsApp', value: BRAND.phones[0], href: waLink(`Hello ${BRAND.name}`) },
    { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: 'Workshop', value: BRAND.address },
    { icon: Clock, label: 'Hours', value: BRAND.hours },
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <header className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase">Contact Us</h1>
        <p className="mt-3 text-slate-600">Call, WhatsApp or send a request below.</p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-3">
          {cards.map((c) => (
            <li key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                <c.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold text-brand uppercase tracking-wider">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="font-medium text-slate-900 hover:text-brand">{c.value}</a>
                ) : (
                  <p className="font-medium text-slate-900">{c.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 uppercase mb-6">Send a request</h2>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
