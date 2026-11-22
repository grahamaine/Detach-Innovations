'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GALLERY_PHOTOS } from '@/lib/gallery-manifest';
import TraceOverlay, { traceFor } from '@/components/TraceOverlay';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

// Each slide is drafted from its own traced lines, then develops: give it time to finish.
const AUTOPLAY_MS = 6000;

export default function GallerySlideshow() {
  const photos = GALLERY_PHOTOS;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null); // full-screen single image
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + photos.length) % photos.length),
    [photos.length],
  );

  // Autoplay (pauses on hover, when grid/viewer open).
  useEffect(() => {
    if (paused || gridOpen || viewer !== null || photos.length <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % photos.length), AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, gridOpen, viewer, photos.length]);

  // Keyboard nav for the full-screen viewer.
  useEffect(() => {
    if (viewer === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewer(null);
      if (e.key === 'ArrowRight') setViewer((v) => (v === null ? v : (v + 1) % photos.length));
      if (e.key === 'ArrowLeft') setViewer((v) => (v === null ? v : (v - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewer, photos.length]);

  if (photos.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl bp-stage">
        {photos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`Detach Innovations project photo ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
              i === index ? 'scale-100 slide-develop' : 'opacity-0 scale-105'
            }`}
          />
        ))}
        {(() => {
          const t = traceFor(photos[index]);
          return t ? <TraceOverlay key={index} trace={t} className="slide-trace" drawSeconds={1.5} delay={0.1} /> : null;
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Prev / Next */}
        <button
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/85 backdrop-blur hover:bg-brand hover:text-white text-slate-800 grid place-items-center shadow-lg transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          aria-label="Next photo"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/85 backdrop-blur hover:bg-brand hover:text-white text-slate-800 grid place-items-center shadow-lg transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>

        {/* Expand to full gallery */}
        <button
          onClick={() => setGridOpen(true)}
          className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur hover:bg-white text-slate-800 text-xs font-semibold px-3 py-2 shadow-lg transition"
        >
          <Expand size={14} aria-hidden="true" /> View full gallery
        </button>

        <div className="absolute bottom-4 right-5 text-xs font-medium text-white bg-black/40 backdrop-blur rounded-full px-3 py-1 tabular-nums">
          {index + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition ${
              i === index ? 'ring-brand' : 'ring-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Full gallery grid overlay */}
      {gridOpen && (
        <div className="fixed inset-0 z-[90] bg-slate-900/95 backdrop-blur-sm overflow-y-auto animate-fade-in-up">
          <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur border-b border-white/10">
            <h3 className="text-white font-bold text-lg">Gallery · {photos.length} photos</h3>
            <button
              onClick={() => setGridOpen(false)}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center text-xl"
              aria-label="Close gallery"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setViewer(i)}
                className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Photo ${i + 1}`} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition duration-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Single image full-screen viewer */}
      {viewer !== null && (
        <div
          className="fixed inset-0 z-[95] bg-black/95 flex items-center justify-center animate-fade-in-up"
          onClick={() => setViewer(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[viewer]}
            alt={`Photo ${viewer + 1}`}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setViewer(null)}
            className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center text-xl"
            aria-label="Close"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setViewer((v) => (v === null ? v : (v - 1 + photos.length) % photos.length)); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-brand text-white grid place-items-center text-2xl"
            aria-label="Previous"
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setViewer((v) => (v === null ? v : (v + 1) % photos.length)); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-brand text-white grid place-items-center text-2xl"
            aria-label="Next"
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tabular-nums">
            {viewer + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
