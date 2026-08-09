import { cn } from '@/lib/utils';

type TagVariant = 'primary' | 'secondary' | 'neutral';
type TagFill = 'none' | 'tinted' | 'filled';

const variantClass: Record<TagVariant, string> = {
  primary: '',
  secondary: 'tag-secondary',
  neutral: 'tag-neutral',
};

const fillClass: Record<TagFill, string> = {
  none: '',
  tinted: 'tag-tinted',
  filled: 'tag-filled',
};

export function tagClassName({
  variant = 'primary',
  fill = 'none',
  className,
}: {
  variant?: TagVariant;
  fill?: TagFill;
  className?: string;
} = {}) {
  return cn('tag', variantClass[variant], fillClass[fill], className);
}

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  fill?: TagFill;
}

export function Tag({
  variant,
  fill,
  className,
  children,
  ...rest
}: TagProps) {
  return (
    <span className={tagClassName({ variant, fill, className })} {...rest}>
      {children}
    </span>
  );
}

interface TagButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TagVariant;
  fill?: TagFill;
}

export function TagButton({
  variant,
  fill,
  className,
  children,
  ...rest
}: TagButtonProps) {
  return (
    <button
      className={cn(tagClassName({ variant, fill }), 'cursor-pointer', className)}
      {...rest}>
      {children}
    </button>
  );
}
