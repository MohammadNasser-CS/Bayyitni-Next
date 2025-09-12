"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { CreatePropertyRequest } from "@/types/property/property";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { AMENITIES } from "@/constants/amenities";
import { getPropertySchema } from "@/lib/validation/propertySchema";

interface Step2Props {
  propertyData: CreatePropertyRequest;
  setPropertyData: Dispatch<SetStateAction<CreatePropertyRequest>>;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_LOCATION = { lat: 31.9522, lng: 35.2332 }; // Ramallah approx.
export default function Step2({
  propertyData,
  setPropertyData,
  onNext,
  onBack,
}: Step2Props) {
  const { user, isLoading } = useAuth(); // Get user from context
  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const { t, language } = useLanguage();
  // 👇 instead of creating schema only once, memoize it based on `t` or `language`
  const schema = useMemo(() => getPropertySchema(t), [t, language]);
  // Local state synced with propertyData, with defaults
  const [localData, setLocalData] = useState({
    ...propertyData,
    location_lat: propertyData.location_lat || DEFAULT_LOCATION.lat,
    location_lon: propertyData.location_lon || DEFAULT_LOCATION.lng,
    has_water: propertyData.has_water ?? false,
    has_electricity: propertyData.has_electricity ?? false,
    has_internet: propertyData.has_internet ?? false,
    has_gas: propertyData.has_gas ?? false,
  });
  const [zoom, setZoom] = useState(15);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  // Validation (comprehensive)
  const validateForm = (): boolean => {
    const result = schema.safeParse(localData);

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join("."); // support nested paths
        if (!formattedErrors[path]) formattedErrors[path] = [];
        formattedErrors[path].push(err.message);
      });
      setErrors(formattedErrors);
      console.log(formattedErrors);

