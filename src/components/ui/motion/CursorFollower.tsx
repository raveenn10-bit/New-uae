'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Subtle two-part cursor (dot + trailing ring) for fine pointers.
 * The ring grows over links and buttons. Hidden on touch and reduced motion.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, [role="button"], input, select, textarea, label'));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden mix-blend-difference lg:block"
      >
        <motion.span
          animate={{ scale: down ? 0.7 : hover ? 1.9 : 1, opacity: hover ? 0.9 : 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden mix-blend-difference lg:block"
      >
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </>
  );
}
