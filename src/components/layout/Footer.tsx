import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedServices } from '@/config/services';
import { Reveal } from '@/components/ui/motion/Reveal';
import { FooterBrandMark, FooterThread } from '@/components/layout/FooterBrandMark';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, socialLinks, developerCredit } = companyConfig;
  const verifiedSocials = socialLinks.filter((s) => s.verified && s.url);

  const hasAnyVerifiedContact =
    contact.address.verified ||
    contact.telephone.verified ||
    contact.email.verified ||
    contact.businessHours.verified;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-petro-navy text-slate-300">
      <FooterBrandMark />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-12 lg:pt-16 2xl:px-16">
        <Reveal>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Intro */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <div className="relative h-16 w-44">
                <Image
                  src={companyConfig.brand.logoDarkBg}
                  alt={companyConfig.legalName}
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {companyConfig.legalName} delivers structured technical works and industrial
              manpower solutions tailored to the Oil &amp; Gas, petrochemical, power, and
              heavy industrial sectors.
            </p>
            {verifiedSocials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {verifiedSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-petro-blue hover:text-white"
                  >
                    <span>{social.platform}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widecaps text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Services', href: '/services' },
                { label: 'Industries', href: '/industries' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition-colors hover:text-[#B8D0DE]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widecaps text-white">
              Technical Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {confirmedServices.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-slate-400 transition-colors hover:text-[#B8D0DE]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widecaps text-white">
              Corporate Contact
            </h3>
            {hasAnyVerifiedContact ? (
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {contact.address.verified && contact.address.fullText && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-petro-blue" aria-hidden="true" />
                    <span>{contact.address.fullText}</span>
                  </li>
                )}
                {contact.telephone.verified && contact.telephone.display && (
                  <li className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-petro-blue" aria-hidden="true" />
                    <a
                      href={contact.telephone.href}
                      className="transition-colors hover:text-white"
                    >
                      {contact.telephone.display}
                    </a>
                  </li>
                )}
                {contact.email.verified && contact.email.general && (
                  <li className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-petro-blue" aria-hidden="true" />
                    <a
                      href={`mailto:${contact.email.general}`}
                      className="transition-colors hover:text-white"
                    >
                      {contact.email.general}
                    </a>
                  </li>
                )}
                {contact.businessHours.verified && contact.businessHours.schedule && (
                  <li className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-petro-blue" aria-hidden="true" />
                    <span>{contact.businessHours.schedule}</span>
                  </li>
                )}
              </ul>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>
                  Submit a project or manpower enquiry directly through our Contact Us portal.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-petro-blue/50 bg-petro-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#B8D0DE] transition-colors hover:bg-petro-blue hover:text-white"
                >
                  Open Enquiry Form
                </Link>
              </div>
            )}
          </div>
        </div>
        </Reveal>

        {/* Bottom Legal & Developer Credit */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              &copy; {currentYear} {companyConfig.legalName}. All rights reserved.
            </p>
            <span className="hidden text-slate-600 sm:inline">|</span>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
          <p>
            <a
              href={developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-[#B8D0DE]"
            >
              {developerCredit.label}
            </a>
          </p>
        </div>
      </div>
      <FooterThread />
    </footer>
  );
}
