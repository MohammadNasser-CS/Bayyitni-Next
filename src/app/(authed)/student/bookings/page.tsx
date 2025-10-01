// src/app/student/booking/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Calendar, FlagTriangleRightIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { getAllBookings } from "@/utils/student/booking/getAllBookings";
import { useAuth } from "@/context/AuthContext";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_TYPE_LABELS,
  BookingStatus,
  BookingType,
} from "@/lib/enum/booking_enums";
import { PAYMENT_STATUS_LABELS, PaymentStatus } from "@/lib/enum/payment_enums";
import { useLanguage } from "@/context/LanguageContext"; // <-- for translations
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Booking } from "@/types/booking/booking";

export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t, language } = useLanguage(); // translation function
  // TODO: replace with logged-in student ID from context/auth

  const studentId = String(user!.id);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings(studentId);
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [studentId]);

  const statusColor = (status: string) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case BookingStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800";
      case BookingStatus.ACTIVE:
        return "bg-green-100 text-green-800";
      case BookingStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const paymentColor = (status: string) => {
    switch (status) {
      case PaymentStatus.PAID:
        return "bg-green-100 text-green-800";
      case PaymentStatus.UNPAID:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse">
          {t("student.bookings.loading")}
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <FlagTriangleRightIcon className="h-12 w-12 mb-2 text-primary" />
        <h2 className="text-xl font-bold mb-2">
          {t("student.bookings.noBookings")}
        </h2>
        <p className="text-hints">{t("student.bookings.noBookingsMessage")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t("student.bookings.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("student.bookings.subtitle")}
        </p>
      </div>

      {/* Booking Cards */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-cards-background flex flex-col gap-6 rounded-xl border border-placeholders py-6 shadow-sm overflow-hidden"
          >
            {/* Card Header */}
            <div className="px-6 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-xl mb-2">
                    {t("student.bookings.propertyRoom", {
                      propertyId: booking.property_id,
                      roomId: booking.room_id,
                    })}
                  </h2>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {t("student.bookings.propertyId", {
                        id: booking.property_id,
                      })}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("student.bookings.bookingInfo", {
                      id: booking.id,
                      type: BOOKING_TYPE_LABELS[booking.booking_type][language],
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor(
                      booking.booking_status
                    )}`}
                  >
                    {BOOKING_STATUS_LABELS[booking.booking_status][language]}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${paymentColor(
                      booking.payment_status
                    )}`}
                  >
                    {PAYMENT_STATUS_LABELS[booking.payment_status][language]}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {booking.start_date} → {booking.end_date}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="text-xl me-2">₪</span>
                  <span>
                    {t("student.bookings.monthlyPrice", {
                      price: booking.room.price_of_bed_per_month,
                    })}
                  </span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">
                  {t("student.bookings.roomDetailsTitle")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.room.description} <br />
                  {t("student.bookings.beds", {
                    count: booking.room.number_of_beds,
                  })}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <WhatsAppButton
                  title={t("student.bookings.contactWhatsapp")}
                  message={t("whatsapp.studentBookingAskWhatsappMessage", {
                    bookingNumber: booking.id,
                    roomNumber: booking.room_id,
                  })}
                  className="inline-flex items-center justify-center text-sm font-medium h-8 rounded-md gap-1.5 px-3 bg-green-600 hover:bg-green-700 text-white shadow-xs transition-colors duration-500 cursor-pointer"
                />

                {/* <Link
                  href={`/student/booking-confirmation?booking=${booking.id}`}
                  className="inline-flex items-center justify-center text-sm font-medium h-8 rounded-md gap-1.5 px-3 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {t("student.bookings.viewDetails")}
                </Link> */}

                <Link
                  href={`/student/property-details/${booking.property_id}`}
                  className="inline-flex items-center justify-center text-sm font-medium h-8 rounded-md gap-1.5 px-3 border bg-background shadow-xs hover:bg-gray-200"
                >
                  {t("student.bookings.viewProperty")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
