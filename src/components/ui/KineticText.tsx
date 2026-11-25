'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  mode?: 'chars' | 'words';
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function KineticText({
  text,
  as: Tag = 'h2',
  mode = 'chars',
  className = '',
  delay = 0,
  triggerOnScroll = true,
}: KineticTextProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tokens = el.querySelectorAll<HTMLElement>('.kinetic-token');
    if (!tokens.length) return;

    const ctx = gsap.context(() => {
      const animVars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: mode === 'chars' ? 0.72 : 0.85,
        stagger: mode === 'chars' ? 0.022 : 0.06,
        delay,
        ease: 'power4.out',
      };

      if (triggerOnScroll) {
        animVars.scrollTrigger = {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        };
      }

      gsap.fromTo(
        tokens,
        { yPercent: 115, opacity: 0, rotateX: -28 },
        animVars
      );
    }, el);

    return () => ctx.revert();
  }, [text, mode, delay, triggerOnScroll]);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={cn('[perspective:900px]', className)}>
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-block whitespace-nowrap">
          {mode === 'chars' ? (
            word.split('').map((ch, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden align-bottom">
                <span className="kinetic-token inline-block will-change-transform">
                  {ch}
                </span>
              </span>
            ))
          ) : (
            <span className="inline-block overflow-hidden align-bottom">
              <span className="kinetic-token inline-block will-change-transform">
                {word}
              </span>
            </span>
          )}
          {wIdx < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function ScrambleEyebrow({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    let rafId = 0;
    const runScramble = () => {
      cancelAnimationFrame(rafId);
      let frame = 0;
      const total = Math.max(18, text.length * 1.4);

      const step = () => {
        frame += 1;
        const progress = frame / total;
        const locked = Math.floor(progress * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ' || text[i] === '·' || i < locked) {
            out += text[i];
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        el.textContent = out;
        if (frame < total) {
          rafId = requestAnimationFrame(step);
        } else {
          el.textContent = text;
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: runScramble,
      onEnterBack: runScramble,
    });

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [text]);

  return (
    <span
      ref={ref}
      className={cn(
        'font-mono text-[11px] font-semibold uppercase tracking-[0.22em]',
        className
      )}
    >
      {text}
    </span>
  );
}
