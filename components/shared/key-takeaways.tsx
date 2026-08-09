'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import type { Accent } from './accent';
import { accent as accentClasses } from './accent';

interface KeyTakeawaysProps {
  items: string[];
  accent: Accent;
}

const INLINE_TOKEN_RE = /(`[^`]+`|\*\*[^*]+\*\*)/g;

const renderInlineMarkdown = (text: string, codeTextClass: string) => {
  const parts = text.split(INLINE_TOKEN_RE);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className={`px-2 py-1 bg-muted text-sm font-mono ${codeTextClass}`}>
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
};

export function KeyTakeaways({ items, accent }: KeyTakeawaysProps) {
  if (!items?.length) return null;
  const a = accentClasses[accent];
  return (
    <section className='mt-24 pt-16 border-t border-border'>
      <div className='flex items-center gap-4 mb-12'>
        <div className={`w-8 h-px ${a.bg}`} />
        <h2 className='text-xs font-mono uppercase tracking-wider text-muted-foreground'>
          Key Takeaways
        </h2>
      </div>
      <div className='space-y-6'>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className='flex items-baseline gap-6'>
            <span
              className={`flex-shrink-0 font-serif text-4xl font-light ${a.textSoft}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className='text-lg leading-relaxed'>
              {renderInlineMarkdown(item, a.text)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
