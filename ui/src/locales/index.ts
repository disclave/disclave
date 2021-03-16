import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Test translation": "This is test translation!!!",
        },
      },
      pl: {
        translation: {
          "Test translation": "To po polsku!",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (locale: string) => i18n.changeLanguage(locale);
export const getLanguage = (): string => i18n.language;
