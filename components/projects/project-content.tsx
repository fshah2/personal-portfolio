'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon } from '@/components/shared/brand-icons';
import { type Project } from '@/lib/data/projects';
import { CTAButton } from '@/components/shared/cta-button';
import { CTALink, BackLink } from '@/components/shared/cta-link';
import { FilterTagLink } from '@/components/shared/filter-tag-link';
import { ArticleLayout } from '@/components/shared/article-layout';
import { PROJECT_TOC_DESKTOP_SCROLL_OFFSET } from '@/lib/constants';
import { getProjectFilterHref } from '@/lib/filter-links';
import type { ParsedArticle } from '@/lib/markdown/sections';

interface ProjectContentProps {
  project: Project;
  article: ParsedArticle;
  relatedProjects: Project[];
}

export function ProjectContent({
  project,
  article,
  relatedProjects,
}: ProjectContentProps) {
  return (
    <article className='relative'>
      <div className='relative w-full h-[40vh] md:h-[50vh] mt-16 lg:mt-20'>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent' />
      </div>

      <header className='relative pb-0 lg:pb-16 -mt-32 pt-8'>
        <div className='container mx-auto px-6 lg:px-12'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl'>
            <div className='flex items-center gap-6 mb-12'>
              <BackLink href='/projects' accent='secondary'>
                Projects
              </BackLink>
              <span className='w-px h-4 bg-border' />
              <div className='flex flex-wrap items-center gap-2'>
                {project.categories.map(category => (
                  <FilterTagLink
                    key={category}
                    href={getProjectFilterHref(category)}
                    ariaLabel={`View all ${category} projects`}
                    variant='secondary'>
                    {category}
                  </FilterTagLink>
                ))}
              </div>
            </div>

            <h1 className='font-serif headline-lg mb-8 max-w-5xl text-balance'>
              {project.title}
            </h1>

            <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10'>
              {project.longDescription}
            </p>

            <div className='flex flex-wrap gap-3 mb-10'>
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className='px-3 py-1 text-xs font-mono bg-muted text-muted-foreground'>
                  {tech}
                </span>
              ))}
            </div>

            <div className='flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-border'>
              {project.liveUrl && (
                <CTAButton
                  href={project.liveUrl}
                  external
                  accent='secondary'
                  trackEvent='project-live-click'
                  trackData={{ slug: project.slug, location: 'detail' }}>
                  View Live
                </CTAButton>
              )}
              {project.repoUrl && (
                <CTAButton
                  href={project.repoUrl}
                  external
                  accent='secondary'
                  trackEvent='project-repo-click'
                  trackData={{ slug: project.slug, location: 'detail' }}>
                  View Repository
                </CTAButton>
              )}
              {project.githubUrl && (
                <CTALink
                  href={project.githubUrl}
                  external
                  accent='secondary'
                  leadingIcon={<GithubIcon className='h-4 w-4' />}
                  trackEvent='project-github-click'
                  trackData={{ slug: project.slug, location: 'detail' }}>
                  Source Code
                </CTALink>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      <ArticleLayout
        article={article}
        basePath={`/content/projects/${project.slug}`}
        accent='secondary'
        keyTakeaways={project.keyTakeaways}
        desktopScrollOffset={PROJECT_TOC_DESKTOP_SCROLL_OFFSET}
      />

      {relatedProjects.length > 0 && (
        <section className='py-20 border-t border-border'>
          <div className='container mx-auto px-6 lg:px-12'>
            <div className='max-w-6xl'>
              <div className='flex items-center gap-4 mb-12'>
                <div className='w-8 h-px bg-secondary' />
                <h2 className='text-xs font-mono uppercase tracking-wider text-muted-foreground'>
                  More Projects
                </h2>
              </div>
              <div className='grid md:grid-cols-2 gap-8'>
                {relatedProjects.map((relatedProject, i) => (
                  <motion.article
                    key={relatedProject.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className='group flex gap-5 p-5 border border-border hover:border-secondary/50 transition-colors h-full'>
                    <Link
                      href={`/projects/${relatedProject.slug}`}
                      className='w-24 h-24 shrink-0 relative border border-border overflow-hidden'
                      aria-label={`View project: ${relatedProject.title}`}
                      tabIndex={-1}>
                      <Image
                        src={relatedProject.coverImage}
                        alt={relatedProject.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-500'
                        sizes='96px'
                      />
                    </Link>
                    <div className='flex flex-col min-w-0'>
                      <div className='flex flex-wrap gap-2 mb-2'>
                        {relatedProject.categories.map(category => (
                          <FilterTagLink
                            key={category}
                            href={getProjectFilterHref(category)}
                            ariaLabel={`View all ${category} projects`}
                            variant='secondary'>
                            {category}
                          </FilterTagLink>
                        ))}
                      </div>
                      <Link href={`/projects/${relatedProject.slug}`}>
                        <h3 className='font-serif headline text-lg font-semibold mb-2 group-hover:text-secondary transition-colors line-clamp-2'>
                          {relatedProject.title}
                        </h3>
                      </Link>
                      <p className='text-muted-foreground text-sm line-clamp-2 mb-3'>
                        {relatedProject.description}
                      </p>
                      <CTALink
                        href={`/projects/${relatedProject.slug}`}
                        accent='secondary'
                        className='mt-auto'>
                        View project
                      </CTALink>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
