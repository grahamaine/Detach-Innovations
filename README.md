# Jimmy Fabrication website

Website for an Entebbe fabrication workshop: studio cabins, glass-panel cabins and site offices, container conversions, modular steel furniture, shade lounges, and bulk steel materials for sale.

Powered and rendered by **thee AGENCY Consults (UG) Limited** — Innovation Unleashed.

## Change the business details

Everything business-specific lives in **`site.config.json`**: brand name, phone, WhatsApp number, email, address, hours and the live site URL. Edit that file and redeploy; every page, the Google structured data, the sitemap and robots.txt pick it up.

- `phone` — international format, no spaces (`+2567…`)
- `whatsapp` — digits only, no `+` (`2567…`)
- `siteUrl` — the final domain, no trailing slash. Update this when the custom domain goes live.

## Photos

Photos are in `src/img/` as `.webp`. To swap one, keep the same file name or update the `src` in `src/index.html`. `og.jpg` (1200×630) is the preview image shown when the link is shared on WhatsApp/Facebook.

## Build and run

```bash
npm run build      # writes dist/
npm run dev        # build + serve locally
```

No dependencies. Node 18+.

## Deploy (Vercel)

Import the GitHub repo in Vercel. `vercel.json` already sets the build command (`npm run build`) and output folder (`dist`).

## Structure

```
site.config.json   business details (edit this)
src/index.html     the page, with {{placeholders}}
src/styles.css     styles
src/main.js        quote form → WhatsApp
src/img/           photos
scripts/build.mjs  fills placeholders, outputs dist/
```
