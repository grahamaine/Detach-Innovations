import { BRAND } from '@/lib/brand';

// Temporary text logo until the logo from Jimmy's business card is supplied.
// To swap: put logo.png in /public/images and replace this with an <img>.
export default function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'md' | 'lg' }) {
  const big = size === 'lg';
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className={big ? 'h-14 w-14' : 'h-9 w-9'} aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#2a3237" />
        <rect x="6" y="11" width="20" height="13" fill="#d2461f" />
        <rect x="4" y="8" width="24" height="3" fill="#e5e7eb" />
        <rect x="15" y="14" width="8" height="10" fill="#17786a" />
        <rect x="6" y="24" width="3" height="3" fill="#e5e7eb" />
        <rect x="23" y="24" width="3" height="3" fill="#e5e7eb" />
      </svg>
      <span className={`leading-none uppercase ${light ? 'text-white' : 'text-steel'}`}>
        <span className={`block font-bold tracking-wide ${big ? 'text-3xl' : 'text-lg'}`}>{BRAND.name}</span>
        <span className={`block font-medium tracking-[0.2em] text-brand ${big ? 'text-sm mt-1' : 'text-[10px] mt-0.5'}`}>
          Entebbe · Uganda
        </span>
      </span>
    </span>
  );
}
