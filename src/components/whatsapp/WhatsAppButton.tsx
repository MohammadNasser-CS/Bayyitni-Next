"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const SUPPORT_PHONE = "+966501234567";

interface WhatsAppButtonProps {
  message: string;
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  phone?: string;
}

export function WhatsAppButton({
  message,
  children,
  variant = "default",
  size = "default",
  className = "",
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
    <Button
      onClick={handleWhatsApp}
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {children || "Contact via WhatsApp"}
    </Button>
  );
}
