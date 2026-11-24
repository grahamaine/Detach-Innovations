// Completed and in-progress work shown on /projects.
// Photos added in the admin portal are listed after these.
export type ProjectCategory = 'Cabins' | 'Containers' | 'Interiors' | 'Furniture' | 'Outdoor' | 'In the yard';

export type Project = {
  id: string;
  src: string;
  title: string;
  category: ProjectCategory;
  /** Lines traced from the photo; only for photos uploaded in the admin portal. */
  trace?: { w: number; h: number; lines: number[][] } | null;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = ['Cabins', 'Containers', 'Interiors', 'Furniture', 'Outdoor', 'In the yard'];

export const PROJECTS: Project[] = [
  { id: 's-red-corner', src: '/images/studio-red-corner.webp', title: 'Studio cabin with covered deck', category: 'Cabins' },
  { id: 's-cabin-front', src: '/images/cabin-front.webp', title: 'Glass-panel cabin', category: 'Cabins' },
  { id: 's-red-deck', src: '/images/studio-red-deck.webp', title: 'Studio cabin veranda', category: 'Cabins' },
  { id: 's-container', src: '/images/container-mural.webp', title: 'Container conversion with mural', category: 'Containers' },
  { id: 's-glazed', src: '/images/glazed-front.webp', title: 'Glazed entrance and ramp', category: 'Cabins' },
  { id: 's-cabin-side', src: '/images/cabin-side.webp', title: 'Glass-panel cabin, side', category: 'Cabins' },
  { id: 's-kitchenette', src: '/images/studio-kitchenette.webp', title: 'Kitchenette and shower room', category: 'Interiors' },
  { id: 's-bedroom', src: '/images/studio-bedroom.webp', title: 'Studio bedroom', category: 'Interiors' },
  { id: 's-sliding', src: '/images/studio-sliding-door.webp', title: 'Bedroom with sliding doors', category: 'Interiors' },
  { id: 's-raised-deck', src: '/images/studio-raised-deck.webp', title: 'Raised deck on block plinth', category: 'Cabins' },
  { id: 's-deck-garden', src: '/images/studio-deck-garden.webp', title: 'Deck seating', category: 'Outdoor' },
  { id: 's-garden-lounge', src: '/images/garden-lounge.webp', title: 'Garden shade lounge', category: 'Outdoor' },
  { id: 's-lounge-seating', src: '/images/lounge-seating.webp', title: 'Lounge seating', category: 'Outdoor' },
  { id: 's-modular', src: '/images/modular-set.webp', title: 'Modular steel furniture set', category: 'Furniture' },
  { id: 's-frame-pair', src: '/images/steel-frame-pair.webp', title: 'Steel seating frames', category: 'Furniture' },
  { id: 's-frame-single', src: '/images/steel-frame-single.webp', title: 'Steel sofa frame', category: 'Furniture' },
  { id: 's-fitting', src: '/images/on-site-fitting.webp', title: 'Fitting on site', category: 'In the yard' },
  { id: 's-cutting', src: '/images/workshop-cutting.webp', title: 'Cutting in the yard', category: 'In the yard' },
  { id: 's-grinding', src: '/images/workshop-grinding.webp', title: 'Grinding and finishing', category: 'In the yard' },
  { id: 's-paint', src: '/images/finishing-paint.webp', title: 'Interior painting', category: 'In the yard' },
  { id: 's-two-tone', src: '/images/studio-two-tone.webp', title: 'Zero-earth pre-made studio', category: 'Cabins' },
  { id: 's-railings', src: '/images/studio-railings.webp', title: 'Balcony railings on a block plinth', category: 'Cabins' },
  { id: 's-green-deck', src: '/images/green-cabin-deck.webp', title: 'Green-panel cabin and deck', category: 'Cabins' },
  { id: 's-mural-garden', src: '/images/mural-container-garden.webp', title: 'Mural container in the garden', category: 'Containers' },
  { id: 's-interior', src: '/images/finished-interior.webp', title: 'Finished interior', category: 'Interiors' },
  { id: 's-glass-table', src: '/images/steel-glass-table.webp', title: 'Steel and glass table', category: 'Furniture' },
  { id: 's-pergola', src: '/images/pergola-benches.webp', title: 'Steel-framed benches under a pergola', category: 'Furniture' },
  { id: 's-ladder', src: '/images/steel-step-ladder.webp', title: 'Steel step ladder', category: 'Furniture' },
  { id: 's-courtyard', src: '/images/courtyard-seating.webp', title: 'Courtyard lounge', category: 'Outdoor' },
  { id: 's-base-frame', src: '/images/zero-earth-base-frame.webp', title: 'Zero-earth base frame on blocks', category: 'In the yard' },
];
