"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // if you have a language context

const SUPPORT_PHONE = "+970568891980";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage(); // assume you have translation function

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent(
      t("support.whatsappMessage") ||
        "Hi! I need assistance with Bayyitni platform.\n\nPlease help me with my inquiry. Thank you!"
    );
    window.open(
      `https://wa.me/${SUPPORT_PHONE.replace("+", "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end space-y-2 rtl:items-start rtl:end-auto rtl:start-4">
      {/* WhatsApp Button */}
      {isVisible && (
        <button
          onClick={handleWhatsAppSupport}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-200 relative group"
          title={t("whatsapp.supportMessage") || "Contact Support via WhatsApp"}
        >
          <MessageCircle className="h-7 w-7 text-white animate-pulse" />
        </button>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 border border-gray-200 shadow hover:bg-white transition-all"
        title={
          isVisible
            ? t("whatsapp.hide") || "Hide WhatsApp button"
            : t("whatsapp.show") || "Show WhatsApp button"
        }
      >
        {isVisible ? (
          <X className="h-5 w-5 text-gray-600" />
        ) : (
          <MessageCircle className="h-7 w-7 text-green-600" />
        )}
      </button>
    </div>
  );
}
