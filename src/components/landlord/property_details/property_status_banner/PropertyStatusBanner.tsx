// src/components/landlord/property_details/PropertyStatusBanner.tsx
"use client";
import { useEditMode } from "@/context/EditModeContext";
import { Property } from "@/types/property/property";

interface PropertyStatusBannerProps {
  property: Pick<Property, "is_active" | "available_rooms_count">;
}

export default function PropertyStatusBanner({
  property,
}: PropertyStatusBannerProps) {
  const { isEditMode } = useEditMode();

  // Property availability is based on rooms available
  const isAvailable =
    property.available_rooms_count && property.available_rooms_count > 0;

  return (
    <>
      {isEditMode && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex justify-between items-center">
          {/* Left: Status Text */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              This property is{" "}
              <strong>{property.is_active ? "active" : "inactive"}</strong> and{" "}
              <strong>{isAvailable ? "available" : "not available"}</strong> for
              booking.
            </span>
          </div>

          {/* Right: Toggle Controls */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer mr-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={property.is_active}
                readOnly
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Active
              </span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!isAvailable}
                readOnly
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Available
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  );
}
