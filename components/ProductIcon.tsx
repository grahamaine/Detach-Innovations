import { House, AppWindow, Container, Armchair, Tent, Package, Hammer, type LucideProps } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  'studio-cabins': House,
  'glass-panel-cabins': AppWindow,
  'container-conversions': Container,
  'modular-steel-furniture': Armchair,
  'shade-lounges': Tent,
  'custom-steel-work': Hammer,
};

export default function ProductIcon({ slug, ...props }: { slug: string } & LucideProps) {
  const Icon = ICONS[slug] ?? Package;
  return <Icon aria-hidden="true" {...props} />;
}
