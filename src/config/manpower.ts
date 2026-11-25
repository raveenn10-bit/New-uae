export type ManpowerGroup =
  | 'Engineering & Safety'
  | 'Mechanical & Fabrication'
  | 'Electrical & Instrumentation'
  | 'Lifting & Access'
  | 'Site & Turnaround Support';

export interface ManpowerCategory {
  id: string;
  title: string;
  titleAr: string;
  group: ManpowerGroup;
  summary: string;
  summaryAr: string;
  image: string;
  mobileImage: string;
  /**
   * Publish only company-confirmed categories.
   * Set `confirmed: false` to hide any category prior to client confirmation.
   */
  confirmed: boolean;
}

export const manpowerCategories: ManpowerCategory[] = [
  {
    id: 'oil-gas-engineers',
    title: 'Oil & Gas Engineers',
    titleAr: 'مهندسو النفط والغاز',
    group: 'Engineering & Safety',
    summary: 'Field, process, mechanical, and site coordination engineers for energy projects.',
    summaryAr: 'مهندسون ميدانيون وتنسيقيون لدعم مشاريع ومنشآت قطاع النفط والغاز.',
    image: '/images/industrial-engineers.webp',
    mobileImage: '/images/mobile/industrial-engineers-mobile.webp',
    confirmed: true,
  },
  {
    id: 'mechanical-technicians',
    title: 'Mechanical Technicians',
    titleAr: 'فنيو الميكانيكا',
    group: 'Mechanical & Fabrication',
    summary: 'Rotating and static equipment installation, flange servicing, and mechanical overhauls.',
    summaryAr: 'تركيب وصيانة المعدات الدوارة والثابتة والصمامات الصناعية.',
    image: '/images/mechanical-maintenance.webp',
    mobileImage: '/images/mobile/mechanical-maintenance-mobile.webp',
    confirmed: true,
  },
  {
    id: 'electrical-technicians',
    title: 'Electrical Technicians',
    titleAr: 'فنيو الكهرباء',
    group: 'Electrical & Instrumentation',
    summary: 'Industrial switchgear, cabling, MCC panels, and power distribution maintenance.',
    summaryAr: 'صيانة وتركيب لوحات التوزيع والكابلات والمحطات الكهربائية الصناعية.',
    image: '/images/electrical-technicians.webp',
    mobileImage: '/images/mobile/electrical-technicians-mobile.webp',
    confirmed: true,
  },
  {
    id: 'instrumentation-technicians',
    title: 'Instrumentation Technicians',
    titleAr: 'فنيو الأجهزة الدقيقة',
    group: 'Electrical & Instrumentation',
    summary: 'Process control instrumentation, calibration assistance, and loop-check technicians.',
    summaryAr: 'تركيب ومعايرة وفحص أجهزة القياس والتحكم الصناعي في المنشآت.',
    image: '/images/electrical-technicians.webp',
    mobileImage: '/images/mobile/electrical-technicians-mobile.webp',
    confirmed: true,
  },
  {
    id: 'certified-welders',
    title: 'Certified Welders',
    titleAr: 'لحامون معتمدون',
    group: 'Mechanical & Fabrication',
    summary: 'Multi-process TIG, MIG, and Stick welders for industrial piping and structural steel.',
    summaryAr: 'لحامون متخصصون في لحام الأنابيب والهياكل الفولاذية الصناعية.',
    image: '/images/pipeline-welding.webp',
    mobileImage: '/images/mobile/pipeline-welding-mobile.webp',
    confirmed: true,
  },
  {
    id: 'pipe-fitters',
    title: 'Pipe Fitters',
    titleAr: 'فنيو تركيب الأنابيب',
    group: 'Mechanical & Fabrication',
    summary: 'Isometric reading, pipe spool alignment, beveling, and flange fit-up specialists.',
    summaryAr: 'قراءة المخططات وتجهيز ومحاذاة وتركيب شبكات الأنابيب الصناعية.',
    image: '/images/fabrication-workshop.webp',
    mobileImage: '/images/mobile/fabrication-workshop-mobile.webp',
    confirmed: true,
  },
  {
    id: 'fabricators',
    title: 'Fabricators',
    titleAr: 'فنيو التصنيع المعدني',
    group: 'Mechanical & Fabrication',
    summary: 'Heavy structural steel, pipe rack, and pressure-piping spool fabrication.',
    summaryAr: 'تصنيع الهياكل الفولاذية ومنصات العمل ومقاطع الأنابيب الصناعية.',
    image: '/images/fabrication-workshop.webp',
    mobileImage: '/images/mobile/fabrication-workshop-mobile.webp',
    confirmed: true,
  },
  {
    id: 'riggers',
    title: 'Riggers',
    titleAr: 'فنيو الرفع والتجهيز',
    group: 'Lifting & Access',
    summary: 'Trained lifting, slinging, and heavy equipment rigging support personnel.',
    summaryAr: 'عمليات الرفع الثقيل وتأمين الأحمال والمعدات في المواقع الصناعية.',
    image: '/images/riggers-scaffolders.webp',
    mobileImage: '/images/mobile/riggers-scaffolders-mobile.webp',
    confirmed: true,
  },
  {
    id: 'scaffolders',
    title: 'Scaffolders',
    titleAr: 'فنيو السقالات',
    group: 'Lifting & Access',
    summary: 'Safe industrial scaffolding erection, inspection support, and dismantling crews.',
    summaryAr: 'تركيب وفك السقالات الصناعية وفق معايير السلامة الميدانية.',
    image: '/images/riggers-scaffolders.webp',
    mobileImage: '/images/mobile/riggers-scaffolders-mobile.webp',
    confirmed: true,
  },
  {
    id: 'safety-officers',
    title: 'Safety Officers',
    titleAr: 'مسؤولو السلامة المهنية',
    group: 'Engineering & Safety',
    summary: 'Site HSE monitoring, toolbox briefings, hazard awareness, and PPE oversight.',
    summaryAr: 'مراقبة السلامة المهنية وتنفيذ الإحاطات اليومية وتقييم المخاطر.',
    image: '/images/industrial-safety-team.webp',
    mobileImage: '/images/mobile/industrial-safety-team-mobile.webp',
    confirmed: true,
  },
  {
    id: 'crane-operators',
    title: 'Crane Operators',
    titleAr: 'مشغلو الرافعات',
    group: 'Lifting & Access',
    summary: 'Experienced mobile, overhead, and industrial crane operations personnel.',
    summaryAr: 'تشغيل الرافعات المتحركة والصناعية بأعلى درجات الانضباط والسلامة.',
    image: '/images/crane-operators.webp',
    mobileImage: '/images/mobile/crane-operators-mobile.webp',
    confirmed: true,
  },
  {
    id: 'equipment-operators',
    title: 'Equipment Operators',
    titleAr: 'مشغلو المعدات الثقيلة',
    group: 'Lifting & Access',
    summary: 'Qualified operators for forklifts, man-lifts, and heavy industrial site machinery.',
    summaryAr: 'تشغيل الرافعات الشوكية والمعدات الثقيلة داخل المنشآت والمواقع.',
    image: '/images/crane-operators.webp',
    mobileImage: '/images/mobile/crane-operators-mobile.webp',
    confirmed: true,
  },
  {
    id: 'skilled-labour',
    title: 'Skilled Labour',
    titleAr: 'عمالة ماهرة',
    group: 'Site & Turnaround Support',
    summary: 'Multi-trade industrial workforce supporting construction, assembly, and plant upkeep.',
    summaryAr: 'كوادر فنية ماهرة لدعم أعمال التركيب والصيانة والإنشاءات الصناعية.',
    image: '/images/mechanical-maintenance.webp',
    mobileImage: '/images/mobile/mechanical-maintenance-mobile.webp',
    confirmed: true,
  },
  {
    id: 'general-helpers',
    title: 'General Helpers',
    titleAr: 'مساعدون عامون',
    group: 'Site & Turnaround Support',
    summary: 'Disciplined material handling, site preparation, and tradesman support crews.',
    summaryAr: 'دعم الفنيين ومناولة المواد وتجهيز مواقع العمل الصناعية.',
    image: '/images/industrial-safety-team.webp',
    mobileImage: '/images/mobile/industrial-safety-team-mobile.webp',
    confirmed: true,
  },
  {
    id: 'shutdown-turnaround-workforce',
    title: 'Shutdown & Turnaround Workforce',
    titleAr: 'فرق الإيقاف والصيانة الدورية',
    group: 'Site & Turnaround Support',
    summary: 'Coordinated multi-craft teams structured for planned plant shutdowns and turnarounds.',
    summaryAr: 'فرق متعددة التخصصات لدعم عمليات الإيقاف المجدول والصيانة الشاملة للمصانع.',
    image: '/images/refinery-aerial-hero.webp',
    mobileImage: '/images/mobile/refinery-aerial-mobile.webp',
    confirmed: true,
  },
];

