'use client';

import { useState } from 'react';
import { AlertCircle, Check, Copy, Mail, MessageSquare } from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedServices } from '@/config/services';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/utils';

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  requiredService: string;
  message: string;
}

export function ContactForm({ defaultService = '' }: { defaultService?: string }) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    requiredService: defaultService || confirmedServices[0]?.title || '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [copied, setCopied] = useState(false);

  const isWhatsAppReady = companyConfig.contact.whatsapp.verified;
  const isEmailReady = companyConfig.contact.email.verified;

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!form.companyName.trim()) nextErrors.companyName = 'Please enter your company name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!form.requiredService.trim()) {
      nextErrors.requiredService = 'Please select a required service.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please provide brief project or manpower details (min. 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const formatEnquiryText = () =>
    [
      'PETROCON TECHNICAL WORKS LLC — Business Enquiry',
      `Full Name: ${form.fullName}`,
      `Company Name: ${form.companyName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Required Service: ${form.requiredService}`,
      `Message: ${form.message}`,
    ].join('\n');

  const handleWhatsApp = () => {
    if (!validate()) return;
    const url = buildWhatsAppUrl(formatEnquiryText());
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmail = () => {
    if (!validate()) return;
    const url = buildMailtoUrl(
      `Business Enquiry: ${form.requiredService} — ${form.companyName}`,
      formatEnquiryText()
    );
    if (url) {
      window.location.href = url;
    }
  };

  const handleCopySummary = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatEnquiryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      noValidate
      className="space-y-5 rounded-sm border border-slate-200 bg-white p-6 shadow-industrial sm:p-8"
    >
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-heading text-xl font-bold tracking-industrial text-petro-navy">
          Business &amp; Manpower Enquiry
        </h3>
        <p className="mt-1 text-sm text-petro-steel">
          Complete the fields below to prepare a structured enquiry for our coordination team.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-fullName" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Full Name *
          </label>
          <input
            id="contact-fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Your full name"
            className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
          />
          {errors.fullName && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-companyName" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Company Name *
          </label>
          <input
            id="contact-companyName"
            type="text"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            placeholder="Organization name"
            className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
          />
          {errors.companyName && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.companyName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@company.com"
            className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Phone *
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+971 XX XXX XXXX"
            className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
          Required Service *
        </label>
        <select
          id="contact-service"
          value={form.requiredService}
          onChange={(e) => setForm({ ...form, requiredService: e.target.value })}
          className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
        >
          {confirmedServices.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="General Technical Enquiry">General Technical Enquiry</option>
        </select>
        {errors.requiredService && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.requiredService}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Outline your project scope, required trades, location, or mobilization timeline..."
          className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-petro-black transition-colors focus:border-petro-blue focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Action Buttons: Honest Frontend-Only Dispatch */}
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
            <span>Open Email Enquiry</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCopySummary}
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
              <span>Copy Structured Enquiry</span>
            </>
          )}
        </button>
      </div>

      {!isWhatsAppReady && !isEmailReady && (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Direct WhatsApp and email dispatch will activate automatically once PETROCON&apos;s
          verified contact channels are configured in <code>src/config/company.ts</code>. You can
          validate and copy your structured enquiry summary above.
        </p>
      )}
    </form>
  );
}
