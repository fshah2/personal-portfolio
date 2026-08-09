'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FilterTagLink } from '@/components/shared/filter-tag-link';
import { SectionFilterBar } from '@/components/shared/section-filter-bar';
import { getProjectFilterHref, getProjectPageHref } from '@/lib/filter-links';
import { type Project } from '@/lib/data/projects';

const PROJECTS_PER_PAGE = 11;

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects: allProjects }: ProjectListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectCategories = useMemo(
    () => [
      'All',
      ...new Set(allProjects.flatMap(project => project.categories)),
    ],
    [allProjects],
  );

  const categoryFromUrl = searchParams.get('category');
  const selectedCategory =
    categoryFromUrl && projectCategories.includes(categoryFromUrl)
      ? categoryFromUrl
      : 'All';

  const handleCategoryChange = (category: string) => {
    const nextHref = getProjectFilterHref(category);

    if (pathname === '/projects') {
      router.replace(nextHref, { scroll: false });
    }
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter(project =>
          project.categories.includes(selectedCategory),
        );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );
  const pageFromUrl = Number(searchParams.get('page'));
  const currentPage =
    Number.isInteger(pageFromUrl) &&
    pageFromUrl >= 1 &&
    pageFromUrl <= totalPages
      ? pageFromUrl
      : 1;
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  const otherProjects = paginatedProjects;

  const goToPage = (page: number) => {
    if (pathname !== '/projects') return;
    router.replace(getProjectPageHref(selectedCategory, page), {
      scroll: false,
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='container mx-auto px-6 lg:px-12 py-12 lg:py-20'>
      {/* Header */}
      <div className='max-w-3xl mb-16'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='font-serif headline-lg mb-6'>
          Projects &amp;
          <br />
          experiments
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-lg text-muted-foreground'>
          A mix of live full-stack apps, iOS apps, and data pipelines, showing
          how I explore ideas, validate workflows, and ship usable software.
        </motion.p>
      </div>

      {/* Section Label & Category Filter */}
      {projectCategories.length > 1 && (
        <SectionFilterBar
          label='Projects'
          options={projectCategories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
          variant='secondary'
        />
      )}

      {/* Projects */}
      {otherProjects.length > 0 && (
        <div className='space-y-0 mt-8'>
          {otherProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className='group relative'>
              {/* Main clickable area */}
              <Link
                href={`/projects/${project.slug}`}
                className='absolute inset-0 z-0'
                aria-label={`View ${project.title} project`}
              />

              <div className='relative grid lg:grid-cols-12 gap-6 py-10 border-b border-border transition-colors group-hover:bg-muted/20 -mx-6 px-6 lg:-mx-12 lg:px-12 pointer-events-none'>
                {/* Number & Year */}
                <div className='lg:col-span-1 flex lg:flex-col gap-4 lg:gap-2'>
                  <span className='font-mono text-sm text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {project.year}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className='hidden lg:block lg:col-span-2'>
                  <div className='relative aspect-video overflow-hidden border border-border'>
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                      sizes='(min-width: 1024px) 16vw, 0px'
                    />
                  </div>
                </div>

                {/* Title & Description */}
                <div className='lg:col-span-4'>
                  <h3 className='font-serif headline text-2xl font-semibold mb-3 group-hover:text-secondary transition-colors'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground line-clamp-2'>
                    {project.description}
                  </p>
                </div>

                {/* Meta */}
                <div className='lg:col-span-3'>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                        Category
                      </p>
                      <div className='flex flex-wrap gap-2 mt-1'>
                        {project.categories.map(category => (
                          <FilterTagLink
                            key={category}
                            href={getProjectFilterHref(category)}
                            ariaLabel={`View all ${category} projects`}
                            variant='secondary'
                            className='pointer-events-auto'>
                            {category}
                          </FilterTagLink>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                        Stack
                      </p>
                      <p className='text-sm'>
                        {project.techStack.slice(0, 3).join(' / ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Links & Arrow */}
                <div className='lg:col-span-2 flex items-center justify-end gap-3 relative z-10'>
                  <div className='w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary transition-all'>
                    <ArrowUpRight className='h-4 w-4 text-muted-foreground group-hover:text-secondary-foreground transition-colors' />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className='text-center py-20'>
          <p className='text-muted-foreground'>
            No projects found in this category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredProjects.length > PROJECTS_PER_PAGE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='flex items-center justify-center gap-4 pt-8 border-t border-border'>
          <button
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
            <ChevronLeft className='h-4 w-4' />
            Previous
          </button>

          <div className='flex items-center gap-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-mono transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}>
                {String(page).padStart(2, '0')}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
            Next
            <ChevronRight className='h-4 w-4' />
          </button>
        </motion.div>
      )}
    </div>
  );
}
