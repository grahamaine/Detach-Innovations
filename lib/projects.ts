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
];