      return false;
    }

    setErrors({});
    return true;
  };

  // Ensure landlord_id is set once the user is loaded
  useEffect(() => {
    if (!isLoading && user?.id) {
      setLocalData((prev) => ({
        ...prev,
        landlord_id: user?.id, // <-- set landlord_id from context
      }));
    }
  }, [isLoading, user?.id]);

  // Reset form when language changes
  useEffect(() => {
    // Only re-run validation with updated translations
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [language]);

  // Handler for Next button
  const handleNextClick = () => {
    if (validateForm()) {
      onNext(); // Proceed to next step
    } else {
      console.log("Form invalid", errors);
    }
  };

  // Map container style
  const mapContainerStyle = { width: "100%", height: "250px" };

  // On map click update lat/lon
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLocalData((prev) => ({
        ...prev,
        location_lat: e.latLng!.lat(),
        location_lon: e.latLng!.lng(),
      }));
    }
  };

  if (!isLoaded) return <p>جارٍ تحميل الخريطة...</p>;
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalData((prev) => ({
            ...prev,
            location_lat: position.coords.latitude,
            location_lon: position.coords.longitude,
          }));
          setZoom(17); // closer zoom when using current location
        },
        () => alert("تعذر تحديد موقعك الحالي.")
      );
    } else {
      alert("المتصفح لا يدعم تحديد الموقع الجغرافي.");
    }
  };
  return (
    <>
      <div
        data-slot="card"
        className="bg-white text-secondary flex flex-col gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        {/* Header */}
        <div
          data-slot="card-header"
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4"
        >
          <div
            data-slot="card-title"
            className="leading-none font-semibold text-lg"
          >
            {t("landlord.manageListings.addPropertyPage.detailsCard.header")}
          </div>
          <div data-slot="card-description" className="text-labels text-sm">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.description"
            )}
          </div>
        </div>

        {/* Content */}
        <div data-slot="card-content" className="space-y-3 px-4">
          {/* Building Info + Listing Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.buildingName.title"
                )}
              </label>
              <input
                value={localData.building_name}
                onChange={(e) =>
                  setLocalData({ ...localData, building_name: e.target.value })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.buildingName.placeholder"
                )}
                className="h-8 w-full rounded-md border border-gray-300 px-2 text-sm placeholder-hints"
              />
              {errors.building_name &&
                errors.building_name.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.buildingNumber.title"
                )}
              </label>
              <input
                value={localData.building_number}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    building_number: e.target.value,
                  })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.buildingNumber.placeholder"
                )}
                className="h-8 w-full rounded-md border border-gray-300 px-2 text-sm placeholder-hints"
              />
              {errors.building_number &&
                errors.building_number.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyTitle.title"
                )}
                *
              </label>
              <input
                value={localData.title}
                onChange={(e) =>
                  setLocalData({ ...localData, title: e.target.value })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyTitle.placeholder"
                )}
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              />
              {errors.title &&
                errors.title.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyDescription.title"
                )}
              </label>
              <textarea
                value={localData.description}
                onChange={(e) =>
                  setLocalData({ ...localData, description: e.target.value })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyDescription.placeholder"
                )}
                rows={2}
                className="w-full rounded-md border px-2 py-1 text-sm border-gray-300 placeholder-hints"
              />
              {errors.title &&
                errors.title.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>
          </div>

          {/* Floor, City, Country, Rooms + Amenities inline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.floorNumber.title"
                )}
              </label>
              <input
                type="number"
                value={localData.floor_number}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    floor_number: Number(e.target.value),
                  })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.floorNumber.placeholder"
                )}
                min={-3}
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              />
              {errors.floor_number &&
                errors.floor_number.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.city.title"
                )}
                *
              </label>
              <input
                value={localData.city}
                onChange={(e) =>
                  setLocalData({ ...localData, city: e.target.value })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.city.placeholder"
                )}
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              />
              {errors.city &&
                errors.city.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.country.title"
                )}
                *
              </label>
              <input
                value={localData.country}
                onChange={(e) =>
                  setLocalData({ ...localData, country: e.target.value })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.country.placeholder"
                )}
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              />
              {errors.country &&
                errors.country.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.numberOfRooms.title"
                )}
              </label>
              <input
                type="number"
                value={localData.number_of_rooms}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    number_of_rooms: Number(e.target.value),
                  })
                }
                placeholder={t(
                  "landlord.manageListings.addPropertyPage.detailsCard.numberOfRooms.placeholder"
                )}
                min={0}
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              />
              {errors.number_of_rooms &&
                errors.number_of_rooms.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>

            {/* Amenities (inline, wrap if needed) */}
            <div className="col-span-1 md:col-span-4 flex flex-wrap gap-2 mt-1">
              {AMENITIES.map(({ key, i18nKey }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setLocalData((prev: any) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof prev],
                    }))
                  }
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                    localData[key as keyof typeof localData]
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {t(i18nKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Dropdowns */}
          {/* Gender Preference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.title"
                )}
              </label>
              <select
                value={localData.gender_preference}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    gender_preference: e.target.value,
                  })
                }
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
              >
                <option value="">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.placeholder"
                  )}
                </option>
                <option value="male">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.male"
                  )}
                </option>
                <option value="female">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.female"
                  )}
                </option>
              </select>
              {errors.gender_preference &&
                errors.gender_preference.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>
            {/* Property Type */}
            <div className="space-y-1">
              <label htmlFor="property_type" className="text-sm font-medium">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyType.title"
                )}
                *
              </label>
              <select
                id="property_type"
                name="property_type"
                value={localData.property_type}
                onChange={(e) =>
                  setLocalData({ ...localData, property_type: e.target.value })
                }
                className="h-8 w-full rounded-md border px-2 text-sm border-gray-300"
              >
                <option value="">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.propertyType.placeholder"
                  )}
                </option>
                <option value="apartment">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.propertyType.apartment"
                  )}
                </option>
                <option value="studio">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.propertyType.studio"
                  )}
                </option>
                <option value="house">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.propertyType.house"
                  )}
                </option>
                <option value="other">
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.propertyType.other"
                  )}
                </option>
              </select>
              {errors.property_type &&
                errors.property_type.map((err, idx) => (
                  <p key={idx} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
            </div>
          </div>

          {/* Property Images Gallery */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.propertyImages.title"
              )}
            </label>
            <label
              htmlFor="propertyImages"
              className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 text-sm text-gray-500"
            >
              <span>
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.propertyImages.placeholder"
                )}
              </span>
              <input
                id="propertyImages"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setLocalData((prev) => ({
                      ...prev,
                      property_images: [
                        ...(prev.property_images || []),
                        ...Array.from(files),
                      ],
                    }));
                  }
                }}
              />
            </label>

            {localData.property_images &&
              localData.property_images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                  {localData.property_images.map((img: File, idx: number) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                    >
                      {/* Image container with fixed aspect ratio */}
                      <div className="aspect-3/2 flex items-center justify-center bg-gray-50">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`معاينة ${idx + 1}`}
                          className="max-h-full max-w-full object-cover"
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setLocalData((prev) => ({
                              ...prev,
                              property_images: prev.property_images!.filter(
                                (_, i) => i !== idx
                              ),
                            }));
                          }}
                          className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow hover:bg-red-700"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {errors.property_images &&
              errors.property_images.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs">
                  {err}
                </p>
              ))}
          </div>

          {/* Google Map */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.title"
              )}
              {" *"}
            </label>
            <div className="relative rounded-md overflow-hidden border border-gray-300">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "200px" }}
                center={{
                  lat: localData.location_lat,
                  lng: localData.location_lon,
                }}
                zoom={zoom}
                onClick={handleMapClick}
                options={{ disableDefaultUI: false }}
              >
                <Marker
                  position={{
                    lat: localData.location_lat,
                    lng: localData.location_lon,
                  }}
                  draggable
                  onDragEnd={(e) => {
                    if (e.latLng) {
                      setLocalData((prev) => ({
                        ...prev,
                        location_lat: e.latLng!.lat(),
                        location_lon: e.latLng!.lng(),
                      }));
                    }
                  }}
                />
              </GoogleMap>
              <div className="absolute top-1 left-1 flex flex-wrap gap-1 z-10">
                <button
                  onClick={handleUseCurrentLocation}
                  className="bg-white shadow px-2 py-1 text-sm rounded hover:bg-gray-100"
                >
                  {t(
                    "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.myLocation"
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.hint"
              )}
            </p>
            {errors.location_lat &&
              errors.location_lat.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs">
                  {err}
                </p>
              ))}
            {errors.location_lon &&
              errors.location_lon.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs">
                  {err}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start w-full space-y-3 px-4">
          <button
            onClick={handleNextClick}
            className={`
      px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 shadow-md
      ${
        Object.keys(errors).length > 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
    `}
            disabled={Object.keys(errors).length > 0} // disables if errors exist
          >
            {t("common.next")}
          </button>

          {/* Error alert box */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-3 w-full bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-md animate-fadeIn">
              <p className="font-semibold">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.validation.title"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
