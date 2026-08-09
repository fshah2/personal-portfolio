'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CTAButton } from '@/components/shared/cta-button';
import { CTALink } from '@/components/shared/cta-link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className='relative isolate min-h-svh flex flex-col overflow-hidden'>
        {/* Background blobs */}
        <div
          aria-hidden='true'
          className='absolute inset-0 -z-10 pointer-events-none'>
          <div className='absolute top-[-10%] left-[-5%] w-[50%] h-[55%] rounded-full bg-cyan blur-[160px] opacity-[0.04]' />
          <div className='absolute bottom-[10%] right-[-5%] w-[40%] h-[45%] rounded-full bg-magenta blur-[140px] opacity-[0.03]' />
        </div>

        <div className='flex-1 flex items-center'>
          <div className='container mx-auto px-6 lg:px-12 py-28'>
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
              {/* Text column */}
              <div className='flex flex-col gap-8'>
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='flex items-center gap-4'>
                  <div className='divider-accent' />
                  <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium font-mono'>
                    404 · Error
                  </span>
                </motion.div>

                {/* 404 number */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className='headline-xl text-primary select-none'>
                  404
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='headline-lg'>
                  Page not found.
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className='text-lg text-muted-foreground max-w-lg leading-relaxed'>
                  The page you&apos;re looking for doesn&apos;t exist or has
                  been moved. Let&apos;s get you back on track.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className='flex flex-wrap items-center gap-x-8 gap-y-4 pt-2'>
                  <CTAButton href='/' icon={<Home className='h-4 w-4' />}>
                    Go home
                  </CTAButton>

                  <div className='flex items-center gap-6'>
                    <CTALink href='/projects'>Projects</CTALink>
                    <CTALink href='/#contact'>Contact</CTALink>
                  </div>
                </motion.div>
              </div>

              {/* Image column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className='relative flex justify-center lg:justify-end'>
                <Image
                  src='/images/404.png'
                  alt='A confused robot standing next to a signpost labelled "Page Not Found"'
                  width={600}
                  height={400}
                  className='w-full max-w-md lg:max-w-3xl object-contain'
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
