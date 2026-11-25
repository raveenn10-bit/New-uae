import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { companyConfig } from '@/config/company';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({
  items,
  theme = 'dark',
}: {
  items: BreadcrumbItem[];
  theme?: 'dark' | 'light';
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `${companyConfig.siteUrl}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={theme === 'dark' ? 'text-[#B8D0DE]' : 'text-petro-blue'}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-petro-navy'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
