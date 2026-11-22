'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, hasSupabase } from '@/lib/supabase';
import { BRAND } from '@/lib/brand';
import { LayoutDashboard, Inbox, Images, Package, LogOut, ExternalLink, Lock, type LucideIcon } from 'lucide-react';
import DashboardTab from '@/components/admin/DashboardTab';
import QuotesTab from '@/components/admin/QuotesTab';
import ProjectsTab from '@/components/admin/ProjectsTab';
import ProductsTab from '@/components/admin/ProductsTab';
import { btnPrimary, btnQuiet, card, field } from '@/components/admin/ui';

const TABS: { id: AdminTab; icon: LucideIcon }[] = [
  { id: 'Dashboard', icon: LayoutDashboard },
  { id: 'Quotes', icon: Inbox },
  { id: 'Projects', icon: Images },
  { id: 'Products', icon: Package },
];
export type AdminTab = 'Dashboard' | 'Quotes' | 'Projects' | 'Products';

export default function AdminApp() {
  const db = supabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<AdminTab>('Dashboard');
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    if (!db) return;
    db.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = db.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [db]);

  useEffect(() => {
    if (!db || !session) return;
    db.rpc('is_admin').then(({ data }) => setIsAdmin(Boolean(data)));
  }, [db, session]);

  // badge on the Quotes tab
  useEffect(() => {
    if (!db || !isAdmin) return;
    db.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'new').then(({ count }) => setNewCount(count ?? 0));
  }, [db, isAdmin, tab]);

  if (!hasSupabase || !db) {
    return (
      <Shell>
        <div className={card}>
          <h2 className="text-lg font-bold">The portal isn&apos;t connected yet</h2>
          <p className="mt-2 text-slate-600">Add the Supabase settings to the site on Vercel, then reload this page.</p>
        </div>
      </Shell>
    );
  }
  if (!ready) return <Shell><p className="text-slate-500">Loading…</p></Shell>;
  if (!session) return <Shell><Login /></Shell>;
  if (isAdmin === null) return <Shell><p className="text-slate-500">Checking your access…</p></Shell>;
  if (!isAdmin) {
    return (
      <Shell email={session.user.email}>
        <div className={card}>
          <h2 className="text-lg font-bold">This account doesn&apos;t have admin access</h2>
          <p className="mt-2 text-slate-600">Ask the site owner to add {session.user.email} as an admin.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell email={session.user.email}>
      <div className="mb-6 grid grid-cols-4 gap-1.5 sm:flex sm:gap-2" role="tablist">
        {TABS.map(({ id, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-bold uppercase tracking-wide transition sm:min-h-[44px] sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm ${
              tab === id ? 'bg-brand text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-brand'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            {id}
            {id === 'Quotes' && newCount > 0 && (
              <span className={`absolute right-1.5 top-1 rounded-full px-1.5 text-[11px] sm:static sm:text-xs ${tab === id ? 'bg-white text-brand' : 'bg-amber-400 text-slate-900'}`}>{newCount}</span>
            )}
          </button>
        ))}
      </div>
      {tab === 'Dashboard' && <DashboardTab go={setTab} />}
      {tab === 'Quotes' && <QuotesTab />}
      {tab === 'Projects' && <ProjectsTab />}
      {tab === 'Products' && <ProductsTab />}
    </Shell>
  );
}

function Shell({ children, email }: { children: React.ReactNode; email?: string }) {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{BRAND.name}</p>
            <h1 className="text-2xl font-bold uppercase text-slate-900">Admin portal</h1>
          </div>
          {email && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="hidden sm:inline">{email}</span>
              <a className={btnQuiet} href="/" target="_blank" rel="noopener" aria-label="Open the website">
                <ExternalLink size={18} aria-hidden="true" /> <span className="hidden sm:inline">Website</span>
              </a>
              <button className={btnQuiet} onClick={() => supabase()?.auth.signOut()}>
                <LogOut size={18} aria-hidden="true" /> Sign out
              </button>
            </div>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

function Login() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    const { error } = await supabase()!.auth.signInWithPassword({
      email: String(d.get('email')),
      password: String(d.get('password')),
    });
    setBusy(false);
    if (error) setError('That email and password didn’t match. Try again.');
  }

  return (
    <form onSubmit={onSubmit} className={`${card} mx-auto max-w-sm space-y-4`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light text-brand"><Lock size={20} aria-hidden="true" /></span>
        <h2 className="text-lg font-bold">Team sign in</h2>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input name="email" type="email" required autoComplete="email" className={`mt-1 ${field}`} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input name="password" type="password" required autoComplete="current-password" className={`mt-1 ${field}`} />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className={`${btnPrimary} w-full`} disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
