// src/lib/i18n.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files
import enTranslations from "@/locales/en.json"
import arTranslations from "@/locales/ar.json"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ar: {
      translation: arTranslations,
    },
  },
  lng: "ar", // <-- set default to Arabic
  fallbackLng: "ar", // fallback also Arabic
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
