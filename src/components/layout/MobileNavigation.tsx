'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  currentPath: string;
}

export function MobileNavigation({
  isOpen,
  onClose,
  navLinks,
  currentPath,
}: MobileNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-petro-navy text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
            <Link href="/" onClick={onClose} className="relative h-12 w-32">
              <Image
                src={companyConfig.brand.logoDarkBg}
                alt={companyConfig.legalName}
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Mobile Menu"
            className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-6 py-8"
          >
            {navLinks.map((link, index) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href);

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.28 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'flex min-h-[56px] items-center justify-between rounded-xl border-b border-white/10 px-3 py-3 font-heading text-2xl font-semibold tracking-industrial transition-colors',
                      isActive
                        ? 'text-[#B8D0DE]'
                        : 'text-white hover:text-[#B8D0DE]'
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-5 w-5 opacity-70" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Info */}
          <div className="border-t border-white/10 px-6 py-5 text-xs text-slate-400">
            <p className="font-semibold uppercase tracking-widest text-slate-300">
              {companyConfig.legalName}
            </p>
            <p className="mt-1">{companyConfig.industry}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
