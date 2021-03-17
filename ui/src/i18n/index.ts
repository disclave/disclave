import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { en, pl } from "./locales";

export const resources = {
  en,
  pl,
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (locale: string) => i18n.changeLanguage(locale);
export const getLanguage = (): string => i18n.language;
