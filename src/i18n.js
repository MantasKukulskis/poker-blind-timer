import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationLT from "./locales/lt/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
    lt: { translation: translationLT },
    en: { translation: translationEN },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "lt",
        interpolation: { escapeValue: false },
    });

export default i18n;