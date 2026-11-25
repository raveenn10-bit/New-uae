'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Fuel,
  HardHat,
  ShieldCheck,
  Pause,
  Play,
} from 'lucide-react';
import { KineticText, ScrambleEyebrow } from '@/components/ui/KineticText';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { useLanguage } from '@/components/ui/LanguageContext';
import { cn } from '@/lib/utils';

const SLIDE_MS = 7000;

const slides = [
  {
    id: 'refinery',
    desktop: '/scenes/01-refinery/bg-refinery.webp',
    mobile: '/scenes/01-refinery/mobile-refinery.webp',
    alt: 'Oil refinery at golden hour',
    eyebrow: 'PETROCON TECHNICAL WORKS LLC',
    line1: 'Powering Oil & Gas.',
    line2: 'Delivering Skilled Workforce.',
    copy: 'Technical manpower, mechanical works, electrical & instrumentation and turnaround support engineered for energy infrastructure.',
  },
  {
    id: 'offshore',
    desktop: '/scenes/04-offshore/offshore-desktop.webp',
    mobile: '/scenes/04-offshore/offshore-mobile.webp',
    alt: 'Offshore oil platform at sea',
    eyebrow: 'ONSHORE · OFFSHORE · PETROCHEMICAL',
    line1: 'From Plant Floor',
    line2: 'To Offshore Deck.',
    copy: 'Vetted engineers, welders, riggers and technicians mobilised to the sites where uptime matters most.',
  },
  {
    id: 'safety',
    desktop: '/scenes/05-safety/safety-team.webp',
    mobile: '/scenes/05-safety/safety-mobile.webp',
    alt: 'Industrial safety team on site',
    eyebrow: 'HEALTH · SAFETY · ENVIRONMENT',
    line1: 'Safety First.',
    line2: 'Every Shift. Every Site.',
    copy: 'PPE-ready crews, safety orientation alignment and continuous oversight built into every deployment.',
  },
];

const tickerItems = [
  'Oil & Gas Site Supervision',
  'Pipeline Welding & Fabrication',
  'Electrical & Instrumentation',
  'Shutdown & Turnaround Crews',
  'Rigging & Scaffolding',
  'HSE Safety Officers',
  'Mechanical Maintenance',
];

const badges = [
  { icon: Fuel, label: 'Oil & Gas Specialists' },
  { icon: HardHat, label: 'Skilled Manpower' },
  { icon: ShieldCheck, label: 'Safety-First Crews' },
];

export function HeroSlider() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.12]);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, go]);

  const slide = slides[index];

  return (
    <section
      id="chapter-01"
      aria-roledescription="carousel"
      aria-label="PETROCON highlights"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-petro-navy text-white"
    >
      {/* Background slides with Ken Burns */}
      <motion.div style={{ scale: reduce ? 1 : bgScale }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' },
            }}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={slide.desktop} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="h-full w-full object-cover"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding={index === 0 ? 'sync' : 'async'}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/95 via-[#101820]/70 to-[#101820]/20" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#101820] to-transparent" />
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-petro-steel-blue/30 blur-[140px]"
      />

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-36 pt-32 sm:px-6 lg:px-12 2xl:px-16"
      >
        <motion.ul
          className="mb-7 flex flex-wrap gap-2 sm:gap-2.5"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        >
          {badges.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold backdrop-blur-md sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-petro-steel-blue text-petro-navy">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {label}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mb-6 flex items-center gap-4">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-12 origin-left rounded-full bg-petro-steel-blue"
          />
          <ScrambleEyebrow key={`eb-${slide.id}`} text={slide.eyebrow} className="text-[#B8D0DE]" />
        </div>

        <div className="max-w-4xl" aria-live="polite">
          <KineticText
            key={`l1-${slide.id}`}
            as="h1"
            mode="chars"
            triggerOnScroll={false}
            text={slide.line1}
            className="font-heading text-[2.6rem] font-bold leading-[1.02] tracking-industrial sm:text-6xl lg:text-[5.25rem]"
          />
          <KineticText
            key={`l2-${slide.id}`}
            as="p"
            mode="chars"
            delay={0.35}
            triggerOnScroll={false}
            text={slide.line2}
            className="mt-1 font-heading text-[2.6rem] font-bold leading-[1.05] tracking-industrial text-[#B8D0DE] sm:text-6xl lg:text-[5.25rem]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={`copy-${slide.id}`}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {slide.copy}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col gap-3.5 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#request-manpower"
              className="group relative inline-flex min-h-[56px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-petro-steel-blue px-8 text-base font-semibold text-petro-navy shadow-xl shadow-black/30 transition-colors hover:bg-petro-silver sm:w-auto"
            >
              <span className="btn-shine" aria-hidden="true" />
              <span>{t.hero.ctaRequest}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/services"
              className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 text-base font-semibold backdrop-blur-md transition-colors hover:bg-white hover:text-petro-navy sm:w-auto"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              <span>{t.hero.ctaServices}</span>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Slide controls with progress */}
      <div className="absolute bottom-24 left-0 right-0 z-20 mx-auto flex max-w-7xl items-center gap-3 px-5 sm:px-8 lg:px-12 2xl:px-16">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'relative h-2 overflow-hidden rounded-full bg-white/25 transition-all duration-500',
              i === index ? 'w-16' : 'w-2 hover:bg-white/50'
            )}
          >
            {i === index && (
              <motion.span
                key={`${s.id}-${paused}`}
                className="absolute inset-y-0 left-0 rounded-full bg-petro-silver"
                initial={{ width: '0%' }}
                animate={{ width: paused || reduce ? '100%' : '100%' }}
                transition={{ duration: paused || reduce ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur hover:bg-white/20"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
        <span className="ml-auto hidden font-heading text-sm font-semibold text-white/70 sm:block">
          <span className="text-white">0{index + 1}</span> / 0{slides.length}
        </span>
      </div>

      {/* Bottom ticker pill */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-full border border-white/15 bg-[#101820]/70 py-2.5 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-mobile-autoscroll gap-8">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-petro-steel-blue" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#story-intro"
        aria-label="Scroll to story"
        className="absolute bottom-24 right-6 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur lg:flex"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
