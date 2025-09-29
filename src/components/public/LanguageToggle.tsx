// src/components/public/LanguageToggle.tsx
"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang); // <-- use your context method, not i18n directly
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white shadow-md hover:shadow-lg px-4 py-2 rounded-md border border-gray-200 transition cursor-pointer"
    >
      <Globe className="w-5 h-5 text-primary" />
      <span className="font-medium">
        {language === "en" ? "العربية" : "English"}
      </span>
    </button>
  );
}
