import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once the Supabase env vars are set on Vercel. Until then the site runs on its built-in data. */
export const hasSupabase = Boolean(url && key);

let browser: SupabaseClient | null = null;

/** Supabase client using the public key. Row-level security decides what it can read or write. */
export function supabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (typeof window === 'undefined') return createClient(url, key, { auth: { persistSession: false } });
  browser ??= createClient(url, key);
  return browser;
}

export const PHOTO_BUCKET = 'project-photos';
