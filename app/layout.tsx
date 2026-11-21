import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { BRAND } from '@/lib/brand';
import { PRODUCTS } from '@/lib/products';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.fullName} — ${BRAND.tagline} | Mobile Cabins, Containers & Steel in Entebbe`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    type: 'website',
    title: `${BRAND.fullName} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: ['/images/og.jpg'],
  },
  
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: BRAND.fullName,
  slogan: BRAND.tagline,
  founder: { '@type': 'Person', name: BRAND.owner, jobTitle: BRAND.ownerTitle },
  description: BRAND.description,
  url: BRAND.siteUrl,
  image: `${BRAND.siteUrl}/images/og.jpg`,
  telephone: BRAND.phones[0].replace(/\s+/g, ''),
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.street,
    addressLocality: BRAND.locality,
    addressRegion: BRAND.region,
    addressCountry: 'UG',
  },
  areaServed: 'Uganda',
  openingHours: 'Mo-Sa 08:00-18:00',
  makesOffer: [
    ...PRODUCTS.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: p.title } })),
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Steel materials (tube, angle, flat bar, pipe, sheet)' } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('jf_splash_seen')){var s=document.createElement('style');s.textContent='#splash{display:none!important}';document.head.appendChild(s);}}catch(e){}",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SplashScreen />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
