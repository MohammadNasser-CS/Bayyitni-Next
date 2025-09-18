"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CreatePropertyRequest } from "@/types/property/property";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { AMENITIES } from "@/constants/amenities";
import { getPropertySchema } from "@/lib/validation/propertySchema";
import { PropertyGenderPreference } from "@/lib/enum/property_enums";
import {
  CITY_LABELS,
  CityEnum,
  COUNTRY_LABELS,
  CountryEnum,
} from "@/lib/enum/location_enums";

interface Step2Props {
  propertyData: CreatePropertyRequest;
  setPropertyData: Dispatch<SetStateAction<CreatePropertyRequest>>;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_LOCATION = { lat: 31.9522, lng: 35.2332 }; // Ramallah approx.
type ErrorsMap = Record<string, string[]>;

type FileWithPreview = { file: File; url: string };

export default function Step2({
  propertyData,
  setPropertyData,
  onNext,
  onBack,
}: Step2Props) {
  const { user, isLoading } = useAuth();
  const { t, language } = useLanguage();

  // memoize schema so translations update validations when language changes
  const schema = useMemo(() => getPropertySchema(t), [t, language]);

  // local state (initialized from parent prop)
  const [localData, setLocalData] = useState<CreatePropertyRequest>({
    ...propertyData,
    location_lat: propertyData.location_lat || DEFAULT_LOCATION.lat,
    location_lon: propertyData.location_lon || DEFAULT_LOCATION.lng,
    has_water: propertyData.has_water ?? false,
    has_electricity: propertyData.has_electricity ?? false,
    has_internet: propertyData.has_internet ?? false,
    has_gas: propertyData.has_gas ?? false,
  } as CreatePropertyRequest);

  // image files + previews
  const [imagePreviews, setImagePreviews] = useState<FileWithPreview[]>(
    () =>
      (propertyData.property_images || [])
        .filter(Boolean)
        .map((f: any) =>
          f instanceof File ? { file: f, url: URL.createObjectURL(f) } : null
        )
        .filter(Boolean) as FileWithPreview[]
  );

  // errors
  const [errors, setErrors] = useState<ErrorsMap>({});
  const [zoom, setZoom] = useState<number>(15);

  // Google maps loader
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? "",
  });

  // center derived from localData
  const center = useMemo(
    () => ({
      lat: Number(localData.location_lat),
      lng: Number(localData.location_lon),
    }),
    [localData.location_lat, localData.location_lon]
  );

  // refs for debounced sync
  const syncTimer = useRef<number | null>(null);

  // set landlord_id once user loads (only once)
  useEffect(() => {
    if (!isLoading && user?.id && localData.landlord_id !== user.id) {
      setLocalData((prev) => ({ ...prev, landlord_id: user.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user?.id]);

  // cleanup previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce syncing localData to parent to reduce renders
  useEffect(() => {
    if (syncTimer.current) {
      clearTimeout(syncTimer.current);
    }
    // sync after 500ms of idle
    syncTimer.current = window.setTimeout(() => {
      setPropertyData((prev) => ({ ...prev, ...localData }));
      syncTimer.current = null;
    }, 500);

    return () => {
      if (syncTimer.current) {
        clearTimeout(syncTimer.current);
        syncTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localData]);

  // when language changes, re-run validation messages if there are errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validateForm(); // refreshes messages using new translations
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const validateForm = useCallback((): boolean => {
    const result = schema.safeParse(localData);
    if (!result.success) {
      const formatted: ErrorsMap = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".") || "_root";
        formatted[path] = formatted[path] || [];
        formatted[path].push(issue.message);
      });
      setErrors(formatted);
      return false;
    }
    setErrors({});
    return true;
  }, [schema, localData]);

  // Handlers
  const handleFieldChange = useCallback(
    <K extends keyof CreatePropertyRequest>(
      key: K,
      value: CreatePropertyRequest[K]
    ) => {
      setLocalData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleAmenity = useCallback((key: string) => {
    setLocalData((prev: any) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocalData((prev) => ({ ...prev, location_lat: lat, location_lon: lng }));
  }, []);

  const handleMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocalData((prev) => ({ ...prev, location_lat: lat, location_lon: lng }));
  }, []);

  // geolocation
  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert(
        t("errors.geolocation_not_supported") || "المتصفح لا يدعم تحديد الموقع."
      );
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocalData((prev) => ({
          ...prev,
          location_lat: position.coords.latitude,
          location_lon: position.coords.longitude,
        }));
        setZoom(17);
      },
      () => {
        alert(t("errors.geolocation_failed") || "تعذر تحديد موقعك الحالي.");
      }
    );
  }, [t]);

  // images: add (creates preview urls) + remove (revokes)
  const handleAddImages = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles: FileWithPreview[] = Array.from(files).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setImagePreviews((prev) => [...prev, ...newFiles]);
    setLocalData((prev) => ({
      ...prev,
      images: [...(prev.property_images || []), ...Array.from(files)],
    }));
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setImagePreviews((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
    setLocalData((prev) => ({
      ...prev,
      images: (prev.property_images || []).filter((_, i) => i !== index),
    }));
  }, []);

  // Next click: final validation, sync parent and proceed
  const handleNextClick = useCallback(() => {
    if (validateForm()) {
      // ensure parent gets the latest immediately
      setPropertyData((prev) => ({ ...prev, ...localData }));
      onNext();
    } else {
      // focus first error or show top-level alert
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateForm, localData, onNext, setPropertyData]);

  // Map loading guard
  if (!apiKey) {
    return (
      <p className="text-red-500">
        Missing Google Maps API key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).
      </p>
    );
  }
  if (!isLoaded) {
    return <p>جارٍ تحميل الخريطة...</p>;
  }

  return (
    <div className="bg-white text-secondary flex flex-col gap-4 rounded-lg border border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4">
        <div className="leading-none font-semibold text-lg">
          {t("landlord.manageListings.addPropertyPage.detailsCard.header")}
        </div>
        <div className="text-labels text-sm">
          {t("landlord.manageListings.addPropertyPage.detailsCard.description")}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 px-4">
        {/* Building info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.buildingName.title"
              )}
            </label>
            <input
              value={localData.building_name ?? ""}
              onChange={(e) =>
                handleFieldChange("building_name" as any, e.target.value)
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
              value={localData.building_number ?? ""}
              onChange={(e) =>
                handleFieldChange("building_number" as any, e.target.value)
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

        {/* Title + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.propertyTitle.title"
              )}{" "}
              *
            </label>
            <input
              value={localData.title ?? ""}
              onChange={(e) =>
                handleFieldChange("title" as any, e.target.value)
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
              value={localData.description ?? ""}
              onChange={(e) =>
                handleFieldChange("description" as any, e.target.value)
              }
              placeholder={t(
                "landlord.manageListings.addPropertyPage.detailsCard.propertyDescription.placeholder"
              )}
              rows={2}
              className="w-full rounded-md border px-2 py-1 text-sm border-gray-300 placeholder-hints"
            />
            {errors.description &&
              errors.description.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs">
                  {err}
                </p>
              ))}
          </div>
        </div>

        {/* Floor / City / Country / Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.floorNumber.title"
              )}
            </label>
            <input
              type="number"
              value={localData.floor_number ?? ""}
              onChange={(e) =>
                handleFieldChange(
                  "floor_number" as any,
                  e.target.value === "" ? "" : Number(e.target.value)
                )
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
              )}{" "}
              *
            </label>
            <select
              value={localData.city ?? ""}
              onChange={(e) => handleFieldChange("city" as any, e.target.value)}
              className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
            >
              {Object.values(CityEnum).map((city) => (
                <option key={city} value={city}>
                  {CITY_LABELS[city][language]}
                </option>
              ))}
            </select>
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
              )}{" "}
              *
            </label>
            <select
              value={localData.country ?? ""}
              onChange={(e) =>
                handleFieldChange("country" as any, e.target.value)
              }
              className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
            >
              {Object.values(CountryEnum).map((country) => (
                <option key={country} value={country}>
                  {COUNTRY_LABELS[country][language]}
                </option>
              ))}
            </select>
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
              value={0}
              onChange={(e) => handleFieldChange("number_of_rooms" as any, 0)}
              placeholder={t(
                "landlord.manageListings.addPropertyPage.detailsCard.numberOfRooms.placeholder"
              )}
              disabled
              className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints bg-gray-200 cursor-not-allowed"
            />
            {errors.number_of_rooms &&
              errors.number_of_rooms.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs">
                  {err}
                </p>
              ))}
          </div>

          {/* Amenities row spans full width */}
          <div className="col-span-1 md:col-span-4 flex flex-wrap gap-2 mt-1">
            {AMENITIES.map(({ key, i18nKey }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleAmenity(key)}
                className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                  (localData as any)[key]
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {t(i18nKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.title"
              )}
            </label>
            <select
              value={localData.gender_preference ?? ""}
              onChange={(e) =>
                handleFieldChange("gender_preference" as any, e.target.value)
              }
              className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
            >
              <option selected value={PropertyGenderPreference.Any}>
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.placeholder"
                )}
              </option>
              <option value={PropertyGenderPreference.Male}>
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.male"
                )}
              </option>
              <option value={PropertyGenderPreference.Female}>
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

          <div className="space-y-1">
            <label htmlFor="property_type" className="text-sm font-medium">
              {t(
                "landlord.manageListings.addPropertyPage.detailsCard.propertyType.title"
              )}{" "}
              *
            </label>
            <select
              id="property_type"
              name="property_type"
              value={localData.property_type ?? ""}
              onChange={(e) =>
                handleFieldChange("property_type" as any, e.target.value)
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

        {/* Images */}
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
              onChange={(e) => handleAddImages(e.target.files)}
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {imagePreviews.map((p, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="aspect-3/2 flex items-center justify-center bg-gray-50">
                    <img
                      src={p.url}
                      alt={`معاينة ${idx + 1}`}
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.images &&
            errors.images.map((err, idx) => (
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
            )}{" "}
            *
          </label>

          <div className="relative rounded-md overflow-hidden border border-gray-300">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "200px" }}
              center={center}
              zoom={zoom}
              onClick={handleMapClick}
              options={{ disableDefaultUI: false }}
            >
              <Marker
                position={{
                  lat: Number(localData.location_lat),
                  lng: Number(localData.location_lon),
                }}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>

            <div className="absolute top-1 left-1 flex flex-wrap gap-1 z-10">
              <button
                onClick={handleUseCurrentLocation}
                className="bg-white shadow px-2 py-1 text-sm rounded hover:bg-gray-100"
                type="button"
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

      {/* Actions */}
      <div className="flex flex-col items-start w-full space-y-3 px-4">
        <div className="flex gap-2 w-full">
          <button
            onClick={handleNextClick}
            className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 shadow-md bg-indigo-600 hover:bg-indigo-700"
            type="button"
          >
            {t("common.next")}
          </button>
          {Object.keys(errors).length > 0 && (
            <div className="mt-3 w-full bg-red-50 border border-red-400 text-red-700 px-6 py-3 rounded-md animate-fadeIn">
              <p className="font-semibold">
                {t(
                  "landlord.manageListings.addPropertyPage.detailsCard.validation.title"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
