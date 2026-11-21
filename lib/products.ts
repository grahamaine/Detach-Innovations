export type Product = {
  slug: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  body: string[];
  features: string[];
  uses: string[];
  photos: { src: string; alt: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: 'studio-cabins',
    title: 'Studio Cabins',
    category: 'Living units',
    icon: '🏠',
    summary:
      'Complete one-room units with sleeping area, kitchenette, shower room and a railed front deck — ready to live in.',
    body: [
      'Our studio cabins arrive finished: ceilings, lighting, sockets, glazing and paint are done in the workshop before delivery. Each unit sits on blocks or plinths, so there is no slab to pour and the cabin can be lifted and moved later.',
      'Every studio starts as a scaled drawing. We lay out the bed, sofa, kitchenette, shower room and deck to your plot and budget, and you sign off the plan before any steel is cut.',
    ],
    features: [
      'Kitchenette with sink and cabinets',
      'Shower room with WC and basin',
      'Sliding glass doors onto a covered deck',
      'Steel railings, steps and finished floors',
      'Raised on blocks — no slab needed',
    ],
    uses: ['Guest rooms and Airbnb rentals', 'Staff housing', 'Home offices', 'Student rooms'],
    photos: [
      { src: '/images/studio-red-deck.webp', alt: 'Red studio cabin with teal steps and a railed deck' },
      { src: '/images/studio-bedroom.webp', alt: 'Studio cabin bedroom with timber bed and mosquito net' },
      { src: '/images/studio-kitchenette.webp', alt: 'Kitchenette, shower room and steel shelving inside a studio cabin' },
      { src: '/images/studio-sliding-door.webp', alt: 'Bedroom opening onto a balcony through sliding glass doors' },
      { src: '/images/studio-raised-deck.webp', alt: 'Studio cabin deck raised on concrete blocks' },
      { src: '/images/studio-red-corner.webp', alt: 'Corner of a red studio cabin on blocks' },
    ],
  },
  {
    slug: 'glass-panel-cabins',
    title: 'Glass-Panel Cabins & Site Offices',
    category: 'Cabins',
    icon: '🪟',
    summary:
      'Steel-framed units with insulated wall panels, wide glazing and top-hung windows. Up fast, moved easily.',
    body: [
      'Glass-panel cabins use a welded steel frame with insulated wall panels and long runs of glazing. Top-hung windows open for airflow while keeping the rain out.',
      'They make bright site offices, guard houses and stores on construction sites, and quiet studios or home offices in a garden.',
    ],
    features: [
      'Welded steel frame',
      'Insulated wall panels',
      'Wide glazing with opening windows',
      'Raised concrete deck on plinths',
      'Built to your drawing or ours',
    ],
    uses: ['Site offices and stores', 'Guard houses', 'Garden studios', 'Reception and sales offices'],
    photos: [
      { src: '/images/cabin-front.webp', alt: 'Green-panel cabin with tall glass windows' },
      { src: '/images/cabin-side.webp', alt: 'Side of a glass-panel cabin reflecting the garden' },
      { src: '/images/on-site-fitting.webp', alt: 'Fabricator measuring plywood beside a cabin' },
      { src: '/images/glazed-front.webp', alt: 'Glazed front with louvres and steel railings' },
    ],
  },
  {
    slug: 'container-conversions',
    title: 'Container Conversions',
    category: 'Containers',
    icon: '📦',
    summary:
      'Shipping containers cut, framed and fitted out as shops, kiosks, offices and rooms — finished to your brand.',
    body: [
      'We cut and frame openings in shipping containers, fit doors, windows, ladders and lighting brackets, and finish the inside to suit the use.',
      'Outside, we paint to your brand colours — or go further with a hand-painted mural that makes people stop and look.',
    ],
    features: [
      'Openings cut and framed in steel',
      'Doors, windows and security grilles',
      'Lighting brackets and wiring',
      'Insulation and interior fit-out',
      'Paint and murals to your brand',
    ],
    uses: ['Shops and kiosks', 'Offices', 'Cafés and bars', 'Stores and workshops'],
    photos: [{ src: '/images/container-mural.webp', alt: 'Container with red-framed openings and a hand-painted mural' }],
  },
  {
    slug: 'modular-steel-furniture',
    title: 'Modular Steel Furniture',
    category: 'Furniture',
    icon: '🛋️',
    summary:
      'Welded frames that rearrange: one set is a bed, sofa, dining bench, bookshelf and storage closet.',
    body: [
      'Our modular furniture is built from welded steel frames designed to fit together in different ways, so one set can be a bed at night, a sofa by day, a dining bench, a bookshelf or a storage closet.',
      'It is made for small spaces — including the cabins we build — and sized to fit your room.',
    ],
    features: [
      'Welded steel frames',
      'Rearranges into bed, sofa, bench and shelving',
      'Painted or powder-coated finish',
      'Sized to your room or unit',
    ],
    uses: ['Studio cabins', 'Small apartments', 'Hostels and staff housing', 'Lounges and cafés'],
    photos: [
      { src: '/images/steel-frame-single.webp', alt: 'Black welded steel sofa-bed frame' },
      { src: '/images/steel-frame-pair.webp', alt: 'Two modular steel frames joined side by side' },
      { src: '/images/modular-set.webp', alt: 'Modular steel frames with a red steel cube table' },
    ],
  },
  {
    slug: 'shade-lounges',
    title: 'Shade Lounges & Outdoor Rooms',
    category: 'Outdoor',
    icon: '⛱️',
    summary:
      'Steel posts and roofing, shade-net walls and raised timber decks for cafés, waiting areas and gardens.',
    body: [
      'Shade lounges combine a steel frame and roof with shade-net walls and a raised pallet or plywood deck. They go up quickly and are easy to extend.',
      'Ideal for cafés, bars, waiting areas and work-from-the-garden corners.',
    ],
    features: [
      'Steel posts and roof sheeting',
      'Shade-net side walls',
      'Raised pallet or plywood decking',
      'Quick to install and extend',
    ],
    uses: ['Cafés and bars', 'Waiting areas', 'Garden lounges', 'Event spaces'],
    photos: [
      { src: '/images/garden-lounge.webp', alt: 'Covered outdoor lounge with shade-net walls and decking' },
      { src: '/images/lounge-seating.webp', alt: 'Chairs and tables on plywood decking under shade netting' },
    ],
  },
];

