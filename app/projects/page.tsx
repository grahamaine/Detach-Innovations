import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectsGallery from '@/components/ProjectsGallery';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Studio cabins, glass-panel cabins, container conversions, interiors and steel furniture built by Detach Innovations in Entebbe.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold uppercase text-slate-900">Our Projects</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Every job starts as a drawing. Watch each one come off the drawing board, then see the finished work. Tap a photo to replay it.
        </p>
      </header>
      <ProjectsGallery projects={projects} />
      <div className="mt-12 text-center">
        <Link href="/request" className="btn-shine inline-block rounded-xl bg-brand px-8 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-dark">
          Request a quote
        </Link>
      </div>
    </div>
  );
}
