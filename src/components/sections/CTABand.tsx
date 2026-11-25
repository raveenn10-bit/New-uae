import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { KineticText } from '@/components/ui/KineticText';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { Reveal } from '@/components/ui/motion/Reveal';

/** Rounded closing call-to-action card with animated rings and kinetic headline. */
export function CTABand() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-12 2xl:px-16">
      <Reveal direction="scale" className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-petro-navy px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/offshore-platform.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-petro-navy via-petro-navy/85 to-petro-steel-blue/40" />
          <div
            aria-hidden="true"
            className="animate-spin-slow absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border-[18px] border-dashed border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-petro-steel-blue/40 blur-[90px]"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
                Ready when your project is
              </p>
              <KineticText
                as="h2"
                mode="words"
                text="Let’s Mobilise Your Next Crew."
                className="mt-3 font-heading text-4xl font-bold tracking-industrial sm:text-5xl lg:text-6xl"
              />
              <p className="mt-4 max-w-xl text-base text-slate-300">
                Share your trades, headcount and timeline. Our coordination team prepares a
                structured proposal aligned with your site scope.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Magnetic>
                <a
                  href="#request-manpower"
                  className="group relative inline-flex min-h-[58px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-petro-steel-blue px-8 font-semibold text-petro-navy shadow-xl shadow-black/30 hover:bg-petro-silver sm:w-auto"
                >
                  <span className="btn-shine" aria-hidden="true" />
                  Request Manpower
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 font-semibold backdrop-blur hover:bg-white hover:text-petro-navy sm:w-auto"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                  Talk to Our Team
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
