'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Locale } from '@/config/i18n';

interface LanguageContextValue {
  locale: Locale;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof translations)[Locale];
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  isRtl: false,
  setLocale: () => {},
  toggleLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const toggleLocale = () => setLocale((prev) => (prev === 'en' ? 'ar' : 'en'));

  return (
    <LanguageContext.Provider
      value={{
        locale,
        isRtl: locale === 'ar',
        setLocale,
        toggleLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
