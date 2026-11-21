import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a quote for a cabin, container conversion, steel furniture, shade lounge or steel materials.',
};

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ item?: string }> }) {
  const { item } = await searchParams;
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold text-slate-900 uppercase">Request a Quote</h1>
        <p className="mt-3 text-slate-600">
          Tell us what you need. We&apos;ll reply with a drawing and a price.
        </p>
      </header>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <QuoteForm initial={item} />
      </div>
    </div>
  );
}
