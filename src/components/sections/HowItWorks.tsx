'use client';

import { howItWorksSteps } from '@/config/manpower';
import { useLanguage } from '@/components/ui/LanguageContext';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function HowItWorks() {
  const { isRtl, t } = useLanguage();

  return (
    <section className="gsap-reveal-section border-y border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
        <SectionHeading
          eyebrow={t.sections.howItWorksEyebrow}
          title={t.sections.howItWorksTitle}
          description={t.sections.howItWorksDesc}
        />

        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Desktop horizontal connector rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 right-8 top-9 hidden h-[2px] bg-gradient-to-r from-petro-blue/20 via-petro-blue/50 to-petro-blue/20 lg:block"
          />

          {howItWorksSteps.map((item) => (
            <div
              key={item.step}
              className="group relative flex flex-col rounded-xl border border-slate-200 bg-petro-light-grey/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-petro-blue hover:bg-white hover:shadow-industrial"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-petro-navy font-heading text-base font-bold text-white transition-colors duration-300 group-hover:bg-petro-blue">
                {item.step}
              </div>
              <h3 className="mt-6 font-heading text-lg font-bold tracking-industrial text-petro-navy">
                {isRtl ? item.titleAr : item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-petro-steel">
                {isRtl ? item.descriptionAr : item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
