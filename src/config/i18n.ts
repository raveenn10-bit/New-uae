export type Locale = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      industries: 'Industries',
      careers: 'Careers',
      contact: 'Contact Us',
      requestManpower: 'Request Manpower',
    },
    hero: {
      badge: 'PETROCON TECHNICAL WORKS LLC',
      headlineLine1: 'Powering the Oil & Gas Industry',
      headlineLine2: 'with Skilled Manpower.',
      supporting: 'Your Workforce. Your Projects. Our Commitment.',
      ctaRequest: 'Request Manpower',
      ctaQuote: 'Get a Free Quote',
      ctaServices: 'Explore Our Services',
      ctaContact: 'Contact Us',
    },
    sections: {
      manpowerEyebrow: 'Manpower Supply Categories',
      manpowerTitle: 'Specialized Oil & Gas Workforce Divisions',
      manpowerDesc:
        'Configurable industrial manpower categories tailored for refineries, offshore platforms, petrochemical plants, and heavy engineering projects.',
      howItWorksEyebrow: 'How It Works',
      howItWorksTitle: 'A Structured Four-Step Mobilisation Process',
      howItWorksDesc:
        'Transparent workforce coordination from initial scope submission to on-site mobilisation.',
      quoteEyebrow: 'Request Manpower',
      quoteTitle: 'Get a Free B2B Manpower Quotation',
      quoteDesc:
        'Add one or more manpower categories and quantities to prepare a structured enquiry for our coordination team.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      industries: 'القطاعات',
      careers: 'الوظائف',
      contact: 'اتصل بنا',
      requestManpower: 'طلب قوى عاملة',
    },
    hero: {
      badge: 'بتروكون للأعمال الفنية ذ.م.م',
      headlineLine1: 'دعم قطاع النفط والغاز',
      headlineLine2: 'بالقوى العاملة الماهرة.',
      supporting: 'قوتكم العاملة. مشاريعكم. التزامنا.',
      ctaRequest: 'طلب قوى عاملة',
      ctaQuote: 'احصل على عرض سعر',
      ctaServices: 'استكشف خدماتنا',
      ctaContact: 'اتصل بنا',
    },
    sections: {
      manpowerEyebrow: 'فئات القوى العاملة',
      manpowerTitle: 'كوادر فنية متخصصة لقطاع النفط والغاز',
      manpowerDesc:
        'فئات قوى عاملة صناعية قابلة للتخصيص لدعم المصافي والمنصات البحرية ومصانع البتروكيماويات والمشاريع الهندسية.',
      howItWorksEyebrow: 'آلية العمل',
      howItWorksTitle: 'أربع خطوات منظمة لتعبئة القوى العاملة',
      howItWorksDesc:
        'تنسيق شفاف ومتكامل بدءاً من استلام متطلبات المشروع وحتى وصول الكوادر إلى الموقع.',
      quoteEyebrow: 'طلب قوى عاملة',
      quoteTitle: 'احصل على عرض سعر مجاني لمشروعك',
      quoteDesc:
        'أضف فئة أو أكثر من التخصصات والأعداد المطلوبة لتجهيز طلب عرض سعر منظم لفريق التنسيق لدينا.',
    },
  },
} as const;
