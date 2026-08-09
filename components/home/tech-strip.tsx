'use client';

import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiSharp,
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiSnowflake,
  SiSwift,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

// `color` is each brand's official hex. Icons whose logo is monochrome
// black/white (Next.js) omit it and use the theme foreground instead so they
// stay visible in both light and dark mode.
const tech: { name: string; Icon: IconType; color?: string }[] = [
  { name: 'C#', Icon: SiSharp, color: '#68217A' },
  { name: '.NET', Icon: SiDotnet, color: '#512BD4' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Swift', Icon: SiSwift, color: '#F05138' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'Azure', Icon: VscAzure, color: '#0078D4' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Snowflake', Icon: SiSnowflake, color: '#29B5E8' },
];

export function TechStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className='flex flex-col gap-5 pt-4'>
      <div className='flex items-center gap-4'>
        <div className='divider-accent' />
        <span className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
          Tools I work with
        </span>
      </div>

      <div className='flex flex-wrap items-center gap-x-7 gap-y-5'>
        {tech.map(({ name, Icon, color }) => (
          <div
            key={name}
            className='group relative flex items-center justify-center'>
            <Icon
              aria-label={name}
              style={color ? { color } : undefined}
              className={`h-7 w-7 transition-transform duration-200 group-hover:scale-115 ${
                color ? '' : 'text-foreground'
              }`}
            />
            <span
              aria-hidden='true'
              className='pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-foreground px-2 py-1 text-[10px] font-mono text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100'>
              {name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
