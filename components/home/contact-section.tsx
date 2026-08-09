'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/brand-icons';
import { CTAButton } from '@/components/shared/cta-button';

export function ContactSection() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setContactName(event.currentTarget.value);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.currentTarget.value);
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setHasError(false);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactName, contactEmail, contactMessage }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Request failed');
      }

      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setStatusMessage('Your message was successfully sent. Thank you!');
    } catch (error) {
      setHasError(true);
      setStatusMessage(
        error instanceof Error
          ? `Error sending message: ${error.message}`
          : 'Error sending message. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='contact'
      className='relative isolate py-24 lg:py-32 bg-foreground text-background scroll-mt-16 overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 pointer-events-none'>
        <div className='absolute bottom-[-20%] left-[20%] w-[60%] h-[55%] rounded-full bg-cyan blur-[160px] opacity-[0.06]' />
      </div>
      <div className='container mx-auto px-6 lg:px-12'>
        <div className='grid lg:grid-cols-12 gap-16 lg:gap-20'>
          {/* Left column - intro & contact info (leads visually) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-7 space-y-10'>
            <div className='flex items-center gap-4'>
              <div className='divider-accent' />
              <span className='text-xs uppercase tracking-wider text-background/60 font-medium'>
                Get In Touch
              </span>
            </div>

            <h2 className='font-serif headline-lg'>
              Looking for a full-stack engineer who ships?
            </h2>

            <p className='text-background/70 text-lg max-w-md leading-relaxed'>
              I&apos;m interested in full-stack engineering, backend and API
              work, and product teams building business-critical software.
            </p>

            {/* Contact links */}
            <div className='space-y-1 pt-2 max-w-md'>
              <a
                href='mailto:fdshah10@gmail.com'
                className='group flex items-center justify-between py-4 border-b border-background/20 hover:border-background/60 transition-colors'>
                <span className='flex items-center gap-3 text-base'>
                  <Mail className='h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity' />
                  fdshah10@gmail.com
                </span>
                <ArrowUpRight className='h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
              </a>

              <a
                href='https://www.linkedin.com/in/fenilkumar'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center justify-between py-4 border-b border-background/20 hover:border-background/60 transition-colors'>
                <span className='flex items-center gap-3 text-base'>
                  <LinkedinIcon className='h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity' />
                  LinkedIn
                </span>
                <ArrowUpRight className='h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
              </a>

              <a
                href='https://github.com/fshah2'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center justify-between py-4 border-b border-background/20 hover:border-background/60 transition-colors'>
                <span className='flex items-center gap-3 text-base'>
                  <GithubIcon className='h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity' />
                  GitHub
                </span>
                <ArrowUpRight className='h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
              </a>
            </div>

            <div className='pt-4'>
              <p className='inline-flex items-baseline gap-1.5 text-xs uppercase tracking-wider text-background/50 mb-2'>
                <MapPin className='h-3.5 w-3.5' />
                Location
              </p>
              <p className='text-lg'>Houston, Texas</p>
              <p className='text-background/70 text-sm mt-1'>
                Open to remote and hybrid opportunities.
              </p>
              <p className='text-background/70 text-sm mt-1'>
                Open to relocation in the U.S. for the right opportunity.
              </p>
            </div>
          </motion.div>

          {/* Right column - Restrained editorial form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='lg:col-span-5 lg:pt-2'>
            {/* Form eyebrow */}
            <div className='flex items-center gap-4 mb-10'>
              <div className='divider-accent' />
              <span className='text-xs uppercase tracking-wider text-background/60 font-medium'>
                Or send a message
              </span>
            </div>

            <form className='space-y-10' onSubmit={handleSubmit}>
              {/* Name */}
              <div className='group'>
                <label
                  htmlFor='name'
                  className='block text-xs uppercase tracking-wider text-background/50 font-medium mb-3'>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  name='contactName'
                  required
                  value={contactName}
                  onChange={handleChangeName}
                  placeholder='Your full name'
                  className='w-full bg-transparent border-0 border-b border-background/25 focus:border-cyan focus:outline-none px-0 pb-3 text-base text-background placeholder:text-background/30 transition-colors'
                />
              </div>

              {/* Email */}
              <div className='group'>
                <label
                  htmlFor='email'
                  className='block text-xs uppercase tracking-wider text-background/50 font-medium mb-3'>
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  name='contactEmail'
                  required
                  value={contactEmail}
                  onChange={handleChangeEmail}
                  placeholder='you@company.com'
                  className='w-full bg-transparent border-0 border-b border-background/25 focus:border-cyan focus:outline-none px-0 pb-3 text-base text-background placeholder:text-background/30 transition-colors'
                />
              </div>

              {/* Message */}
              <div className='group'>
                <label
                  htmlFor='message'
                  className='block text-xs uppercase tracking-wider text-background/50 font-medium mb-3'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='contactMessage'
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={handleChangeMessage}
                  placeholder='Tell me about your project or idea…'
                  className='w-full bg-transparent border-0 border-b border-background/25 focus:border-cyan focus:outline-none px-0 pb-3 text-base text-background placeholder:text-background/30 transition-colors resize-none'
                />
              </div>

              {/* Submit - sharp rectangular, consistent with site */}
              <div className='pt-2'>
                <CTAButton type='submit' inverted>
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </CTAButton>

                <p className='text-xs text-background/50 mt-6'>
                  I typically respond within 24 to 48 hours.
                </p>

                {statusMessage ? (
                  <p
                    role='status'
                    aria-live='polite'
                    className={`mt-4 rounded-sm border-l-2 px-3 py-2 text-sm font-medium text-background ${
                      hasError
                        ? 'border-red-300/90 bg-red-500/10'
                        : 'border-cyan bg-cyan/10 text-cyan'
                    }`}>
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
