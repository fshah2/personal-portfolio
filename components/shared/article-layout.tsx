'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Markdown } from './markdown';
import { ArticleToc } from './article-toc';
import { SectionSummary } from './section-summary';
import { KeyTakeaways } from './key-takeaways';
import { ReadingProgress } from './reading-progress';
import { InlineCodeText } from './inline-code-text';
import { TopicFilter } from './topic-filter';
import type { ParsedArticle } from '@/lib/markdown/sections';
import type { Accent } from './accent';
import { accent as accentClasses } from './accent';

interface ArticleLayoutProps {
  article: ParsedArticle;
  basePath: string;
  accent: Accent;
  keyTakeaways?: string[];
  desktopScrollOffset?: number;
}

export function ArticleLayout({
  article,
  basePath,
  accent,
  keyTakeaways,
  desktopScrollOffset,
}: ArticleLayoutProps) {
  const a = accentClasses[accent];
  const { intro, sections, allTopics } = article;
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [manuallyExpanded, setManuallyExpanded] = useState<Set<string>>(
    new Set(),
  );

  const hasTopics = allTopics.length > 0;

  const handleTopicChange = useCallback(
    (topic: string | null) => {
      setSelectedTopic(topic);
      setManuallyExpanded(new Set());

      const firstSection = sections[0];
      if (!firstSection) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(firstSection.id);
        if (!target) return;

        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        let scrollOffset: number;

        if (isMobile) {
          const tocEl = document.querySelector<HTMLElement>(
            '[data-article-mobile-toc]',
          );
          const tocBottom = tocEl ? tocEl.getBoundingClientRect().bottom : 112;
          scrollOffset = tocBottom + (hasTopics ? 150 : 16);
        } else {
          scrollOffset = 220;
        }

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(targetTop - scrollOffset, 0),
          behavior: 'smooth',
        });
      });
    },
    [sections, hasTopics],
  );

  const handleToggleCollapsed = useCallback((sectionId: string) => {
    setManuallyExpanded(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const isSectionVisible = (sectionId: string, topics: string[]): boolean => {
    if (!selectedTopic) return true;
    if (topics.includes(selectedTopic)) return true;
    return manuallyExpanded.has(sectionId);
  };

  const activeSectionIds = new Set(
    sections.filter(s => isSectionVisible(s.id, s.topics)).map(s => s.id),
  );

  return (
    <div id='article-content'>
      <ReadingProgress />
      <section className='pt-8 pb-20 lg:py-20'>
        <div className='container mx-auto px-6 lg:px-12'>
          <ArticleToc
            sections={sections}
            accent={accent}
            activeSectionIds={activeSectionIds}
            variant='mobile'
            mobileScrollGap={hasTopics ? 150 : 16}
            desktopScrollOffset={desktopScrollOffset}
          />

          <div className='grid lg:grid-cols-[1fr_280px] gap-16 max-w-6xl'>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='min-w-0'>
              {intro && (
                <div className='prose-editorial mb-16'>
                  <Markdown
                    body={intro}
                    basePath={basePath}
                    variant={accent === 'secondary' ? 'secondary' : 'primary'}
                  />
                </div>
              )}

              {hasTopics && (
                <div className='sticky top-[112px] lg:top-[84px] z-30 -mx-6 px-6 lg:-mx-12 lg:px-12 bg-background/70 backdrop-blur-sm'>
                  <TopicFilter
                    topics={allTopics}
                    selected={selectedTopic}
                    onSelect={handleTopicChange}
                    accent={accent}
                  />
                </div>
              )}

              {sections.map((section, i) => {
                const visible = isSectionVisible(section.id, section.topics);
                const isCollapsedByFilter =
                  selectedTopic !== null &&
                  !section.topics.includes(selectedTopic) &&
                  !manuallyExpanded.has(section.id);

                return (
                  <section
                    key={section.id}
                    className={`pt-12 mt-12 border-t border-border ${i === 0 ? 'mt-0 pt-0 border-t-0' : ''}`}>
                    <header
                      className={`flex items-baseline gap-6 ${visible ? 'mb-10' : 'mb-0'} ${
                        isCollapsedByFilter ? 'cursor-pointer group' : ''
                      }`}
                      onClick={
                        isCollapsedByFilter
                          ? () => handleToggleCollapsed(section.id)
                          : undefined
                      }
                      onKeyDown={
                        isCollapsedByFilter
                          ? e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleToggleCollapsed(section.id);
                              }
                            }
                          : undefined
                      }
                      tabIndex={isCollapsedByFilter ? 0 : undefined}
                      role={isCollapsedByFilter ? 'button' : undefined}
                      aria-expanded={isCollapsedByFilter ? false : undefined}
                      aria-label={
                        isCollapsedByFilter
                          ? `Expand section: ${section.title}`
                          : undefined
                      }>
                      <span
                        className={`shrink-0 font-serif text-5xl md:text-6xl font-light transition-opacity duration-300 ${
                          visible ? a.textSoft : 'opacity-20'
                        }`}
                        aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className='flex flex-col gap-2 min-w-0'>
                        <h2
                          id={section.id}
                          className={`font-serif text-3xl md:text-4xl font-bold leading-tight scroll-mt-56 transition-opacity duration-300 ${
                            visible ? '' : 'opacity-40 group-hover:opacity-70'
                          }`}>
                          <InlineCodeText
                            text={section.title}
                            codeClassName='px-2 py-1 bg-muted text-inherit font-mono text-cyan rounded-sm'
                          />
                        </h2>
                        {isCollapsedByFilter && (
                          <span className='flex items-center gap-1.5 text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground transition-colors'>
                            <ChevronRight className='h-3 w-3' />
                            Click to expand
                          </span>
                        )}
                      </div>
                    </header>

                    <AnimatePresence initial={false}>
                      {visible && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className='overflow-hidden'>
                          <div className='prose-editorial'>
                            <Markdown
                              body={section.body}
                              basePath={basePath}
                              variant={
                                accent === 'secondary' ? 'secondary' : 'primary'
                              }
                            />
                          </div>

                          {section.summary && (
                            <SectionSummary
                              text={section.summary}
                              accent={accent}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                );
              })}

              {keyTakeaways && keyTakeaways.length > 0 && (
                <KeyTakeaways items={keyTakeaways} accent={accent} />
              )}
            </motion.div>

            <ArticleToc
              sections={sections}
              accent={accent}
              activeSectionIds={activeSectionIds}
              variant='desktop'
              desktopScrollOffset={desktopScrollOffset}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
