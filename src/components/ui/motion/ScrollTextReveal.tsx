'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextRevealProps {
  text: string;
  /** Words (lower-case, no punctuation) to render in the accent colour. */
  highlight?: string[];
  className?: string;
}

/**
 * Storytelling statement: each word brightens from dim to full as the
 * reader scrolls through it (scrubbed, works both directions).
 */
export function ScrollTextReveal({ text, highlight = [], className }: ScrollTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = el.querySelectorAll<HTMLElement>('.str-word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={cn('font-heading font-bold tracking-industrial', className)}>
      {text.split(' ').map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z&-]/g, '');
        const accent = highlight.includes(clean);
        return (
          <span
            key={`${word}-${i}`}
            className={cn('str-word inline-block will-change-transform', accent && 'text-[#7CC4F0]')}
          >
            {word}
            {' '}
          </span>
        );
      })}
    </p>
  );
}
