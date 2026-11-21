import { PHOTO_TRACES } from '@/lib/photo-traces';

const PHOTO = '/images/studio-red-corner.webp';

// Splash animation: the finished studio cottage drafted as an architectural
// elevation. The sheet is the photo's own size; its structural lines (traced
// from the photo) draw foundation to roof with dimension lines, then the
// photo develops through the drawing. Pure SVG + CSS.
export default function BuildingHouse() {
  const { w, h, lines } = PHOTO_TRACES[PHOTO];
  const u = Math.max(w, h) / 100;
  const m = u * 7; // margin for dimension lines
  const step = 2.4 / lines.length;
  return (
    <svg
      viewBox={`${-m} ${-m} ${w + m * 2} ${h + m * 2}`}
      className="arch w-[230px] md:w-[290px] h-auto"
      role="img"
      aria-label="Architectural drawing of a Detach studio cottage, then the finished cottage"
    >
      <defs>
        <clipPath id="arch-sheet">
          <rect width={w} height={h} rx={u} />
        </clipPath>
      </defs>

      {/* sheet */}
      <rect width={w} height={h} rx={u} className="a-sheet" strokeWidth={u * 0.25} />

      {/* the photo develops last, inside the sheet */}
      <image href={PHOTO} width={w} height={h} clipPath="url(#arch-sheet)" className="a-photo" preserveAspectRatio="xMidYMid slice" />

      {/* traced structure, ground-up */}
      <g className="a-lines" strokeWidth={u * 0.35}>
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ animationDelay: `${0.35 + i * step}s` }} />
        ))}
      </g>

      {/* dimension lines with ticks */}
      <g className="a-dim" strokeWidth={u * 0.18} fontSize={u * 2.6}>
        <line x1={0} y1={h + m * 0.55} x2={w} y2={h + m * 0.55} pathLength={1} />
        <line x1={0} y1={h + m * 0.3} x2={0} y2={h + m * 0.8} />
        <line x1={w} y1={h + m * 0.3} x2={w} y2={h + m * 0.8} />
        <text x={w / 2} y={h + m * 0.4} textAnchor="middle">{w}</text>
        <line x1={-m * 0.55} y1={0} x2={-m * 0.55} y2={h} pathLength={1} />
        <line x1={-m * 0.8} y1={0} x2={-m * 0.3} y2={0} />
        <line x1={-m * 0.8} y1={h} x2={-m * 0.3} y2={h} />
        <text x={-m * 0.7} y={h / 2} textAnchor="middle" transform={`rotate(-90 ${-m * 0.7} ${h / 2})`}>{h}</text>
        <text x={0} y={-m * 0.35} className="a-title">A-01 · Studio cottage · Elevation</text>
      </g>
    </svg>
  );
}
