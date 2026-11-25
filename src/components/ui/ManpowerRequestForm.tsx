'use client';

import { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Plus,
  Trash2,
} from 'lucide-react';
import { companyConfig } from '@/config/company';
import { confirmedManpowerCategories } from '@/config/manpower';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/utils';
import { useLanguage } from '@/components/ui/LanguageContext';

interface ManpowerLine {
  id: string;
  category: string;
  quantity: string;
}

interface QuoteFormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectLocation: string;
  contractDuration: string;
  expectedStartDate: string;
  additionalRequirements: string;
}

export function ManpowerRequestForm({
  defaultCategory = '',
}: {
  defaultCategory?: string;
}) {
  const { isRtl } = useLanguage();
  const initialCat = defaultCategory || confirmedManpowerCategories[0]?.title || 'Oil & Gas Engineers';

  const [lines, setLines] = useState<ManpowerLine[]>([
    { id: 'line-1', category: initialCat, quantity: '5' },
  ]);

  const [form, setForm] = useState<QuoteFormState>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectLocation: '',
    contractDuration: 'Long-Term (6+ Months)',
    expectedStartDate: '',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState | 'lines', string>>>({});
  const [copied, setCopied] = useState(false);

  const isWhatsAppReady = companyConfig.contact.whatsapp.verified;
  const isEmailReady = companyConfig.contact.email.verified;

  const addLine = () => {
    const nextCat =
      confirmedManpowerCategories[lines.length % confirmedManpowerCategories.length]?.title ||
      'Mechanical Technicians';
    setLines((prev) => [
      ...prev,
      { id: `line-${Date.now()}-${prev.length}`, category: nextCat, quantity: '2' },
    ]);
  };

  const removeLine = (id: string) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id: string, field: 'category' | 'quantity', value: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof QuoteFormState | 'lines', string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!form.companyName.trim()) nextErrors.companyName = 'Please enter your company name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp or phone number.';
    }
    if (!form.projectLocation.trim()) {
      nextErrors.projectLocation = 'Please enter the project location.';
    }
    const invalidLine = lines.some(
      (l) => !l.category.trim() || !l.quantity.trim() || Number(l.quantity) <= 0
    );
    if (invalidLine) {
      nextErrors.lines = 'Please select a manpower category and enter a worker quantity of at least 1.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const formatQuoteText = () => {
    const workforceBlock = lines
      .map((l, idx) => `  ${idx + 1}. ${l.category} — Qty: ${l.quantity}`)
      .join('\n');

    return [
      'PETROCON TECHNICAL WORKS LLC — Manpower Quotation Request',
      `Full Name: ${form.fullName}`,
      `Company Name: ${form.companyName}`,
      `Email Address: ${form.email}`,
      `WhatsApp / Phone: ${form.phone}`,
      `Project Location: ${form.projectLocation}`,
      `Contract Duration: ${form.contractDuration}`,
      `Expected Starting Date: ${form.expectedStartDate || 'To be confirmed'}`,
      'Required Manpower Categories & Quantities:',
      workforceBlock,
      `Additional Requirements: ${form.additionalRequirements || 'None specified'}`,
    ].join('\n');
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const url = buildWhatsAppUrl(formatQuoteText());
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmail = () => {
    if (!validate()) return;
    const url = buildMailtoUrl(
      `Manpower Quotation Request — ${form.companyName}`,
      formatQuoteText()
    );
    if (url) {
      window.location.href = url;
    }
  };

  const handleCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatQuoteText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const totalWorkers = lines.reduce((sum, l) => sum + (Math.max(0, parseInt(l.quantity, 10) || 0)), 0);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      noValidate
      className="space-y-6 rounded-sm border border-slate-200 bg-white p-6 shadow-industrial sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-heading text-xl font-bold tracking-industrial text-petro-navy">
            {isRtl ? 'نموذج طلب قوى عاملة وعرض سعر' : 'Request Manpower & Free Quote'}
          </h3>
          <p className="mt-1 text-sm text-petro-steel">
            {isRtl
              ? 'أضف التخصصات والأعداد المطلوبة لتجهيز عرض سعر منظم لمشروعك.'
              : 'Add one or more workforce categories and quantities to generate a structured B2B quotation enquiry.'}
          </p>
        </div>
        <span className="rounded-sm bg-petro-light-grey px-3 py-1.5 text-xs font-semibold text-petro-navy">
          Total Headcount: <strong className="text-petro-blue">{totalWorkers}</strong>
        </span>
      </div>

      {/* Contact Info Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mq-fullName" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Full Name *
          </label>
          <input
            id="mq-fullName"
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
          <label htmlFor="mq-companyName" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Company Name *
          </label>
          <input
            id="mq-companyName"
            type="text"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            placeholder="Company / EPC contractor name"
            className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
          />
          {errors.companyName && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.companyName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mq-email" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Email Address *
          </label>
          <input
            id="mq-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="procurement@company.com"
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
          <label htmlFor="mq-phone" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            WhatsApp / Phone Number *
          </label>
          <input
            id="mq-phone"
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
      </div>

      {/* Dynamic Multi-Category Workforce Rows */}
      <div className="rounded-sm border border-slate-200 bg-petro-light-grey/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-petro-navy">
            Required Manpower Categories &amp; Quantities *
          </label>
          <button
            type="button"
            onClick={addLine}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-sm bg-petro-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-petro-blue"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {lines.map((line, idx) => (
            <div key={line.id} className="grid grid-cols-12 gap-2.5 items-center">
              <div className="col-span-12 sm:col-span-8">
                <select
                  aria-label={`Manpower Category ${idx + 1}`}
                  value={line.category}
                  onChange={(e) => updateLine(line.id, 'category', e.target.value)}
                  className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                >
                  {confirmedManpowerCategories.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-9 sm:col-span-3">
                <input
                  type="number"
                  min={1}
                  aria-label={`Number of Workers ${idx + 1}`}
                  value={line.quantity}
                  onChange={(e) => updateLine(line.id, 'quantity', e.target.value)}
                  placeholder="Qty"
                  className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
                />
              </div>
              <div className="col-span-3 sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  disabled={lines.length <= 1}
                  aria-label={`Remove row ${idx + 1}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-300 bg-white text-slate-500 transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {errors.lines && (
          <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.lines}
          </p>
        )}
      </div>

      {/* Project Logistics Grid */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="mq-location" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Project Location *
          </label>
          <input
            id="mq-location"
            type="text"
            value={form.projectLocation}
            onChange={(e) => setForm({ ...form, projectLocation: e.target.value })}
            placeholder="Site / Industrial Zone"
            className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
          />
          {errors.projectLocation && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.projectLocation}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mq-duration" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Contract Duration *
          </label>
          <select
            id="mq-duration"
            value={form.contractDuration}
            onChange={(e) => setForm({ ...form, contractDuration: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
          >
            <option value="Short-Term (1–3 Months)">Short-Term (1–3 Months)</option>
            <option value="Medium-Term (3–6 Months)">Medium-Term (3–6 Months)</option>
            <option value="Long-Term (6+ Months)">Long-Term (6+ Months)</option>
            <option value="Shutdown / Turnaround">Shutdown / Turnaround</option>
          </select>
        </div>

        <div>
          <label htmlFor="mq-start" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
            Expected Starting Date
          </label>
          <input
            id="mq-start"
            type="date"
            value={form.expectedStartDate}
            onChange={(e) => setForm({ ...form, expectedStartDate: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mq-notes" className="block text-xs font-semibold uppercase tracking-wider text-petro-navy">
          Additional Requirements
        </label>
        <textarea
          id="mq-notes"
          rows={3}
          value={form.additionalRequirements}
          onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
          placeholder="Specify shift schedules, site access prerequisites, trade certifications, or equipment scope..."
          className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm focus:border-petro-blue focus:outline-none"
        />
      </div>

      {/* Dispatch Actions */}
      <div className="flex flex-wrap gap-3 pt-1">
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
            <span>Send via Email</span>
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
              <span>Quotation Request Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              <span>Copy Formatted Quote Request</span>
            </>
          )}
        </button>
      </div>

      {!isWhatsAppReady && !isEmailReady && (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Direct WhatsApp and email dispatch will activate automatically once PETROCON&apos;s
          verified WhatsApp number and email are configured in <code>src/config/company.ts</code>.
        </p>
      )}
    </form>
  );
}
