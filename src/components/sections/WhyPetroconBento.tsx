'use client';

import { ArrowUpRight } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { getIcon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/ui/motion/Reveal';
import { cn } from '@/lib/utils';

const spans = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
];

function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const card = e.currentTarget.parentElement;
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/** Bento grid of "why choose us" values with cursor spotlight and icon motion. */
export function WhyPetroconBento() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
        <SectionHeading
          eyebrow="Why PETROCON"
          title="Built on Discipline, Delivered with Precision"
          description="Six commitments that shape how we select, prepare and support every person we put on your site."
        />
        <Stagger className="mt-12 grid auto-rows-[minmax(200px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companyConfig.whyChoose.map((item, i) => {
            const Icon = getIcon(item.iconName);
            const featured = i === 0;
            return (
              <StaggerItem
                key={item.id}
                as="article"
                className={cn(
                  'spotlight-card group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7',
                  featured
                    ? 'border-petro-navy bg-petro-navy text-white'
                    : 'border-slate-200 bg-petro-light-grey/50 hover:border-petro-blue/40 hover:bg-white hover:shadow-industrial',
                  spans[i]
                )}
              >
                <div
                  onPointerMove={trackPointer}
                  className="absolute inset-0"
                  aria-hidden="true"
                />
                {featured && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                loading="lazy"
                decoding="async"
                      src="/scenes/06-final/corporate-team.webp"
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-petro-navy via-petro-navy/70 to-transparent" />
                  </>
                )}
                <div className="pointer-events-none relative flex items-start justify-between">
                  <span
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-[-10deg] group-hover:scale-110',
                      featured ? 'bg-petro-blue text-white' : 'bg-white text-petro-blue shadow-sm group-hover:bg-petro-blue group-hover:text-white'
                    )}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      'font-heading text-sm font-bold',
                      featured ? 'text-[#B8D0DE]' : 'text-slate-300'
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="pointer-events-none relative mt-8">
                  <h3
                    className={cn(
                      'font-heading font-bold',
                      featured ? 'text-3xl sm:text-4xl' : 'text-xl text-petro-navy'
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-2 text-sm leading-relaxed',
                      featured ? 'max-w-md text-slate-300 sm:text-base' : 'text-petro-steel'
                    )}
                  >
                    {item.description}
                  </p>
                  <ArrowUpRight
                    className={cn(
                      'mt-4 h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
                      featured ? 'text-[#B8D0DE]' : 'text-petro-blue'
                    )}
                    aria-hidden="true"
                  />
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
