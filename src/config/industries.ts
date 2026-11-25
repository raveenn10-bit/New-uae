export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  expandedDetails: string[];
  image: string;
  mobileImage: string;
  imageAlt: string;
  relatedServiceIds: string[];
  confirmed: boolean;
}

export const industriesData: IndustryItem[] = [
  {
    id: 'oil-and-gas',
    slug: 'oil-and-gas',
    title: 'Oil & Gas',
    tagline: 'Upstream, Midstream & Downstream Support',
    description:
      'Technical manpower and field execution support for refineries, gas processing plants, tank farms, and pipeline networks.',
    expandedDetails: [
      'Mechanical, piping, welding, and E&I trades for live plant environments',
      'Turnaround and shutdown workforce mobilization',
      'Site safety supervision and engineering coordination',
    ],
    image: '/images/refinery-aerial-hero.webp',
    mobileImage: '/images/mobile/refinery-aerial-mobile.webp',
    imageAlt: 'Aerial photograph of an oil and gas refinery at golden hour',
    relatedServiceIds: ['oil-gas-manpower', 'pipeline-fabrication', 'shutdown-turnaround'],
    confirmed: true,
  },
  {
    id: 'petrochemical',
    slug: 'petrochemical',
    title: 'Petrochemical',
    tagline: 'Process Plants & Chemical Complexes',
    description:
      'Specialized maintenance, instrumentation, and fabrication teams supporting continuous petrochemical processing operations.',
    expandedDetails: [
      'Heat exchanger, vessel, and process piping maintenance support',
      'Process instrumentation and electrical panel servicing',
      'Strict adherence to hazardous-area safety protocols',
    ],
    image: '/images/petrochemical-facility.webp',
    mobileImage: '/images/mobile/petrochemical-facility-mobile.webp',
    imageAlt: 'Modern petrochemical processing facility illuminated at blue hour',
    relatedServiceIds: ['industrial-maintenance', 'electrical-instrumentation', 'mechanical-works'],
    confirmed: true,
  },
  {
    id: 'offshore-onshore',
    slug: 'offshore-and-onshore-operations',
    title: 'Offshore & Onshore Operations',
    tagline: 'Marine Platforms & Field Facilities',
    description:
      'Safety-conscious technical crews prepared for both onshore industrial hubs and offshore marine platform operations.',
    expandedDetails: [
      'Multi-craft technicians for offshore platforms and fabrication yards',
      'Onshore field maintenance, piping, and mechanical works',
      'Structured shift and mobilization coordination',
    ],
    image: '/images/offshore-platform.webp',
    mobileImage: '/images/mobile/offshore-platform-mobile.webp',
    imageAlt: 'Offshore oil and gas drilling platform in calm deep blue ocean waters',
    relatedServiceIds: ['oil-gas-manpower', 'pipeline-fabrication', 'engineering-support'],
    confirmed: true,
  },
  {
    id: 'power-energy',
    slug: 'power-and-energy',
    title: 'Power & Energy',
    tagline: 'Generation, Substations & Utilities',
    description:
      'Skilled electrical, instrumentation, and mechanical personnel supporting power generation plants and industrial utilities.',
    expandedDetails: [
      'Switchgear, transformer, and distribution panel support',
      'Turbine, boiler, and auxiliary mechanical maintenance',
      'Planned outage and preventive maintenance staffing',
    ],
    image: '/images/electrical-technicians.webp',
    mobileImage: '/images/mobile/electrical-technicians-mobile.webp',
    imageAlt: 'PETROCON electrical technicians inspecting industrial switchgear panels',
    relatedServiceIds: ['electrical-instrumentation', 'mechanical-works', 'shutdown-turnaround'],
    confirmed: true,
  },
  {
    id: 'industrial-construction',
    slug: 'industrial-construction',
    title: 'Industrial Construction',
    tagline: 'Heavy Civil, Steel & Facility Builds',
    description:
      'Qualified fabricators, welders, pipe fitters, and site support crews for industrial plant construction and expansion.',
    expandedDetails: [
      'Structural steel erection and heavy piping installation',
      'Site engineering and HSE supervision support',
      'Scalable skilled workforce for multi-phase build schedules',
    ],
    image: '/images/fabrication-workshop.webp',
    mobileImage: '/images/mobile/fabrication-workshop-mobile.webp',
    imageAlt: 'Heavy industrial steel and pipe fabrication workshop',
    relatedServiceIds: ['skilled-technical-workforce', 'pipeline-fabrication', 'engineering-support'],
    confirmed: true,
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Production Lines & Heavy Workshops',
    description:
      'Reliable technical maintenance and skilled operational personnel for industrial manufacturing and fabrication facilities.',
    expandedDetails: [
      'Preventive and breakdown maintenance technicians',
      'Workshop welding, machining, and assembly support',
      'Electrical control and automation maintenance assistance',
    ],
    image: '/images/mechanical-maintenance.webp',
    mobileImage: '/images/mobile/mechanical-maintenance-mobile.webp',
    imageAlt: 'PETROCON mechanical technicians servicing industrial plant equipment',
    relatedServiceIds: ['industrial-maintenance', 'skilled-technical-workforce', 'mechanical-works'],
    confirmed: true,
  },
];

export const confirmedIndustries = industriesData.filter((i) => i.confirmed);
