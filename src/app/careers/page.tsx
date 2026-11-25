import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { activeVacancies } from '@/config/careers';
import { PageBanner } from '@/components/sections/PageBanner';
import { CareersClient } from '@/components/sections/CareersClient';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore industrial trade categories and submit career enquiries to PETROCON Technical Works LLC.',
  alternates: {
    canonical: `${companyConfig.siteUrl}/careers`,
  },
};

export default function CareersPage() {
  const confirmedVacancies = activeVacancies.filter((v) => v.confirmed);

  // JobPosting JSON-LD schema is strictly emitted ONLY when verified active vacancies exist
  const jobPostingJsonLd =
    confirmedVacancies.length > 0
      ? confirmedVacancies.map((v) => ({
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: v.title,
          description: v.description,
          datePosted: v.datePosted,
          employmentType: v.employmentType,
          hiringOrganization: {
            '@type': 'Organization',
            name: companyConfig.legalName,
            sameAs: companyConfig.siteUrl,
          },
          jobLocation: {
            '@type': 'Place',
            address: v.location,
          },
        }))
      : null;

  return (
    <>
      {jobPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
        />
      )}

      <PageBanner
        eyebrow="Careers &amp; Talent"
        title="Build Your Industrial Career With PETROCON"
        description="Explore our technical trade divisions and register your profile for upcoming Oil &amp; Gas and industrial projects."
        image="/images/pipeline-welding.webp"
        mobileImage="/images/mobile/pipeline-welding-mobile.webp"
        imageAlt="Certified pipeline welder in PETROCON branded coveralls"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
        ]}
      />

      <CareersClient />
    </>
  );
}
