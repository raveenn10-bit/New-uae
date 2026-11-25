import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy (Draft)',
  description: `Draft Privacy Policy for ${companyConfig.legalName} awaiting company review and approval.`,
  alternates: {
    canonical: `${companyConfig.siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          theme="light"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
          ]}
        />

        <div className="mb-8 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <strong>DRAFT DOCUMENT — FOR COMPANY APPROVAL:</strong> This Privacy Policy is a
          preliminary frontend draft prepared for {companyConfig.legalName}. Legal counsel and
          management should review and approve all clauses before publishing in production.
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-industrial text-petro-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-petro-steel">
          {companyConfig.legalName}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-petro-steel sm:text-base">
          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              1. Scope &amp; Frontend-Only Operation
            </h2>
            <p className="mt-2">
              This website serves as a corporate informational portal for {companyConfig.legalName}.
              In its current frontend-only configuration, enquiry forms do not transmit or store
              personal data on a website database or backend server; instead, validated details are
              formatted for direct user-initiated communication via WhatsApp, email, or clipboard.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              2. Information You Voluntarily Provide
            </h2>
            <p className="mt-2">
              When you choose to initiate a business or career enquiry, you may provide your name,
              company name, email address, telephone number, nationality, or project details. Any
              information sent via third-party messaging or email services is governed by your
              chosen communication channel and handled by our team solely to respond to your enquiry.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              3. Technical &amp; Analytics Data
            </h2>
            <p className="mt-2">
              Standard web hosting infrastructure may collect basic server access logs (such as IP
              address, browser type, and requested pages) for security and operational reliability.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-petro-navy">
              4. Contact for Privacy Enquiries
            </h2>
            <p className="mt-2">
              Once verified corporate contact details are published on the Contact Us page,
              questions regarding this policy may be directed to our official corporate email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
