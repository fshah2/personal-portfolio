import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  slug: string;
  title: string;
  year: string;
  description: string;
  longDescription: string;
  body: string;
  coverImage: string;
  liveUrl?: string;
  repoUrl?: string;
  githubUrl?: string;
  categories: string[];
  techStack: string[];
  featured?: boolean;
  order?: number;
  keyTakeaways: string[];
}

const contentDir = path.join(process.cwd(), 'content/projects');

function readProject(slug: string): Project | undefined {
  const file = path.join(contentDir, slug, 'index.md');
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
  const categoriesFromFrontmatter = Array.isArray(data.categories)
    ? data.categories
    : [];
  const categoriesFromLegacyFields = [data.category ?? data.type];
  const categories = [
    ...new Set(
      [...categoriesFromFrontmatter, ...categoriesFromLegacyFields]
        .map(value => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean),
    ),
  ];

  return {
    slug,
    title: data.title,
    year: data.year,
    description: data.description,
    longDescription: data.longDescription,
    body: content,
    coverImage: `/content/projects/${slug}/${data.coverImage}`,
    liveUrl: data.liveUrl,
    repoUrl: data.repoUrl,
    githubUrl: data.githubUrl,
    categories,
    techStack: data.techStack ?? [],
    featured: data.featured,
    order: data.order,
    keyTakeaways: data.keyTakeaways ?? [],
  };
}

export function getProjectBySlug(slug: string): Project | undefined {
  return readProject(slug);
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => readProject(d.name))
    .filter((p): p is Project => p !== undefined)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter(project =>
    project.categories.includes(category),
  );
}
