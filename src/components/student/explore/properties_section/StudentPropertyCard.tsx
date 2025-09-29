// components/PropertyCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Property } from "@/types/property/property";
import {
  PROPERTY_GENDER_PREFERENCE_LABELS,
  PROPERTY_TYPE_LABELS,
  PropertyStatus,
} from "@/lib/enum/property_enums";
import { CITY_LABELS, COUNTRY_LABELS } from "@/lib/enum/location_enums";
import {
  Bookmark,
  FuelIcon,
  GlassWaterIcon,
  LucideLightbulb,
  Wifi,
} from "lucide-react";

const FALLBACK_IMAGE = "/default-fallback-image.png";

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
    property.images?.length > 0
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

  const utilities = [
    {
      icon: <FuelIcon className="h-3.5 w-3.5 me-1 text-red-600" />,
      active: property.has_gas,
      label: t("property.utilities.gas"),
    },
    {
      icon: <GlassWaterIcon className="h-3.5 w-3.5 me-1 text-blue-600" />,
      active: property.has_water,
      label: t("property.utilities.water"),
    },
    {
      icon: <LucideLightbulb className="h-3.5 w-3.5 me-1 text-yellow-500" />,
      active: property.has_electricity,
      label: t("property.utilities.electricity"),
    },
    {
      icon: <Wifi className="h-3.5 w-3.5 me-1 text-green-600" />,
      active: property.has_internet,
      label: t("property.utilities.internet"),
    },
  ];

  return (
    <Link href={`/student/property-details/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col h-full min-h-[420px]">
        {/* Image Section */}
        <div className="relative h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={property.title || t("property.noTitle")}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
          />
          {/* Status / Verified Badge */}
          <span className="absolute top-2 left-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white">
            {PROPERTY_TYPE_LABELS[property.property_type][language]}
          </span>
          {/* Favorite button placeholder */}
          <button
            data-slot="button"
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 text-gray-600 flex items-center justify-center hover:bg-white transition opacity-70"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Card Content */}
        <div data-slot="card-content" className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h3 className="font-bold text-md line-clamp-2">
            {property.title || t("property.noTitle")}
          </h3>

          {/* Description */}
          {property.description ? (
            <div className="border-b border-gray-200">
              <p className="text-xs text-hints line-clamp-2 mb-1">
                {t("common.description")}
                {": "}
                {property.description}
              </p>
            </div>
          ) : null}

          {/* Location */}
          <div className="text-sm">
            📍 {t("common.location")}
            {": "}
            <span>
              {CITY_LABELS[property.city][language]},{" "}
              {COUNTRY_LABELS[property.country][language]}
            </span>
          </div>
          <div className="text-xs px-2">
            <p>
              <strong>{t("property.gender")}:</strong>{" "}
              {
                PROPERTY_GENDER_PREFERENCE_LABELS[property.gender_preference][
                  language
                ]
              }
            </p>
          </div>

          {/* Grid Info */}
          {/* <div className="grid grid-cols-2 gap-2 border-b px-1 py-1 text-xs">
            <p>
              <strong>{t("property.building")}:</strong>{" "}
              {property.building_name} - {property.building_number}
            </p>
            <p>
              <strong>{t("property.floor")}:</strong> {property.floor_number}
            </p>
            <p>
              <strong>{t("property.gender")}:</strong>{" "}
              {
                PROPERTY_GENDER_PREFERENCE_LABELS[property.gender_preference][
                  language
                ]
              }
            </p>
          </div> */}
          {/* Utilities */}
          <div className="flex items-center gap-2 flex-wrap border-t border-gray-200 py-2 px-1">
            {utilities.some((util) => util.active) ? (
              utilities.map(
                (util) =>
                  util.active && (
                    <span
                      key={util.label}
                      title={util.label}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs"
                    >
                      {util.icon} {util.label}
                    </span>
                  )
              )
            ) : (
              <span className="text-xs text-gray-500 italic">
                {t("common.no_utilities")}
              </span>
            )}
          </div>

          {/* Price & Rooms */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">
                {t("property.priceRange")} {": "}
              </span>
              <span className="text-md font-bold text-primary">
                {property.min_room_price && property.max_room_price
                  ? `${property.min_room_price} - ${property.max_room_price}`
                  : property.average_room_price
                  ? `${property.average_room_price}`
                  : t("property.noPrice")}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {property.rooms_count} {t("property.rooms")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
