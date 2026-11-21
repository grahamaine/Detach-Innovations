// Splash animation: a cabin being constructed in sequence on the blueprint grid.
// Blocks set → steel frame rises (with weld sparks) → beam → roof lowers on the
// crane hook → wall panels fill → glazing, door, deck rail. Pure SVG + CSS.
export default function BuildingHouse() {
  const blocks = [58, 104, 150, 196, 242];
  const posts = [64, 124, 196, 256];
  return (
    <svg viewBox="0 0 320 230" className="build w-[300px] md:w-[400px] h-auto" role="img" aria-label="A cabin being built">
      {/* ground */}
      <line x1="10" y1="196" x2="310" y2="196" className="b-ground" />

      {/* crane hook + cable */}
      <g className="b-crane">
        <line x1="160" y1="-40" x2="160" y2="40" />
        <path d="M154 40 h12 v6 a6 6 0 0 1 -12 0z" />
      </g>

      {/* foundation blocks */}
      {blocks.map((x, i) => (
        <rect key={x} x={x} y="184" width="20" height="12" rx="1" className="b-block" style={{ animationDelay: `${0.15 + i * 0.12}s` }} />
      ))}

      {/* floor / deck beam */}
      <rect x="50" y="174" width="220" height="10" className="b-floor" />

      {/* wall panels (fill after frame) */}
      <rect x="64" y="98" width="192" height="76" className="b-wall" />

      {/* glazing + door */}
      <rect x="80" y="112" width="40" height="44" className="b-glass" style={{ animationDelay: '3.15s' }} />
      <rect x="128" y="112" width="40" height="44" className="b-glass" style={{ animationDelay: '3.3s' }} />
      <rect x="206" y="118" width="30" height="56" className="b-door" />
      <line x1="100" y1="112" x2="100" y2="156" className="b-mullion" style={{ animationDelay: '3.25s' }} />
      <line x1="148" y1="112" x2="148" y2="156" className="b-mullion" style={{ animationDelay: '3.4s' }} />

      {/* steel frame posts (draw upward) */}
      {posts.map((x, i) => (
        <line key={x} x1={x} y1="174" x2={x} y2="98" className="b-post" style={{ animationDelay: `${0.9 + i * 0.15}s` }} />
      ))}
      {/* top beam */}
      <line x1="56" y1="98" x2="264" y2="98" className="b-beam" />

      {/* weld sparks at joints */}
      {posts.map((x, i) => (
        <g key={`s${x}`} className="b-spark" style={{ animationDelay: `${1.55 + i * 0.12}s` }} transform={`translate(${x} 98)`}>
          <circle r="3" />
          <path d="M0 0 l-7 -6 M0 0 l7 -7 M0 0 l-8 3 M0 0 l8 4 M0 0 l1 -9" />
        </g>
      ))}

      {/* roof lowered by crane */}
      <g className="b-roof">
        <polygon points="40,100 160,44 280,100" className="b-roof-fill" />
        <polyline points="40,100 160,44 280,100" className="b-roof-edge" />
      </g>

      {/* deck rail + steps */}
      <g className="b-rail">
        <line x1="270" y1="174" x2="300" y2="174" />
        <line x1="300" y1="174" x2="300" y2="150" />
        <line x1="270" y1="150" x2="300" y2="150" />
        <path d="M276 184 h28 v6 h-28z M282 190 h28 v6 h-28z" className="b-steps" />
      </g>
    </svg>
  );
}
