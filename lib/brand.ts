// Single source of truth for business details.
// PLACEHOLDERS: replace with the details on Jimmy's business card.
export const BRAND = {
  name: 'Jimmy Fabrication',
  fullName: 'Jimmy Fabrication Uganda',
  tagline: 'Built in our yard, set down on yours',
  description:
    'Entebbe fabrication workshop building mobile temporary units: studio cabins, glass-panel cabins and site offices, container conversions, shade lounges and modular steel furniture, plus bulk steel materials for sale. Delivered and set up across Uganda.',
  address: 'Entebbe, Wakiso, Uganda',
  locality: 'Entebbe',
  region: 'Wakiso',
  phones: ['+256 700 000 000'],
  whatsapp: '256700000000', // digits only, no +
  email: 'hello@example.com',
  hours: 'Mon – Sat, 8:00 – 18:00',
  siteUrl: 'https://jimmy-fabrication.vercel.app',
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
  },
} as const;

export const AGENCY = {
  name: 'thee AGENCY Consults (UG) Limited',
  tagline: 'Innovation Unleashed',
  whatsapp: '256742701202',
} as const;

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
