import { PHOTO_TRACES } from '@/lib/photo-traces';

// Drawing-paper background: white sheet with a faint drafting grid and
// architectural drawings in grey ink (a floor plan, two elevations traced
// from real Detach photos, dimension lines and a title block) that draw
// themselves in. "solid" paints the paper itself; "overlay" washes a photo
// with paper so the drawings sit over it. Parent must be position:relative.
export default function BlueprintGrid({ variant = 'solid', className = '' }: { variant?: 'solid' | 'overlay'; className?: string }) {
  return (
    <div className={`blueprint ${variant === 'solid' ? 'is-solid' : 'is-overlay'} ${className}`} aria-hidden="true">
      <div className="bp-grid" />
      <ArchDrawings />
    </div>
  );
}

// Staggered draw-in delays, counted per drawing sheet.
function stagger() {
  let n = 0;
  return () => ({ animationDelay: `${0.2 + (n++ % 40) * 0.09}s` });
}
type Delay = ReturnType<typeof stagger>;

function Elevation({ src, x, y, h, label, d }: { src: string; x: number; y: number; h: number; label: string; d: Delay }) {
  const t = PHOTO_TRACES[src];
  if (!t) return null;
  const s = h / t.h;
  const w = t.w * s;
  return (
    <g>
      <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={1.1 / s}>
        {t.lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={d()} />
        ))}
      </g>
      {/* ground line and dimension */}
      <line x1={x - 20} y1={y + h + 8} x2={x + w + 20} y2={y + h + 8} pathLength={1} strokeWidth={1.6} style={d()} />
      <line x1={x} y1={y + h + 30} x2={x + w} y2={y + h + 30} pathLength={1} style={d()} />
      <line x1={x} y1={y + h + 22} x2={x} y2={y + h + 38} />
      <line x1={x + w} y1={y + h + 22} x2={x + w} y2={y + h + 38} />
      <text x={x + w / 2} y={y + h + 26} textAnchor="middle">{t.w}</text>
      <text x={x} y={y + h + 60} className="a-label">{label}</text>
    </g>
  );
}

function ArchDrawings() {
  const d = stagger();
  return (
    <svg className="arch-sheet" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      {/* FLOOR PLAN */}
      <g transform="translate(70 90)">
        <rect x="0" y="0" width="420" height="260" pathLength={1} strokeWidth={2.4} style={d()} />
        <rect x="8" y="8" width="404" height="244" pathLength={1} style={d()} />
        <line x1="260" y1="8" x2="260" y2="252" pathLength={1} strokeWidth={1.8} style={d()} />
        <line x1="260" y1="150" x2="412" y2="150" pathLength={1} strokeWidth={1.8} style={d()} />
        <line x1="8" y1="180" x2="150" y2="180" pathLength={1} style={d()} />
        {/* doors */}
        <path d="M260 60 A44 44 0 0 1 304 104" pathLength={1} style={d()} />
        <line x1="260" y1="104" x2="304" y2="104" pathLength={1} style={d()} />
        <path d="M330 150 A36 36 0 0 0 366 186" pathLength={1} style={d()} />
        <path d="M120 260 A52 52 0 0 1 172 208" pathLength={1} style={d()} />
        {/* windows */}
        <line x1="40" y1="-3" x2="200" y2="-3" pathLength={1} style={d()} />
        <line x1="40" y1="11" x2="200" y2="11" pathLength={1} style={d()} />
        <line x1="423" y1="30" x2="423" y2="120" pathLength={1} style={d()} />
        {/* furniture */}
        <rect x="30" y="40" width="110" height="80" pathLength={1} style={d()} />
        <rect x="300" y="190" width="80" height="44" pathLength={1} style={d()} />
        <circle cx="200" cy="100" r="22" pathLength={1} style={d()} />
        {/* dimensions */}
        <line x1="0" y1="-34" x2="420" y2="-34" pathLength={1} style={d()} />
        <line x1="0" y1="-42" x2="0" y2="-26" />
        <line x1="420" y1="-42" x2="420" y2="-26" />
        <text x="210" y="-40" textAnchor="middle">6000</text>
        <line x1="-30" y1="0" x2="-30" y2="260" pathLength={1} style={d()} />
        <line x1="-38" y1="0" x2="-22" y2="0" />
        <line x1="-38" y1="260" x2="-22" y2="260" />
        <text x="-36" y="130" textAnchor="middle" transform="rotate(-90 -36 130)">3000</text>
        <text x="60" y="160" className="a-room">Bedroom</text>
        <text x="300" y="80" className="a-room">Living</text>
        <text x="296" y="178" className="a-room">Shower</text>
        <text x="0" y="300" className="a-label">Plan · 1:50</text>
        {/* north arrow */}
        <g transform="translate(470 20)">
          <circle r="16" pathLength={1} style={d()} />
          <path d="M0 -24 L6 6 L0 0 L-6 6 Z" className="a-fill" />
          <text y="-30" textAnchor="middle">N</text>
        </g>
      </g>

      {/* ELEVATIONS traced from Detach photos */}
      <Elevation src="/images/studio-red-corner.webp" x={640} y={70} h={330} label="Elevation A · studio cabin" d={d} />
      <Elevation src="/images/cabin-front.webp" x={980} y={110} h={290} label="Elevation B" d={d} />

      {/* SECTION + title block */}
      <g transform="translate(70 500)">
        <path d="M0 160 L0 40 L210 0 L420 40 L420 160" pathLength={1} strokeWidth={1.8} style={d()} />
        <line x1="-20" y1="160" x2="440" y2="160" pathLength={1} strokeWidth={2} style={d()} />
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <line key={x} x1={x} y1={160} x2={x} y2={40 - (x <= 210 ? x : 420 - x) * (40 / 210)} pathLength={1} style={d()} />
        ))}
        <text x="0" y="200" className="a-label">Section · steel frame</text>
      </g>
      <g transform="translate(860 560)">
        <rect width="290" height="150" pathLength={1} style={d()} />
        <line x1="0" y1="44" x2="290" y2="44" />
        <line x1="0" y1="88" x2="290" y2="88" />
        <line x1="150" y1="88" x2="150" y2="150" />
        <text x="14" y="30" className="a-title">Detach Innovations</text>
        <text x="14" y="72">Studio cabin · Entebbe</text>
        <text x="14" y="124">Scale 1:50</text>
        <text x="164" y="124">Sheet A-01</text>
      </g>
    </svg>
  );
}
