'use client';

import { useEffect, useRef } from 'react';

/**
 * Dot-and-ring custom cursor. A solid dot tracks the pointer 1:1; an outlined
 * ring trails behind on a spring (rAF lerp). The ring grows and tints over
 * links/buttons, and becomes a filled "View" chip over project cards
 * (any element marked data-cursor="view").
 *
 * Only active for fine pointers with hover (desktop); on touch it renders
 * nothing and the native cursor stays. Respects prefers-reduced-motion by
 * dropping the trailing lag.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lag = reduce ? 1 : 0.16;

    document.documentElement.classList.add('cc-on');

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let seen = false;
    let raf = 0;

    dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        rx = tx;
        ry = ty;
        seen = true;
      }
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    const frame = () => {
      rx += (tx - rx) * lag;
      ry += (ty - ry) * lag;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const linkSelector =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="link"]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const view = target?.closest?.('[data-cursor="view"]');
      const link = target?.closest?.(linkSelector);
      document.body.classList.toggle('cc-view', !!view);
      document.body.classList.toggle('cc-link', !view && !!link);
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '';
      ring.style.opacity = '';
    };
    const onBlur = () => {
      document.body.classList.remove('cc-link', 'cc-view');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('blur', onBlur);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('blur', onBlur);
      document.documentElement.classList.remove('cc-on');
      document.body.classList.remove('cc-link', 'cc-view');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className='cc-layer' aria-hidden='true'>
        <i className='cc-dot' />
      </div>
      <div ref={ringRef} className='cc-layer' aria-hidden='true'>
        <i className='cc-ring' />
        <span className='cc-label'>View&nbsp;↗</span>
      </div>
    </>
  );
}
