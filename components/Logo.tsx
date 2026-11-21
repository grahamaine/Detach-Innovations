// Detach Innovations logo, redrawn from the business card mark:
// a house outline whose roof panel lifts away (a house that detaches and moves).
export default function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'md' | 'lg' }) {
  const big = size === 'lg';
  const ink = light ? '#ffffff' : '#0f5a3d';
  return (
    <span className="flex items-center gap-2.5" aria-label="Detach Innovations">
      <LogoMark className={big ? 'h-14 w-auto' : 'h-9 w-auto'} color={ink} />
      <span className="leading-none" style={{ color: ink }}>
        <span className={`block font-bold tracking-wide uppercase ${big ? 'text-4xl' : 'text-xl'}`}>Detach</span>
        <span className={`block font-medium uppercase ${big ? 'text-sm tracking-[0.42em] mt-1' : 'text-[9px] tracking-[0.38em] mt-0.5'}`}>
          Innovations
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className = '', color = '#0f5a3d' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="miter" aria-hidden="true">
      {/* narrow door panel */}
      <path d="M3 38 V12 L9 9 V38 Z" />
      {/* main wall */}
      <path d="M13 38 V8 L19 5 V38" />
      {/* roof panel lifting away */}
      <path d="M19 5 L33 2 L45 10 L31 14 Z" />
      <path d="M31 14 L26 38" />
    </svg>
  );
}
