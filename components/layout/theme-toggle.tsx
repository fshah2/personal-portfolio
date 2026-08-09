'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant='ghost'
        size='icon'
        className='relative h-9 w-9 text-muted-foreground hover:text-cyan hover:bg-cyan/20 hover:cursor-pointer'
        aria-label='Toggle theme'
        disabled>
        <div className='h-5 w-5' />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative h-9 w-9 text-muted-foreground hover:text-cyan hover:bg-cyan/20 hover:cursor-pointer overflow-hidden'
      aria-label='Toggle theme'>
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.span
            key='moon'
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <Moon className='h-5 w-5' />
          </motion.span>
        ) : (
          <motion.span
            key='sun'
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <Sun className='h-5 w-5' />
          </motion.span>
        )}
      </AnimatePresence>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
