'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

let firstRender = true;

/**
 * Route transition: a slate curtain lifts away on client-side navigation.
 * Skipped on the very first load so it never delays the initial paint.
 * Only opacity is animated on the page wrapper so fixed/sticky children
 * (pinned scroll scenes, floating nav) keep working.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => !firstRender && !reduce);

  useEffect(() => {
    firstRender = false;
  }, []);

  if (!animate) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[65] origin-top bg-petro-navy"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.span
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-petro-steel-blue"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
