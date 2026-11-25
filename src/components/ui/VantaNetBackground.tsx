'use client';

import { useEffect, useRef } from 'react';

interface VantaInstance {
  destroy: () => void;
}

export function VantaNetBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallOrLowPower =
      window.innerWidth < 768 ||
      (typeof navigator !== 'undefined' &&
        'hardwareConcurrency' in navigator &&
        navigator.hardwareConcurrency <= 4);

    if (prefersReducedMotion || isSmallOrLowPower) {
      return;
    }

    let vantaEffect: VantaInstance | null = null;
    let isMounted = true;

    async function initVanta() {
      try {
        const THREE = await import('three');
        // @ts-expect-error vanta dist module lacks type declarations
        const VANTA = await import('vanta/dist/vanta.net.min');
        const Net = VANTA.default || VANTA;

        if (!isMounted || !el) return;

        vantaEffect = Net({
          el,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x207fba,
          backgroundColor: 0x071827,
          points: 9.0,
          maxDistance: 21.0,
          spacing: 17.0,
          showDots: true,
        });
      } catch {
        // Fallback to CSS deep navy background if WebGL is unavailable
      }
    }

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-[#071827] opacity-85 ${className}`}
    />
  );
}
