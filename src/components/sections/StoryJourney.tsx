'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, FileSignature, HardHat, UserCheck } from 'lucide-react';
import { howItWorksSteps } from '@/config/manpower';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/components/ui/LanguageContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [ClipboardList, UserCheck, FileSignature, HardHat];
const stepImages = [
  { src: '/images/industrial-engineers.webp', alt: 'Engineers reviewing project requirements' },
  { src: '/images/industrial-safety-team.webp', alt: 'Vetted technical crew selection' },
  { src: '/images/fabrication-workshop.webp', alt: 'Contract and scope alignment for site works' },
  { src: '/images/pipeline-welding.webp', alt: 'Mobilised welders working on a pipeline' },
];

/**
 * Chapter 05 storytelling: sticky visual swaps as the reader scrolls
 * through the four mobilisation steps, with a scroll-drawn progress rail.
 */
export function StoryJourney() {
  const { isRtl } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-journey-step]').forEach((el) => {
        const idx = Number(el.dataset.journeyStep);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setActive(idx),
        });
      });

      if (!reduce) {
        gsap.fromTo(
          '.journey-rail-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.journey-steps',
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="chapter-05"
      data-chapter-index="4"
      className="relative bg-petro-light-grey py-20 text-petro-navy lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 05 · The Mobilisation Journey"
          title="From Your Request to Boots on Site"
          description="Follow a requirement through our four-step process, every stage coordinated, documented and safety-aligned."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-petro-navy shadow-industrial-lg">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={active}
                  src={stepImages[active].src}
                  alt={stepImages[active].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.15, clipPath: 'inset(0 0 100% 0 round 2rem)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0 round 2rem)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                  >
                    <p className="font-heading text-7xl font-bold leading-none text-white/15">
                      {howItWorksSteps[active].step}
                    </p>
                    <p className="-mt-6 font-heading text-2xl font-bold">
                      {isRtl ? howItWorksSteps[active].titleAr : howItWorksSteps[active].title}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-5 flex gap-2">
                  {howItWorksSteps.map((s, i) => (
                    <span
                      key={s.step}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        i === active ? 'w-10 bg-petro-blue' : 'w-4 bg-white/30'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Steps with scroll-drawn rail */}
          <div className="journey-steps relative">
            <div
              aria-hidden="true"
              className="absolute bottom-10 left-7 top-10 w-[3px] rounded-full bg-slate-200 rtl:left-auto rtl:right-7"
            >
              <div className="journey-rail-fill h-full w-full rounded-full bg-gradient-to-b from-petro-blue to-[#7CC4F0]" />
            </div>
            <ol className="space-y-6 lg:space-y-[22vh] lg:py-[8vh]">
              {howItWorksSteps.map((s, i) => {
                const Icon = stepIcons[i] ?? HardHat;
                const on = i <= active;
                return (
                  <li
                    key={s.step}
                    data-journey-step={i}
                    className="relative flex gap-6 ps-0"
                  >
                    <span
                      className={cn(
                        'relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-petro-light-grey transition-all duration-500',
                        on ? 'scale-110 bg-petro-blue text-white shadow-lg shadow-petro-blue/40' : 'bg-white text-petro-steel'
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div
                      className={cn(
                        'flex-1 rounded-3xl border bg-white p-6 transition-all duration-500',
                        i === active
                          ? 'border-petro-blue/40 shadow-industrial'
                          : 'border-slate-200 lg:opacity-60'
                      )}
                    >
                      <span className="text-xs font-bold uppercase tracking-widecaps text-petro-blue">
                        Step {s.step}
                      </span>
                      <h3 className="mt-1 font-heading text-xl font-bold">
                        {isRtl ? s.titleAr : s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-petro-steel">
                        {isRtl ? s.descriptionAr : s.description}
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stepImages[i].src}
                        alt={stepImages[i].alt}
                        className="mt-4 aspect-[16/9] w-full rounded-2xl object-cover lg:hidden"
                        loading="lazy"
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
