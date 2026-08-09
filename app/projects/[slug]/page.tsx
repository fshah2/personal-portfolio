import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProjectContent } from '@/components/projects/project-content';
import {
  getProjectBySlug,
  getAllProjects,
  type Project,
} from '@/lib/data/projects';
import { parseArticle } from '@/lib/markdown/sections';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(project => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const article = parseArticle(project.body);

  const relatedProjects = getAllProjects()
    .filter((p: Project) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className='isolate min-h-screen'>
        <ProjectContent
          project={project}
          article={article}
          relatedProjects={relatedProjects}
        />
      </main>
      <Footer />
    </>
  );
}
