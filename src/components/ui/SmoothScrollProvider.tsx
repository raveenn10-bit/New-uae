'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Shared Lenis instance (null on touch devices / reduced motion). */
export function getLenis() {
  return lenisInstance;
}

/** Smoothly scroll to a y position or element, using Lenis when active. */
export function smoothScrollTo(target: number | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const top =
    typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}


export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Touch devices keep native momentum scrolling (smoother and cheaper on phones).
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      syncTouch: false,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation (e.g. "#request-manpower").
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length < 2) return;
      const el = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!el) return;
      e.preventDefault();
      // Lenis already honours html scroll-padding-top (header clearance).
      lenis.scrollTo(el, { duration: 1.4 });
      history.replaceState(null, '', href);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // New route: start at the top and re-measure scroll animations.
  useEffect(() => {
    if (window.location.hash) return;
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
