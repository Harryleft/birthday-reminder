import { useState } from 'react';
import { messages, Locale, MessageKey } from '../i18n/locales';
import { NameTranslator } from '../utils/nameTranslator';

export function useI18n() {
  const [locale, setLocale] = useState<Locale>('zh');

  const t = (key: MessageKey, params?: Record<string, string | number>) => {
    let text = messages[locale].birthday[key];
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    return text;
  };

  const translateName = (name: string) => {
    return NameTranslator.translate(name, locale);
  };

  return { locale, setLocale, t, translateName };
} 