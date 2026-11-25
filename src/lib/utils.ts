import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { companyConfig } from '@/config/company';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppUrl(message: string): string | null {
  const { verified, numberE164 } = companyConfig.contact.whatsapp;
  if (!verified || !numberE164) return null;
  const cleanNumber = numberE164.replace(/[^0-9]/g, '');
  if (!cleanNumber) return null;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string, toEmail?: string): string | null {
  const email = toEmail || companyConfig.contact.email.general;
  if (!companyConfig.contact.email.verified || !email) return null;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getOrganizationJsonLd() {
  const sameAs = companyConfig.socialLinks
    .filter((s) => s.verified && s.url)
    .map((s) => s.url);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyConfig.legalName,
    url: companyConfig.siteUrl,
    logo: `${companyConfig.siteUrl}${companyConfig.brand.logoLightBg}`,
    description:
      'PETROCON Technical Works LLC provides technical works and industrial manpower solutions for the Oil & Gas, petrochemical, power, and heavy industrial sectors.',
  };

  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (companyConfig.contact.telephone.verified && companyConfig.contact.telephone.display) {
    schema.telephone = companyConfig.contact.telephone.display;
  }

  if (companyConfig.contact.email.verified && companyConfig.contact.email.general) {
    schema.email = companyConfig.contact.email.general;
  }

  if (companyConfig.contact.address.verified && companyConfig.contact.address.fullText) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: companyConfig.contact.address.line1,
      addressLocality: companyConfig.contact.address.city,
      addressCountry: companyConfig.contact.address.country,
    };
  }

  return schema;
}
