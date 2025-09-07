// src/components/public/LanguageToggle.tsx
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);

    // Optional: handle RTL layout
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
    >
      {i18n.language === "en" ? "عربي" : "English"}
    </button>
  );
}
