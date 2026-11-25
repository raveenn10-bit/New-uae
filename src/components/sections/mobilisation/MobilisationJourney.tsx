'use client';

import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { KineticText, ScrambleEyebrow } from '@/components/ui/KineticText';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/components/ui/SmoothScrollProvider';
import { FINAL_KEY, STEP_KEYS, activeStepFor, mobilisationSteps } from './data';
import type { SceneInputs } from './MobilisationScene';

gsap.registerPlugin(ScrollTrigger);

const MobilisationScene = dynamic(() => import('./MobilisationScene'), { ssr: false });

const EYEBROW = 'Chapter 05 · Workforce Mobilisation';

type Mode = 'timeline' | 'cinematic';

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Falls back to the timeline if WebGL throws at runtime. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Chapter 05 — Workforce Mobilisation.
 * Desktop + WebGL: sticky, scroll-driven 3D journey (React Three Fiber).
 * Mobile, reduced motion or no WebGL: lightweight vertical 3D-render timeline.
 */
export function MobilisationJourney() {
  const [mode, setMode] = useState<Mode>('timeline');

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () =>
      setMode(desktop.matches && !reduce.matches && supportsWebGL() ? 'cinematic' : 'timeline');
    decide();
    desktop.addEventListener('change', decide);
    reduce.addEventListener('change', decide);
    return () => {
      desktop.removeEventListener('change', decide);
      reduce.removeEventListener('change', decide);
    };
  }, []);

  // Page height changes when the mode switches; re-measure every trigger.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [mode]);

  return mode === 'cinematic' ? (
    <CinematicJourney onFail={() => setMode('timeline')} />
  ) : (
    <TimelineJourney />
  );
}

/* ------------------------------------------------------------------ */
/* Desktop cinematic                                                    */
/* ------------------------------------------------------------------ */

