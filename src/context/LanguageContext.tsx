// src/context/LanguageContext.tsx
"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  t: (key: string, options?: Record<string, any>) => string; // <-- allow options
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n, t } = useTranslation();
  const [language, setLanguageState] = useState("ar");
  const [isRTL, setIsRTL] = useState(false);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    setIsRTL(lang === "ar");

    // Save to localStorage
    localStorage.setItem("language", lang);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    // Update tab title dynamically
    document.title =
      lang === "ar"
        ? "بيتني | منصة السكن الطلابي في فلسطين"
        : "Bayyitni | Student Housing Platform In Palestine";


    // Add RTL class to body for additional styling hooks
    if (lang === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  };

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(savedLanguage);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        t: (key: string, options?: Record<string, any>) => t(key, options),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
