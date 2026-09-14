import { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProjectList } from '@/components/projects/project-list';
import { getAllProjects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A collection of my side projects: web apps, iOS apps, data pipelines, and homelab infrastructure.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <main className='relative isolate min-h-screen pt-24 overflow-hidden'>
        <div
          aria-hidden='true'
          className='absolute inset-0 -z-10 pointer-events-none'>
          <div className='absolute top-[-15%] left-[-10%] w-[55%] h-[60%] rounded-full bg-cyan blur-[160px] opacity-[0.04]' />
          <div className='absolute top-[30%] right-[-5%] w-[40%] h-[50%] rounded-full bg-secondary blur-[140px] opacity-[0.03]' />
        </div>
        <Suspense>
          <ProjectList projects={projects} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
