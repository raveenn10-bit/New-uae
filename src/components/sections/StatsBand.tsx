'use client';

import { Briefcase, Factory, Layers, Route } from 'lucide-react';
import { confirmedServices } from '@/config/services';
import { confirmedIndustries } from '@/config/industries';
import { confirmedManpowerCategories, howItWorksSteps } from '@/config/manpower';
import { CountUp } from '@/components/ui/motion/CountUp';
import { Stagger, StaggerItem } from '@/components/ui/motion/Reveal';

/** Animated figures derived from the site config (no invented claims). */
export function StatsBand() {
  const stats = [
    { icon: Layers, value: confirmedServices.length, label: 'Service Divisions' },
    { icon: Briefcase, value: confirmedManpowerCategories.length, label: 'Trade Categories' },
    { icon: Factory, value: confirmedIndustries.length, label: 'Industry Sectors' },
    { icon: Route, value: howItWorksSteps.length, label: 'Step Mobilisation' },
  ];

  return (
    <section aria-label="PETROCON at a glance" className="relative z-20 px-4 pt-6 sm:px-6 lg:px-8">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-[2rem] border border-white/10 bg-white p-3 shadow-industrial-lg sm:gap-4 sm:p-4 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <StaggerItem
            key={label}
            className="group flex items-center gap-4 rounded-3xl bg-petro-light-grey/70 p-4 transition-colors duration-300 hover:bg-petro-navy sm:p-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-petro-blue text-white shadow-lg shadow-petro-blue/30 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span>
              <CountUp
                to={value}
                className="block font-heading text-3xl font-bold leading-none text-petro-navy transition-colors group-hover:text-white sm:text-4xl"
              />
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-petro-steel transition-colors group-hover:text-[#7CC4F0]">
                {label}
              </span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
