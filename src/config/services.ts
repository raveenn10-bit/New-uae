export type ServiceIconName =
  | 'HardHat'
  | 'Users'
  | 'Wrench'
  | 'Zap'
  | 'Settings'
  | 'Flame'
  | 'RefreshCw'
  | 'Compass';

export interface ServiceItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  relatedIndustries: string[];
  image: string;
  mobileImage: string;
  imageAlt: string;
  iconName: ServiceIconName;
  /**
   * Proposed categories: set `confirmed: false` to hide any service not yet
   * confirmed by PETROCON Technical Works LLC.
   */
  confirmed: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'oil-gas-manpower',
    slug: 'oil-and-gas-manpower-supply',
    code: '01',
    title: 'Oil & Gas Manpower Supply',
    shortDescription:
      'Dedicated technical and operational personnel mobilized for upstream, midstream, and downstream energy projects.',
    fullDescription:
      'PETROCON provides structured manpower supply tailored to the operational demands of Oil & Gas facilities, refineries, and field installations. We align candidate screening and mobilization with your project timeline and site safety expectations.',
    capabilities: [
      'Onshore and offshore technical crew mobilization',
      'Short-term project and long-term contract staffing',
      'Trade-verified technicians, operators, and supervisors',
      'Coordinated onboarding aligned with client site requirements',
    ],
    relatedIndustries: ['Oil & Gas', 'Petrochemical', 'Offshore & Onshore Operations'],
    image: '/images/industrial-engineers.webp',
    mobileImage: '/images/mobile/industrial-engineers-mobile.webp',
    imageAlt: 'Industrial engineers in PETROCON branded coveralls and PPE reviewing plans at a refinery',
    iconName: 'HardHat',
    confirmed: true,
  },
  {
    id: 'skilled-technical-workforce',
    slug: 'skilled-technical-workforce',
    code: '02',
    title: 'Skilled Technical Workforce',
    shortDescription:
      'Vetted tradesmen, technicians, and specialist support personnel ready for demanding industrial environments.',
    fullDescription:
      'Access a dependable pool of skilled trades and technical specialists across mechanical, electrical, fabrication, and safety disciplines. Every deployment is coordinated to integrate smoothly into your existing site hierarchy.',
    capabilities: [
      'Multi-discipline industrial tradesmen and technicians',
      'Rigging, scaffolding, and site support personnel',
      'Flexible scaling across construction and commissioning phases',
      'Consistent workforce coordination and attendance oversight',
    ],
    relatedIndustries: ['Oil & Gas', 'Industrial Construction', 'Manufacturing'],
    image: '/images/industrial-safety-team.webp',
    mobileImage: '/images/mobile/industrial-safety-team-mobile.webp',
    imageAlt: 'PETROCON technical and HSE safety team conducting a site briefing',
    iconName: 'Users',
    confirmed: true,
  },
  {
    id: 'mechanical-works',
    slug: 'mechanical-works',
    code: '03',
    title: 'Mechanical Works',
    shortDescription:
      'Precision mechanical installation, rotating equipment support, valve servicing, and structural assembly.',
    fullDescription:
      'Our mechanical works teams support industrial plants and energy facilities with disciplined installation, alignment, flange management, and mechanical troubleshooting under strict workplace safety standards.',
    capabilities: [
      'Static and rotating equipment installation support',
      'Industrial valve, flange, and manifold servicing',
      'Mechanical rigging and heavy component positioning',
      'Pre-commissioning mechanical checks and punch-list closure',
    ],
    relatedIndustries: ['Oil & Gas', 'Petrochemical', 'Power & Energy'],
    image: '/images/mechanical-maintenance.webp',
    mobileImage: '/images/mobile/mechanical-maintenance-mobile.webp',
    imageAlt: 'PETROCON mechanical technicians inspecting industrial steel flange valves',
    iconName: 'Wrench',
    confirmed: true,
  },
  {
    id: 'electrical-instrumentation',
    slug: 'electrical-and-instrumentation',
    code: '04',
    title: 'Electrical & Instrumentation',
    shortDescription:
      'Industrial electrical installation, switchgear support, cabling, and process instrumentation technicians.',
    fullDescription:
      'PETROCON supports plant power distribution, control panels, and process instrumentation systems with qualified E&I technicians trained to work safely around industrial electrical infrastructure.',
    capabilities: [
      'Industrial switchgear, MCC, and panel support',
      'Cable tray, glanding, termination, and continuity testing',
      'Process instrumentation installation and loop-check support',
      'Preventive electrical inspection and fault diagnostics',
    ],
    relatedIndustries: ['Power & Energy', 'Petrochemical', 'Oil & Gas'],
    image: '/images/electrical-technicians.webp',
    mobileImage: '/images/mobile/electrical-technicians-mobile.webp',
    imageAlt: 'PETROCON electrical technicians inspecting industrial switchgear with a multimeter',
    iconName: 'Zap',
    confirmed: true,
  },
  {
    id: 'industrial-maintenance',
    slug: 'industrial-maintenance',
    code: '05',
    title: 'Industrial Maintenance',
    shortDescription:
      'Preventive and corrective plant maintenance teams keeping critical industrial assets reliable and safe.',
    fullDescription:
      'Sustained plant availability requires disciplined maintenance execution. We provide mechanical, electrical, and general maintenance personnel to assist with routine servicing, equipment overhauls, and reliability tasks.',
    capabilities: [
      'Scheduled preventive maintenance support',
      'Corrective repairs and component replacement',
      'Plant utility, piping, and structural upkeep',
      'Safety-conscious work execution in live facility zones',
    ],
    relatedIndustries: ['Manufacturing', 'Petrochemical', 'Power & Energy'],
    image: '/images/petrochemical-facility.webp',
    mobileImage: '/images/mobile/petrochemical-facility-mobile.webp',
    imageAlt: 'Illuminated modern petrochemical processing facility at dusk',
    iconName: 'Settings',
    confirmed: true,
  },
  {
    id: 'pipeline-fabrication',
    slug: 'pipeline-and-fabrication-works',
    code: '06',
    title: 'Pipeline & Fabrication Works',
    shortDescription:
      'Certified welding, pipe fitting, and structural steel fabrication for industrial and energy infrastructure.',
    fullDescription:
      'From shop spool fabrication to on-site pipeline tie-ins, PETROCON supplies experienced welders, pipe fitters, and fabricators capable of working with carbon steel, stainless steel, and industrial alloys.',
    capabilities: [
      'Pipe spool fabrication and structural steel assembly',
      'TIG, MIG, and Stick welding specialists',
      'Isometric drawing interpretation and precise fit-up',
      'Workshop and field piping modification support',
    ],
    relatedIndustries: ['Oil & Gas', 'Industrial Construction', 'Offshore & Onshore Operations'],
    image: '/images/pipeline-welding.webp',
    mobileImage: '/images/mobile/pipeline-welding-mobile.webp',
    imageAlt: 'Certified pipeline welder in PETROCON coveralls performing TIG welding on steel pipe',
    iconName: 'Flame',
    confirmed: true,
  },
  {
    id: 'shutdown-turnaround',
    slug: 'shutdown-and-turnaround-support',
    code: '07',
    title: 'Shutdown & Turnaround Support',
    shortDescription:
      'Rapidly mobilized multi-trade crews engineered for time-critical plant shutdowns and turnaround windows.',
    fullDescription:
      'Plant turnarounds demand coordinated, high-discipline teams capable of executing complex maintenance, inspection support, and mechanical/piping interventions within tight outage schedules.',
    capabilities: [
      'Rapid mobilization of multi-craft turnaround teams',
      'Shift-aligned mechanical, welding, and E&I coverage',
      'Box-up, blinding/de-blinding, and valve overhaul support',
      'Close coordination with client turnaround planners and HSE',
    ],
    relatedIndustries: ['Oil & Gas', 'Petrochemical', 'Power & Energy'],
    image: '/images/refinery-aerial-hero.webp',
    mobileImage: '/images/mobile/refinery-aerial-mobile.webp',
    imageAlt: 'Aerial view of an industrial oil refinery at golden hour',
    iconName: 'RefreshCw',
    confirmed: true,
  },
  {
    id: 'engineering-support',
    slug: 'engineering-support-services',
    code: '08',
    title: 'Engineering Support Services',
    shortDescription:
      'Field engineering, site supervision, QA/QC inspection support, and technical coordination personnel.',
    fullDescription:
      'Beyond hands-on trades, PETROCON provides technical engineering support personnel to assist client project teams with field supervision, work-pack preparation, material coordination, and site documentation.',
    capabilities: [
      'Site engineering and field supervision support',
      'Technical work-pack and drawing review assistance',
      'Safety officer and HSE site monitoring support',
      'Progress tracking and contractor coordination',
    ],
    relatedIndustries: ['Oil & Gas', 'Industrial Construction', 'Offshore & Onshore Operations'],
    image: '/images/fabrication-workshop.webp',
    mobileImage: '/images/mobile/fabrication-workshop-mobile.webp',
    imageAlt: 'Heavy industrial steel and pipe fabrication workshop with overhead cranes',
    iconName: 'Compass',
    confirmed: true,
  },
];

export const confirmedServices = servicesData.filter((s) => s.confirmed);
