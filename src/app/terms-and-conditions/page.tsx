import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions (Draft)',
  description: `Draft Terms & Conditions for ${companyConfig.legalName} awaiting company review and approval.`,
  alternates: {
    canonical: `${companyConfig.siteUrl}/terms-and-conditions`,
  },
};

export default function TermsPage() {
  return (
    <section className="bg-white pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          theme="light"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms & Conditions', href: '/terms-and-conditions' },
          ]}
        />

        <div className="mb-8 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <strong>DRAFT DOCUMENT — FOR COMPANY APPROVAL:</strong> These Terms &amp; Conditions are
          a preliminary frontend draft prepared for {companyConfig.legalName}. Legal counsel and
          management should review and approve all terms before production launch.
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-industrial text-petro-navy sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-petro-steel">
          {companyConfig.legalName}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-petro-steel sm:text-base">
          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              1. Informational Purpose
            </h2>
            <p className="mt-2">
              The content published on this website is provided for general corporate and
              informational purposes regarding {companyConfig.legalName}. Service descriptions,
              industry overviews, and trade categories do not constitute a binding commercial
              offer or employment contract.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              2. Commercial Engagements
            </h2>
            <p className="mt-2">
              All technical works, industrial manpower supply, and project services are subject to
              separate written agreements, commercial proposals, and mutually signed contracts
              between {companyConfig.legalName} and the client.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              3. Intellectual Property
            </h2>
            <p className="mt-2">
              The {companyConfig.legalName} name, corporate logo, and original website materials are
              protected intellectual property and may not be reproduced or redistributed without
              prior written authorization.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              4. External Links
            </h2>
            <p className="mt-2">
              This website may include links to external third-party platforms (such as WhatsApp or
              mapping services). {companyConfig.legalName} is not responsible for the content or
              availability of external sites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
