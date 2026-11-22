'use client';

import { useCallback, useEffect, useState } from 'react';
import { Upload, Eye, EyeOff, Trash2, ImagePlus, Camera } from 'lucide-react';
import { supabase, PHOTO_BUCKET } from '@/lib/supabase';
import { traceImage, type Trace } from '@/lib/trace';
import { PROJECT_CATEGORIES } from '@/lib/projects';
import BuildImg from '@/components/BuildImg';
import { btnDanger, btnPrimary, btnQuiet, card, field } from '@/components/admin/ui';

type Row = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  storage_path: string | null;
  trace: Trace | null;
  published: boolean;
};

type Draft = { blob: Blob; url: string; trace: Trace };

const MAX_SIDE = 1600;

// Shrinks the photo to web size (WebP) and traces its lines for the blueprint effect.
async function prepare(file: File): Promise<Draft> {
  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = src;
    await img.decode();
    const s = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const W = Math.round(img.naturalWidth * s);
    const H = Math.round(img.naturalHeight * s);
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.getContext('2d')!.drawImage(img, 0, 0, W, H);
    const blob = await new Promise<Blob>((ok, fail) =>
      canvas.toBlob((b) => (b ? ok(b) : fail(new Error('Could not read that photo.'))), 'image/webp', 0.82),
    );
    const trace = traceImage(canvas, W, H);
    return { blob, url: URL.createObjectURL(blob), trace };
  } finally {
    URL.revokeObjectURL(src);
  }
}

export default function ProjectsTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase()!
      .from('projects')
      .select('id, title, category, image_url, storage_path, trace, published')
      .order('sort')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    setRows(data ?? []);
  }, []);

  useEffect(() => {
    queueMicrotask(load);
  }, [load]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setBusy('Preparing the photo and tracing its lines…');
    try {
      if (draft) URL.revokeObjectURL(draft.url);
      setDraft(await prepare(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read that photo.');
    }
    setBusy('');
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft) return setError('Choose a photo first.');
    const form = e.currentTarget;
    const d = new FormData(form);
    const db = supabase()!;
    setBusy('Uploading…');
    setError('');
    const path = `${crypto.randomUUID()}.webp`;
    const up = await db.storage.from(PHOTO_BUCKET).upload(path, draft.blob, { contentType: 'image/webp', cacheControl: '31536000' });
    if (up.error) {
      setBusy('');
      return setError(up.error.message);
    }
    const image_url = db.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
    const { error } = await db.from('projects').insert({
      title: String(d.get('title')).trim(),
      category: String(d.get('category')),
      image_url,
      storage_path: path,
      trace: draft.trace,
      published: d.get('published') === 'on',
    });
    setBusy('');
    if (error) {
      await db.storage.from(PHOTO_BUCKET).remove([path]);
      return setError(error.message);
    }
    URL.revokeObjectURL(draft.url);
    setDraft(null);
    form.reset();
    load();
  }

  async function toggle(r: Row) {
    const { error } = await supabase()!.from('projects').update({ published: !r.published }).eq('id', r.id);
    if (error) return setError(error.message);
    setRows((rs) => rs?.map((x) => (x.id === r.id ? { ...x, published: !r.published } : x)) ?? null);
  }

  async function remove(r: Row) {
    if (!window.confirm(`Delete “${r.title}”? The photo is removed from the website.`)) return;
    const db = supabase()!;
    const { error } = await db.from('projects').delete().eq('id', r.id);
    if (error) return setError(error.message);
    if (r.storage_path) await db.storage.from(PHOTO_BUCKET).remove([r.storage_path]);
    setRows((rs) => rs?.filter((x) => x.id !== r.id) ?? null);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSave} className={`${card} space-y-4`}>
        <h2 className="flex items-center gap-2 text-lg font-bold"><ImagePlus size={22} className="text-brand" aria-hidden="true" /> Add a project photo</h2>
        <p className="text-sm text-slate-600">
          The photo is resized for the web and its lines are traced automatically, so it draws itself as a blueprint on the Projects page.
        </p>
        <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm font-medium text-slate-700 hover:border-brand">
          <Camera size={28} className="text-brand" aria-hidden="true" />
          {draft ? 'Choose a different photo' : 'Take or choose a photo'}
          <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
        </label>
        {draft && (
          <div className="max-w-xs overflow-hidden rounded-xl border border-slate-200">
            <BuildImg key={draft.url} src={draft.url} trace={draft.trace} alt="Preview" className="block h-auto w-full" frameClass="w-full" />
            <p className="px-3 py-2 text-xs text-slate-500">
              {draft.trace.w} × {draft.trace.h} · {draft.trace.lines.length} lines traced · tap to replay
            </p>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Title
            <input name="title" required maxLength={120} placeholder="Studio cabin, Kajjansi" className={`mt-1 ${field}`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Category
            <select name="category" className={`mt-1 ${field}`}>
              {PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked className="h-5 w-5" /> Show on the website
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {busy && <p className="text-sm text-slate-500">{busy}</p>}
        <button className={btnPrimary} disabled={Boolean(busy)}><Upload size={18} aria-hidden="true" /> Add photo</button>
      </form>

      <section>
        <h2 className="mb-3 text-lg font-bold">Uploaded photos</h2>
        {!rows && <p className="text-slate-500">Loading…</p>}
        {rows?.length === 0 && (
          <p className="text-slate-600">None yet. The website&apos;s built-in photos still show on the Projects page; photos you add appear before them.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows?.map((r) => (
            <div key={r.id} className={`${card} p-0 md:p-0 overflow-hidden`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image_url} alt={r.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="space-y-3 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{r.title}</p>
                  <p className="text-sm text-slate-500">{r.category} · {r.published ? 'On the website' : 'Hidden'}</p>
                </div>
                <div className="flex gap-2">
                  <button className={btnQuiet} onClick={() => toggle(r)}>{r.published ? <><EyeOff size={16} aria-hidden="true" /> Hide</> : <><Eye size={16} aria-hidden="true" /> Show</>}</button>
                  <button className={btnDanger} onClick={() => remove(r)}><Trash2 size={16} aria-hidden="true" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
