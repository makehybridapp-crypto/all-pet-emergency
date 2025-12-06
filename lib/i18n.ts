import { notFound } from 'next/navigation';

export const locales = ['ko', 'ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getMessages(locale: Locale) {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to default locale
    const messages = await import(`@/messages/${defaultLocale}.json`);
    return messages.default;
  }
}

export function getLocaleFromParams(params: Promise<{ locale?: string }>): Locale {
  return defaultLocale; // Will be resolved in component
}

export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    ko: '한국어',
    ja: '日本語',
    en: 'English',
  };
  return names[locale];
}

