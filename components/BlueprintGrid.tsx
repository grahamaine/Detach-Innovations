// Blueprint Grid background: animated cyan HUD grid with a radar sweep.
// "solid" paints the deep-navy base itself; "overlay" draws only the lines,
// for laying over a photo or gradient. Parent must be position:relative.
export default function BlueprintGrid({ variant = 'solid', className = '' }: { variant?: 'solid' | 'overlay'; className?: string }) {
  return (
    <div className={`blueprint ${variant === 'solid' ? 'is-solid' : 'is-overlay'} ${className}`} aria-hidden="true">
      <div className="bp-grid" />
      <div className="bp-sweep" />
      <div className="bp-haze" />
    </div>
  );
}
