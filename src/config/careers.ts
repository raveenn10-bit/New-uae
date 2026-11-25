export interface TradeCategory {
  id: string;
  title: string;
  division: 'Mechanical & Piping' | 'Electrical & Instrumentation' | 'Engineering & HSE' | 'General & Skilled Support';
  summary: string;
  keyResponsibilities: string[];
  typicalRequirements: string[];
}

export interface ActiveVacancy {
  id: string;
  title: string;
  category: string;
  location: string;
  employmentType: string;
  datePosted: string;
  description: string;
  requirements: string[];
  confirmed: boolean;
}

export const careerCategories: TradeCategory[] = [
  {
    id: 'mechanical-technicians',
    title: 'Mechanical Technicians',
    division: 'Mechanical & Piping',
    summary: 'Installation, alignment, preventive maintenance, and overhaul of industrial rotating and static equipment.',
    keyResponsibilities: [
      'Perform mechanical assembly, disassembly, and servicing of pumps, valves, and compressors',
      'Conduct routine inspections and preventive maintenance checks',
      'Follow permit-to-work and site HSE procedures at all times',
    ],
    typicalRequirements: [
      'Technical trade certificate or diploma in Mechanical Engineering/Maintenance',
      'Industrial or Oil & Gas plant maintenance familiarity',
      'Ability to read mechanical drawings and equipment manuals',
    ],
  },
  {
    id: 'electrical-technicians',
    title: 'Electrical Technicians',
    division: 'Electrical & Instrumentation',
    summary: 'Industrial power distribution, switchgear maintenance, cabling, and electrical fault diagnostics.',
    keyResponsibilities: [
      'Assist with installation, termination, and testing of industrial electrical systems',
      'Inspect motors, distribution boards, and control panels',
      'Adhere strictly to lockout/tagout (LOTO) and electrical safety protocols',
    ],
    typicalRequirements: [
      'Recognized electrical trade qualification',
      'Experience with industrial switchgear, MCCs, and testing instruments',
      'Strong understanding of electrical hazard controls',
    ],
  },
  {
    id: 'welders',
    title: 'Welders',
    division: 'Mechanical & Piping',
    summary: 'Precision structural and process pipe welding across carbon steel, stainless steel, and alloy systems.',
    keyResponsibilities: [
      'Execute SMAW, GTAW (TIG), or GMAW welds according to approved welding procedures',
      'Prepare joints, inspect weld quality, and maintain welding equipment',
      'Work safely in workshop and field environments with full welding PPE',
    ],
    typicalRequirements: [
      'Demonstrated multi-position pipe or structural welding proficiency',
      'Experience in industrial fabrication or Oil & Gas piping works',
      'Commitment to zero-defect workmanship and fire-watch safety',
    ],
  },
  {
    id: 'pipe-fitters',
    title: 'Pipe Fitters',
    division: 'Mechanical & Piping',
    summary: 'Layout, cutting, beveling, alignment, and fit-up of industrial process piping and flange assemblies.',
    keyResponsibilities: [
      'Interpret piping isometric drawings and P&IDs for accurate fit-up',
      'Measure, cut, grind, and align spools, elbows, flanges, and supports',
      'Coordinate closely with welders and rigging teams during installation',
    ],
    typicalRequirements: [
      'Proven experience reading piping isometrics and spool drawings',
      'Familiarity with industrial pipe classes, gaskets, and bolt torquing',
      'Safe handling of hand and power tools on site',
    ],
  },
  {
    id: 'fabricators',
    title: 'Fabricators',
    division: 'Mechanical & Piping',
    summary: 'Structural steel, pipe rack, platform, and pressure-piping spool fabrication in workshops and on site.',
    keyResponsibilities: [
      'Mark, cut, form, and assemble structural steel members and pipe spools',
      'Verify dimensional tolerances against engineering blueprints',
      'Maintain clean, organized fabrication bays and lifting gear discipline',
    ],
    typicalRequirements: [
      'Background in heavy steel or industrial pipe fabrication',
      'Proficiency with layout tools, cutting equipment, and structural drawings',
      'Attention to dimensional accuracy and workshop safety',
    ],
  },
  {
    id: 'industrial-engineers',
    title: 'Industrial Engineers',
    division: 'Engineering & HSE',
    summary: 'Field engineering coordination, work-pack planning, technical oversight, and site execution support.',
    keyResponsibilities: [
      'Coordinate technical work packs, schedules, and discipline interfaces on site',
      'Support QA/QC documentation, inspection readiness, and progress reporting',
      'Liaise between client engineering teams and field supervisors',
    ],
    typicalRequirements: [
      'Bachelor’s degree or equivalent qualification in Mechanical, Electrical, or Industrial Engineering',
      'Experience in Oil & Gas, petrochemical, or heavy industrial projects',
      'Strong technical communication and planning skills',
    ],
  },
  {
    id: 'safety-officers',
    title: 'Safety Officers',
    division: 'Engineering & HSE',
    summary: 'On-site HSE monitoring, toolbox talks, hazard identification, and PPE compliance oversight.',
    keyResponsibilities: [
      'Conduct daily toolbox talks, site safety walks, and risk assessments',
      'Monitor permit-to-work compliance and proper PPE usage across crews',
      'Document safety observations and support incident prevention initiatives',
    ],
    typicalRequirements: [
      'Recognized occupational health & safety qualification',
      'Industrial or Oil & Gas site safety supervision experience',
      'Clear communication and proactive hazard-mitigation mindset',
    ],
  },
  {
    id: 'skilled-general-workers',
    title: 'Skilled and General Workers',
    division: 'General & Skilled Support',
    summary: 'Dependable rigging assistants, helpers, material handlers, and general industrial site support personnel.',
    keyResponsibilities: [
      'Support skilled tradesmen with tools, material handling, and site preparation',
      'Maintain clean, hazard-free work zones and housekeeping standards',
      'Follow supervisor instructions and site safety rules consistently',
    ],
    typicalRequirements: [
      'Physical fitness for industrial site environments',
      'Reliability, teamwork, and willingness to follow safety instructions',
      'Prior industrial or construction site experience is an advantage',
    ],
  },
];

/**
 * Active Vacancies:
 * Keep empty until PETROCON confirms specific open positions.
 * JobPosting JSON-LD schema is ONLY emitted when confirmed vacancies exist here.
 */
export const activeVacancies: ActiveVacancy[] = [];
