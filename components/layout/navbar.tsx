'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isArticlePage =
    pathname.startsWith('/projects/') && pathname !== '/projects';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHashLink = (href: string) => href.startsWith('/#');

  const handleHashNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobileMenu = false,
  ) => {
    if (!isHashLink(href) || pathname !== '/') return;

    event.preventDefault();
    const sectionId = href.replace('/#', '');
    const section = document.getElementById(sectionId);

    if (closeMobileMenu) {
      setIsMobileMenuOpen(false);
    }

    if (!section) {
      window.location.hash = sectionId;
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `/#${sectionId}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isArticlePage
            ? 'bg-background backdrop-blur-sm border-b border-border'
            : 'bg-transparent',
        )}>
        <nav className='container mx-auto px-6 lg:px-12'>
          <div className='flex items-center justify-between h-16 lg:h-20'>
            {/* Logo */}
            <Link href='/' className='group flex items-center gap-2'>
              <span className='font-serif text-xl font-bold tracking-tight'>
                Fenil<span className='text-primary ml-2'>Shah</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center'>
              <div className='flex items-center gap-1'>
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={event => handleHashNavigation(event, item.href)}
                    className={cn(
                      'group inline-flex items-center px-4 py-2 text-base transition-colors',
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary',
                    )}>
                    <span className='relative'>
                      {item.label}
                      <span
                        className={cn(
                          'absolute left-0 -bottom-0.5 h-px w-full bg-primary origin-left transition-transform',
                          pathname === item.href
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </span>
                  </Link>
                ))}
              </div>

              <div className='h-6 w-px bg-border mx-4' />

              <Link
                href='/#contact'
                onClick={event => handleHashNavigation(event, '/#contact')}
                className='group inline-flex items-center px-4 py-2 text-base text-foreground hover:text-primary transition-colors'>
                <span className='relative '>
                  Contact
                  <span className='absolute left-0 -bottom-0.5 h-px w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform' />
                </span>
              </Link>

              <div className='ml-4'>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile */}
            <div className='flex items-center gap-2 md:hidden'>
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='p-2 text-foreground cursor-pointer'
                aria-label='Toggle menu'>
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-background md:hidden'>
            <nav className='container mx-auto px-6 pt-24 pb-12 h-full flex flex-col'>
              <div className='flex-1 flex flex-col justify-center gap-2'>
                {[...navItems, { href: '/#contact', label: 'Contact' }].map(
                  (item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}>
                      <Link
                        href={item.href}
                        onClick={event =>
                          handleHashNavigation(event, item.href, true)
                        }
                        className={cn(
                          'group inline-block py-3 font-serif text-4xl font-bold transition-colors',
                          pathname === item.href
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary',
                        )}>
                        <span className='relative inline-block'>
                          {item.label}
                          <span
                            className={cn(
                              'absolute left-0 -bottom-1 h-px w-full bg-primary origin-left transition-transform',
                              pathname === item.href
                                ? 'scale-x-100'
                                : 'scale-x-0 group-hover:scale-x-100',
                            )}
                          />
                        </span>
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='pt-8 border-t border-border'>
                <p className='text-sm text-muted-foreground'>
                  Senior Software Engineer &middot; Full-stack
                </p>
                <p className='text-sm text-muted-foreground'>Houston, Texas</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
