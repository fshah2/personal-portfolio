'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/brand-icons';
import { CTAButton } from '@/components/shared/cta-button';
import { CTALink } from '@/components/shared/cta-link';
import { TechStrip } from '@/components/home/tech-strip';
import { umamiTrackProps } from '@/lib/analytics';
import { type Project } from '@/lib/data/projects';
import { heroStats } from '@/lib/data/stats';

interface HeroProps {
  latestProject?: Project;
}

export function Hero({ latestProject }: HeroProps) {
  return (
    <section className='relative isolate min-h-[100svh] flex flex-col overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 pointer-events-none'>
        <div className='absolute -top-[15%] -left-[10%] w-[55%] h-[60%] rounded-full bg-cyan blur-[160px] opacity-[0.04]' />
        <div className='absolute top-[30%] -right-[5%] w-[40%] h-[50%] rounded-full bg-magenta blur-[140px] opacity-[0.03]' />
      </div>
      {/* Main content */}
      <div className='flex-1 flex items-center pt-28 pb-12 lg:pt-24 lg:pb-16'>
        <div className='container mx-auto px-6 lg:px-12'>
          <div className='grid lg:grid-cols-12 gap-10 lg:gap-12 items-start'>
            {/* Text column */}
            <div className='lg:col-span-8 xl:col-span-8 flex flex-col gap-8 lg:pt-8'>
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='flex items-center gap-4'>
                <div className='divider-accent' />
                <span className='inline-flex items-baseline gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium'>
                  <MapPin className='h-3.5 w-3.5' />
                  Houston, TX
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-lg text-muted-foreground max-w-lg leading-relaxed'>
                Hi 👋, I&apos;m Fenil Shah.
              </motion.p>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='font-serif headline-lg'>
                <span className='block'>Full-stack engineer.</span>
                <span className='block text-primary'>From API to UI.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-lg text-muted-foreground max-w-lg leading-relaxed'>
                I build full-stack web platforms and{' '}
                <span className='font-bold text-foreground'>REST APIs</span> with{' '}
                <span className='font-bold text-foreground'>C#/.NET</span>,{' '}
                <span className='font-bold text-foreground'>TypeScript</span>,
                and <span className='font-bold text-foreground'>Python</span>,
                from SSO and backend services to responsive UIs, and design data
                integrations and automation pipelines on AWS. On the side I ship
                projects like a{' '}
                <CTALink
                  href='/projects/bilt-rewards-calculator'
                  className='text-lg text-primary hover:text-primary/80 transition-colors'>
                  Bilt Rewards calculator
                </CTALink>
                .
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='flex flex-wrap items-center gap-x-8 gap-y-4 pt-2'>
                <CTAButton href='#contact' trackEvent='hero-contact-click'>
                  Get in touch
                </CTAButton>

                <div className='flex items-center gap-6'>
                  <CTALink href='/projects' trackEvent='hero-projects-click'>
                    View my projects
                  </CTALink>
                  <CTALink
                    href='https://github.com/fshah2'
                    external
                    trackEvent='hero-github-click'>
                    See my GitHub
                  </CTALink>
                </div>
              </motion.div>

              {/* Tech showcase */}
              <TechStrip />
            </div>

            {/* Right column: photo + info modules */}
            <div className='lg:col-span-4 xl:col-span-4 flex flex-col gap-6'>
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className='relative max-w-xs ml-auto w-full'>
                <div className='relative aspect-[4/5] bg-muted border border-primary overflow-hidden'>
                  <Image
                    src='/images/profile.jpg'
                    alt='Fenil Shah'
                    fill
                    className='object-cover object-top'
                    priority
                    sizes='(max-width: 1024px) 80vw, 320px'
                  />
                </div>
                <div className='absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-primary hidden lg:block' />
                {/* Currently caption */}
                <div className='flex items-baseline gap-3 mt-3 pl-1'>
                  <span className='relative flex h-2 w-2 -left-1'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-primary' />
                  </span>
                  <p className='text-xs text-muted-foreground font-mono'>
                    Currently working at{' '}
                    <span className='text-primary'>Resource Data</span> as a
                    Senior Software Engineer
                  </p>
                </div>
              </motion.div>

              {/* Latest content modules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='flex flex-col divide-y divide-border border-y border-border my-10 [@media(min-width:1024px)_and_(max-height:1100px)]:hidden'>
                {/* Latest project */}
                {latestProject && (
                  <Link
                    href={`/projects/${latestProject.slug}`}
                    className='group flex items-start gap-4 py-4 hover:bg-muted/40 transition-colors px-1 -mx-1'
                    {...umamiTrackProps('project-click', {
                      slug: latestProject.slug,
                      location: 'hero-latest',
                    })}>
                    <span className='flex-shrink-0 text-xs uppercase tracking-wider text-muted-foreground font-mono pt-0.5 w-20'>
                      Latest
                      <br />
                      Project
                    </span>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug'>
                        {latestProject.title}
                      </p>
                      <p className='text-xs text-muted-foreground mt-1 font-mono'>
                        {latestProject.categories.join(' · ')}
                      </p>
                    </div>
                    <ArrowUpRight className='h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5' />
                  </Link>
                )}
              </motion.div>

              {/* Connect group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='flex flex-col gap-3 mt-4'>
                <div className='flex items-center gap-4'>
                  <div className='divider-accent' />
                  <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
                    Contact me
                  </span>
                </div>

                <div className='flex flex-col'>
                  <a
                    href='mailto:fdshah10@gmail.com'
                    className='group flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors'
                    {...umamiTrackProps('contact-email-click', {
                      location: 'hero',
                    })}>
                    <Mail className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0' />
                    <span className='font-mono text-xs truncate'>
                      fdshah10@gmail.com
                    </span>
                    <span
                      aria-hidden='true'
                      className='h-px flex-1 bg-border'
                    />
                    <ArrowUpRight className='h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0' />
                  </a>
                  <a
                    href='https://www.linkedin.com/in/fenilkumar'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors'
                    {...umamiTrackProps('social-click', {
                      network: 'linkedin',
                      location: 'hero',
                    })}>
                    <LinkedinIcon className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0' />
                    <span className='font-mono text-xs truncate'>
                      linkedin.com/in/fenilkumar
                    </span>
                    <span
                      aria-hidden='true'
                      className='h-px flex-1 bg-border'
                    />
                    <ArrowUpRight className='h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0' />
                  </a>
                  <a
                    href='https://github.com/fshah2'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors'
                    {...umamiTrackProps('social-click', {
                      network: 'github',
                      location: 'hero',
                    })}>
                    <GithubIcon className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0' />
                    <span className='font-mono text-xs truncate'>
                      github.com/fshah2
                    </span>
                    <span
                      aria-hidden='true'
                      className='h-px flex-1 bg-border'
                    />
                    <ArrowUpRight className='h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0' />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className='border-t border-border'>
        <div className='container mx-auto px-6 lg:px-12'>
          <div className='flex items-center justify-between py-6'>
            {/* Stats */}
            <div className='hidden md:flex items-center gap-12'>
              {heroStats.map((stat, index) => (
                <div key={stat.label} className='contents'>
                  <div>
                    <p className='text-2xl font-serif font-bold'>
                      {stat.value}
                    </p>
                    <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                      {stat.label}
                    </p>
                  </div>
                  {index < heroStats.length - 1 && (
                    <div className='h-8 w-px bg-border' />
                  )}
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.button
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='group flex items-center gap-2 text-sm text-cyan hover:text-cyan hover:cursor-pointer transition-colors ml-auto md:ml-0'>
              <span className='hidden sm:inline'>Scroll to explore</span>
              <ArrowDown className='h-4 w-4 transition-transform group-hover:scale-150' />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
