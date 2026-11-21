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
      if (sessionStorage.getItem('jf_splash_seen')) {
        setShow(false);
        return;
      }
      sessionStorage.setItem('jf_splash_seen', '1');
    } catch {}
    const t = setTimeout(() => dismiss(), DURATION_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      style={{ background: '#06122a' }}
    >
      <BlueprintGrid />

      <div className="relative z-10 flex flex-col items-center">
        <BuildingHouse />

        <div className="splash-brand mt-6 flex flex-col items-center">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl ring-1 ring-cyan-300/40">
            <Logo size="lg" />
          </div>
          <p className="mt-5 text-[11px] md:text-xs tracking-[0.25em] text-cyan-300/80 uppercase">
            Earth Moving Housing · Entebbe
          </p>
        </div>

        <button
          onClick={dismiss}
          className="mt-8 text-xs font-medium text-white/45 hover:text-cyan-300 transition uppercase tracking-widest"
        >
          Skip →
        </button>
      </div>
    </div>
  );
}
