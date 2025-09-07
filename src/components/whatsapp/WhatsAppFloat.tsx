"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const SUPPORT_PHONE = "+966501234567";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent(
      `Hi! I need assistance with Bayyitni platform.\n\nPlease help me with my inquiry. Thank you!`
    );
    window.open(
      `https://wa.me/${SUPPORT_PHONE.replace("+", "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* WhatsApp Button */}
      {isVisible && (
        <button
          onClick={handleWhatsAppSupport}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-200"
          title="Contact Support via WhatsApp"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </button>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-white/90 border shadow hover:bg-white transition-all"
        title={isVisible ? "Hide WhatsApp button" : "Show WhatsApp button"}
      >
        {isVisible ? (
          <X className="h-5 w-5 text-gray-600" />
        ) : (
          <MessageCircle className="h-5 w-5 text-green-600" />
        )}
      </button>
    </div>
  );
}
