export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'industries-served',
    question: 'What industries does PETROCON serve?',
    answer:
      'PETROCON Technical Works LLC is structured to support Oil & Gas, Petrochemical, Offshore & Onshore Operations, Power & Energy, Industrial Construction, and Manufacturing sectors with technical works and industrial manpower solutions.',
  },
  {
    id: 'request-manpower',
    question: 'How can businesses request manpower?',
    answer:
      'Businesses can submit project and workforce requirements through the enquiry form on our Contact Us page. You can specify the required service category, project scope, and contact details to initiate a consultation with our coordination team.',
  },
  {
    id: 'career-enquiries',
    question: 'How can candidates submit career enquiries?',
    answer:
      'Candidates can visit our Careers page to browse our technical trade categories and submit a career enquiry with their experience details. When our verified recruitment WhatsApp or email channels are active, enquiries can be sent directly through those channels.',
  },
  {
    id: 'contact-company',
    question: 'How can clients contact the company?',
    answer:
      'Clients can reach PETROCON Technical Works LLC via our Contact Us page. All verified telephone, WhatsApp, email, and office address details are published on the Contact page once confirmed by the company.',
  },
];
