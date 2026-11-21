# Detach Innovations — website

Website for Detach Innovations (Earth Moving Housing), owned by Buqirwa Jimie — an Entebbe fabrication workshop building mobile temporary units — studio cabins, glass-panel cabins and site offices, container conversions, modular steel furniture and shade lounges — and selling steel materials in bulk.

Built on the same model as the Attitude Aviation portal: Next.js 16 (App Router), Tailwind CSS 4 and the Oswald font.

Powered and rendered by **thee AGENCY Consults (UG) Limited** — Innovation Unleashed.

## Change the business details

- **`lib/brand.ts`** — name, phone, WhatsApp, email, address, hours, site URL, socials. Filled from the owner's business card.
- **`lib/products.ts`** — product catalogue, steel stock list and "How we build" steps.
- **`lib/gallery-manifest.ts`** — photos in the gallery slideshow.
- **`components/Logo.tsx`** — logo redrawn from the business card mark (SVG).
- Photos live in `public/images/`.

## Pages

`/` home · `/products` · `/products/[slug]` · `/steel` · `/about` · `/contact` · `/request` (quote form → WhatsApp) · `/sitemap.xml` · `/robots.txt`

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Import this repo in Vercel (framework: Next.js, no settings needed).
