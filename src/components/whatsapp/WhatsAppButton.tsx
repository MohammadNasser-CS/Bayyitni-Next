"use client";

const SUPPORT_PHONE = "+966501234567";

interface WhatsAppButtonProps {
  message: string;
  title?: string; // optional text for the button
  phone?: string;
}

export function WhatsAppButton({
  message,
  title = "Contact via WhatsApp",
  phone = SUPPORT_PHONE,
}: WhatsAppButtonProps) {
  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phone.replace("+", "")}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <button
      type="button"
      onClick={handleWhatsApp}
      className="inline-flex items-center px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-colors duration-200"
    >
      <span className="mr-2">💬</span>
      {title}
    </button>
  );
}
