"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CreatePropertyRequest } from "@/types/property/property";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Dialog } from "@headlessui/react"; // or use another modal lib if needed
import { postProperty } from "@/utils/landlord/createProperty";
import { useAuth } from "@/context/AuthContext";

interface Step2Props {
  propertyData: CreatePropertyRequest;
  setPropertyData: Dispatch<SetStateAction<CreatePropertyRequest>>;
  onNext: () => void;
  onBack: () => void;
}

const GENDER_OPTIONS = [
  { label: "لا تفضيل", value: "none" },
  { label: "ذكور فقط", value: "male" },
  { label: "إناث فقط", value: "female" },
];

const COUNTRY_OPTIONS = [
  { label: "فلسطين", value: "Palestine" },
  { label: "الولايات المتحدة", value: "US" },
  { label: "كندا", value: "CA" },
  { label: "المملكة المتحدة", value: "UK" },
  { label: "أستراليا", value: "AU" },
];
const CITY_OPTIONS = [
  { label: "رام الله", value: "Ramallah" },
  { label: "نابلس", value: "Nablus" },
  { label: "جنين", value: "Jenin" },
];

const DEFAULT_LOCATION = { lat: 31.9522, lng: 35.2332 }; // Ramallah approx.
export default function Step2({
  propertyData,
  setPropertyData,
  onNext,
  onBack,
}: Step2Props) {
  const { userId, isLoading } = useAuth(); // Get user from context
  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

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
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  // Validation (adjust as needed)
  const isValid = () =>
    localData.title.trim() !== "" &&
    localData.city.trim() !== "" &&
    localData.country.trim() !== "" &&
    localData.property_type.trim() !== "";

  // Ensure landlord_id is set once the user is loaded
  useEffect(() => {
    if (!isLoading && userId) {
      setLocalData((prev) => ({
        ...prev,
        landlord_id: userId, // <-- set landlord_id from context
      }));
    }
  }, [isLoading, userId]);
  // Handlers
  const handleNext = async () => {
    setPropertyData((prev) => ({
      ...prev,
      ...localData,
    }));
    onNext();
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
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6" dir="rtl">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        تفاصيل العقار
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم العقار*
            </label>
            <input
              type="text"
              value={localData.title}
              onChange={(e) =>
                setLocalData({ ...localData, title: e.target.value })
              }
              placeholder="مثال: منزل عائلي حديث"
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم المبنى
            </label>
            <input
              type="text"
              value={localData.building_name}
              onChange={(e) =>
                setLocalData({ ...localData, building_name: e.target.value })
              }
              placeholder="مثال: برج النيل"
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم المبنى
            </label>
            <input
              type="text"
              value={localData.building_number}
              onChange={(e) =>
                setLocalData({ ...localData, building_number: e.target.value })
              }
              placeholder="مثال: ١٢٣"
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الطابق
            </label>
            <input
              type="text"
              value={localData.floor_number}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  floor_number: Number(parseInt(e.target.value)),
                })
              }
              placeholder="مثال: ٣"
              min={0}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع الجنس المفضل
            </label>
            <select
              value={localData.gender_preference}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  gender_preference: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {GENDER_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف العقار
            </label>
            <textarea
              value={localData.description}
              onChange={(e) =>
                setLocalData({ ...localData, description: e.target.value })
              }
              placeholder="أدخل وصفًا مختصرًا عن العقار"
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع السكن*
            </label>
            <input
              type="text"
              value={localData.property_type}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-100 cursor-not-allowed"
              placeholder="يتم تحديده في الخطوة الأولى"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المدينة*
            </label>
            <select
              value={localData.city}
              onChange={(e) =>
                setLocalData({ ...localData, city: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">اختر المدينة</option>
              {CITY_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البلد*
            </label>
            <select
              value={localData.country}
              onChange={(e) =>
                setLocalData({ ...localData, country: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">اختر البلد</option>
              {COUNTRY_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عدد الغرف
            </label>
            <input
              type="text"
              value={localData.number_of_rooms}
              onChange={(e) => {
                if (e.target.value)
                  return setLocalData({
                    ...localData,
                    number_of_rooms: Number(parseInt(e.target.value)),
                  });
              }}
              placeholder="مثال: ٣"
              min={0}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              صورة العقار
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Don't convert to base64 here; just store the file directly
                  setLocalData((prev) => ({
                    ...prev,
                    image: file, // store the File directly
                  }));
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {localData.image && localData.image instanceof File && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(localData.image)}
                  alt="معاينة الصورة"
                  className="w-full h-50 rounded shadow"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الخدمات المتوفرة
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "ماء", key: "has_water" },
                { label: "كهرباء", key: "has_electricity" },
                { label: "إنترنت", key: "has_internet" },
                { label: "غاز", key: "has_gas" },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setLocalData((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof prev],
                    }))
                  }
                  className={`amenity-tag rounded-full px-3 py-1.5 text-sm cursor-pointer ${
                    localData[key as keyof typeof localData]
                      ? "bg-secondary text-white hover:bg-orange-300"
                      : "bg-gray-200 text-gray-700 hover:bg-hints hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              موقع العقار على الخريطة*
            </label>

            <div className="relative rounded-md overflow-hidden border border-gray-300">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "250px" }}
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

              <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
                <button
                  onClick={handleUseCurrentLocation}
                  className="bg-white shadow px-3 py-1.5 text-sm rounded hover:bg-gray-100"
                >
                  تحديد موقعي
                </button>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="bg-white shadow px-3 py-1.5 text-sm rounded hover:bg-gray-100"
                >
                  تكبير الخريطة
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              اضغط على الخريطة لاختيار الموقع، أو اسحب العلامة لتعديل الموقع
              بدقة.
            </p>

            <Dialog
              open={isMapModalOpen}
              onClose={() => setIsMapModalOpen(false)}
              className="relative z-50"
            >
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                aria-hidden="true"
              />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl rounded bg-white shadow-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-medium text-gray-800">
                      خريطة موسعة
                    </Dialog.Title>
                    <button
                      onClick={() => setIsMapModalOpen(false)}
                      className="text-2xl text-gray-500"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="rounded-md overflow-hidden border border-gray-300">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "500px" }}
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
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
        <button
          onClick={onBack}
          type="button"
          className="px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
        >
          السابق
        </button>

        <button
          onClick={handleNext}
          type="button"
          disabled={!isValid()}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors duration-200 cursor-pointer
            ${
              isValid()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          التالي
        </button>
      </div>
    </div>
  );
}
