'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '@/config/faq';
import { cn } from '@/lib/utils';

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              id={`faq-trigger-${item.id}`}
              className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-petro-blue"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-heading text-xs font-bold tracking-widest text-petro-blue">
                  0{idx + 1}
                </span>
                <span className="font-heading text-base font-semibold text-petro-navy sm:text-lg">
                  {item.question}
                </span>
              </span>
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors',
                  isOpen
                    ? 'border-petro-blue bg-petro-blue text-white'
                    : 'border-slate-300 text-petro-navy'
                )}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-8 pr-4 text-sm leading-relaxed text-petro-steel sm:pl-9 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