export const confirmedManpowerCategories = manpowerCategories.filter((m) => m.confirmed);

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Submit Your Requirement',
    titleAr: 'تقديم متطلبات المشروع',
    description:
      'Share your required trade categories, headcount, project location, contract duration, and target mobilization date.',
    descriptionAr:
      'شاركنا التخصصات المطلوبة وعدد العمال وموقع المشروع ومدة العقد وتاريخ البدء المتوقع.',
  },
  {
    step: '02',
    title: 'Workforce Selection',
    titleAr: 'اختيار وتأهيل الكوادر',
    description:
      'Our technical coordinators match vetted tradesmen, technicians, and engineers to your exact site specifications.',
    descriptionAr:
      'يقوم فريقنا الفني بفرز واختيار الفنيين والمهندسين المؤهلين وفق متطلبات موقع العمل.',
  },
  {
    step: '03',
    title: 'Quotation & Contract Approval',
    titleAr: 'العرض التجاري واعتماد العقد',
    description:
      'Receive a clear commercial proposal and structured service agreement aligned with your operational scope.',
    descriptionAr:
      'استلام عرض سعر واضح واتفاقية عمل منظمة متوافقة مع نطاق مشروعك.',
  },
  {
    step: '04',
    title: 'Workforce Mobilisation',
    titleAr: 'تعبئة وتوجيه القوى العاملة',
    description:
      'Coordinated site deployment with PPE readiness, safety orientation alignment, and ongoing workforce oversight.',
    descriptionAr:
      'تعبئة منظمة للكوادر في الموقع مع كامل معدات السلامة والمتابعة المستمرة.',
  },
];
