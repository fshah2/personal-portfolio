import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  inverted?: boolean;
  accent?: 'primary' | 'secondary';
  className?: string;
}

const baseStyles =
  'group inline-flex items-center gap-3 px-6 py-3 transition-colors cursor-pointer';

const defaultIcon = (
  <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
);

export const CTAButton = ({
  href,
  external,
  type,
  onClick,
  children,
  icon,
  inverted = false,
  accent = 'primary',
  className,
}: CTAButtonProps) => {
  const hoverStyles =
    accent === 'secondary'
      ? 'hover:bg-secondary hover:text-secondary-foreground'
      : 'hover:bg-primary hover:text-primary-foreground';
  const colorStyles = inverted
    ? `bg-background text-foreground ${hoverStyles}`
    : `bg-foreground text-background ${hoverStyles}`;

  const content = (
    <>
      <span className='text-xs uppercase tracking-wider font-medium'>
        {children}
      </span>
      {icon ?? defaultIcon}
    </>
  );

  const styles = cn(baseStyles, colorStyles, className);

  if (href && external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={styles}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} className={styles}>
      {content}
    </button>
  );
};
