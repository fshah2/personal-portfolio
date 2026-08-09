'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { CodeBlock } from '@/components/blog/code-block';
import {
  getVideoMimeType,
  isVideoSource,
  resolveMediaSrc,
} from '@/lib/markdown/media';

type MarkdownVariant = 'primary' | 'secondary';

interface MarkdownProps {
  body: string;
  /** Used to rewrite ./foo.png → /content/<type>/<slug>/foo.png */
  basePath: string;
  variant?: MarkdownVariant;
}

export function Markdown({
  body,
  basePath,
  variant = 'primary',
}: MarkdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!expandedImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedImage]);

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className ?? '');
      const text = String(children ?? '');
      const isBlock = text.includes('\n');

      if (match) {
        return <CodeBlock code={text.replace(/\n$/, '')} language={match[1]} />;
      }

      if (isBlock) {
        return (
          <pre className='my-10 overflow-x-auto bg-paper-dark border border-border/50 p-5 text-sm leading-relaxed font-mono text-foreground/90'>
            <code>{children}</code>
          </pre>
        );
      }

      return (
        <code
          className={`px-2 py-1 bg-muted text-sm font-mono ${
            variant === 'secondary' ? 'text-secondary' : 'text-cyan'
          }`}
          {...props}>
          {children}
        </code>
      );
    },
    pre({ children }) {
      return <>{children}</>;
    },
    img({ src, alt }) {
      const raw = typeof src === 'string' ? src : '';
      const resolved = resolveMediaSrc(raw, basePath);
      if (!resolved) return null;
      const mediaAlt = alt ?? '';

      if (isVideoSource(raw)) {
        const mimeType = getVideoMimeType(raw);

        return (
          <video
            controls
            playsInline
            preload='metadata'
            className='my-8 aspect-video w-full bg-muted object-contain'
            aria-label={mediaAlt || 'Embedded video'}>
            <source src={resolved} type={mimeType} />
            <a
              href={resolved}
              className={
                variant === 'secondary'
                  ? 'text-secondary hover:underline'
                  : 'text-cyan hover:underline'
              }>
              Download video
            </a>
          </video>
        );
      }

      return (
        <button
          type='button'
          onClick={() => setExpandedImage({ src: resolved, alt: mediaAlt })}
          className='group my-8 block w-full cursor-pointer'
          aria-label={`Expand image${mediaAlt ? `: ${mediaAlt}` : ''}`}>
          <Image
            src={resolved}
            alt={mediaAlt}
            width={1200}
            height={675}
            className='w-full h-auto transition-opacity group-hover:opacity-95'
          />
        </button>
      );
    },
    h2({ children, id }) {
      return (
        <h2
          id={id}
          className='font-serif headline text-3xl font-bold mt-20 mb-8 first:mt-0 scroll-mt-56'>
          {children}
        </h2>
      );
    },
    h3({ children, id }) {
      return (
        <h3
          id={id}
          className='font-serif headline text-xl font-bold mt-12 mb-4 scroll-mt-56'>
          {children}
        </h3>
      );
    },
    h4({ children, id }) {
      return (
        <h4 id={id} className='font-medium mt-8 mb-3'>
          {children}
        </h4>
      );
    },
    p({ children }) {
      return (
        <p className='mb-6 text-lg leading-relaxed text-foreground/90'>
          {children}
        </p>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote
          className={`my-12 pl-8 border-l-2 font-serif text-2xl italic text-foreground/80 leading-relaxed ${
            variant === 'secondary' ? 'border-secondary' : 'border-cyan'
          }`}>
          {children}
        </blockquote>
      );
    },
    ul({ children }) {
      return <ul className='my-6 ml-6 space-y-3 list-disc'>{children}</ul>;
    },
    ol({ children }) {
      return <ol className='my-6 ml-6 space-y-3 list-decimal'>{children}</ol>;
    },
    li({ children }) {
      return <li className='pl-2 leading-relaxed'>{children}</li>;
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={
            variant === 'secondary'
              ? 'text-secondary hover:underline'
              : 'text-cyan hover:underline'
          }>
          {children}
        </a>
      );
    },
    strong({ children }) {
      return (
        <strong className='font-semibold text-foreground'>{children}</strong>
      );
    },
    table({ children }) {
      return (
        <div className='my-8 w-full overflow-x-auto'>
          <table className='w-full border-collapse text-sm'>{children}</table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className='border-b border-border'>{children}</thead>;
    },
    tbody({ children }) {
      return (
        <tbody className='divide-y divide-border/50 [&>tr]:transition-colors [&>tr:hover]:bg-muted/30'>
          {children}
        </tbody>
      );
    },
    tr({ children }) {
      return <tr>{children}</tr>;
    },
    th({ children }) {
      return (
        <th className='px-4 py-3 text-left font-semibold text-foreground'>
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className='px-4 py-3 text-foreground/80 leading-relaxed'>
          {children}
        </td>
      );
    },
  };

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}>
        {body}
      </ReactMarkdown>

      {isMounted &&
        expandedImage &&
        createPortal(
          <div
            className='fixed inset-0 z-9999 bg-black/85 p-4 md:p-8'
            role='dialog'
            aria-modal='true'
            aria-label='Expanded article image'
            onClick={() => setExpandedImage(null)}>
            <div
              className='relative mx-auto h-full w-full max-w-6xl'
              onClick={event => event.stopPropagation()}>
              <button
                type='button'
                onClick={() => setExpandedImage(null)}
                className='absolute top-3 right-3 z-10 inline-flex items-center gap-2 h-10 px-3 rounded-full border border-white/30 bg-black/55 text-white hover:bg-black/70 transition-colors cursor-pointer'
                aria-label='Close image modal'>
                <X className='h-5 w-5' />
                <span className='text-sm font-medium'>Close</span>
              </button>

              <Image
                src={expandedImage.src}
                alt={expandedImage.alt}
                fill
                className='object-contain'
                sizes='100vw'
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
