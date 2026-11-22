import { PHOTO_TRACES, type PhotoTrace } from '@/lib/photo-traces';

/** Pick the overlay fit that matches how the photo's <img> is cropped. */
export function fitFor(className = '') {
  if (className.includes('object-contain')) return 'xMidYMid meet';
  if (className.includes('object-top')) return 'xMidYMin slice';
  return 'xMidYMid slice';
}

export function traceFor(src: string, trace?: PhotoTrace | null) {
  return trace ?? PHOTO_TRACES[src] ?? null;
}

// The photo's structural lines as a blueprint overlay, drawn ground-up.
export default function TraceOverlay({
  trace,
  fit = 'xMidYMid slice',
  drawSeconds = 2.2,
  delay = 0.25,
  className = 'bp-trace',
}: {
  trace: PhotoTrace;
  fit?: string;
  drawSeconds?: number;
  delay?: number;
  className?: string;
}) {
  const unit = Math.max(trace.w, trace.h) / 100;
  const step = trace.lines.length ? drawSeconds / trace.lines.length : 0;
  return (
    <svg className={className} viewBox={`0 0 ${trace.w} ${trace.h}`} preserveAspectRatio={fit} aria-hidden="true">
      <g strokeWidth={unit * 0.3}>
        {trace.lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ animationDelay: `${delay + i * step}s` }} />
        ))}
      </g>
    </svg>
  );
}
