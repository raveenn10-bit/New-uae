import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { buildWhatsAppUrl } from '@/lib/utils';
import { PageBanner } from '@/components/sections/PageBanner';
import { ManpowerRequestForm } from '@/components/ui/ManpowerRequestForm';

export const metadata: Metadata = {
  title: 'Contact Us & Request Manpower',
  description:
    'Request Oil & Gas manpower, get a free B2B quotation, or contact PETROCON Technical Works LLC.',
  alternates: {
    canonical: `${companyConfig.siteUrl}/contact`,
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string; category?: string };
}) {
  const { contact } = companyConfig;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsapp.defaultMessage);

  const hasAnyVerified =
    contact.address.verified ||
    contact.telephone.verified ||
    contact.whatsapp.verified ||
    contact.email.verified ||
    contact.businessHours.verified;

  return (
    <>
      <PageBanner
        eyebrow="Request Manpower &amp; Contact"
        title="Get a Free B2B Manpower Quotation"
        description="Specify one or more required manpower categories, worker quantities, and project timelines to connect with our coordination team."
        image="/images/crane-operators.webp"
        mobileImage="/images/mobile/crane-operators-mobile.webp"
        imageAlt="PETROCON crane and heavy lifting team at an Oil & Gas plant"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />

      <section className="bg-petro-light-grey py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-heading text-xl font-bold tracking-industrial text-petro-navy">
                  Corporate Contact Details
                </h2>

                {hasAnyVerified ? (
                  <dl className="mt-6 space-y-5 text-sm">
                    {contact.address.verified && contact.address.fullText && (
                      <div className="flex items-start gap-3.5">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-petro-blue" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-petro-navy">Office Address</dt>
                          <dd className="mt-0.5 text-petro-steel">{contact.address.fullText}</dd>
                        </div>
                      </div>
                    )}
                    {contact.telephone.verified && contact.telephone.display && (
                      <div className="flex items-start gap-3.5">
                        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-petro-blue" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-petro-navy">Telephone</dt>
                          <dd className="mt-0.5">
                            <a href={contact.telephone.href} className="text-petro-steel hover:text-petro-blue">
                              {contact.telephone.display}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    {contact.whatsapp.verified && whatsappUrl && (
                      <div className="flex items-start gap-3.5">
                        <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-petro-navy">WhatsApp</dt>
                          <dd className="mt-0.5">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-petro-blue hover:underline">
                              {contact.whatsapp.display || 'Message on WhatsApp'}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    {contact.email.verified && contact.email.general && (
                      <div className="flex items-start gap-3.5">
                        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-petro-blue" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-petro-navy">Email</dt>
                          <dd className="mt-0.5">
                            <a href={`mailto:${contact.email.general}`} className="text-petro-steel hover:text-petro-blue">
                              {contact.email.general}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    {contact.businessHours.verified && contact.businessHours.schedule && (
                      <div className="flex items-start gap-3.5">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-petro-blue" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-petro-navy">Business Hours</dt>
                          <dd className="mt-0.5 text-petro-steel">{contact.businessHours.schedule}</dd>
                        </div>
                      </div>
                    )}
                  </dl>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-petro-steel">
                    Verified office address, telephone, WhatsApp, email, and business hours are
                    managed centrally in <code>src/config/company.ts</code> and will appear here
                    once confirmed by {companyConfig.legalName}.
                  </p>
                )}
              </div>

              {contact.googleMaps.verified && contact.googleMaps.embedUrl && (
                <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                  <iframe
                    src={contact.googleMaps.embedUrl}
                    title={`${companyConfig.legalName} Office Location`}
                    className="h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <ManpowerRequestForm defaultCategory={searchParams?.category || searchParams?.service || ''} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
