'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'transform',
      });

      if (mediaWrapRef.current) {
        gsap.to(mediaWrapRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-petro-navy text-white"
    >
      {/* Parallax Video Background */}
      <div ref={mediaWrapRef} className="absolute inset-0 -bottom-6 -top-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/refinery-aerial-hero.webp"
          aria-hidden="true"
          className="hidden h-full w-full object-cover md:block"
        >
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/refinery-mobile-hero.webp"
          aria-hidden="true"
          className="block h-full w-full object-cover md:hidden"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/94 via-[#101820]/74 to-[#101820]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/50" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-12 2xl:px-16">
        <div className="max-w-3xl">
          <div className="hero-reveal mb-5 inline-flex items-center gap-3 rounded-xl border border-[#B8D0DE]/30 bg-[#101820]/65 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-petro-blue" />
            <span className="text-[11px] font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="hero-reveal font-heading text-4xl font-bold leading-[1.08] tracking-industrial text-white sm:text-5xl lg:text-[3.85rem]">
            {t.hero.headlineLine1}
            <span className="mt-1 block text-[#B8D0DE]">{t.hero.headlineLine2}</span>
          </h1>

          <p className="hero-reveal mt-5 max-w-2xl font-heading text-lg font-medium text-slate-200 sm:text-2xl">
            {t.hero.supporting}
          </p>

          <div className="hero-reveal mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#request-manpower"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-petro-blue px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl shadow-petro-navy/40 transition-all duration-200 hover:bg-petro-blue-dark"
            >
              <span>{t.hero.ctaRequest}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-petro-navy"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{t.hero.ctaQuote}</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex min-h-[52px] items-center justify-center px-4 py-3.5 text-sm font-semibold text-[#B8D0DE] transition-colors hover:text-white"
            >
              <span>{t.hero.ctaServices} &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#manpower-categories"
        aria-label="Scroll to manpower categories"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-slate-300 transition-colors hover:text-white"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
