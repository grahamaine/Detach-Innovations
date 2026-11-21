// Single source of truth for business details (from the owner's business card).
export const BRAND = {
  name: 'Detach Innovations',
  fullName: 'Detach Innovations',
  tagline: 'Earth Moving Housing',
  owner: 'Buqirwa Jimie',
  ownerTitle: 'Steeler / Inventor',
  description:
    'Detach Innovations — Earth Moving Housing. Entebbe fabrication workshop building mobile temporary units: studio cabins, glass-panel cabins and site offices, container conversions, shade lounges and modular steel furniture, plus bulk steel materials for sale. Delivered and set up across Uganda.',
  address: 'Berkely Rd, Entebbe, Uganda',
  street: 'Berkely Rd',
  locality: 'Entebbe',
  region: 'Wakiso',
  phones: ['+256 701 717 288'],
  whatsapp: '256701717288', // digits only, no +
  email: 'buqirwajimie@gmail.com',
  hours: 'Mon – Sat, 8:00 – 18:00',
  siteUrl: 'https://detachinnovations.vercel.app',
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
