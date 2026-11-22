'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import BlueprintGrid from '@/components/BlueprintGrid';
import BuildingHouse from '@/components/BuildingHouse';

const DURATION_MS = 6000;

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      // Once per visit, and never over the admin portal.
      if (sessionStorage.getItem('jf_splash_seen') || location.pathname.startsWith('/admin')) {
        queueMicrotask(() => setShow(false));
        return;
      }
      sessionStorage.setItem('jf_splash_seen', '1');
    } catch {}
    const t = setTimeout(() => dismiss(), DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setClosing(true);
    setTimeout(() => setShow(false), 600);
  }

  if (!show) return null;

  return (
    <div
      id="splash"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 transition-opacity duration-700 ${
        closing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: '#fbfaf6' }}
    >
      <BlueprintGrid />

      <div className="relative z-10 flex flex-col items-center">
        <BuildingHouse />

        <div className="splash-brand mt-6 flex flex-col items-center">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-xl ring-1 ring-slate-300">
            <Logo size="lg" />
          </div>
          <p className="mt-5 text-[11px] md:text-xs tracking-[0.25em] text-slate-500 uppercase">
            Earth Moving Housing · Entebbe
          </p>
        </div>

        <button
          onClick={dismiss}
          className="mt-8 text-xs font-medium text-slate-500 hover:text-slate-900 transition uppercase tracking-widest"
        >
          Skip →
        </button>
      </div>
    </div>
  );
}
