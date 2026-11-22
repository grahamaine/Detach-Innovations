import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { PRODUCTS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl;
  return [
    '', '/products', '/projects', '/steel', '/about', '/contact', '/request',
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
  ].map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 }));
}
