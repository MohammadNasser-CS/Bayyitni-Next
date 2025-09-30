"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Room } from "@/types/rooms/rooms";
import { AirVentIcon, BathIcon, DoorOpenIcon, Printer } from "lucide-react";
import { ROOM_TYPE_LABELS } from "@/lib/enum/room_enums";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

const FALLBACK_IMAGE = "/default-fallback-image.png";

interface Props {
  room: Room;
  index: number;
}

export default function BedRoomCard({ room, index }: Props) {
  const { t, language } = useLanguage();

  const images =
    room.images && room.images.length > 0
      ? room.images.map((img) => img.image_url)
      : [FALLBACK_IMAGE];

  return (
    <div className="bedroom-card border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="px-3 py-2 sm:p-4 bg-gray-50 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          {t("common.room")} - {index + 1}
        </h3>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-4">
        {/* Status + Price */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-semibold">{t("room.status.title")}:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                room.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {room.is_active ? t("common.active") : t("common.inactive")}
            </span>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">
              {t("room.monthlyRent")}
            </p>
            <p className="font-semibold text-sm sm:text-base">
              ${room.price_of_bed_per_month}
            </p>
          </div>
        </div>

        {/* Beds & Room Type */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {t("room.totalBeds")}:
            </span>
            <span className="text-gray-700 text-sm sm:text-base">
              {room.number_of_beds}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {t("room.availableBeds")}:
            </span>
            <span className="text-gray-700 text-sm sm:text-base">
              {room.number_of_available_beds}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">{t("room.roomType")}:</span>
            <span className="text-gray-700 text-sm sm:text-base">
              {ROOM_TYPE_LABELS[room.room_type][language]}
            </span>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {t("common.photos")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {images.map((url, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden h-24 sm:h-28 border border-gray-200 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="text-sm text-gray-600 grid grid-cols-2 sm:grid-cols-2 gap-2">
          {[
            {
              key: "has_ac",
              label: t("room.amenities.ac"),
              icon: <AirVentIcon className="h-4 w-4" />,
            },
            {
              key: "has_internal_bathroom",
              label: t("room.amenities.internalBathroom"),
              icon: <BathIcon className="h-4 w-4" />,
            },
            {
              key: "has_internal_balcony",
              label: t("room.amenities.internalBalcony"),
              icon: <DoorOpenIcon className="h-4 w-4" />,
            },
            {
              key: "has_office",
              label: t("room.amenities.office"),
              icon: <Printer className="h-4 w-4" />,
            },
          ].map(({ key, label, icon }) => (
            <p key={key} className="flex items-center gap-2 text-xs sm:text-sm">
              {icon}
              <span className="font-semibold">{label}:</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] sm:text-xs font-medium ${
                  room[key as keyof Room]
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room[key as keyof Room]
                  ? t("common.included")
                  : t("common.notIncluded")}
              </span>
            </p>
          ))}
        </div>

        {/* WhatsApp Button */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:justify-end">
          <WhatsAppButton
            title={t("booking.completeBooking")}
            message={t("whatsapp.studentBookingWhatsappMessage", {
              roomNumber: room.id,
            })}
          />
        </div>
      </div>
    </div>
  );
}
{
  /*
  
    <div
        data-slot="card"
        className="bg-cards-background flex flex-col gap-6 rounded-xl py-6 flex-shrink-0 w-max snap-start overflow-hidden border border-placeholders hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/20 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bed className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                {" "}
                {t("common.room")} - {index + 1}
              </h3>
              <p className="text-xs text-muted-foreground capitalize">
                {t("room.roomType")}:{" "}
                {ROOM_TYPE_LABELS[room.room_type][language]}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground text-xs px-2 py-0.5 bg-green-500 hover:bg-green-600">
            {room.is_active ? t("common.active") : t("common.inactive")}
          </div>
        </div>
        <div data-slot="card-content" className="p-2">
          <div className="flex">
            <div className="w-[180px] flex-shrink-0 bg-muted/20">
              <div className="h-full">
                <div className="relative h-32 cursor-pointer group overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={mainImage}
                    onError={(e) =>
                      ((e.currentTarget as HTMLImageElement).src =
                        FALLBACK_IMAGE)
                    }
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  <button
                    data-slot="button"
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-secondary-foreground shadow-xs rounded-md gap-1.5 has-[&gt;svg]:px-2.5 absolute top-2 right-2 h-6 px-2 text-xs bg-white/90 hover:bg-white"
                  >
                    <ImagesIcon className="h-3 w-3 me-1" />
                    {room.images.length}
                  </button>
                </div>
                {otherImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1 p-1.5">
                    <div className="relative aspect-square rounded overflow-hidden cursor-pointer group border">
                      {otherImages.map((url, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden h-28 border border-gray-200 shadow-sm"
                        >
                          <img
                            src={url}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              ((e.currentTarget as HTMLImageElement).src =
                                FALLBACK_IMAGE)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex-1 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {t("room.monthlyRent")}
                  </p>
                  <p className="font-semibold">
                    ${room.price_of_bed_per_month}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex flex-col p-1.5 bg-green-50 rounded border border-green-200">
                  <span className="text-xs text-blue-600">
                    {t("room.totalBeds")}:
                  </span>
                  <span className="text-lg font-bold text-blue-700">
                    {room.number_of_beds}
                  </span>
                </div>

                <div className="flex flex-col p-1.5 bg-green-50 rounded border border-green-200">
                  <span className="text-xs text-green-600">
                    {t("room.availableBeds")}:
                  </span>
                  <span className="text-lg font-bold text-green-700">
                    {room.number_of_available_beds}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  {
                    key: "has_ac",
                    label: t("room.amenities.ac"),
                    icon: <AirVentIcon className="h-3 w-3 me-2" />,
                  },
                  {
                    key: "has_internal_bathroom",
                    label: t("room.amenities.internalBathroom"),
                    icon: <BathIcon className="h-3 w-3 me-2" />,
                  },
                  {
                    key: "has_internal_balcony",
                    label: t("room.amenities.internalBalcony"),
                    icon: <DoorOpenIcon className="h-3 w-3 me-2" />,
                  },
                  {
                    key: "has_office",
                    label: t("room.amenities.office"),
                    icon: <Printer className="h-3 w-3 me-2" />,
                  },
                ].map(({ key, label, icon }) =>
                  room[key as keyof Room] ? (
                    <div
                      key={key}
                      className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground text-xs px-2 py-0.5 bg-green-50 border-green-200"
                    >
                      {icon}
                      <span className="font-semibold">{label}</span>
                    </div>
                  ) : null
                )}
              </div>
              <WhatsAppButton message={t("support.whatsappMessage")} />
            </div>
          </div>
        </div>
      </div>
  */
}
