export interface SocialLink {
  platform: string;
  url: string;
  verified: boolean;
}

export interface ClientPartner {
  id: string;
  name: string;
  logoPath: string;
  approved: boolean;
}

export const companyConfig = {
  legalName: 'PETROCON TECHNICAL WORKS LLC',
  shortName: 'PETROCON',
  tagline: 'Engineering Excellence. Powering Industry.',
  industry: 'Oil & Gas, Technical Works and Industrial Manpower Solutions',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://petrocon-technical.vercel.app',

  // Brand Logo Assets (Original uploaded logo preserved in /public/brand/)
  brand: {
    logoLightBg: '/brand/petrocon-logo.png',
    logoDarkBg: '/brand/petrocon-logo-light.png',
    ogImage: '/images/og-image.jpg',
    colors: {
      primaryBlue: '#354B60',
      deepNavy: '#101820',
      industrialBlack: '#101820',
      steelGrey: '#354B60',
      lightGrey: '#F0F5F7',
      pureWhite: '#FFFFFF',
    },
  },

  // Configurable Contact Details
  // Set `verified: true` and provide real details once confirmed by PETROCON.
  // Unverified fields remain hidden on the live frontend.
  contact: {
    address: {
      verified: false,
      line1: '',
      line2: '',
      city: '',
      country: '',
      fullText: '',
    },
    telephone: {
      verified: false,
      display: '',
      href: '',
    },
    whatsapp: {
      // Only activates Floating WhatsApp button and WhatsApp form dispatch when verified === true
      verified: false,
      numberE164: '', // e.g. '971500000000' (digits only, no +)
      display: '',
      defaultMessage:
        'Hello PETROCON Technical Works LLC, we would like to enquire about your Oil & Gas technical and manpower solutions.',
    },
    email: {
      verified: false,
      general: '',
      recruitment: '',
    },
    businessHours: {
      verified: false,
      schedule: '',
    },
    googleMaps: {
      verified: false,
      embedUrl: '',
      directionsUrl: '',
    },
  },

  // Social Media Links (Only verified links are rendered)
  socialLinks: [] as SocialLink[],

  // Clients & Partners (Hidden until authentic company-approved client logos are provided)
  clientsSection: {
    enabled: false,
    title: 'Our Clients & Partners',
    subtitle: 'Trusted by industrial operators and engineering contractors.',
    clients: [] as ClientPartner[],
  },

  // Corporate Profile Content (Editable — free of unverified claims, dates, or headcounts)
  about: {
    introHeadline: 'Technical Expertise. Industrial Strength.',
    introParagraphs: [
      'PETROCON TECHNICAL WORKS LLC is an industrial technical works and workforce solutions provider dedicated to the Oil & Gas and energy sectors.',
      'We focus on connecting complex industrial operations with disciplined technical personnel, structured mechanical and electrical execution, and safety-conscious site support tailored to each client’s project scope.',
    ],
    mission:
      'To deliver reliable technical works and qualified industrial manpower solutions that support safe, efficient, and uninterrupted Oil & Gas and industrial operations.',
    vision:
      'To be recognized as a trusted technical partner in the energy and industrial sectors, defined by operational discipline, workforce competence, and a steadfast commitment to workplace safety.',
    coreValues: [
      {
        title: 'Safety First',
        description:
          'Every task begins with hazard awareness, proper PPE compliance, and a commitment to protecting people and facilities.',
      },
      {
        title: 'Technical Integrity',
        description:
          'We deploy personnel matched to exact trade specifications and project standards without compromise.',
      },
      {
        title: 'Operational Reliability',
        description:
          'Structured coordination and responsive mobilization designed to keep plant schedules on track.',
      },
      {
        title: 'Client Partnership',
        description:
          'Collaborative engagement with project managers, engineers, and site teams from scoping through execution.',
      },
    ],
    corporateApproach: [
      {
        step: '01',
        title: 'Requirement Scoping',
        description:
          'Detailed alignment with client engineering and HR teams on trade qualifications, site conditions, and project timelines.',
      },
      {
        step: '02',
        title: 'Technical Vetting',
        description:
          'Screening and trade-readiness verification to match personnel capabilities with onshore, offshore, or plant environments.',
      },
      {
        step: '03',
        title: 'Coordinated Deployment',
        description:
          'Organized mobilization, site induction alignment, and ongoing workforce administration throughout the project.',
      },
      {
        step: '04',
        title: 'Continuous Oversight',
        description:
          'Active communication with site leadership to maintain quality, attendance, and safety discipline.',
      },
    ],
  },

  whyChoose: [
    {
      id: 'professional-workforce',
      title: 'Professional Workforce',
      description:
        'Disciplined technical tradesmen, engineers, and site personnel selected for industrial readiness and accountability.',
      iconName: 'Users',
    },
    {
      id: 'technical-expertise',
      title: 'Technical Expertise',
      description:
        'Focused capabilities spanning mechanical works, electrical and instrumentation, pipeline fabrication, and plant maintenance.',
      iconName: 'Cpu',
    },
    {
      id: 'safety-focused',
      title: 'Safety-Focused Approach',
      description:
        'Strong emphasis on workplace safety practices, proper PPE usage, and proactive hazard awareness on every site.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'quality-commitment',
      title: 'Quality Commitment',
      description:
        'Consistent execution standards and attention to detail across technical works and workforce deployment.',
      iconName: 'Award',
    },
    {
      id: 'operational-reliability',
      title: 'Operational Reliability',
      description:
        'Dependable support for ongoing operations, shutdowns, and time-sensitive industrial turnarounds.',
      iconName: 'Clock',
    },
    {
      id: 'client-focused',
      title: 'Client-Focused Solutions',
      description:
        'Flexible staffing and technical support models structured around your project schedule and operational goals.',
      iconName: 'Handshake',
    },
  ],

  hse: {
    eyebrow: 'Health, Safety & Environment',
    headline: 'Safety Discipline Built Into Every Operation.',
    description:
      'In Oil & Gas and heavy industrial environments, operational performance is inseparable from workplace safety and environmental care. PETROCON prioritizes responsible site practices, proper protective equipment, and active risk awareness across all workforce and technical activities.',
    pillars: [
      {
        title: 'Workplace Safety',
        description:
          'Promoting safe work procedures, pre-task briefings, and full compliance with client site safety rules and PPE requirements.',
      },
      {
        title: 'Environmental Responsibility',
        description:
          'Encouraging disciplined housekeeping, waste minimization, and environmentally mindful industrial practices.',
      },
      {
        title: 'Professional Working Practices',
        description:
          'Maintaining clear supervision, tool discipline, and accountable conduct across onshore and offshore worksites.',
      },
      {
        title: 'Risk Awareness',
        description:
          'Continuous hazard identification and communication before and during mechanical, electrical, and fabrication tasks.',
      },
      {
        title: 'Quality-Focused Operations',
        description:
          'Structured execution that respects engineering tolerances, inspection checkpoints, and client technical specifications.',
      },
    ],
  },

  developerCredit: {
    label: 'Designed & Developed by Harsh Apex Digital Solutions',
    url: 'https://harshapex.com.lk',
  },
} as const;
