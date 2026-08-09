'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTALink } from '@/components/shared/cta-link';
import { aboutStats } from '@/lib/data/stats';

const techStack = {
  languages: ['C#', 'TypeScript', 'JavaScript', 'Python', 'Swift', 'Java'],
  frameworks: [
    '.NET / .NET Core',
    'ASP.NET MVC',
    'React',
    'Next.js',
    'Node.js',
    'Spring Boot',
  ],
  cloud: [
    'AWS (ECS, SES, Route 53)',
    'Azure',
    'Docker',
    'Git',
    'GitHub Actions',
  ],
  data: ['SQL Server', 'MySQL', 'PostgreSQL', 'Snowflake', 'BigQuery', 'DynamoDB'],
};

export function AboutSection() {
  return (
    <section
      id='about'
      className='relative isolate py-24 lg:py-32 scroll-mt-16 bg-muted overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 pointer-events-none'>
        <div className='absolute top-[10%] -right-[10%] w-[45%] h-[55%] rounded-full bg-magenta blur-[150px] opacity-[0.035]' />
        <div className='absolute -bottom-[10%] -left-[5%] w-[35%] h-[40%] rounded-full bg-cyan blur-[120px] opacity-[0.03]' />
      </div>
      <div className='container mx-auto px-6 lg:px-12'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-20'>
          {/* Left column - sticky */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-5 lg:sticky lg:top-24 lg:self-start'>
            <div className='flex items-center gap-4 mb-5'>
              <div className='divider-accent' />
              <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
                About
              </span>
            </div>
            <h2 className='font-serif headline-lg mb-6'>
              The Person
              <br />
              Behind The Code
            </h2>

            {/* Image */}
            <div className='relative mt-8'>
              <div className='aspect-[4/5] relative border border-primary overflow-hidden'>
                <Image
                  src='/images/profile.jpg'
                  alt='Fenil Shah'
                  fill
                  className='object-cover object-top'
                />
              </div>
              {/* Accent line */}
              <div className='absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-primary hidden lg:block' />
            </div>
          </motion.div>

          {/* Right column - content */}
          <div className='lg:col-span-7 space-y-12'>
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='space-y-6'>
              <p className='text-xl lg:text-2xl font-serif leading-relaxed'>
                I&apos;m a Senior Software Engineer based in Houston, Texas, with
                4+ years shipping business-critical, full-stack systems in
                production across C#/.NET, TypeScript, and Python.
              </p>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  I currently work as a Senior Software Engineer at Resource
                  Data, where I architected and shipped a full-stack .NET/C# and
                  TypeScript web platform (SSO, REST APIs, backend services,
                  and a responsive UI) driving dynamic rule-based logic for a
                  business-critical student fund purchasing system. I own the
                  AWS ECS deployment pipeline for our containerized services and
                  mentor engineers on codebase standards and code review.
                </p>
                <p>
                  Before that, I built data integrations moving records across
                  50+ vendor systems into a central SIS (cutting data errors
                  23%), automated 10+ scheduled data workflows on AWS SES, and
                  worked across SQL Server, BigQuery, Snowflake, and MySQL.
                  Earlier in my career at Paycom I built OOP-based HR software
                  used by 1,000+ clients.
                </p>
                <p>
                  I like owning a service end-to-end: shipping frequently,
                  writing unit and integration tests, and holding code to a high
                  standard. Whether it&apos;s a .NET web platform, a Spring Boot
                  REST API, or a Python ETL pipeline, my focus is reliable
                  systems that make real work faster.
                </p>
                <p>
                  Outside of work I build side projects like a{' '}
                  <CTALink
                    href='/projects/bilt-rewards-calculator'
                    className='text-base text-primary hover:text-primary/80 transition-colors'>
                    Bilt Rewards calculator
                  </CTALink>
                  , a Texas grid-status dashboard, an electricity-pricing ETL,
                  and iOS apps. I hold a B.S. in Computer Science from the
                  University of Houston.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-border'>
              {aboutStats.map(stat => (
                <div key={stat.label}>
                  <span className='block font-serif text-4xl lg:text-5xl font-bold text-primary'>
                    {stat.value}
                  </span>
                  <span className='text-sm text-muted-foreground mt-2 block'>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='space-y-8'>
              <h3 className='font-serif headline text-xl font-semibold'>
                Technical Expertise
              </h3>

              <div className='grid sm:grid-cols-2 gap-8'>
                {Object.entries(techStack).map(([category, techs]) => (
                  <div key={category}>
                    <h4 className='text-xs font-mono uppercase tracking-wider text-primary mb-3'>
                      {category}
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {techs.map(tech => (
                        <span
                          key={tech}
                          className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                          {tech}
                          {techs.indexOf(tech) < techs.length - 1 && (
                            <span className='mx-1 text-border'>/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
