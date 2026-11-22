'use client';

import { useEffect, useRef, useState } from 'react';
import type { PhotoTrace } from '@/lib/photo-traces';
import TraceOverlay, { fitFor, traceFor } from '@/components/TraceOverlay';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes for the frame that wraps the photo (size, rounding, shadow, margin). */
  frameClass?: string;
  /** Lines for a photo not in lib/photo-traces.ts (for example, uploaded in the admin portal). */
  trace?: PhotoTrace | null;
};

// A photo that is drafted before it appears, when scrolled into view:
// a blueprint sheet sized to the photo's own pixels, its structural lines
// (traced from the photo by scripts/trace_photos.py) drawn ground-up,
// foundation to roof, with the sheet's dimensions noted. Then the photo
// develops through the drawing and the linework lifts away.
// Tap or press Enter to replay.
export default function BuildImg({ frameClass = 'h-full w-full', className = '', alt = '', trace: given, ...img }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setRun(1));
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((r) => r || 1);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const src = typeof img.src === 'string' ? img.src : '';
  const trace = traceFor(src, given);
  const replay = () => setRun((r) => r + 1);

  return (
    <span
      ref={ref}
      className={`bp-photo ${run ? 'is-built' : ''} ${frameClass}`}
      onClick={replay}
      onKeyDown={(e) => {
        if (e.key === 'Enter') replay();
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={`i${run}`} alt={alt} {...img} className={className} />
      {trace && <TraceOverlay key={run} trace={trace} fit={fitFor(className)} />}
      {trace && (
        <span key={`d${run}`} className="bp-dims" aria-hidden="true">
          <span>Elev.</span> {trace.w} × {trace.h}
        </span>
      )}
      <span key={`c${run}`} className="bp-corners" aria-hidden="true" />
    </span>
  );
}
