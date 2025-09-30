// File: src/components/landlord/property_details/PropertyHeader.tsx
"use client";

import MapPreview from "../map_preview/MapPreview";
import LocationEditor from "../map_preview/LocationEditor";
import { useState, useEffect } from "react";
import { Property } from "@/types/property/property";
import { CheckCircle2, LocationEdit } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { updateProperty } from "@/utils/landlord/property/updateProperty";
import { deleteProperty } from "@/utils/landlord/property/deleteProperty";
import { useRouter } from "next/navigation";
import {
  PROPERTY_GENDER_PREFERENCE_LABELS,
  PropertyGenderPreference,
  PropertyStatus,
} from "@/lib/enum/property_enums";
import { CITY_LABELS, COUNTRY_LABELS } from "@/lib/enum/location_enums";

interface PropertyHeaderProps {
  property: Property;
}
const FALLBACK_IMAGE = "/default-fallback-image.png"; // Replace with your fallback image path

const UtilityBadge = ({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide
      ${isActive ? "bg-green-300 text-green-800" : "bg-red-200 text-red-800"}`}
  >
    {label}
  </span>
);

export default function StudentPropertyHeader({
  property,
}: PropertyHeaderProps) {
  const [editMode, setEditMode] = useState(false); // local edit mode
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [updatedData, setUpdatedData] = useState<Record<string, any>>({});
  const [genderPreference, setGenderPreference] = useState(
    property.gender_preference
  );
  const [isActive, setIsActive] = useState(
    property.status === PropertyStatus.Active
  );
  const [isAvailable, setIsAvailable] = useState(
    property.available_rooms_count! > 0
  );
  const [utilities, setUtilities] = useState({
    has_water: property.has_water,
    has_gas: property.has_gas,
    has_internet: property.has_internet,
    has_electricity: property.has_electricity,
  });

  const [location, setLocation] = useState({
    lat: parseFloat(property.location_lat),
    lon: parseFloat(property.location_lon),
  });

  const images =
    property.images && property.images.length > 0
      ? property.images.map((img) => img.image_url)
      : [FALLBACK_IMAGE];

  useEffect(() => {
    setTitle(property.title);
    setDescription(property.description);
    setGenderPreference(property.gender_preference);
    setUtilities({
      has_water: property.has_water,
      has_gas: property.has_gas,
      has_internet: property.has_internet,
      has_electricity: property.has_electricity,
    });
    setLocation({
      lat: parseFloat(property.location_lat),
      lon: parseFloat(property.location_lon),
    });
    setIsActive(property.status === PropertyStatus.Active);
    setIsAvailable(property.available_rooms_count! > 0);
  }, [property]);

  // Mapping utilities -> translation keys
  const utilityLabels: Record<string, string> = {
    has_water: t("property.utilities.water"),
    has_gas: t("property.utilities.gas"),
    has_internet: t("property.utilities.internet"),
    has_electricity: t("property.utilities.electricity"),
  };

  const handleUpdate = async () => {
    if (Object.keys(updatedData).length === 0) return; // nothing changed

    try {
      setIsSaving(true);
      setError(null);
      console.log(`updatedData => ${JSON.stringify(updatedData)}`);
      await updateProperty(property.id, updatedData);

      console.log("Property updated successfully");

      // Clear updatedData after successful save
      setUpdatedData({});
      setEditMode(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(property.title);
    setDescription(property.description);
    setGenderPreference(property.gender_preference);
    setUtilities({
      has_water: property.has_water,
      has_gas: property.has_gas,
      has_internet: property.has_internet,
      has_electricity: property.has_electricity,
    });
    setLocation({
      lat: parseFloat(property.location_lat),
      lon: parseFloat(property.location_lon),
    });
    setUpdatedData({});
    setEditMode(false);
  };
  const handleDelete = async () => {
    if (!confirm(t("common.confirmDelete"))) return;

    try {
      setIsSaving(true);
      setError(null);

      await deleteProperty(property.id);

      console.log("Property deleted successfully");
      setUpdatedData({});
      setEditMode(false);
      // redirect or show a notification
      router.replace("/landlord/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      {/* Image Section */}
      <div className="relative h-60 md:h-80 rounded-xl overflow-hidden">
        {/* Main Image */}
        <img
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-full object-fit"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />

        {/* Overlay (Title + Type + Location) */}
        <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-xl p-4 max-w-[70%] md:max-w-[50%]">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-sm md:text-sm font-bold leading-snug text-secondary">
              {title}
            </h1>
            <span className="bg-primary text-white text-sm md:text-md font-semibold px-6 py-1.5 rounded-full shadow-md">
              {property.property_type === "apartment"
                ? t("common.apartment")
                : t("common.studio")}
            </span>
          </div>

          <div className="flex items-center text-sm md:text-md text-hints">
            <LocationEdit className="h-4 w-4 md:h-5 me-2 text-hints" />
            <span className="truncate">
              {CITY_LABELS[property.city][language]},{" "}
              {COUNTRY_LABELS[property.country][language]}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentIndex ? "border-primary" : "border-white/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        FALLBACK_IMAGE;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-secondary mb-2">
            {t("property.description")}:
          </h2>
          <p className="text-labels">{description}</p>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-2">
              {t("property.building")}:
            </h3>
            <div className="space-y-2 text-sm text-labels">
              <p>
                {t("property.buildingName")}: {property.building_name}
              </p>
              <p>
                {t("property.buildingNumber")}: {property.building_number}
              </p>
              <p>
                {t("property.floor")}: {property.floor_number}
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-2">
              {t("property.propertyDetails")}:
            </h3>
            <div className="space-y-2 text-sm text-labels">
              <p>
                {t("property.genderPreference.title")}:{" "}
                {PROPERTY_GENDER_PREFERENCE_LABELS[genderPreference][language]}
              </p>
              <p>
                {t("property.totalRooms")}: {property.rooms_count}
              </p>
              <p>
                {t("property.availableRooms")}: {property.available_rooms_count}
              </p>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-2">
            {t("property.utilities.title")}:
          </h3>
          <div className="flex flex-wrap gap-2">
            <UtilityBadge
              label={t("property.utilities.water")}
              isActive={utilities.has_water}
            />
            <UtilityBadge
              label={t("property.utilities.internet")}
              isActive={utilities.has_internet}
            />
            <UtilityBadge
              label={t("property.utilities.electricity")}
              isActive={utilities.has_electricity}
            />
            <UtilityBadge
              label={t("property.utilities.gas")}
              isActive={utilities.has_gas}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-2">
            {t("property.locationOnMap.title")}:
          </h3>
          <div className="bg-gray-100 rounded-lg h-70 mb-3 flex items-center justify-center">
            <MapPreview lat={location.lat} lon={location.lon} />
          </div>
        </div>
      </div>
    </div>
  );
}
