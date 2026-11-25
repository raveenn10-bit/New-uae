'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Menu } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { MobileNavigation } from './MobileNavigation';
import { useLanguage } from '@/components/ui/LanguageContext';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const { locale, toggleLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.industries, href: '/industries' },
    { label: t.nav.careers, href: '/careers' },
    { label: t.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isTransparent = !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-5 lg:px-8 2xl:px-12',
          isTransparent ? 'pt-4' : 'pt-2.5'
        )}
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-[1.4rem] border px-3 transition-all duration-500 sm:px-5',
            isTransparent
              ? 'border-white/15 bg-[#101820]/35 py-2.5 backdrop-blur-md'
              : 'border-slate-200/80 bg-white/90 py-2 shadow-industrial backdrop-blur-xl'
          )}
        >
          <Link
            href="/"
            aria-label={`${companyConfig.legalName} — Home`}
            className="flex shrink-0 items-center gap-3 focus-visible:rounded-xl"
          >
            <div className="relative h-12 w-10 sm:h-13 sm:w-11">
              <Image
                src={
                  isTransparent
                    ? companyConfig.brand.logoDarkBg
                    : companyConfig.brand.logoLightBg
                }
                alt={companyConfig.legalName}
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="hidden leading-tight sm:block">
              <span
                className={cn(
                  'block font-heading text-base font-bold tracking-wider',
                  isTransparent ? 'text-white' : 'text-petro-navy'
                )}
              >
                PETROCON
              </span>
              <span
                className={cn(
                  'block text-[10px] font-semibold tracking-[0.2em]',
                  isTransparent ? 'text-[#B8D0DE]' : 'text-petro-blue'
                )}
              >
                TECHNICAL WORKS LLC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                    isTransparent
                      ? isActive
                        ? 'text-white'
                        : 'text-slate-200 hover:text-white'
                      : isActive
                        ? 'text-petro-blue'
                        : 'text-petro-navy/80 hover:text-petro-navy'
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className={cn(
                        'absolute inset-0 rounded-xl',
                        isTransparent ? 'bg-white/15' : 'bg-petro-blue-light'
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Language Switcher + Request Manpower CTA */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label="Switch language between English and Arabic"
              className={cn(
                'inline-flex h-10 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-colors',
                isTransparent
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                  : 'border-slate-300 bg-slate-50 text-petro-navy hover:border-petro-blue'
              )}
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{locale === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            <Link
              href="/contact"
              className={cn(
                'group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-200',
                isTransparent
                  ? 'bg-petro-blue text-white shadow-lg shadow-petro-navy/30 hover:bg-[#101820]'
                  : 'bg-petro-navy text-white hover:bg-petro-blue'
              )}
            >
              <span className="btn-shine" aria-hidden="true" />
              <span>{t.nav.requestManpower}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label="Switch language"
              className={cn(
                'inline-flex h-10 items-center gap-1 rounded-xl px-2.5 text-xs font-semibold transition-colors',
                isTransparent
                  ? 'bg-white/10 text-white'
                  : 'bg-slate-100 text-petro-navy'
              )}
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
                isTransparent
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-petro-navy hover:bg-slate-200'
              )}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </header>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