export const STEEL_ITEMS = [
  { title: 'Box & square tube', note: 'For frames, gates and furniture' },
  { title: 'Angle line', note: 'For frames, brackets and supports' },
  { title: 'Flat bar', note: 'For bracing, grilles and trims' },
  { title: 'Round pipe', note: 'For railings, posts and structures' },
  { title: 'Sheets & roofing', note: 'For cladding, roofs and panels' },
  { title: 'Cut to length', note: 'Ask and we cut it in the yard' },
];

export const STEPS = [
  {
    title: 'Measure & draw',
    text: 'We visit your site or take your measurements, then draw the unit to scale — layout, doors, windows, plumbing and furniture. You approve the plan and the quote before any steel is cut.',
    photo: { src: '/images/space-plan.webp', alt: 'Scaled space plan of a studio cabin' },
  },
  {
    title: 'Fabricate in Entebbe',
    text: 'Frames are cut, welded and painted in our workshop. Panels, glazing, wiring and fittings go in here too, so less work happens on your site.',
    photo: { src: '/images/workshop-cutting.webp', alt: 'Cutting timber beside red steel frames' },
  },
  {
    title: 'Deliver & fit',
    text: 'We transport the unit, set it level on blocks or plinths, connect it and finish the decks and trims. Most units are ready to use the same week they arrive.',
    photo: { src: '/images/finishing-paint.webp', alt: 'Painter checking a finished wall inside a cabin' },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
