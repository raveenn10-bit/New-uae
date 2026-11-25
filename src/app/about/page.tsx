import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Target, Eye } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { PageBanner } from '@/components/sections/PageBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about PETROCON Technical Works LLC — our mission, vision, core values, technical expertise, and safety-first corporate approach for the Oil & Gas sector.',
  alternates: {
    canonical: `${companyConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  const { about, hse } = companyConfig;

  return (
    <>
      <PageBanner
        eyebrow="Corporate Profile"
        title="Engineering Discipline &amp; Industrial Workforce Solutions"
        description="Dedicated to supporting Oil &amp; Gas and industrial operators with qualified technical personnel and safety-focused execution."
        image="/images/petrochemical-facility.webp"
        mobileImage="/images/mobile/petrochemical-facility-mobile.webp"
        imageAlt="Modern petrochemical and industrial processing facility at dusk"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
      />

      {/* Company Introduction */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Who We Are"
                title={about.introHeadline}
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-petro-steel sm:text-lg">
                {about.introParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-petro-navy shadow-industrial md:aspect-[4/3]">
                <Image
                  src="/images/mobile/industrial-engineers-mobile.webp"
                  alt="PETROCON branded engineers conducting site review"
                  fill
                  sizes="(max-width: 767px) 92vw, 50vw"
                  className="object-cover md:hidden"
                />
                <Image
                  src="/images/industrial-engineers.webp"
                  alt="PETROCON branded engineers conducting site review"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="hidden object-cover md:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-slate-200 bg-petro-light-grey py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-petro-blue text-white">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold tracking-industrial text-petro-navy">
                Our Mission
              </h2>
              <p className="mt-4 text-base leading-relaxed text-petro-steel">
                {about.mission}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-petro-navy p-8 text-white shadow-sm sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-petro-blue text-white">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold tracking-industrial text-white">
                Our Vision
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {about.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <SectionHeading
            eyebrow="Core Values"
            title="Principles That Guide Every Deployment"
            description="Our operating standards are anchored in safety discipline, technical integrity, and accountable client partnership."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.coreValues.map((value, idx) => (
              <div
                key={value.title}
                className="rounded-xl border border-slate-200 bg-petro-light-grey/50 p-6 transition-colors hover:border-petro-blue/40 hover:bg-white"
              >
                <span className="font-heading text-xs font-bold tracking-widest text-petro-blue">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-petro-navy">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-petro-steel">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise & Safety/Quality Commitment */}
      <section className="bg-petro-navy py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-petro-blue text-white">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold tracking-industrial">
                Technical Expertise
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                PETROCON supports industrial facilities across mechanical works, electrical and
                instrumentation, pipeline fabrication, preventive maintenance, and turnaround
                manpower supply. We focus on matching each discipline with personnel who understand
                industrial site expectations.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B8D0DE] hover:text-white"
              >
                <span>Explore Technical Services</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-petro-blue text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold tracking-industrial">
                Safety &amp; Quality Commitment
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {hse.description}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
                {hse.pillars.slice(0, 3).map((pillar) => (
                  <li key={pillar.title} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B8D0DE]" aria-hidden="true" />
                    <span>{pillar.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Approach */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Corporate Approach"
            description="A structured four-stage process designed to align workforce readiness with your site schedule."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.corporateApproach.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="font-heading text-3xl font-bold text-petro-blue/25">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-petro-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-petro-steel">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl bg-petro-light-grey p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-heading text-xl font-bold text-petro-navy">
                Ready to discuss your technical or workforce scope?
              </h3>
              <p className="mt-1 text-sm text-petro-steel">
                Connect with our coordination team to review your project requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl bg-petro-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-petro-blue-dark"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
