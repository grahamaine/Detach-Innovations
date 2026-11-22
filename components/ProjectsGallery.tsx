'use client';

import { useState } from 'react';
import BuildImg from '@/components/BuildImg';
import { PROJECT_CATEGORIES, type Project } from '@/lib/projects';

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All');
  const used = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c));
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {['All', ...used].map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold uppercase tracking-wide transition ${
              filter === f ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-brand hover:text-brand'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {list.map((p) => (
          <figure key={p.id} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <BuildImg
              src={p.src}
              alt={p.title}
              trace={p.trace}
              loading="lazy"
              className="block h-auto w-full"
              frameClass="w-full"
            />
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="font-semibold text-slate-900">{p.title}</span>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">{p.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