function CinematicJourney({ onFail }: { onFail: () => void }) {
  const { t, isRtl } = useLanguage();
  const wrapRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const inputs = useRef<SceneInputs>({ progress, pointer }).current;
  const [active, setActive] = useState(0);
  const [complete, setComplete] = useState(false);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      refreshPriority: -1,
      onUpdate: (self) => {
        const p = self.progress;
        progress.current = p;
        if (fillRef.current) {
          fillRef.current.style.width = `${Math.min(1, p / STEP_KEYS[3]) * 100}%`;
        }
        setActive(activeStepFor(p));
        setComplete(p > (STEP_KEYS[3] + FINAL_KEY) / 2);
      },
    });

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: '200px 0px',
    });
    io.observe(wrap);
    // Download the 3D engine + textures only when the reader gets close.
    const armIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          armIo.disconnect();
        }
      },
      { rootMargin: '1600px 0px' }
    );
    armIo.observe(wrap);

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      st.kill();
      io.disconnect();
      armIo.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const scrollToStep = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const distance = wrap.offsetHeight - window.innerHeight;
    smoothScrollTo(top + distance * STEP_KEYS[i]);
  };

  const step = mobilisationSteps[active];

  return (
    <section
      ref={wrapRef}
      id="chapter-05"
      data-chapter-index="4"
      aria-label={t.sections.howItWorksTitle}
      className="relative bg-white"
      style={{ height: '520vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Quiet engineering backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(rgba(16, 24, 32,0.09)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-10%] top-1/2 h-[80vh] w-[70vw] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(115, 148, 172,0.10),transparent_65%)]"
        />

        {/* 3D stage */}
        <div className="absolute inset-y-0 left-[26%] right-0 [mask-image:linear-gradient(90deg,transparent,black_22%)] rtl:left-0 rtl:right-[26%] rtl:[mask-image:linear-gradient(270deg,transparent,black_22%)]">
          <div
            className={cn(
              'h-full w-full transition-opacity duration-1000',
              ready ? 'opacity-100' : 'opacity-0'
            )}
          >
            <SceneBoundary onError={onFail}>
              {armed && (
                <MobilisationScene inputs={inputs} running={inView} onReady={() => setReady(true)} />
              )}
            </SceneBoundary>
          </div>
        </div>

        {/* Editorial column */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pt-20 lg:px-8">
          <div className="w-full max-w-[30rem]">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-petro-blue/20 bg-petro-blue-light px-3.5 py-1.5 text-petro-blue">
              <span className="h-2 w-2 rounded-full bg-petro-blue" />
              <ScrambleEyebrow text={EYEBROW} className="font-sans" />
            </div>
            <KineticText
              as="h2"
              mode="words"
              text={t.sections.howItWorksTitle}
              className="font-heading text-[2.5rem] font-bold leading-[1.08] tracking-industrial text-petro-navy xl:text-5xl"
            />
            <p className="mt-4 text-base leading-relaxed text-petro-steel">
              {t.sections.howItWorksDesc}
            </p>

            {/* Pipeline progress indicator */}
            <div className="relative mt-9" aria-label="Mobilisation progress">
              <div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-slate-200">
                <div
                  ref={fillRef}
                  className="pipe-flow h-full rounded-full bg-petro-steel-blue"
                  style={{ width: '0%' }}
                />
              </div>
              <ol className="relative flex justify-between">
                {mobilisationSteps.map((s, i) => (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(i)}
                      aria-current={i === active ? 'step' : undefined}
                      aria-label={`${s.step} ${isRtl ? s.titleAr : s.title}`}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border-2 font-heading text-xs font-bold transition-all duration-500',
                        i < active || complete
                          ? 'border-petro-blue bg-petro-blue text-white'
                          : i === active
                            ? 'scale-110 border-petro-blue bg-white text-petro-blue shadow-[0_0_0_6px_rgba(115, 148, 172,0.15)]'
                            : 'border-slate-200 bg-white text-slate-400 hover:border-petro-blue/50'
                      )}
                    >
                      {i < active || complete ? <CheckCircle2 className="h-4 w-4" /> : s.step}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Active step, synced to scroll */}
            <div className="relative mt-8 min-h-[190px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={complete ? 'complete' : active}
                  initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {complete ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-widecaps text-petro-blue">
                        Fully Mobilised
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-bold text-petro-navy">
                        Your workforce, on site and operational.
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-petro-steel">
                        {isRtl ? step.descriptionAr : step.description}
                      </p>
                    </>
                  ) : (
                    <div className="flex gap-5">
                      <span className="font-heading text-6xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#354B60]">
                        {step.step}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widecaps text-petro-blue">
                          Step {step.step} of 04
                        </p>
                        <h3 className="mt-1.5 font-heading text-2xl font-bold text-petro-navy">
                          {isRtl ? step.titleAr : step.title}
                        </h3>
                        <p className="mt-2.5 text-[15px] leading-relaxed text-petro-steel">
                          {isRtl ? step.descriptionAr : step.description}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <Magnetic>
                <a
                  href="#request-manpower"
                  className="group relative inline-flex min-h-[56px] items-center gap-2.5 overflow-hidden rounded-2xl bg-petro-navy px-7 font-semibold text-white shadow-industrial transition-colors hover:bg-petro-blue"
                >
                  <span className="btn-shine" aria-hidden="true" />
                  {t.hero.ctaRequest}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </a>
              </Magnetic>
              <span className="text-xs font-medium text-petro-steel">Scroll to follow the journey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / reduced-motion / no-WebGL timeline                         */
/* ------------------------------------------------------------------ */

function TimelineJourney() {
  const { t, isRtl } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-tl-step]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 70%',
          end: 'bottom 70%',
          onEnter: () => el.classList.add('is-reached'),
          onLeaveBack: () => el.classList.remove('is-reached'),
        });
      });
      if (reduce) return;

      gsap.fromTo(
        '.tl-rail-fill',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: '.tl-list', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        }
      );

      gsap.utils.toArray<HTMLElement>('.tl-visual').forEach((el, i) => {
        gsap.fromTo(
          el,
          { rotateX: 24, rotateY: i % 2 ? -18 : 18, y: 70, scale: 0.86, opacity: 0 },
          {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 50%', scrub: 0.5 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="chapter-05"
      data-chapter-index="4"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(rgba(16, 24, 32,0.08)_1px,transparent_1px)] [background-size:26px_26px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-12 2xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-petro-blue/20 bg-petro-blue-light px-3.5 py-1.5 text-petro-blue">
            <span className="h-2 w-2 rounded-full bg-petro-blue" />
            <ScrambleEyebrow text={EYEBROW} className="font-sans" />
          </div>
          <KineticText
            as="h2"
            mode="words"
            text={t.sections.howItWorksTitle}
            className="font-heading text-3xl font-bold tracking-industrial text-petro-navy sm:text-4xl"
          />
          <p className="mt-4 text-base leading-relaxed text-petro-steel">{t.sections.howItWorksDesc}</p>
        </div>

        <div className="tl-list relative mt-14">
          {/* Pipeline rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 top-6 w-1 rounded-full bg-slate-200 ltr:left-[19px] rtl:right-[19px] md:left-1/2 md:-translate-x-1/2 md:rtl:right-auto"
          >
            <div className="tl-rail-fill pipe-flow-y h-full w-full rounded-full bg-petro-steel-blue" />
          </div>
          <ol className="space-y-14 md:space-y-20">

          {mobilisationSteps.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={s.step}
                data-tl-step
                className="group relative grid gap-6 ps-14 md:grid-cols-2 md:items-center md:gap-16 md:ps-0"
              >
                <span className="absolute top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white font-heading text-xs font-bold text-slate-400 transition-all duration-500 group-[.is-reached]:border-petro-blue group-[.is-reached]:bg-petro-blue group-[.is-reached]:text-white ltr:left-0 rtl:right-0 md:top-1/2 md:-translate-y-1/2 md:ltr:left-1/2 md:ltr:-translate-x-1/2 md:rtl:right-1/2 md:rtl:translate-x-1/2">
                  {s.step}
                </span>
                <div className={cn('[perspective:1100px]', flip && 'md:order-2')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    width={760}
                    height={680}
                    className="tl-visual mx-auto h-auto w-full max-w-[28rem] drop-shadow-[0_30px_40px_rgba(16, 24, 32,0.12)] will-change-transform"
                  />
                </div>
                <div className={cn(flip && 'md:order-1 md:text-end')}>
                  <p className="text-xs font-bold uppercase tracking-widecaps text-petro-blue">
                    Step {s.step}
                  </p>
                  <h3 className="mt-1.5 font-heading text-2xl font-bold text-petro-navy">
                    {isRtl ? s.titleAr : s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-petro-steel">
                    {isRtl ? s.descriptionAr : s.description}
                  </p>
                </div>
              </li>
            );
          })}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#request-manpower"
            className="group relative inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-petro-navy px-7 font-semibold text-white shadow-industrial transition-colors hover:bg-petro-blue sm:w-auto"
          >
            <span className="btn-shine" aria-hidden="true" />
            {t.hero.ctaRequest}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
