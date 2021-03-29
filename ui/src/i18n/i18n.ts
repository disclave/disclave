import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales";

export const resources = {
  en,
} as const;

export const i18n = i18next
  .createInstance({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .use(initReactI18next);

i18n.init((err) => {
  if (err) console.error(err);
});

export const changeLanguage = (locale: string) => i18n.changeLanguage(locale);
export const getLanguage = (): string => i18n.language;
