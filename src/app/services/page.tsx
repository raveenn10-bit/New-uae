import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedServices } from '@/config/services';
import { PageBanner } from '@/components/sections/PageBanner';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore PETROCON Technical Works LLC services: Oil & Gas Manpower Supply, Skilled Technical Workforce, Mechanical Works, Electrical & Instrumentation, Industrial Maintenance, Pipeline & Fabrication, and Turnaround Support.',
  alternates: {
    canonical: `${companyConfig.siteUrl}/services`,
  },
};

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${companyConfig.legalName} Technical Services`,
    itemListElement: confirmedServices.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.fullDescription,
        provider: {
          '@type': 'Organization',
          name: companyConfig.legalName,
        },
        url: `${companyConfig.siteUrl}/services#${service.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <PageBanner
        eyebrow="Our Services"
        title="Technical Works &amp; Industrial Manpower"
        description="Structured workforce supply and multi-discipline technical execution for Oil &amp; Gas, petrochemical, and heavy industrial facilities."
        image="/images/fabrication-workshop.webp"
        mobileImage="/images/mobile/fabrication-workshop-mobile.webp"
        imageAlt="Industrial steel and pipe fabrication workshop"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Services', href: '/services' },
        ]}
      />

      {/* Sticky Category Navigation */}
      <nav
        aria-label="Service Categories"
        className="sticky top-[68px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md"
      >
        <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {confirmedServices.map((service) => (
            <a
              key={service.id}
              href={`#${service.slug}`}
              className="shrink-0 rounded-xl border border-slate-200 bg-petro-light-grey px-3.5 py-2 text-xs font-semibold text-petro-navy transition-colors hover:border-petro-blue hover:bg-petro-blue hover:text-white"
            >
              {service.code} &middot; {service.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Alternating Service Sections */}
      <div className="divide-y divide-slate-200 bg-white">
        {confirmedServices.map((service, index) => {
          const isReversed = index % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.slug}
              className="scroll-mt-32 py-16 lg:py-24"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={`lg:col-span-6 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-petro-navy shadow-industrial md:aspect-[4/3]">
                      <Image
                        src={service.mobileImage}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 767px) 92vw, 50vw"
                        className="object-cover md:hidden"
                      />
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 90vw"
                        className="hidden object-cover md:block"
                      />
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-6 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="font-heading text-xs font-bold uppercase tracking-widecaps text-petro-blue">
                      Division {service.code}
                    </span>
                    <h2 className="mt-2 font-heading text-3xl font-bold tracking-industrial text-petro-navy sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-petro-steel">
                      {service.fullDescription}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 text-sm text-petro-navy"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-petro-blue"
                            aria-hidden="true"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-petro-steel">
                        Related Sectors:
                      </span>
                      {service.relatedIndustries.map((ind) => (
                        <Link
                          key={ind}
                          href="/industries"
                          className="rounded-xl bg-petro-light-grey px-2.5 py-1 text-xs font-medium text-petro-navy transition-colors hover:bg-petro-blue hover:text-white"
                        >
                          {ind}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-petro-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-petro-blue"
                      >
                        <span>Enquire About {service.title}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Contact CTA */}
      <section className="bg-petro-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-industrial sm:text-3xl">
              Need a Custom Workforce or Technical Scope?
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Share your trade requirements and mobilization schedule with our coordination team.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl bg-petro-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-petro-blue-dark"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
