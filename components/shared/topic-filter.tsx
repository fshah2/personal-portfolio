'use client';

import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import type { Accent } from './accent';
import { accent as accentClasses } from './accent';

interface TopicFilterProps {
  topics: string[];
  selected: string | null;
  onSelect: (topic: string | null) => void;
  accent: Accent;
}

export function TopicFilter({
  topics,
  selected,
  onSelect,
  accent,
}: TopicFilterProps) {
  const a = accentClasses[accent];

  if (topics.length === 0) return null;

  const handleSelect = (topic: string) => {
    onSelect(selected === topic ? null : topic);
  };

  return (
    <div className='py-4 border-t border-border'>
      <div className='flex items-center gap-3 mb-4'>
        <Filter className='h-3.5 w-3.5 text-muted-foreground' aria-hidden />
        <span className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>
          Filter by topic
        </span>
      </div>
      <div
        className='flex flex-wrap gap-2'
        role='group'
        aria-label='Filter sections by topic'>
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1.5 text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer border ${
            selected === null
              ? `${a.bg} text-white border-transparent`
              : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30'
          }`}
          aria-pressed={selected === null}
          tabIndex={0}>
          All
        </button>
        {topics.map(topic => {
          const isActive = selected === topic;
          return (
            <motion.button
              key={topic}
              onClick={() => handleSelect(topic)}
              whileTap={{ scale: 0.97 }}
              className={`px-3 py-1.5 text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer border ${
                isActive
                  ? `${a.bg} text-white border-transparent`
                  : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30'
              }`}
              aria-pressed={isActive}
              tabIndex={0}>
              {topic}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
