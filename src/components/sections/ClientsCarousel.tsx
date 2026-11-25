'use client';

import Image from 'next/image';
import { companyConfig } from '@/config/company';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ClientsCarousel() {
  const { enabled, title, subtitle, clients } = companyConfig.clientsSection;
  const approvedClients = clients.filter((c) => c.approved && c.logoPath);

  // Strictly hidden until authentic company-approved client logos are configured
  if (!enabled || approvedClients.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clients & Partners"
          title={title}
          description={subtitle}
          align="center"
        />

        <div className="mt-10 overflow-hidden">
          <div className="animate-mobile-autoscroll flex items-center gap-10">
            {[...approvedClients, ...approvedClients].map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="flex h-20 w-44 shrink-0 items-center justify-center rounded-sm border border-slate-100 bg-petro-light-grey/60 px-6 py-4"
              >
                <div className="relative h-12 w-32">
                  <Image
                    src={client.logoPath}
                    alt={client.name}
                    fill
                    sizes="128px"
                    className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
