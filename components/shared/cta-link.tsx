import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CTAAccent = 'primary' | 'secondary';

const getAccentStyles = (accent: CTAAccent) => {
  if (accent === 'secondary') {
    return {
      text: 'group-hover/cta:text-secondary hover:text-secondary',
      underline: 'bg-secondary',
    };
  }

  return {
    text: 'group-hover/cta:text-primary hover:text-cyan',
    underline: 'bg-primary',
  };
};

const baseStyles =
  'inline-flex items-center gap-2 text-sm text-foreground transition-colors cursor-pointer';

interface UnderlineContentProps {
  children: React.ReactNode;
  leadingIcon?: React.ReactNode;
  icon?: React.ReactNode;
  accent: CTAAccent;
}

const UnderlineContent = ({
  children,
  leadingIcon,
  icon,
  accent,
}: UnderlineContentProps) => (
  <>
    {leadingIcon}
    <span className='relative'>
      {children}
      <span
        className={cn(
          'absolute left-0 -bottom-0.5 w-full h-px scale-x-0 group-hover/cta:scale-x-100 transition-transform origin-left',
          getAccentStyles(accent).underline,
        )}
      />
    </span>
    {icon ?? (
      <ArrowUpRight className='h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5' />
    )}
  </>
);

interface CTALinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  accent?: CTAAccent;
  className?: string;
}

export const CTALink = ({
  href,
  external,
  children,
  icon,
  leadingIcon,
  accent = 'primary',
  className,
}: CTALinkProps) => {
  const styles = cn(
    baseStyles,
    getAccentStyles(accent).text,
    'group/cta',
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={styles}>
        <UnderlineContent leadingIcon={leadingIcon} icon={icon} accent={accent}>
          {children}
        </UnderlineContent>
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      <UnderlineContent leadingIcon={leadingIcon} icon={icon} accent={accent}>
        {children}
      </UnderlineContent>
    </Link>
  );
};

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  accent?: CTAAccent;
  className?: string;
}

export const BackLink = ({
  href,
  children,
  accent = 'primary',
  className,
}: BackLinkProps) => (
  <Link
    href={href}
    className={cn(
      baseStyles,
      getAccentStyles(accent).text,
      'group/cta',
      className,
    )}>
    <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover/cta:-translate-x-0.5' />
    <span className='relative'>
      {children}
      <span
        className={cn(
          'absolute left-0 -bottom-0.5 w-full h-px scale-x-0 group-hover/cta:scale-x-100 transition-transform origin-left',
          getAccentStyles(accent).underline,
        )}
      />
    </span>
  </Link>
);
