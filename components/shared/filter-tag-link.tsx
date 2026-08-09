'use client';

import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Tag } from '@/components/shared/tag';
import { cn } from '@/lib/utils';

interface FilterTagLinkProps {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  variant?: 'primary' | 'secondary' | 'neutral';
  fill?: 'none' | 'tinted' | 'filled';
  className?: string;
}

export const FilterTagLink = ({
  href,
  children,
  ariaLabel,
  variant,
  fill = 'tinted',
  className,
}: FilterTagLinkProps) => {
  const router = useRouter();

  const navigateToFilter = () => {
    router.push(href, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigateToFilter();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    navigateToFilter();
  };

  return (
    <Tag
      role='link'
      tabIndex={0}
      aria-label={ariaLabel}
      variant={variant}
      fill={fill}
      className={cn(
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      {children}
    </Tag>
  );
};
