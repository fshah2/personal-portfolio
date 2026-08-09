export type Accent = 'cyan' | 'magenta' | 'secondary';

export const accent = {
  cyan: {
    text: 'text-cyan',
    bg: 'bg-cyan',
    bgSoft: 'bg-cyan/10',
    border: 'border-cyan',
    borderSoft: 'border-cyan/30',
    textSoft: 'text-cyan/30',
    hoverText: 'hover:text-cyan',
    hoverBorder: 'hover:border-cyan/50',
  },
  magenta: {
    text: 'text-magenta',
    bg: 'bg-magenta',
    bgSoft: 'bg-magenta/10',
    border: 'border-magenta',
    borderSoft: 'border-magenta/30',
    textSoft: 'text-magenta/30',
    hoverText: 'hover:text-magenta',
    hoverBorder: 'hover:border-magenta/50',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary',
    bgSoft: 'bg-secondary/10',
    border: 'border-secondary',
    borderSoft: 'border-secondary/30',
    textSoft: 'text-secondary/30',
    hoverText: 'hover:text-secondary',
    hoverBorder: 'hover:border-secondary/50',
  },
} as const;
