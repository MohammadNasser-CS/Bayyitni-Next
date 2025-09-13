import { useLanguage } from "@/context/LanguageContext";
import { Room } from "@/types/rooms/rooms";
import {
  AirVentIcon,
  BathIcon,
  Bed,
  DoorOpenIcon,
  LucideLogOut,
  Printer,
} from "lucide-react";
const FALLBACK_IMAGE = "/default-fallback-image.png"; // Replace with your fallback image path
export default function BedRoomCard({
  room,
  index,
}: {
  room: Room;
  index: number;
}) {
  const { t } = useLanguage();
  const images =
    room.images && room.images.length > 0
      ? room.images.map((img) => img.image_url)
      : [FALLBACK_IMAGE];
  return (
    <>
      <div className="bedroom-card border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            {t("common.room")} - {index + 1}
          </h3>
          <div className="flex space-x-2">
            <button className="text-indigo-600 hover:text-indigo-800">
              {t("common.edit")}
            </button>
            <button className="text-red-600 hover:text-red-800">
              {t("common.delete")}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {t("room.status.title")}
              </p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  room.is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {room.is_available
                  ? t("room.status.available")
                  : t("room.status.occupied")}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {t("room.monthlyRent")}
              </p>
              <p className="font-semibold">${room.price_of_bed_per_month}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">{t("common.photos")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {images.map((url, index) => (
                <div
                  key={index}
                  className="photo-preview relative rounded-lg overflow-hidden h-20"
                >
                  <img
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        FALLBACK_IMAGE;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-2">
            {/* Beds Info */}
            <p className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span className="font-semibold">{t("room.bedrooms")}:</span>{" "}
              {room.number_of_beds} {t("common.total")},{" "}
              {room.number_of_available_beds} {t("common.available")}
            </p>

            {/* AC */}
            <p className="flex items-center gap-2">
              <AirVentIcon className="h-4 w-4" />
              <span className="font-semibold">{t("room.amenities.ac")}:</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_ac
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_ac ? t("common.included") : t("common.notIncluded")}
              </span>
            </p>

            {/* Bathroom */}
            <p className="flex items-center gap-2">
              <BathIcon className="h-4 w-4" />
              <span className="font-semibold">
                {t("room.amenities.internalBathroom")}:
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_internal_bathroom
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_internal_bathroom
                  ? t("common.included")
                  : t("common.notIncluded")}
              </span>
            </p>

            {/* Balcony */}
            <p className="flex items-center gap-2">
              <DoorOpenIcon className="h-4 w-4" />

              <span className="font-semibold">
                {t("room.amenities.internalBalcony")}:
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_internal_balcony
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_internal_balcony
                  ? t("common.included")
                  : t("common.notIncluded")}
              </span>
            </p>

            {/* Office */}
            <p className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span className="font-semibold">
                {t("room.amenities.office")}:
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_office
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_office
                  ? t("common.included")
                  : t("common.notIncluded")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
