import type { Metadata } from 'next';
import { CinematicStoryHome } from '@/components/sections/CinematicStoryHome';
import { companyConfig } from '@/config/company';

export const metadata: Metadata = {
  title: `${companyConfig.legalName} | Oil & Gas Manpower Supply & Technical Services`,
  description:
    'PETROCON Technical Works LLC — Powering the Oil & Gas industry with skilled manpower, technical works, mechanical, electrical & instrumentation, and turnaround support.',
  alternates: {
    canonical: companyConfig.siteUrl,
  },
};

export default function HomePage() {
  return <CinematicStoryHome />;
}
