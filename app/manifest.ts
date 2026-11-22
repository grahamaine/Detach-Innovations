import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

// Lets phones add the site to the home screen with the Detach logo.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.fullName,
    short_name: 'Detach',
    description: `${BRAND.fullName} — ${BRAND.tagline}. Cabins, containers and steel, fabricated in Entebbe.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f5a3d',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
