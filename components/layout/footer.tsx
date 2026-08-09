import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { CTALink } from '@/components/shared/cta-link';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/#about', label: 'About' },
  ],
  social: [
    { href: 'https://www.linkedin.com/in/fenilkumar', label: 'LinkedIn' },
    { href: 'https://github.com/fshah2', label: 'GitHub' },
  ],
};

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--paper-dark)' }}
      className='relative isolate overflow-hidden border-t border-white/20 text-white'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 pointer-events-none'>
        <div className='absolute top-[-20%] left-[-10%] w-[55%] h-[80%] rounded-full bg-secondary blur-[160px] opacity-[0.18]' />
      </div>
      <div className='container mx-auto px-6 lg:px-12'>
        {/* Main footer content */}
        <div className='py-16 lg:py-20 grid lg:grid-cols-12 gap-4'>
          {/* Brand column */}
          <div className='lg:col-span-4 space-y-6'>
            <Link href='/' className='inline-block'>
              <span className='font-serif text-2xl font-bold text-white'>
                Fenil<span className='text-primary ml-2'>Shah</span>
              </span>
            </Link>
            <p className='text-white/85 max-w-xs'>
              Senior Software Engineer.
            </p>
          </div>

          {/* Links */}
          <div className='lg:col-span-2 lg:col-start-7'>
            <h3 className='text-xs uppercase tracking-wider text-white/70 mb-4'>
              Navigate
            </h3>
            <nav className='flex flex-col gap-3'>
              {footerLinks.navigation.map(link => (
                <CTALink
                  key={link.href}
                  href={link.href}
                  className='text-white! hover:text-primary!'>
                  {link.label}
                </CTALink>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className='lg:col-span-2'>
            <h3 className='text-xs uppercase tracking-wider text-white/70 mb-4'>
              Connect
            </h3>
            <nav className='flex flex-col gap-3'>
              {footerLinks.social.map(link => (
                <CTALink
                  key={link.href}
                  href={link.href}
                  external
                  className='text-white! hover:text-primary!'>
                  {link.label}
                </CTALink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className='lg:col-span-3'>
            <h3 className='text-xs uppercase tracking-wider text-white/70 mb-4'>
              Get in touch
            </h3>
            <CTALink
              href='mailto:fdshah10@gmail.com'
              external
              className='text-white! hover:text-primary!'>
              fdshah10@gmail.com
            </CTALink>
            <div className='mt-4 flex items-baseline gap-2 text-sm text-white/85'>
              <MapPin
                className='h-3.5 w-3.5 mt-0.5 shrink-0'
                aria-hidden='true'
              />
              <p className='mt-10'>
                Houston, Texas
                <br />
                <span className='italic text-sm mt-1'>
                  Remote &amp; hybrid friendly
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='py-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-white/80'>
            &copy; {new Date().getFullYear()} - Fenil Shah
          </p>
          <p className='text-xs text-white/80'>
            Built with care and ❤️ in Houston
          </p>
        </div>
      </div>
    </footer>
  );
}
