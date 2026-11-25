'use client';

import { ArrowUpRight, Briefcase } from 'lucide-react';
import type { TradeCategory } from '@/config/careers';

export function CareerCard({
  category,
  onSelect,
}: {
  category: TradeCategory;
  onSelect: (category: TradeCategory) => void;
}) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-petro-blue/50 hover:shadow-industrial">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-petro-light-grey px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-petro-navy">
            <Briefcase className="h-3 w-3 text-petro-blue" aria-hidden="true" />
            {category.division}
          </span>
          <span className="text-[11px] font-medium text-petro-steel">
            Talent Pool
          </span>
        </div>
        <h3 className="mt-4 font-heading text-lg font-bold tracking-industrial text-petro-navy group-hover:text-petro-blue">
          {category.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-petro-steel">
          {category.summary}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onSelect(category)}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-petro-blue transition-colors hover:text-petro-navy"
        >
          <span>Role Overview &amp; Enquire</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
