'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterBarVariant = 'primary' | 'secondary';

interface SectionFilterBarProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
  variant?: FilterBarVariant;
}

export function SectionFilterBar<T extends string>({
  label,
  options,
  selected,
  onSelect,
  variant = 'primary',
}: SectionFilterBarProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleSelect = (option: T) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className='flex items-center justify-between gap-4 mb-8'>
      <div className='flex items-center gap-4 min-w-0'>
        <div
          className={cn(
            'h-[3px] w-12 shrink-0',
            variant === 'secondary' ? 'bg-secondary' : 'bg-cyan',
          )}
        />
        <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium truncate'>
          {label}
        </span>
      </div>

      {/* Category dropdown */}
      <div ref={containerRef} className='relative'>
        <button
          type='button'
          onClick={() => setOpen(o => !o)}
          aria-haspopup='listbox'
          aria-expanded={open}
          className={cn(
            'flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border cursor-pointer w-40',
            variant === 'secondary'
              ? 'border-secondary/40 text-secondary'
              : 'border-cyan/40 text-cyan',
          )}>
          <span className='truncate'>{selected}</span>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 shrink-0 transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>

        {open && (
          <ul
            role='listbox'
            className='absolute right-0 top-full mt-2 z-50 min-w-48 max-h-[60vh] overflow-y-auto bg-background border border-border shadow-lg py-1'>
            {options.map(option => {
              const isSelected = selected === option;
              return (
                <li key={option} role='option' aria-selected={isSelected}>
                  <button
                    type='button'
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors hover:bg-muted',
                      isSelected &&
                        (variant === 'secondary'
                          ? 'text-secondary'
                          : 'text-cyan'),
                    )}>
                    <span className='truncate'>{option}</span>
                    {isSelected && <Check className='h-3.5 w-3.5 shrink-0' />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
