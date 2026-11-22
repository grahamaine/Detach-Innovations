import { supabase } from '@/lib/supabase';
import { PROJECTS, type Project } from '@/lib/projects';
import { PRODUCTS, type Product } from '@/lib/products';

/** Projects for the public site: uploaded photos first (newest first), then the built-in set. */
export async function getProjects(): Promise<Project[]> {
  const db = supabase();
  if (!db) return PROJECTS;
  const { data, error } = await db
    .from('projects')
    .select('id, image_url, title, category, trace')
    .eq('published', true)
    .order('sort', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return PROJECTS;
  const uploaded: Project[] = data.map((r) => ({ id: r.id, src: r.image_url, title: r.title, category: r.category, trace: r.trace }));
  return [...uploaded, ...PROJECTS];
}

export type LiveProduct = Product & { priceNote?: string | null };

/** The built-in catalogue with any edits made in the admin portal (summary, price note, hidden). */
export async function getProducts(includeHidden = false): Promise<LiveProduct[]> {
  const db = supabase();
  if (!db) return PRODUCTS;
  const { data } = await db.from('product_overrides').select('slug, price_note, summary, hidden');
  const edits = new Map((data ?? []).map((r) => [r.slug, r]));
  return PRODUCTS.filter((p) => includeHidden || !edits.get(p.slug)?.hidden).map((p) => {
    const e = edits.get(p.slug);
    return e ? { ...p, summary: e.summary || p.summary, priceNote: e.price_note } : p;
  });
}
