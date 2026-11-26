'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Oversized PETROCON drop mark blended into the footer background
 * (right side, behind content), fading into the navy toward the
 * left and top edges. Decorative only.
 */
export function FooterBrandMark() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
      {/* Light-blue glow the mark sits in */}
      <div className="absolute -right-[10%] bottom-[-20%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(115,148,172,0.30),transparent)] blur-3xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 80, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[-14%] right-[-14%] h-[78%] sm:right-[-6%] sm:h-[95%] lg:bottom-[-10%] lg:right-[3%] lg:h-[112%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/petrocon-mark.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width={754}
          height={1100}
          className="footer-mark h-full w-auto max-w-none opacity-[0.28] mix-blend-screen sm:opacity-[0.42] lg:opacity-[0.55]"
        />
      </motion.div>

      {/* Blend edges back into the navy so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-petro-navy via-petro-navy/80 to-transparent lg:via-petro-navy/40" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-petro-navy to-transparent" />
    </div>
  );
}

/** Light-blue thread line with a running shimmer, closing the footer. */
export function FooterThread() {
  return (
    <div aria-hidden="true" className="relative z-10 mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8 lg:px-12 lg:pb-40 2xl:px-16">
      <div className="footer-thread relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-petro-silver/60 to-transparent" />
    </div>
  );
}
