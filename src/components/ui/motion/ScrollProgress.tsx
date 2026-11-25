'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Thin steel-to-silver reading progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-petro-steel-blue via-petro-silver to-white rtl:origin-right"
    />
  );
}
