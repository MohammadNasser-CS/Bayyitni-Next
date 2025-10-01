"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MessageSquareMore } from "lucide-react";
import { submitBooking } from "@/utils/student/booking/submitBooking";
import { CreateBooking } from "@/types/booking/booking";
import { useLanguage } from "@/context/LanguageContext";

interface WhatsAppButtonProps {
  message?: string;
  title?: string;
  phone?: string;
  bookingPayload?: CreateBooking; // optional booking before WhatsApp
  className?: string; // optional custom class
  children?: ReactNode; // optional custom content
}

const DEFAULT_PHONE = "+970568891980";
const DEFAULT_MESSAGE = "Hi! I'm interested in your room listing.";

export function WhatsAppButton({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
  title,
  bookingPayload,
  className,
  children,
}: WhatsAppButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phone.replace("+", "")}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      if (bookingPayload) {
        await submitBooking(bookingPayload);
        router.push("/student/bookings");
      }
      handleWhatsApp();
    } catch (err) {
      alert(t("booking.error"));
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() =>
          bookingPayload ? setConfirmOpen(true) : handleWhatsApp()
        }
        className={
          className ??
          "w-full h-9 text-sm inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-green-600 transition-colors duration-500 cursor-pointer"
        }
      >
        {children ?? (
          <>
            <MessageSquareMore className="w-4 h-4 me-2" />
            {title || t("whatsapp.supportMessage")}
          </>
        )}
      </button>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-lg shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              {t("booking.confirmTitle")}
            </h2>
            <p className="text-secondary mb-6">
              {t("booking.confirmMessage")}{" "}
              <span className="text-primary text-lg">
                {t("homepage.bayyitni")}
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-500 cursor-pointer"
                onClick={() => setConfirmOpen(false)}
                disabled={loading}
              >
                {t("common.cancel")}
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600 transition-colors duration-500 cursor-pointer"
                onClick={handleConfirmBooking}
                disabled={loading}
              >
                {loading ? t("common.processing") : t("booking.confirmAction")}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
