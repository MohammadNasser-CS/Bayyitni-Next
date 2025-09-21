// components/PropertyCard.tsx

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Property } from "@/types/property/property";
import Link from "next/link";
import {
  PROPERTY_GENDER_PREFERENCE_LABELS,
  PROPERTY_TYPE_LABELS,
  PropertyStatus,
} from "@/lib/enum/property_enums";
import { CITY_LABELS, COUNTRY_LABELS } from "@/lib/enum/location_enums";

const FALLBACK_IMAGE = "/default-fallback-image.png"; // Replace with your fallback image path

export default function PropertyCard({
  property,
  userName,
}: {
  property: Property;
  userName: string;
}) {
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    property.images && property.images.length > 0
      ? property.images.map((img) => img.image_url)
      : [FALLBACK_IMAGE];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link
      href={`/landlord/manage-listings/property-details/${property.id}`}
      className="block"
    >
      <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col h-full min-h-[420px]">
        {/* Image Section */}
        <div className="relative h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={property.title || t("property.noTitle")}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />

          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded ${
              property.status
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property.status == PropertyStatus.Pending
              ? t("common.pending")
              : property.status == PropertyStatus.Active
              ? t("common.active")
              : t("common.inactive")}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-2 text-sm text-gray-700">
          {/* Top Info */}
          <div className="space-y-1">
            <h3 className="text-md font-bold text-indigo-700 line-clamp-1">
              {property.title || t("property.noTitle")}
            </h3>
            <p className="text-xs text-gray-500">
              {CITY_LABELS[property.city][language]},{" "}
              {COUNTRY_LABELS[property.country][language]} •{" "}
              {PROPERTY_TYPE_LABELS[property.property_type][language]}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p>
              <strong>{t("property.building")}:</strong>{" "}
              {property.building_name} - {property.building_number}
            </p>
            <p>
              <strong>{t("property.floor")}:</strong> {property.floor_number}
            </p>
            <p>
              <strong>{t("property.rooms")}:</strong> {property.rooms_count}
            </p>
            <p>
              <strong>{t("property.gender")}:</strong>{" "}
              {
                PROPERTY_GENDER_PREFERENCE_LABELS[property.gender_preference][
                  language
                ]
              }
            </p>
          </div>

          {/* Utilities */}
          <div className="flex flex-wrap gap-1 text-xs">
            {[
              { label: t("property.utilities.gas"), active: property.has_gas },
              {
                label: t("property.utilities.water"),
                active: property.has_water,
              },
              {
                label: t("property.utilities.electricity"),
                active: property.has_electricity,
              },
              {
                label: t("property.utilities.internet"),
                active: property.has_internet,
              },
            ].map((util) => (
              <span
                key={util.label}
                className={`px-2 py-0.5 rounded-full ${
                  util.active
                    ? "bg-green-300 text-green-800"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {util.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="text-xs text-gray-600 line-clamp-2">
            {property.description || t("property.noDescription")}
          </div>
          {/* Bottom Info */}
          <div className="mt-auto text-[11px] text-gray-400">
            <p>
              <strong>{t("property.landlord")}:</strong> {userName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
