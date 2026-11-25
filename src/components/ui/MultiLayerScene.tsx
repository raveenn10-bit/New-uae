'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface SceneLayer {
  id: string;
  role: 'background' | 'distant' | 'midground' | 'subject' | 'foreground' | 'atmosphere';
  src?: string;
  alt?: string;
  /** Scroll parallax vertical travel in percentage (e.g. -10 to +24) */
  yParallax?: number;
  /** Scroll scale delta (e.g. 1.0 -> 1.12 for camera zoom) */
  scaleTo?: number;
  /** Desktop pointer perspective multiplier (px) */
  pointerDepth?: number;
  className?: string;
  imgClassName?: string;
  customContent?: React.ReactNode;
}

interface MultiLayerSceneProps {
  id?: string;
  layers: SceneLayer[];
  children?: React.ReactNode;
  className?: string;
  minHeightClass?: string;
  enablePointerPerspective?: boolean;
}

export function MultiLayerScene({
  id,
  layers,
  children,
  className = '',
  minHeightClass = 'min-h-[100svh]',
  enablePointerPerspective = true,
}: MultiLayerSceneProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const target = el.querySelector<HTMLElement>(`[data-scene-layer="${layer.id}"]`);
        if (!target) return;

        if (layer.yParallax || layer.scaleTo) {
          gsap.to(target, {
            yPercent: layer.yParallax ?? 0,
            scale: layer.scaleTo ?? 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.75,
            },
          });
        }
      });
    }, el);

    // Subtle desktop pointer-based 2.5D perspective (disabled on touch devices)
    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    if (enablePointerPerspective && !isTouch) {
      onPointerMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        layers.forEach((layer) => {
          if (!layer.pointerDepth) return;
          const target = el.querySelector<HTMLElement>(`[data-scene-layer="${layer.id}"]`);
          if (!target) return;
          gsap.to(target, {
            x: nx * layer.pointerDepth,
            y: ny * (layer.pointerDepth * 0.6),
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };
      el.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (onPointerMove) el.removeEventListener('pointermove', onPointerMove);
    };
  }, [layers, enablePointerPerspective]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-petro-navy [perspective:1200px]',
        minHeightClass,
        className
      )}
    >
      {layers.map((layer) => (
        <div
          key={layer.id}
          data-scene-layer={layer.id}
          aria-hidden={layer.role !== 'subject'}
          className={cn(
            'pointer-events-none absolute inset-0 will-change-transform',
            layer.className
          )}
        >
          {layer.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={layer.src}
              alt={layer.alt || ''}
              className={cn('h-full w-full object-cover', layer.imgClassName)}
            />
          )}
          {layer.customContent}
        </div>
      ))}

      {/* Typography & Interactive Overlay */}
      <div className="relative z-20">{children}</div>
    </section>
  );
}
