'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flame, HardHat, ShieldCheck, Sparkles } from 'lucide-react';
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
import { HeroSlider } from '@/components/sections/HeroSlider';
import { StatsBand } from '@/components/sections/StatsBand';
import { MobilisationJourney } from '@/components/sections/mobilisation/MobilisationJourney';
import { WhyPetroconBento } from '@/components/sections/WhyPetroconBento';
import { DisciplineMarquee } from '@/components/sections/DisciplineMarquee';
import { CTABand } from '@/components/sections/CTABand';
import { KineticText, ScrambleEyebrow } from '@/components/ui/KineticText';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion/Reveal';
import { ScrollTextReveal } from '@/components/ui/motion/ScrollTextReveal';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { getIcon, hseIcons, industryIcons, manpowerGroupIcons } from '@/components/ui/Icon';
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

const workforceRoles = [
  {
    title: 'Certified Welders',
    tag: 'Pipeline & Fabrication',
    image: '/images/pipeline-welding.webp',
    alt: 'Certified pipeline welder at work',
    copy: 'Coded welders and fabricators for pipelines, spools and structural steel.',
    icon: Flame,
  },
  {
    title: 'Oil & Gas Engineers',
    tag: 'Engineering & Supervision',
    image: '/images/industrial-engineers.webp',
    alt: 'Oil and gas engineers reviewing site plans',
    copy: 'Field, mechanical and site-coordination engineers who keep projects on spec.',
    icon: HardHat,
  },
  {
    title: 'HSE Safety Officers',
    tag: 'Health, Safety & Environment',
    image: '/images/industrial-safety-team.webp',
    alt: 'HSE safety officers on an industrial site',
    copy: 'Safety professionals embedding risk awareness into every shift.',
    icon: ShieldCheck,
  },
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

      // Chapter 02 — People Behind the Power: bidirectional depth movement on role cards
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
                'rounded-xl bg-petro-navy/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity',
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

      <div data-chapter-index="0">
        <HeroSlider />
      </div>
      <div className="bg-[#101820]">
        <StatsBand />
      </div>

      {/* Story intro — scroll-scrubbed statement */}
      <section id="story-intro" className="relative overflow-hidden bg-[#101820] px-4 py-24 text-white sm:px-6 lg:px-12 2xl:px-16 lg:py-36">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Our Story
            </p>
          </Reveal>
          <ScrollTextReveal
            text="Every refinery, pipeline and offshore deck depends on the people who keep it running. PETROCON exists to put skilled, safety-ready hands on those sites, exactly when operations need them."
            highlight={['refinery', 'pipeline', 'offshore', 'skilled', 'safety-ready']}
            className="text-3xl leading-[1.25] sm:text-4xl sm:leading-[1.25] lg:text-[3.25rem] lg:leading-[1.2]"
          />
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 02 — PEOPLE BEHIND THE POWER (Transparent Foreground Cutouts)
         ===================================================================== */}
      <section
        id="chapter-02"
        data-chapter-index="1"
        className="relative min-h-[95svh] overflow-hidden border-t border-white/10 bg-[#101820] py-24 text-white"
      >
        {/* Background Industrial Facility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/scenes/02-workforce/bg-facility.webp')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101820] via-[#101820]/70 to-[#101820]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          {/* Giant Editorial Typography Behind/Beside Cutout Workers */}
          <div className="text-center">
            <ScrambleEyebrow text="Chapter 02 · People Behind the Power" className="text-[#B8D0DE]" />
            <KineticText
              as="h2"
              text="EXPERT PEOPLE."
              className="mt-3 font-heading text-4xl font-bold tracking-industrial text-white sm:text-6xl lg:text-7xl"
            />
            <KineticText
              as="p"
              text="POWERFUL SOLUTIONS."
              delay={0.25}
              className="font-heading text-4xl font-bold tracking-industrial text-[#B8D0DE] sm:text-6xl lg:text-7xl"
            />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              Disciplined engineers, certified welders, mechanical technicians, and HSE safety
              officers mobilized with safety readiness and technical precision.
            </p>
          </div>

          {/* Workforce role cards with depth parallax */}
          <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 items-end gap-5 sm:grid-cols-3 sm:gap-6">
            {workforceRoles.map((role, i) => {
              const RoleIcon = role.icon;
              const center = i === 1;
              return (
                <div
                  key={role.title}
                  className={center ? 'ch2-worker-center relative z-10' : 'ch2-worker-side relative'}
                >
                <Reveal delay={i * 0.12}>
                  <article
                    className={cn(
                      'group relative overflow-hidden rounded-[2rem] border bg-petro-navy-mid shadow-2xl transition-transform duration-500 hover:-translate-y-2',
                      center
                        ? 'aspect-[4/3] border-petro-blue/50 shadow-petro-blue/20 sm:aspect-[3/4]'
                        : 'aspect-[4/3] border-white/15 sm:aspect-[3/3.6]'
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={role.image}
                      alt={role.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/30 to-transparent" />
                    <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-petro-blue">
                      <RoleIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
                        {role.tag}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-bold text-white sm:text-2xl">
                        {role.title}
                      </h3>
                      <p className="mt-1.5 max-h-0 overflow-hidden text-sm text-slate-300 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                        {role.copy}
                      </p>
                    </div>
                  </article>
                </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <DisciplineMarquee />

      {/* =====================================================================
          CHAPTER 03 — TECHNICAL EXCELLENCE (Pinned Scroll-Driven Services)
         ===================================================================== */}
      <section
        id="chapter-03"
        ref={techPinRef}
        data-chapter-index="2"
        className="relative border-t border-white/10 bg-[#354B60] py-20 text-white lg:flex lg:min-h-[100svh] lg:items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ScrambleEyebrow text="Chapter 03 · Technical Excellence" className="text-[#B8D0DE]" />
              <KineticText
                as="h2"
                mode="words"
                text="Multi-Discipline Industrial Execution"
                className="mt-3 font-heading text-3xl font-bold tracking-industrial sm:text-4xl"
              />

              <div className="mt-8 space-y-2">
                {featuredServices.map((srv, idx) => {
                  const SrvIcon = getIcon(srv.iconName);
                  return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setActiveTechIdx(idx)}
                    className={cn(
                      'group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-300',
                      activeTechIdx === idx
                        ? 'border-petro-silver/60 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300',
                          activeTechIdx === idx ? 'bg-petro-steel-blue text-petro-navy' : 'bg-white/10 text-[#B8D0DE] group-hover:bg-white/15'
                        )}
                      >
                        <SrvIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-bold text-[#B8D0DE]">
                        {srv.code}
                      </span>
                      <span className="font-heading text-sm font-semibold">{srv.title}</span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        activeTechIdx === idx ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-50'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              {(() => {
                const current = featuredServices[activeTechIdx] || featuredServices[0];
                return (
                  <div
                    key={current.id}
                    className="animate-[tech-in_0.6s_cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-[2rem] border border-white/15 bg-[#101820] shadow-2xl"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.image}
                        alt={current.imageAlt}
                        className="h-full w-full object-cover transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-6 font-heading text-xs font-bold uppercase tracking-widecaps text-[#B8D0DE]">
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
                          className="inline-flex items-center gap-2 rounded-xl bg-petro-steel-blue px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-petro-navy hover:bg-petro-silver"
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
        className="relative overflow-hidden border-t border-white/10 bg-[#101820] py-20 text-white lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <ScrambleEyebrow text="Chapter 04 · Industries We Serve" className="text-[#B8D0DE]" />
          <KineticText
            as="h2"
            mode="words"
            text="Built for High-Specification Sectors"
            className="mt-2 font-heading text-3xl font-bold tracking-industrial sm:text-4xl"
          />
        </div>

        <div className="mt-10 overflow-x-auto px-4 lg:overflow-visible lg:px-8">
          <div
            ref={industriesTrackRef}
            className="flex w-max gap-6 will-change-transform"
          >
            {confirmedIndustries.slice(0, 5).map((ind, indIdx) => {
              const IndIcon = industryIcons[ind.slug] ?? ShieldCheck;
              return (
              <article
                key={ind.id}
                className="group relative flex h-[430px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] border border-white/15 bg-petro-navy-mid p-6 sm:w-[420px] lg:h-[470px] lg:w-[540px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.image}
                  alt={ind.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/55 to-transparent" />
                <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-petro-blue">
                    <IndIcon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-5xl font-bold text-white/15">0{indIdx + 1}</span>
                </div>
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
                    {ind.tagline}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-white sm:text-3xl">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-200">{ind.description}</p>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <MobilisationJourney />

      <WhyPetroconBento />

      {/* =====================================================================
          CHAPTER 06 — SAFETY & PROFESSIONALISM (Dark HSE Scene)
         ===================================================================== */}
      <section
        id="chapter-06"
        data-chapter-index="5"
        className="relative overflow-hidden bg-[#101820] py-20 text-white lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal direction="right" className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scenes/05-safety/safety-team.webp"
                alt="PETROCON HSE Safety Team"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#101820]/75 px-4 py-3 backdrop-blur-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-petro-blue">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">Safety is non-negotiable</span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <ScrambleEyebrow text="Chapter 06 · Safety & Professionalism" className="text-[#B8D0DE]" />
            <KineticText
              as="h2"
              mode="words"
              text={companyConfig.hse.headline}
              className="mt-2 font-heading text-3xl font-bold tracking-industrial sm:text-4xl"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {companyConfig.hse.description}
            </p>
            <Stagger as="ul" className="mt-6 space-y-3">
              {companyConfig.hse.pillars.map((p, pIdx) => {
                const PIcon = hseIcons[pIdx] ?? ShieldCheck;
                return (
                <StaggerItem
                  as="li"
                  key={p.title}
                  className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#B8D0DE]/40 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petro-blue/20 text-[#B8D0DE] transition-all duration-300 group-hover:bg-petro-blue group-hover:text-white">
                    <PIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-white">{p.title}</p>
                    <p className="mt-0.5 text-xs text-slate-300">{p.description}</p>
                  </div>
                </StaggerItem>
                );
              })}
            </Stagger>
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
                <div className="h-full w-full bg-gradient-to-t from-[#101820] via-[#101820]/70 to-[#101820]/50" />
              ),
            },
          ]}
        >
          <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-12 2xl:px-16">
            <p className="text-xs font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
              Chapter 07 &middot; Your Workforce Partner
            </p>
            <KineticText
              as="h2"
              mode="words"
              text="YOUR WORKFORCE. YOUR PROJECTS. OUR COMMITMENT."
              className="mt-4 font-heading text-4xl font-bold leading-tight tracking-industrial text-white sm:text-6xl"
            />
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="#request-manpower"
                  className="group relative inline-flex min-h-[56px] items-center justify-center gap-2 overflow-hidden rounded-2xl bg-petro-steel-blue px-8 py-3.5 text-sm font-semibold text-petro-navy shadow-xl hover:bg-petro-silver"
                >
                  <span className="btn-shine" aria-hidden="true" />
                  <span>{t.hero.ctaRequest}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-petro-navy"
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
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
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
                  'min-h-[42px] shrink-0 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300',
                  selectedGroup === g
                    ? 'border-petro-navy bg-petro-navy text-white'
                    : 'border-slate-300 bg-petro-light-grey/60 text-petro-navy hover:border-petro-blue'
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <Stagger key={selectedGroup} className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredManpower.map((cat) => {
              const GIcon = manpowerGroupIcons[cat.group];
              return (
              <StaggerItem
                as="article"
                key={cat.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-petro-light-grey/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-petro-blue/40 hover:bg-white hover:shadow-industrial"
              >
                <div>
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-petro-blue shadow-sm transition-all duration-300 group-hover:bg-petro-blue group-hover:text-white">
                    <GIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
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
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section id="request-manpower" className="scroll-mt-24 border-t border-slate-200 bg-petro-light-grey py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 2xl:px-16">
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
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" />
          <div className="mt-8">
            <FAQAccordion items={faqData} />
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
