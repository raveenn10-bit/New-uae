import type { MetadataRoute } from 'next';
import { companyConfig } from '@/config/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${companyConfig.siteUrl}/sitemap.xml`,
  };
}
