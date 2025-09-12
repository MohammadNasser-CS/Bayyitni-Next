// src/components/public/LanguageToggle.tsx
"use client";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang); // <-- use your context method, not i18n directly
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
    >
      {language === "en" ? "Arabic" : "إنجليزي"}
    </button>
  );
}
