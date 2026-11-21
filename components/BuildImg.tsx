'use client';

import { useEffect, useRef, useState } from 'react';
import { PHOTO_TRACES } from '@/lib/photo-traces';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes for the frame that wraps the photo (size, rounding, shadow, margin). */
  frameClass?: string;
};

const DRAW_S = 2.2; // time to draw every line of a photo

// A photo that is drafted before it appears, when scrolled into view:
// a blueprint sheet sized to the photo's own pixels, its structural lines
// (traced from the photo by scripts/trace_photos.py) drawn ground-up,
// foundation to roof, with the sheet's dimensions noted. Then the photo
// develops through the drawing and the linework lifts away.
// Tap or press Enter to replay.
export default function BuildImg({ frameClass = 'h-full w-full', className = '', alt = '', ...img }: Props) {
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
  const trace = PHOTO_TRACES[src];
  // Match the overlay to how the photo is cropped, so lines sit on the building.
  const fit = className.includes('object-contain')
    ? 'xMidYMid meet'
    : className.includes('object-top')
      ? 'xMidYMin slice'
      : 'xMidYMid slice';
  const unit = trace ? Math.max(trace.w, trace.h) / 100 : 1;
  const step = trace && trace.lines.length ? DRAW_S / trace.lines.length : 0;
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
      {trace && (
        <svg
          key={run}
          className="bp-trace"
          viewBox={`0 0 ${trace.w} ${trace.h}`}
          preserveAspectRatio={fit}
          aria-hidden="true"
        >
          <g strokeWidth={unit * 0.3}>
            {trace.lines.map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                pathLength={1}
                style={{ animationDelay: `${0.25 + i * step}s` }}
              />
            ))}
          </g>
        </svg>
      )}
      {trace && (
        <span key={`d${run}`} className="bp-dims" aria-hidden="true">
          <span>Elev.</span> {trace.w} × {trace.h}
        </span>
      )}
      <span key={`c${run}`} className="bp-corners" aria-hidden="true" />
    </span>
  );
}
