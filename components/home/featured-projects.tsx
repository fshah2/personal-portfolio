'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CTALink } from '@/components/shared/cta-link';
import { FilterTagLink } from '@/components/shared/filter-tag-link';
import { getProjectFilterHref } from '@/lib/filter-links';
import { type Project } from '@/lib/data/projects';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id='projects'
      className='relative isolate py-24 lg:py-32 bg-muted overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 pointer-events-none'>
        <div className='absolute -top-[10%] -right-[10%] w-[50%] h-[55%] rounded-full bg-secondary blur-[160px] opacity-[0.045]' />
      </div>
      <div className='container mx-auto px-6 lg:px-12'>
        {/* Section header */}
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16'>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='flex items-center gap-4 mb-5'>
              <div className='divider-accent bg-secondary!' />
              <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
                Projects
              </span>
            </motion.div>
            <div className='space-y-4'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='font-serif headline-lg'>
                Selected work
              </motion.h2>
              <p className='text-lg text-muted-foreground max-w-lg leading-relaxed'>
                Products, experiments, and developer tools that show how I
                think, build, and ship.
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}>
            <CTALink href='/projects' accent='secondary'>
              View all projects
            </CTALink>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className='space-y-1'>
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className='group'>
              <Link href={`/projects/${project.slug}`}>
                <div className='grid lg:grid-cols-12 gap-6 py-8 border-t border-border bg-background/40 hover:bg-background/60 transition-colors -mx-6 px-6 lg:-mx-12 lg:px-12'>
                  {/* Thumbnail */}
                  <div className='lg:col-span-2'>
                    <div className='w-full aspect-[4/3] lg:aspect-square bg-muted border border-border overflow-hidden relative'>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-500'
                        sizes='(max-width: 1024px) 100vw, 200px'
                      />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className='lg:col-span-4'>
                    <h3 className='font-serif headline text-xl lg:text-2xl font-semibold group-hover:text-secondary transition-colors mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-muted-foreground text-sm line-clamp-2 max-w-md'>
                      {project.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className='lg:col-span-3 flex lg:flex-col gap-4 lg:gap-2'>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider mb-1'>
                        Category
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {project.categories.map(category => (
                          <FilterTagLink
                            key={category}
                            href={getProjectFilterHref(category)}
                            ariaLabel={`View all ${category} projects`}
                            variant='secondary'
                            className='text-sm'>
                            {category}
                          </FilterTagLink>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider mb-1'>
                        Stack
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {project.techStack.map(tech => (
                          <span
                            key={tech}
                            className='px-3 py-1 text-xs font-mono bg-muted text-muted-foreground'>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Year & Arrow */}
                  <div className='lg:col-span-3 flex items-center justify-between lg:justify-end gap-4'>
                    <span className='text-sm text-muted-foreground'>
                      {project.year}
                    </span>
                    <div className='w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary transition-all'>
                      <ArrowUpRight className='h-4 w-4 text-muted-foreground group-hover:text-secondary-foreground transition-colors' />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom border */}
        <div className='border-t border-border' />
      </div>
    </section>
  );
}
