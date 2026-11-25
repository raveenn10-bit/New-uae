'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Cpu,
  Handshake,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedServices } from '@/config/services';
import { confirmedIndustries } from '@/config/industries';
import { confirmedManpowerCategories, type ManpowerGroup } from '@/config/manpower';
import { faqData } from '@/config/faq';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { ClientsCarousel } from './ClientsCarousel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ManpowerRequestForm } from '@/components/ui/ManpowerRequestForm';
import { VantaNetBackground } from '@/components/ui/VantaNetBackground';
import { useLanguage } from '@/components/ui/LanguageContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const whyIcons = {
  Users,
  Cpu,
  ShieldCheck,
  Award,
  Clock,
  Handshake,
};

const manpowerGroups: ('All' | ManpowerGroup)[] = [
  'All',
  'Engineering & Safety',
  'Mechanical & Fabrication',
  'Electrical & Instrumentation',
  'Lifting & Access',
  'Site & Turnaround Support',
];

export function HomeContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { isRtl, t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<'All' | ManpowerGroup>('All');
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<string>('');

  const filteredManpower =
    selectedGroup === 'All'
      ? confirmedManpowerCategories
      : confirmedManpowerCategories.filter((m) => m.group === selectedGroup);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* 1. CINEMATIC HERO */}
      <Hero />

      {/* 2. 15 CONFIGURABLE MANPOWER CATEGORIES */}
      <section
        id="manpower-categories"
        className="gsap-reveal-section bg-white py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={t.sections.manpowerEyebrow}
              title={t.sections.manpowerTitle}
              description={t.sections.manpowerDesc}
            />
            <a
              href="#request-manpower"
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-sm bg-petro-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-petro-blue-dark"
            >
              <span>{t.hero.ctaQuote}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Group Filter Tabs */}
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
            {manpowerGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className={cn(
                  'min-h-[42px] shrink-0 rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors',
                  selectedGroup === group
                    ? 'border-petro-navy bg-petro-navy text-white'
                    : 'border-slate-300 bg-petro-light-grey/60 text-petro-navy hover:border-petro-blue'
                )}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Mobile Horizontal Auto-Scroll Carousel */}
          <div className="mt-8 md:hidden">
            <div className="no-scrollbar overflow-x-auto pb-4">
              <div className="animate-mobile-autoscroll gap-4 pr-4">
                {[...filteredManpower, ...filteredManpower].map((cat, idx) => (
                  <article
                    key={`${cat.id}-mob-${idx}`}
                    className="flex w-[264px] shrink-0 flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[3/4] w-full bg-petro-navy">
                      <Image
                        src={cat.mobileImage}
                        alt={cat.title}
                        fill
                        sizes="264px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-petro-navy/85 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-sm bg-petro-blue/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {cat.group}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-heading text-base font-bold text-petro-navy">
                        {isRtl ? cat.titleAr : cat.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-petro-steel">
                        {isRtl ? cat.summaryAr : cat.summary}
                      </p>
                      <a
                        href="#request-manpower"
                        onClick={() => setSelectedQuoteCategory(cat.title)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-petro-blue"
                      >
                        <span>{t.hero.ctaRequest}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop 3-Column / 5-Column Asymmetric Grid */}
          <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-5">
            {filteredManpower.map((cat) => (
              <article
                key={cat.id}
                className="group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-petro-blue/50 hover:shadow-industrial"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-petro-navy">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-petro-navy/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-petro-blue">
                    {cat.group}
                  </span>
                  <h3 className="mt-1 font-heading text-sm font-bold text-petro-navy group-hover:text-petro-blue">
                    {isRtl ? cat.titleAr : cat.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-petro-steel">
                    {isRtl ? cat.summaryAr : cat.summary}
                  </p>
                  <a
                    href="#request-manpower"
                    onClick={() => setSelectedQuoteCategory(cat.title)}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-petro-navy hover:text-petro-blue"
                  >
                    <span>Request</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS — 4-Step Animated Process */}
      <HowItWorks />

      {/* 4. COMPANY INTRODUCTION — Split-Screen Editorial Layout */}
      <section id="company-intro" className="gsap-reveal-section bg-petro-light-grey py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="About PETROCON"
                title={companyConfig.about.introHeadline}
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-petro-steel sm:text-lg">
                {companyConfig.about.introParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-petro-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-petro-blue"
                >
                  <span>Discover Our Corporate Profile</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-sm bg-petro-navy shadow-industrial-lg">
                <div className="relative aspect-[3/4] w-full md:aspect-[4/3]">
                  <Image
                    src="/images/mobile/industrial-engineers-mobile.webp"
                    alt="PETROCON branded engineers reviewing technical plans"
                    fill
                    sizes="(max-width: 767px) 92vw, 50vw"
                    className="object-cover md:hidden"
                  />
                  <Image
                    src="/images/industrial-engineers.webp"
                    alt="PETROCON branded engineers reviewing technical plans"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="hidden object-cover md:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES */}
      <section className="gsap-reveal-section bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Technical Services"
              title="Comprehensive Technical &amp; Workforce Solutions"
              description="Multi-discipline industrial services supporting Oil &amp; Gas, petrochemical, and heavy industrial operations."
            />
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-petro-blue transition-colors hover:text-petro-navy"
            >
              <span>{t.hero.ctaServices}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 md:hidden">
            <div className="no-scrollbar overflow-x-auto pb-4">
              <div className="animate-mobile-autoscroll gap-4 pr-4">
                {[...confirmedServices, ...confirmedServices].map((service, index) => (
                  <div key={`${service.id}-mob-${index}`} className="w-[272px] shrink-0">
                    <ServiceCard service={service} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
            {confirmedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES WE SERVE */}
      <section className="gsap-reveal-section bg-petro-navy py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              theme="dark"
              eyebrow="Industries We Serve"
              title="Built for High-Specification Industrial Sectors"
            />
            <Link
              href="/industries"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#7CC4F0] hover:text-white"
            >
              <span>Explore Industries</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 md:hidden">
            <div className="no-scrollbar overflow-x-auto pb-4">
              <div className="animate-mobile-autoscroll gap-4 pr-4">
                {[...confirmedIndustries, ...confirmedIndustries].map((industry, idx) => (
                  <div key={`${industry.id}-mob-${idx}`} className="w-[285px] shrink-0">
                    <IndustryCard industry={industry} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {confirmedIndustries.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE PETROCON (Vanta.NET) */}
      <section className="gsap-reveal-section relative overflow-hidden border-t border-white/10 bg-petro-navy py-20 text-white lg:py-28">
        <VantaNetBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Why Choose PETROCON"
            title="Operational Discipline Without Compromise"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyConfig.whyChoose.map((item) => {
              const Icon = whyIcons[item.iconName as keyof typeof whyIcons] || ShieldCheck;
              return (
                <div
                  key={item.id}
                  className="group rounded-sm border border-white/10 bg-[#071827]/80 p-6 backdrop-blur-sm transition-all hover:border-petro-blue hover:bg-[#0D263D]/90"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-petro-blue/15 text-[#7CC4F0] group-hover:bg-petro-blue group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. HSE */}
      <section className="gsap-reveal-section bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-petro-navy shadow-industrial-lg md:aspect-[4/3]">
                <Image
                  src="/images/mobile/industrial-safety-team-mobile.webp"
                  alt="PETROCON HSE safety officers"
                  fill
                  sizes="(max-width: 767px) 92vw, 50vw"
                  className="object-cover md:hidden"
                />
                <Image
                  src="/images/industrial-safety-team.webp"
                  alt="PETROCON HSE safety team"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="hidden object-cover md:block"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6">
              <SectionHeading
                eyebrow={companyConfig.hse.eyebrow}
                title={companyConfig.hse.headline}
                description={companyConfig.hse.description}
              />
              <ul className="mt-8 space-y-3.5">
                {companyConfig.hse.pillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="flex items-start gap-3.5 rounded-sm border border-slate-200 bg-petro-light-grey/60 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-petro-blue" aria-hidden="true" />
                    <div>
                      <h3 className="font-heading text-sm font-bold text-petro-navy">{pillar.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-petro-steel sm:text-sm">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. B2B REQUEST MANPOWER / FREE QUOTE SECTION */}
      <section
        id="request-manpower"
        className="gsap-reveal-section scroll-mt-24 border-t border-slate-200 bg-petro-light-grey py-20 lg:py-28"
      >
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

      {/* 10. CLIENTS & PARTNERS (Hidden until verified) */}
      <ClientsCarousel />

      {/* 11. FAQ */}
      <section className="gsap-reveal-section bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Key Information for Clients &amp; Candidates"
            align="center"
          />
          <div className="mt-10">
            <FAQAccordion items={faqData} />
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="bg-petro-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-sm border border-white/10 bg-gradient-to-br from-petro-navy-mid to-petro-navy p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
                Partner With PETROCON
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-industrial text-white sm:text-4xl">
                Building Stronger Industrial Partnerships.
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Your Workforce. Your Projects. Our Commitment.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#request-manpower"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-petro-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-petro-blue-dark"
              >
                <span>{t.hero.ctaRequest}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-petro-navy"
              >
                {t.hero.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
