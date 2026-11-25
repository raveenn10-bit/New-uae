'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { IndustryItem } from '@/config/industries';
import { cn } from '@/lib/utils';

export function IndustryCard({
  industry,
  className = '',
}: {
  industry: IndustryItem;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-petro-navy-mid/90 text-white transition-all duration-300 hover:border-petro-blue/60',
        className
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-[16/10]">
        <Image
          src={industry.mobileImage}
          alt={industry.imageAlt}
          fill
          sizes="(max-width: 767px) 85vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 md:hidden"
        />
        <Image
          src={industry.image}
          alt={industry.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="hidden object-cover transition-transform duration-700 group-hover:scale-105 md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-petro-navy via-petro-navy/35 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-[11px] font-semibold uppercase tracking-widecaps text-[#7CC4F0]">
            {industry.tagline}
          </p>
          <h3 className="mt-1 font-heading text-xl font-bold tracking-industrial text-white">
            {industry.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-slate-300">{industry.description}</p>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7CC4F0] transition-colors hover:text-white"
          >
            <span>{expanded ? 'Hide Scope' : 'View Sector Scope'}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                expanded && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-300">
                  {industry.expandedDetails.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petro-blue" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/industries#${industry.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#7CC4F0]"
                >
                  <span>Explore Sector</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
