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

export default function PropertyHeader({ property }: PropertyHeaderProps) {
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
    property.property_images && property.property_images.length > 0
      ? property.property_images.map((img) => img.image_url)
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
      <div className="relative h-80 overflow-hidden rounded-xl">
        {/* Image Carousel */}
        <img
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="flex justify-between items-center mb-2">
              {editMode ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setUpdatedData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  className="text-3xl font-bold bg-transparent border-b border-white focus:outline-none w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold">{title}</h1>
              )}

              <span className="bg-primary text-white text-sm text-center font-semibold px-3 py-1 rounded-full">
                {property.property_type === "apartment"
                  ? t("common.apartment")
                  : t("common.studio")}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <LocationEdit className="h-5 w-5 me-2" />
              <span>
                {CITY_LABELS[property.city][language]},{" "}
                {COUNTRY_LABELS[property.country][language]} •{" "}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
      {editMode && (
        <div className="bg-green-100 border-l-4 border-t-4 border-green-400 text-secondary p-4 m-2 rounded-lg shadow-sm flex justify-between items-center transition-all duration-300">
          {/* Left: Status Text */}
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 me-2 text-primary" />
            <span className="text-secondary text-md">
              This property is{" "}
              <strong className={isActive ? "text-primary" : "text-red-500"}>
                {isActive ? "active" : "inactive"}
              </strong>{" "}
              and{" "}
              <strong className={isAvailable ? "text-primary" : "text-red-500"}>
                {isAvailable ? "available" : "not available"}
              </strong>{" "}
              for booking.
            </span>
          </div>

          {/* Right: Toggle Controls */}
          <div className="flex items-center gap-6">
            {/* Active toggle */}
            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => {
                  setIsActive(e.target.checked);
                  setUpdatedData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }));
                }}
                className="h-5 w-5 rounded-md cursor-pointer"
              />
              <label
                htmlFor="isActive"
                className={`text-md cursor-pointer ${
                  isActive ? "text-primary font-bold" : "text-secondary"
                }`}
              >
                Active
              </label>
            </div>

            {/* Available toggle */}
            <div className="flex items-center gap-2">
              <input
                id="isAvailable"
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => {
                  setIsAvailable(e.target.checked);
                  setUpdatedData((prev) => ({
                    ...prev,
                    available_rooms_count: e.target.checked
                      ? property.rooms_count
                      : 0,
                  }));
                }}
                className="h-5 w-5 rounded-md cursor-pointer"
              />
              <label
                htmlFor="isAvailable"
                className={`text-md cursor-pointer ${
                  isAvailable ? "text-primary font-bold" : "text-secondary"
                }`}
              >
                Available
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Details Section */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-secondary mb-2">
            {t("property.description")}:
          </h2>
          {editMode ? (
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setUpdatedData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              className="w-full border border-gray-300 rounded p-2"
              rows={3}
            />
          ) : (
            <p className="text-labels">{description}</p>
          )}
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
                {editMode ? (
                  <select
                    value={genderPreference}
                    onChange={(e) => {
                      const value = e.target.value as PropertyGenderPreference; // cast to enum
                      setGenderPreference(value);
                      setUpdatedData((prev) => ({
                        ...prev,
                        gender_preference: value,
                      }));
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value={PropertyGenderPreference.Any}>
                      {t("property.genderPreference.any")}
                    </option>
                    <option value={PropertyGenderPreference.Male}>
                      {t("property.genderPreference.male")}
                    </option>
                    <option value={PropertyGenderPreference.Female}>
                      {t("property.genderPreference.female")}
                    </option>
                  </select>
                ) : (
                  <>
                    {t("property.genderPreference.title")}: {genderPreference}
                  </>
                )}
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
            {editMode ? (
              Object.entries(utilities).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => {
                      setUtilities((prev) => {
                        const updated = {
                          ...prev,
                          [key]: !prev[key as keyof typeof prev],
                        };
                        setUpdatedData((prevData) => ({
                          ...prevData,
                          [key]: updated[key as keyof typeof updated],
                        }));
                        return updated;
                      });
                    }}
                  />
                  {utilityLabels[key]}
                </label>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-2">
            {t("property.locationOnMap.title")}:
          </h3>
          {editMode ? (
            <LocationEditor
              lat={location.lat}
              lon={location.lon}
              onChange={(lat, lon) => {
                setLocation({ lat, lon });
                setUpdatedData((prev) => ({
                  ...prev,
                  location_lat: lat,
                  location_lon: lon,
                }));
              }}
            />
          ) : (
            <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
              <MapPreview lat={location.lat} lon={location.lon} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded p-2">
              <label className="text-xs font-medium text-secondary">
                {t("property.locationOnMap.latitude")}:
              </label>
              <p className="text-sm text-gray-700">{location.lat}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <label className="text-xs font-medium text-secondary">
                {t("property.locationOnMap.longitude")}:
              </label>
              <p className="text-sm text-gray-700">{location.lon}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-labels cursor-pointer"
            >
              {t("common.edit")}
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
              >
                {t("common.cancel")}
              </button>

              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-labels disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? t("common.saving") : t("common.saveChanges")}
              </button>
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {t("common.delete")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
