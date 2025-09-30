"use client";

import { MessageSquareMore } from "lucide-react";

interface WhatsAppButtonProps {
  message: string;
  title?: string; // optional text for the button
  phone?: string;
}
const DEFAULT_PHONE = "+970568891980"; // you can override with prop
const DEFAULT_MESSAGE = "Hi! I'm interested in your room listing.";
export function WhatsAppButton({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
  title = "Contact via WhatsApp",
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
      className="w-full h-9 text-sm inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-green-600 transition-colors duration-500 cursor-pointer"
    >
      <MessageSquareMore className="w-4 h-4 me-2" />
      {title}
    </button>
  );
}
