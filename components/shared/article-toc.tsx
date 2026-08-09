'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ArticleSection } from '@/lib/markdown/sections';
import type { Accent } from './accent';
import { accent as accentClasses } from './accent';
import { InlineCodeText } from './inline-code-text';

interface ArticleTocProps {
  sections: ArticleSection[];
  accent: Accent;
  activeSectionIds?: Set<string>;
  variant?: 'mobile' | 'desktop' | 'both';
  mobileScrollGap?: number;
  desktopScrollOffset?: number;
}

interface FlatItem {
  id: string;
  title: string;
  level: 2 | 3;
  parentId: string;
}

function flatten(sections: ArticleSection[]): FlatItem[] {
  const out: FlatItem[] = [];
  for (const s of sections) {
    out.push({ id: s.id, title: s.title, level: 2, parentId: s.id });
    for (const sub of s.subheadings) {
      out.push({ id: sub.id, title: sub.title, level: 3, parentId: s.id });
    }
  }
  return out;
}

export function ArticleToc({
  sections,
  accent,
  activeSectionIds,
  variant = 'both',
  mobileScrollGap = 16,
  desktopScrollOffset = 128,
}: ArticleTocProps) {
  const hasFilter = activeSectionIds !== undefined;
  const items = flatten(sections);
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleRef = useRef<Set<string>>(new Set());
  const a = accentClasses[accent];

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleRef.current.add(entry.target.id);
          else visibleRef.current.delete(entry.target.id);
        }
        const first = items.find(it => visibleRef.current.has(it.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  if (!items.length) return null;

  const activeItem = items.find(it => it.id === activeId) ?? items[0];
  const activeSection =
    sections.find(s => s.id === activeItem.parentId) ?? sections[0];
  const showMobile = variant === 'mobile' || variant === 'both';
  const showDesktop = variant === 'desktop' || variant === 'both';

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);

    if (!target) {
      window.location.hash = id;
      return;
    }

    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    let scrollOffset: number;
    if (isMobile) {
      const tocEl = document.querySelector<HTMLElement>(
        '[data-article-mobile-toc]',
      );
      const tocBottom = tocEl ? tocEl.getBoundingClientRect().bottom : 112;
      scrollOffset = tocBottom + mobileScrollGap;
    } else {
      scrollOffset = desktopScrollOffset;
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(targetTop - scrollOffset, 0),
      behavior: 'smooth',
    });
    window.history.replaceState(null, '', `#${id}`);
  };

  const handleNavigateTo = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    setActiveId(id);

    if (!mobileOpen) {
      scrollToSection(id);
      return;
    }

    setMobileOpen(false);

    window.setTimeout(() => {
      scrollToSection(id);
    }, 220);
  };

  const Tree = () => (
    <ul className='space-y-1 text-sm'>
      {sections.map(s => {
        const isActiveSection = s.id === activeItem.parentId;
        const isDimmed = hasFilter && !activeSectionIds.has(s.id);
        return (
          <li
            key={s.id}
            className={`transition-opacity duration-200 ${isDimmed ? 'opacity-30' : ''}`}>
            <a
              href={`#${s.id}`}
              onClick={event => handleNavigateTo(event, s.id)}
              className={`block py-1.5 border-l-2 pl-3 transition-colors ${
                activeId === s.id
                  ? `${a.border} ${a.text}`
                  : isActiveSection
                    ? `${a.borderSoft} text-foreground`
                    : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}>
              <InlineCodeText
                text={s.title}
                codeClassName='px-1.5 py-0.5 bg-muted text-[0.7rem] font-mono text-current rounded-sm'
              />
            </a>
            {s.subheadings.length > 0 && !isDimmed && (
              <ul className='ml-4 border-l border-border my-1'>
                {s.subheadings.map(sub => (
                  <li key={sub.id}>
                    <a
                      href={`#${sub.id}`}
                      onClick={event => handleNavigateTo(event, sub.id)}
                      className={`block py-1 pl-3 text-xs transition-colors ${
                        activeId === sub.id
                          ? a.text
                          : 'text-muted-foreground hover:text-foreground'
                      }`}>
                      <InlineCodeText
                        text={sub.title}
                        codeClassName='px-1 py-0.5 bg-muted text-[0.65rem] font-mono text-current rounded-sm'
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {showMobile && (
        <div
          data-article-mobile-toc
          className='lg:hidden sticky top-[68px] z-40 -mx-6 mb-8 px-6 bg-background/95 backdrop-blur-sm border-b border-border'>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className='flex w-full cursor-pointer items-center justify-between py-3 text-left'
            aria-expanded={mobileOpen}>
            <span className='flex min-w-0 items-center gap-3'>
              <span className='shrink-0 text-[10px] font-mono uppercase tracking-wider text-muted-foreground'>
                On this page
              </span>
              <span className={`truncate text-sm ${a.text}`}>
                <InlineCodeText
                  text={activeSection.title}
                  codeClassName='px-1.5 py-0.5 bg-muted text-[0.75rem] font-mono text-current rounded-sm'
                />
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                mobileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {mobileOpen && (
            <div className='overflow-hidden'>
              <div className='max-h-[60vh] overflow-y-auto pb-4 pt-1'>
                <Tree />
              </div>
            </div>
          )}
        </div>
      )}

      {showDesktop && (
        <aside className='hidden lg:block'>
          <div className='sticky top-32'>
            <div className='mb-4 flex items-center gap-3'>
              <div className={`h-px w-6 ${a.bg}`} />
              <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>
                In this article
              </h3>
            </div>
            <nav aria-label='Table of contents'>
              <Tree />
            </nav>
          </div>
        </aside>
      )}
    </>
  );
}
