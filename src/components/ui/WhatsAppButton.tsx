'use client';

import { companyConfig } from '@/config/company';
import { buildWhatsAppUrl } from '@/lib/utils';

export function WhatsAppButton() {
  const { verified, defaultMessage } = companyConfig.contact.whatsapp;
  const href = buildWhatsAppUrl(defaultMessage);

  // Only activate once the verified PETROCON WhatsApp number is configured
  if (!verified || !href) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="group relative flex items-center">
        <span
          role="tooltip"
          className="pointer-events-none mr-3 hidden rounded-md bg-petro-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block"
        >
          Chat on WhatsApp
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PETROCON Technical Works LLC on WhatsApp"
          className="whatsapp-pulse flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-200 hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 fill-current"
            aria-hidden="true"
          >
            <path d="M16.002 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.352.616 4.648 1.787 6.672L2.56 29.44l6.944-1.824A13.27 13.27 0 0 0 16.002 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.002 2.667zm7.768 18.88c-.328.923-1.912 1.765-2.648 1.872-.675.098-1.531.14-2.472-.157-.57-.182-1.304-.425-2.244-.832-3.95-1.707-6.528-5.696-6.725-5.96-.197-.264-1.608-2.139-1.608-4.08 0-1.941 1.016-2.896 1.376-3.291.36-.395.787-.493 1.048-.493.264 0 .525.003.755.013.243.011.568-.093.888.677.328.789 1.117 2.731 1.216 2.928.099.197.165.427.032.691-.131.264-.197.427-.395.659-.197.232-.413.517-.589.693-.197.197-.403.411-.173.805.23.395 1.021 1.685 2.195 2.731 1.509 1.347 2.781 1.765 3.176 1.963.395.197.624.165.853-.099.23-.264.984-1.149 1.248-1.544.264-.395.525-.328.885-.197.36.131 2.299 1.085 2.693 1.283.395.197.659.296.757.461.099.165.099.955-.229 1.877z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
