import type { Metadata, Viewport } from 'next';
import { Inter, Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { companyConfig } from '@/config/company';
import { getOrganizationJsonLd } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import { LanguageProvider } from '@/components/ui/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101820',
};

export const metadata: Metadata = {
  metadataBase: new URL(companyConfig.siteUrl),
  title: {
    default: `${companyConfig.legalName} | Oil & Gas Manpower Supply & Technical Services`,
    template: `%s | ${companyConfig.legalName}`,
  },
  description:
    'PETROCON Technical Works LLC powers the Oil & Gas industry with skilled manpower, technical works, mechanical, electrical, instrumentation, welding, rigging, and turnaround workforce solutions.',
  keywords: [
    'PETROCON Technical Works LLC',
    'Oil and Gas Technical Services',
    'Industrial Manpower Supply',
    'Oil and Gas Workforce Solutions',
    'Technical Workforce Services',
    'Industrial Maintenance Services',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: companyConfig.siteUrl,
    siteName: companyConfig.legalName,
    title: `${companyConfig.legalName} | Powering the Oil & Gas Industry with Skilled Manpower.`,
    description: 'Your Workforce. Your Projects. Our Commitment.',
    images: [
      {
        url: companyConfig.brand.ogImage,
        width: 1200,
        height: 630,
        alt: `${companyConfig.legalName} Industrial Refinery Operations`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${companyConfig.legalName} | Powering the Oil & Gas Industry with Skilled Manpower.`,
    description: 'Your Workforce. Your Projects. Our Commitment.',
    images: [companyConfig.brand.ogImage],
  },
  alternates: {
    canonical: companyConfig.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-petro-black antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
