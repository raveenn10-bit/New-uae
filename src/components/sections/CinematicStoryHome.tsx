'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedServices } from '@/config/services';
import { confirmedIndustries } from '@/config/industries';
import {
  confirmedManpowerCategories,
  howItWorksSteps,
  type ManpowerGroup,
} from '@/config/manpower';
import { faqData } from '@/config/faq';
import { MultiLayerScene } from '@/components/ui/MultiLayerScene';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ManpowerRequestForm } from '@/components/ui/ManpowerRequestForm';
import { ClientsCarousel } from '@/components/sections/ClientsCarousel';
import { useLanguage } from '@/components/ui/LanguageContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_LABELS = [
  '01 Refinery',
  '02 Workforce',
  '03 Technical',
  '04 Industries',
  '05 Mobilisation',
  '06 Safety',
  '07 Partner',
];

const manpowerGroups: ('All' | ManpowerGroup)[] = [
  'All',
  'Engineering & Safety',
  'Mechanical & Fabrication',
  'Electrical & Instrumentation',
  'Lifting & Access',
  'Site & Turnaround Support',
];

export function CinematicStoryHome() {
  const storyRef = useRef<HTMLDivElement>(null);
  const techPinRef = useRef<HTMLElement>(null);
  const industriesPinRef = useRef<HTMLElement>(null);
  const industriesTrackRef = useRef<HTMLDivElement>(null);
  const { isRtl, t } = useLanguage();

  const [activeChapter, setActiveChapter] = useState(0);
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<'All' | ManpowerGroup>('All');
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState('');

  const featuredServices = confirmedServices.slice(0, 6);
  const filteredManpower =
    selectedGroup === 'All'
      ? confirmedManpowerCategories
      : confirmedManpowerCategories.filter((m) => m.group === selectedGroup);

  useEffect(() => {
    const root = storyRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // Chapter progress tracker (bidirectional)
      gsap.utils.toArray<HTMLElement>('[data-chapter-index]').forEach((sec) => {
        const idx = Number(sec.dataset.chapterIndex || 0);
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveChapter(idx),
          onEnterBack: () => setActiveChapter(idx),
        });
      });

      // Chapter 02 — People Behind the Power: bidirectional depth movement on cutouts
      gsap.fromTo(
        '.ch2-worker-center',
        { y: 60, scale: 0.94 },
        {
          y: -30,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '#chapter-02',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
      gsap.fromTo(
        '.ch2-worker-side',
        { y: 95, opacity: 0.75 },
        {
          y: -15,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#chapter-02',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.0,
          },
        }
      );

      // Chapter 03 — Pinned Scroll-Driven Service Showcase (Desktop)
      if (isDesktop && techPinRef.current) {
        ScrollTrigger.create({
          trigger: techPinRef.current,
          start: 'top top',
          end: `+=${featuredServices.length * 420}`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              featuredServices.length - 1,
              Math.floor(self.progress * featuredServices.length)
            );
            setActiveTechIdx(idx);
          },
        });
      }

      // Chapter 04 — Horizontal Storytelling Controlled by Vertical Scroll (Desktop)
      if (isDesktop && industriesPinRef.current && industriesTrackRef.current) {
        const track = industriesTrackRef.current;
        const scrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

        gsap.to(track, {
          x: () => (isRtl ? scrollDistance() : -scrollDistance()),
          ease: 'none',
          scrollTrigger: {
            trigger: industriesPinRef.current,
            start: 'top top',
            end: () => `+=${scrollDistance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // Chapter 05 — SVG Technical Progress Line (Bidirectional Scrub)
      gsap.fromTo(
        '.ch5-progress-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: isRtl ? 'right center' : 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: '#chapter-05',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [featuredServices.length, isRtl]);

  return (
    <div ref={storyRef} className="relative bg-petro-navy">
      {/* Floating Vertical Chapter Progress Indicator (Desktop) */}
      <aside
        aria-label="Story Chapters"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      >
        {CHAPTER_LABELS.map((label, idx) => (
          <a
            key={label}
            href={`#chapter-0${idx + 1}`}
            title={label}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={cn(
                'rounded-sm bg-petro-navy/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity',
                activeChapter === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                activeChapter === idx
                  ? 'h-3 w-3 bg-petro-blue ring-4 ring-petro-blue/30'
                  : 'h-2 w-2 bg-white/40 group-hover:bg-white'
              )}
            />
          </a>
        ))}
      </aside>

      {/* =====================================================================
          CHAPTER 01 — POWERING INDUSTRY (Multi-Layer 2.5D Oil Refinery)
         ===================================================================== */}
      <div data-chapter-index="0">
        <MultiLayerScene
          id="chapter-01"
          minHeightClass="min-h-[100svh]"
          className="flex items-center text-white"
          layers={[
            {
              id: 'ch1-bg',
              role: 'background',
              src: '/scenes/01-refinery/bg-refinery.webp',
              alt: 'Golden-hour oil refinery aerial view',
              yParallax: 10,
              scaleTo: 1.14,
              pointerDepth: -10,
              className: 'hidden md:block -inset-8',
            },
            {
              id: 'ch1-bg-mob',
              role: 'background',
              src: '/scenes/01-refinery/mobile-refinery.webp',
              alt: 'Vertical oil refinery towers at twilight',
              yParallax: 8,
              scaleTo: 1.08,
              className: 'block md:hidden -inset-4',
            },
            {
              id: 'ch1-atmosphere',
              role: 'atmosphere',
              customContent: (
                <div className="h-full w-full bg-gradient-to-r from-[#071827]/92 via-[#071827]/65 to-[#071827]/25" />
              ),
            },
            {
              id: 'ch1-fg-pipes',
              role: 'foreground',
              src: '/scenes/01-refinery/fg-pipelines.webp',
              alt: 'Foreground industrial steel pipelines',
              yParallax: -18,
              scaleTo: 1.18,
              pointerDepth: 16,
              className: 'hidden md:block -inset-x-6 -bottom-10 top-auto h-[58%] opacity-80',
              imgClassName: 'object-contain object-bottom',
            },
          ]}
        >
          <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-sm border border-[#7CC4F0]/35 bg-[#071827]/70 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-petro-blue" />
                <span className="text-[11px] font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
                  Chapter 01 &middot; {t.hero.badge}
                </span>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-[1.04] tracking-industrial text-white sm:text-6xl lg:text-[4.25rem]">
                POWERING THE OIL &amp; GAS INDUSTRY
              </h1>
              <p className="mt-5 font-heading text-lg font-medium text-[#7CC4F0] sm:text-2xl">
                {t.hero.supporting}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Skilled technical manpower, mechanical works, electrical &amp; instrumentation, and
                turnaround support engineered for energy infrastructure.
              </p>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <a
                  href="#request-manpower"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-petro-blue px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-petro-blue-dark"
                >
                  <span>{t.hero.ctaRequest}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-petro-navy"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.ctaQuote}</span>
                </Link>
              </div>
            </div>
          </div>
        </MultiLayerScene>
      </div>

      {/* =====================================================================
          CHAPTER 02 — PEOPLE BEHIND THE POWER (Transparent Foreground Cutouts)
         ===================================================================== */}
      <section
        id="chapter-02"
        data-chapter-index="1"
        className="relative min-h-[95svh] overflow-hidden border-t border-white/10 bg-[#071827] py-24 text-white"
      >
        {/* Background Industrial Facility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/scenes/02-workforce/bg-facility.webp')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071827] via-[#071827]/70 to-[#071827]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Giant Editorial Typography Behind/Beside Cutout Workers */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
              Chapter 02 &middot; People Behind the Power
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-industrial text-white sm:text-6xl lg:text-7xl">
              EXPERT PEOPLE.
              <span className="block text-[#7CC4F0]">POWERFUL SOLUTIONS.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              Disciplined engineers, certified welders, mechanical technicians, and HSE safety
              officers mobilized with safety readiness and technical precision.
            </p>
          </div>

          {/* 3-Layer Transparent Cutout Stage */}
          <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-3 items-end gap-2 sm:gap-6">
            <div className="ch2-worker-side relative flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scenes/02-workforce/welder-cutout.webp"
                alt="PETROCON Certified Pipeline Welder"
                className="max-h-[420px] w-auto object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.65)]"
              />
            </div>
            <div className="ch2-worker-center relative z-10 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scenes/02-workforce/engineer-cutout.webp"
                alt="PETROCON Oil & Gas Engineer"
                className="max-h-[490px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(32,127,186,0.35)]"
              />
            </div>
            <div className="ch2-worker-side relative flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scenes/02-workforce/safety-officer-cutout.webp"
                alt="PETROCON HSE Safety Officer"
                className="max-h-[420px] w-auto object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 03 — TECHNICAL EXCELLENCE (Pinned Scroll-Driven Services)
         ===================================================================== */}
      <section
        id="chapter-03"
        ref={techPinRef}
        data-chapter-index="2"
        className="relative border-t border-white/10 bg-[#0D263D] py-20 text-white lg:flex lg:min-h-[100svh] lg:items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
                Chapter 03 &middot; Technical Excellence
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-industrial sm:text-4xl">
                Multi-Discipline Industrial Execution
              </h2>

              <div className="mt-8 space-y-2">
                {featuredServices.map((srv, idx) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setActiveTechIdx(idx)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left transition-all',
                      activeTechIdx === idx
                        ? 'border-petro-blue bg-petro-blue/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-heading text-xs font-bold text-[#7CC4F0]">
                        {srv.code}
                      </span>
                      <span className="font-heading text-sm font-semibold">{srv.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {(() => {
                const current = featuredServices[activeTechIdx] || featuredServices[0];
                return (
                  <div className="overflow-hidden rounded-sm border border-white/15 bg-[#071827] shadow-2xl">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.image}
                        alt={current.imageAlt}
                        className="h-full w-full object-cover transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-6 font-heading text-xs font-bold uppercase tracking-widecaps text-[#7CC4F0]">
                        Division {current.code}
                      </span>
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {current.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {current.fullDescription}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/services#${current.slug}`}
                          className="inline-flex items-center gap-2 rounded-sm bg-petro-blue px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-petro-blue-dark"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 04 — INDUSTRIES WE SERVE (Horizontal Scroll Storytelling)
         ===================================================================== */}
      <section
        id="chapter-04"
        ref={industriesPinRef}
        data-chapter-index="3"
        className="relative overflow-hidden border-t border-white/10 bg-[#071827] py-20 text-white lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
            Chapter 04 &middot; Industries We Serve
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-industrial sm:text-4xl">
            Built for High-Specification Sectors
          </h2>
        </div>

        <div className="mt-10 overflow-x-auto px-4 lg:overflow-visible lg:px-8">
          <div
            ref={industriesTrackRef}
            className="flex w-max gap-6 will-change-transform"
          >
            {confirmedIndustries.slice(0, 5).map((ind) => (
              <article
                key={ind.id}
                className="relative flex h-[430px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-sm border border-white/15 bg-petro-navy-mid p-6 sm:w-[420px] lg:h-[470px] lg:w-[540px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.image}
                  alt={ind.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/55 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
                    {ind.tagline}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-white sm:text-3xl">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-200">{ind.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 05 — WORKFORCE MOBILISATION (4-Step Process + SVG Line)
         ===================================================================== */}
      <section
        id="chapter-05"
        data-chapter-index="4"
        className="border-t border-slate-200 bg-white py-20 text-petro-navy lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Chapter 05 · Workforce Mobilisation"
            title={t.sections.howItWorksTitle}
            description={t.sections.howItWorksDesc}
          />
          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden="true"
              className="ch5-progress-line pointer-events-none absolute left-8 right-8 top-9 hidden h-[3px] bg-petro-blue lg:block"
            />
            {howItWorksSteps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-sm border border-slate-200 bg-petro-light-grey/60 p-6 transition-all hover:border-petro-blue hover:bg-white hover:shadow-industrial"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-sm bg-petro-navy font-heading text-base font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-petro-navy">
                  {isRtl ? s.titleAr : s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-petro-steel">
                  {isRtl ? s.descriptionAr : s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 06 — SAFETY & PROFESSIONALISM (Dark HSE Scene)
         ===================================================================== */}
      <section
        id="chapter-06"
        data-chapter-index="5"
        className="relative overflow-hidden bg-[#071827] py-20 text-white lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-sm border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scenes/05-safety/safety-team.webp"
                alt="PETROCON HSE Safety Team"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-petro-blue text-white">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
              Chapter 06 &middot; Safety &amp; Professionalism
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-industrial sm:text-4xl">
              {companyConfig.hse.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {companyConfig.hse.description}
            </p>
            <ul className="mt-6 space-y-3">
              {companyConfig.hse.pillars.map((p) => (
                <li
                  key={p.title}
                  className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/5 p-3.5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7CC4F0]" aria-hidden="true" />
                  <div>
                    <p className="font-heading text-sm font-bold text-white">{p.title}</p>
                    <p className="mt-0.5 text-xs text-slate-300">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 07 — YOUR WORKFORCE PARTNER (Cinematic Closing Scene)
         ===================================================================== */}
      <div data-chapter-index="6">
        <MultiLayerScene
          id="chapter-07"
          minHeightClass="min-h-[85svh]"
          className="flex items-center text-white"
          layers={[
            {
              id: 'ch7-team',
              role: 'background',
              src: '/scenes/06-final/corporate-team.webp',
              alt: 'PETROCON Industrial Workforce Team',
              yParallax: 10,
              scaleTo: 1.08,
              pointerDepth: -8,
              className: '-inset-6',
            },
            {
              id: 'ch7-scrim',
              role: 'atmosphere',
              customContent: (
                <div className="h-full w-full bg-gradient-to-t from-[#071827] via-[#071827]/70 to-[#071827]/50" />
              ),
            },
          ]}
        >
          <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
              Chapter 07 &middot; Your Workforce Partner
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-industrial text-white sm:text-6xl">
              YOUR WORKFORCE. YOUR PROJECTS. OUR COMMITMENT.
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#request-manpower"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-petro-blue px-8 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-petro-blue-dark"
              >
                <span>{t.hero.ctaRequest}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-petro-navy"
              >
                {t.hero.ctaQuote}
              </Link>
            </div>
          </div>
        </MultiLayerScene>
      </div>

      {/* =====================================================================
          15 CONFIGURABLE MANPOWER CATEGORIES + B2B QUOTATION FORM + FAQ
         ===================================================================== */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.sections.manpowerEyebrow}
            title={t.sections.manpowerTitle}
            description={t.sections.manpowerDesc}
          />
          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-2">
            {manpowerGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGroup(g)}
                className={cn(
                  'min-h-[40px] shrink-0 rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider',
                  selectedGroup === g
                    ? 'border-petro-navy bg-petro-navy text-white'
                    : 'border-slate-300 bg-petro-light-grey/60 text-petro-navy hover:border-petro-blue'
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredManpower.map((cat) => (
              <article
                key={cat.id}
                className="flex flex-col justify-between rounded-sm border border-slate-200 bg-petro-light-grey/40 p-4 transition-colors hover:border-petro-blue hover:bg-white"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-petro-blue">
                    {cat.group}
                  </span>
                  <h3 className="mt-1 font-heading text-sm font-bold text-petro-navy">
                    {isRtl ? cat.titleAr : cat.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-petro-steel">
                    {isRtl ? cat.summaryAr : cat.summary}
                  </p>
                </div>
                <a
                  href="#request-manpower"
                  onClick={() => setSelectedQuoteCategory(cat.title)}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-petro-blue"
                >
                  <span>Request</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request-manpower" className="scroll-mt-24 border-t border-slate-200 bg-petro-light-grey py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.sections.quoteEyebrow}
            title={t.sections.quoteTitle}
            description={t.sections.quoteDesc}
            align="center"
          />
          <div className="mt-10">
            <ManpowerRequestForm key={selectedQuoteCategory} defaultCategory={selectedQuoteCategory} />
          </div>
        </div>
      </section>

      <ClientsCarousel />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" />
          <div className="mt-8">
            <FAQAccordion items={faqData} />
          </div>
        </div>
      </section>
    </div>
  );
}
