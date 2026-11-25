'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MessageSquare,
  X,
} from 'lucide-react';
import { companyConfig } from '@/config/company';
import {
  activeVacancies,
  careerCategories,
  type TradeCategory,
} from '@/config/careers';
import { CareerCard } from '@/components/ui/CareerCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buildMailtoUrl, buildWhatsAppUrl, cn } from '@/lib/utils';

const divisions = [
  'All',
  'Mechanical & Piping',
  'Electrical & Instrumentation',
  'Engineering & HSE',
  'General & Skilled Support',
] as const;

interface CareerFormState {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  position: string;
  experienceYears: string;
  message: string;
}

export function CareersClient() {
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [activeModalCategory, setActiveModalCategory] = useState<TradeCategory | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState<CareerFormState>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    position: careerCategories[0]?.title || '',
    experienceYears: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CareerFormState, string>>>({});

  const confirmedVacancies = activeVacancies.filter((v) => v.confirmed);
  const filteredCategories =
    selectedDivision === 'All'
      ? careerCategories
      : careerCategories.filter((c) => c.division === selectedDivision);

  const isWhatsAppReady = companyConfig.contact.whatsapp.verified;
  const isEmailReady = Boolean(
    companyConfig.contact.email.verified &&
      (companyConfig.contact.email.recruitment || companyConfig.contact.email.general)
  );

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof CareerFormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!form.nationality.trim()) nextErrors.nationality = 'Please enter your nationality.';
    if (!form.position.trim()) nextErrors.position = 'Please select a position.';
    if (!form.experienceYears.trim()) {
      nextErrors.experienceYears = 'Please enter your years of experience.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const formatCareerMessage = () =>
    [
      'PETROCON TECHNICAL WORKS LLC — Career Enquiry',
      `Full Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Nationality: ${form.nationality}`,
      `Position Applying For: ${form.position}`,
      `Years of Experience: ${form.experienceYears}`,
      `Message: ${form.message || 'N/A'}`,
    ].join('\n');

  const handleWhatsApp = () => {
    if (!validate()) return;
    const url = buildWhatsAppUrl(formatCareerMessage());
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmail = () => {
    if (!validate()) return;
    const recipient =
      companyConfig.contact.email.recruitment || companyConfig.contact.email.general;
    const url = buildMailtoUrl(
      `Career Enquiry: ${form.position} — ${form.fullName}`,
      formatCareerMessage(),
      recipient
    );
    if (url) {
      window.location.href = url;
    }
  };

  const handleCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatCareerMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const jumpToFormWithRole = (roleTitle: string) => {
    setForm((prev) => ({ ...prev, position: roleTitle }));
    setActiveModalCategory(null);
    const el = document.getElementById('career-enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Active Vacancies Section — Only shown if verified vacancies exist */}
      {confirmedVacancies.length > 0 && (
        <section className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Open Positions"
              title="Confirmed Active Vacancies"
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {confirmedVacancies.map((vac) => (
                <article
                  key={vac.id}
                  className="rounded-sm border border-slate-200 bg-petro-light-grey/40 p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-petro-blue">
                    {vac.employmentType} &middot; {vac.location}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-petro-navy">
                    {vac.title}
                  </h3>
                  <p className="mt-2 text-sm text-petro-steel">{vac.description}</p>
                  <button
                    type="button"
                    onClick={() => jumpToFormWithRole(vac.title)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-petro-blue hover:text-petro-navy"
                  >
                    Apply / Enquire
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trade Categories Filter & Grid */}
      <section className="bg-petro-light-grey py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Talent Pool &amp; Trade Categories"
              title="Technical Disciplines We Recruit"
              description="These categories represent our core industrial workforce disciplines rather than active open vacancies. Candidates may submit a career enquiry for upcoming mobilization."
            />
          </div>

          {/* Division Filter Buttons */}
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
            {divisions.map((div) => {
              const active = selectedDivision === div;
              return (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div)}
                  className={cn(
                    'min-h-[44px] shrink-0 rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors',
                    active
                      ? 'border-petro-navy bg-petro-navy text-white'
                      : 'border-slate-300 bg-white text-petro-navy hover:border-petro-blue'
                  )}
                >
                  {div}
                </button>
              );
            })}
          </div>

          {/* Category Cards Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCategories.map((cat) => (
              <CareerCard
                key={cat.id}
                category={cat}
                onSelect={(selected) => setActiveModalCategory(selected)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Career Enquiry Form */}
      <section id="career-enquiry-form" className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Candidate Registration"
            title="Career Enquiry Form"
            description="Complete your details below to prepare a structured career enquiry for our recruitment team."
            align="center"
          />

          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className="mt-10 space-y-5 rounded-sm border border-slate-200 bg-white p-6 shadow-industrial sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="career-fullName" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Full Name *
                </label>
                <input
                  id="career-fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="career-email" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Email Address *
                </label>
                <input
                  id="career-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="candidate@email.com"
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="career-phone" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Phone Number *
                </label>
                <input
                  id="career-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+971 XX XXX XXXX"
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="career-nationality" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Nationality *
                </label>
                <input
                  id="career-nationality"
                  type="text"
                  value={form.nationality}
                  onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  placeholder="Your nationality"
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
                {errors.nationality && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="career-position" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Position Applying For *
                </label>
                <select
                  id="career-position"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                >
                  {careerCategories.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.position}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="career-experience" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                  Years of Experience *
                </label>
                <input
                  id="career-experience"
                  type="text"
                  value={form.experienceYears}
                  onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                  placeholder="e.g. 5 years"
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
                {errors.experienceYears && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.experienceYears}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="career-message" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
                Message
              </label>
              <textarea
                id="career-message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share your trade certifications, Oil & Gas project background, or current availability..."
                className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {isWhatsAppReady && (
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Send via WhatsApp</span>
                </button>
              )}

              {isEmailReady && (
                <button
                  type="button"
                  onClick={handleEmail}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-sm bg-petro-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-petro-blue-dark"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Send via Recruitment Email</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-slate-300 bg-petro-light-grey px-5 py-3 text-sm font-semibold text-petro-navy transition-colors hover:border-petro-blue hover:bg-white"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>Enquiry Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copy Enquiry Summary</span>
                  </>
                )}
              </button>
            </div>

            {!isWhatsAppReady && !isEmailReady && (
              <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                Direct WhatsApp and recruitment email dispatch will activate once PETROCON&apos;s
                verified recruitment contact details are configured in{' '}
                <code>src/config/company.ts</code>.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Role Details Modal */}
      <AnimatePresence>
        {activeModalCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-petro-navy/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-role-title"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-sm bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-petro-blue">
                    {activeModalCategory.division}
                  </span>
                  <h3
                    id="modal-role-title"
                    className="mt-1 font-heading text-2xl font-bold text-petro-navy"
                  >
                    {activeModalCategory.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalCategory(null)}
                  aria-label="Close role details"
                  className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-100 text-petro-navy hover:bg-slate-200"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-petro-steel">
                {activeModalCategory.summary}
              </p>

              <div className="mt-6">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-petro-navy">
                  Typical Responsibilities
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {activeModalCategory.keyResponsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-petro-steel">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-petro-blue" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-petro-navy">
                  Typical Qualifications
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {activeModalCategory.typicalRequirements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-petro-steel">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-petro-navy" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setActiveModalCategory(null)}
                  className="min-h-[44px] rounded-sm border border-slate-300 px-4 py-2 text-sm font-semibold text-petro-navy hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => jumpToFormWithRole(activeModalCategory.title)}
                  className="min-h-[44px] rounded-sm bg-petro-blue px-5 py-2 text-sm font-semibold text-white hover:bg-petro-blue-dark"
                >
                  Enquire for This Role
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
