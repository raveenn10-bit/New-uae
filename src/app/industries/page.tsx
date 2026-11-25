import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedIndustries } from '@/config/industries';
import { confirmedServices } from '@/config/services';
import { PageBanner } from '@/components/sections/PageBanner';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'PETROCON Technical Works LLC serves Oil & Gas, Petrochemical, Offshore & Onshore Operations, Power & Energy, Industrial Construction, and Manufacturing.',
  alternates: {
    canonical: `${companyConfig.siteUrl}/industries`,
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Industrial Sectors"
        title="Industries We Serve"
        description="Supporting energy operators, EPC contractors, and industrial plants with specialized technical personnel and site execution."
        image="/images/offshore-platform.webp"
        mobileImage="/images/mobile/offshore-platform-mobile.webp"
        imageAlt="Offshore oil and gas drilling platform in deep ocean waters"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
        ]}
      />

      <section className="bg-petro-light-grey py-20 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8 lg:px-12 2xl:px-16">
          {confirmedIndustries.map((industry) => {
            const relatedServices = confirmedServices.filter((s) =>
              industry.relatedServiceIds.includes(s.id)
            );

            return (
              <article
                key={industry.id}
                id={industry.slug}
                className="scroll-mt-28 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid lg:grid-cols-12">
                  <div className="relative aspect-[3/4] w-full bg-petro-navy md:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[340px]">
                    <Image
                      src={industry.mobileImage}
                      alt={industry.imageAlt}
                      fill
                      sizes="(max-width: 767px) 92vw, 40vw"
                      className="object-cover md:hidden"
                    />
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="hidden object-cover md:block"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widecaps text-petro-blue">
                        {industry.tagline}
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold tracking-industrial text-petro-navy sm:text-3xl">
                        {industry.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-petro-steel">
                        {industry.description}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {industry.expandedDetails.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2.5 text-sm text-petro-navy"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-petro-blue"
                              aria-hidden="true"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {relatedServices.map((srv) => (
                          <Link
                            key={srv.id}
                            href={`/services#${srv.slug}`}
                            className="rounded-xl bg-petro-light-grey px-3 py-1.5 text-xs font-semibold text-petro-navy transition-colors hover:bg-petro-blue hover:text-white"
                          >
                            {srv.title}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-petro-blue hover:text-petro-navy"
                      >
                        <span>Business Enquiry</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
