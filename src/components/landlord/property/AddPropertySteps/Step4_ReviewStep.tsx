"use client";

import React, { useState } from "react";
import { CreatePropertyRequest } from "@/types/property/property";
import { CreateBedroomRequest } from "@/types/rooms/rooms";
import { CreateSharedSpaceRequest } from "@/types/rooms/sharedSpaces";
import { postProperty } from "@/utils/landlord/createProperty";
import { createBedroom, createSharedSpace } from "@/utils/landlord/createRoom";

interface ReviewStepProps {
  propertyData: CreatePropertyRequest;
  bedRoomsData: CreateBedroomRequest[];
  sharedSpacesData: CreateSharedSpaceRequest[];
  onBack: (step?: number) => void; // allow returning to previous steps
}

export default function Step4({
  propertyData,
  bedRoomsData,
  sharedSpacesData,
  onBack,
}: ReviewStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Final submission process */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Post the property first
      const createdProperty = await postProperty(propertyData);
      const propertyId = createdProperty.id;
      console.log(`propertyId => propertyId`);

      // 2. Prepare bedrooms & shared spaces with propertyId
      const bedroomsWithId = bedRoomsData.map((b) => ({
        ...b,
        property_listing_id: propertyId,
      }));

      const sharedSpacesWithId = sharedSpacesData.map((s) => ({
        ...s,
        property_id: propertyId,
      }));

      // 2. Post bedrooms with attached propertyId
      // 3. Create Bedrooms
      await Promise.all(
        bedroomsWithId.map(async (bedroom) => {
          const form = new FormData();
          for (const [key, value] of Object.entries(bedroom)) {
            if (key === "images" && Array.isArray(value)) {
              value.forEach((file) => form.append("images", file));
            } else {
              form.append(key, value as any);
            }
          }
          await createBedroom(form);
        })
      );

      //   for (const bedroom of bedRoomsData) {
      //     const form = new FormData();
      //     Object.entries(bedroom).forEach(([key, value]) => {
      //       if (key === "images" && Array.isArray(value)) {
      //         value.forEach((file) => form.append("images", file));
      //       } else if (key === "property_listing_id") {
      //         form.append("property_listing_id", String(propertyId));
      //       } else if (value !== undefined) {
      //         form.append(key, String(value));
      //       }
      //     });
      //     await createBedroom(form);
      //   }

      // 3. Post shared spaces with attached propertyId
      await Promise.all(
        sharedSpacesWithId.map(async (space) => {
          const form = new FormData();
          for (const [key, value] of Object.entries(space)) {
            if (key === "images" && Array.isArray(value)) {
              value.forEach((file) => form.append("images", file));
            } else {
              form.append(key, value as any);
            }
          }
          await createSharedSpace(form);
        })
      );
      //   for (const space of sharedSpacesData) {
      //     const form = new FormData();
      //     Object.entries(space).forEach(([key, value]) => {
      //       if (key === "images" && Array.isArray(value)) {
      //         value.forEach((file) => form.append("images", file));
      //       } else if (key === "property_id") {
      //         form.append("property_id", String(propertyId));
      //       } else if (value !== undefined) {
      //         form.append(key, String(value));
      //       }
      //     });
      //     await createSharedSpace(form);
      //   }

      alert("Property and rooms created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to submit property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Review Property Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PROPERTY DETAILS */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Property Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <InfoRow label="Title" value={propertyData.title} />
            <InfoRow label="Property Type" value={propertyData.property_type} />
            <InfoRow
              label="Address"
              value={`${propertyData.building_number} ${propertyData.building_name}, ${propertyData.city}, ${propertyData.country}`}
            />
            <InfoRow label="Floor Number" value={propertyData.floor_number} />
            <InfoRow
              label="Number of Rooms"
              value={propertyData.number_of_rooms}
            />
            <InfoRow
              label="Gender Preference"
              value={propertyData.gender_preference}
            />
            <InfoRow label="Description" value={propertyData.description} />
            <InfoRow
              label="Utilities"
              value={[
                propertyData.has_gas && "Gas",
                propertyData.has_electricity && "Electricity",
                propertyData.has_water && "Water",
                propertyData.has_internet && "Internet",
              ]
                .filter(Boolean)
                .join(", ")}
            />
          </div>

          {propertyData.property_image && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Property Image</h3>
              <img
                src={
                  typeof propertyData.property_image === "string"
                    ? propertyData.property_image
                    : URL.createObjectURL(propertyData.property_image)
                }
                alt="Property Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </section>

        {/* ROOMS & SHARED SPACES */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Bedrooms</h3>
          <div className="space-y-3 bg-gray-50 rounded-lg p-4 max-h-72 overflow-y-auto">
            {bedRoomsData.map((room, i) => (
              <div key={i} className="border-b pb-3">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">
                    Bedroom {i + 1} ({room.room_type})
                  </span>
                  <span className="text-indigo-600 font-medium">
                    ${room.price_of_bed_per_month || 0}/month
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {room.description || "No description provided"}
                </p>
                <p className="text-xs text-gray-400">
                  {[
                    room.has_internal_bathroom && "Internal Bathroom",
                    room.has_internal_balcony && "Balcony",
                    room.has_ac && "AC",
                    room.has_office && "Office",
                  ]
                    .filter(Boolean)
                    .join(", ") || "No special features"}
                </p>
                {room.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {room.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`Bedroom ${i + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">Shared Spaces</h3>
          <div className="space-y-3 bg-gray-50 rounded-lg p-4 max-h-72 overflow-y-auto">
            {sharedSpacesData.map((space, i) => (
              <div key={i} className="border-b pb-3">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{space.room_type}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {space.description || "No description provided"}
                </p>
                {space.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {space.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`Shared Space ${i + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => onBack()}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Publishing..." : "Publish Property"}
        </button>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between">
    <span className="text-sm text-gray-500">{label}:</span>
    <span className="text-sm font-medium">
      {value !== undefined && value !== "" ? value : "Not provided"}
    </span>
  </div>
);
