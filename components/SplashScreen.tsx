'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

const DURATION_MS = 4500;

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${
        closing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(circle at 50% 45%, #3a2a22 0%, #1a2024 55%, #0e1215 100%)' }}
    >
      <div className="relative flex items-center justify-center">
        <span className="radar-ripple" />
        <span className="radar-ripple" />
        <span className="radar-ripple" />
        <div className="animate-scale-in relative z-10">
          <div className="animate-float bg-white rounded-2xl px-7 py-5 shadow-2xl ring-1 ring-amber-300/40">
            <Logo size="lg" />
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] md:text-xs tracking-[0.25em] text-amber-300/80 uppercase animate-pulse">
        Cabins · Containers · Steel · Entebbe
      </p>

      <button
        onClick={dismiss}
        className="mt-8 text-xs font-medium text-white/45 hover:text-amber-300 transition uppercase tracking-widest"
      >
        Skip →
      </button>
    </div>
  );
}
