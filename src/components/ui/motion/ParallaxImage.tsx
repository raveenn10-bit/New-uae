'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Image that reveals with a rounded clip-path wipe and drifts with scroll
 * (parallax). Fills its positioned parent.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 10,
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn('relative h-full w-full overflow-hidden', className)}
      initial={reveal && !reduce ? { clipPath: 'inset(18% 10% 18% 10% round 2rem)', opacity: 0.4 } : false}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y, scale: 1 + strength / 50 }}
        className="h-full w-full object-cover will-change-transform"
      />
    </motion.div>
  );
}
