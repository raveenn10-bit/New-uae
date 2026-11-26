'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Oversized PETROCON mark + name at the very bottom of the footer,
 * tinted light blue and fading out toward the page edge, with a
 * light-blue thread line and soft glow.
 */
export function FooterWordmark() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative select-none overflow-hidden">
      {/* Light-blue thread */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div className="footer-thread relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-petro-silver/70 to-transparent" />
      </div>

      {/* Soft glow behind the wordmark */}
      <div className="pointer-events-none absolute -bottom-[40%] left-[-10%] h-[130%] w-[75%] rounded-full bg-[radial-gradient(closest-side,rgba(115,148,172,0.55),transparent)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-[50%] right-[-15%] h-[110%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(184,208,222,0.22),transparent)] blur-2xl" />

      <motion.div
        initial={reduce ? false : { y: '45%', opacity: 0 }}
        whileInView={{ y: '16%', opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-end justify-center gap-[0.08em] pt-8 text-[14.5vw] leading-[0.82] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.55)_60%,transparent_96%)]"
        style={reduce ? { transform: 'translateY(16%)' } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/petrocon-mark-tint.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width={438}
          height={640}
          className="h-[0.98em] w-auto shrink-0 opacity-90"
        />
        <span className="footer-wordmark bg-gradient-to-b from-[#F0F5F7] via-[#B8D0DE] to-[#7394AC] bg-clip-text font-heading font-bold tracking-[-0.04em] text-transparent">
          PETROCON
        </span>
      </motion.div>
    </div>
  );
}
