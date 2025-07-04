// File: src/components/landlord/property_details/PropertyHeader.tsx
"use client";

import React from "react";
import MapPreview from "../map_preview/MapPreview";
import { Property } from "@/types/property";

interface PropertyHeaderProps {
  title: string;
  type: string;
  location: string;
  image: string;
  description: string;
  buildingName: string;
  buildingNumber: string;
  floorNumber: number;
  genderPreference: string;
  totalRooms: number;
  availableRooms: number;
  hasGas: boolean;
  hasElectricity: boolean;
  hasWater: boolean;
  hasInternet: boolean;
  lat: string;
  lon: string;
}

const UtilityBadge = ({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide
        ${
          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
    >
      {label}
    </span>
  );
};

export default function PropertyHeader({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      {/* Image Section */}
      <div className="relative h-80">
        <img
          src={property.property_image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {property.property_type}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C3E50"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="lucide lucide-map-icon lucide-map w-5 h-5 mr-2"
              >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                <path d="M15 5.764v15" />
                <path d="M9 3.236v15" />
              </svg>
              <span>
                {property.city}, {property.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Property Description
          </h2>
          <p className="text-gray-600">{property.description}</p>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              BUILDING DETAILS
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-building2-icon lucide-building-2 w-4 h-4 mr-2"
                >
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>{" "}
                Building Name: {property.building_name}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-landmark-icon lucide-landmark w-4 h-4 mr-2"
                >
                  <path d="M10 18v-7" />
                  <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
                  <path d="M14 18v-7" />
                  <path d="M18 18v-7" />
                  <path d="M3 22h18" />
                  <path d="M6 18v-7" />
                </svg>{" "}
                Building Number: {property.building_number}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-ruler-icon lucide-ruler w-4 h-4 mr-2"
                >
                  <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
                  <path d="m14.5 12.5 2-2" />
                  <path d="m11.5 9.5 2-2" />
                  <path d="m8.5 6.5 2-2" />
                  <path d="m17.5 15.5 2-2" />
                </svg>{" "}
                Floor: {property.floor_number}
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              PROPERTY DETAILS
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-users-icon lucide-users w-4 h-4 mr-2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                </svg>{" "}
                Gender Preference: {property.gender_preference}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-house-icon lucide-house w-4 h-4 mr-2"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>{" "}
                Total Rooms: {property.number_of_rooms}
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C3E50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="lucide lucide-circle-check-icon lucide-circle-check w-4 h-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>{" "}
                Available Rooms: {property.number_of_rooms + 1}
              </p>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            INCLUDED UTILITIES
          </h3>
          <div className="flex flex-wrap gap-2">
            <UtilityBadge label="Water" isActive={property.has_water} />
            <UtilityBadge label="WiFi" isActive={property.has_internet} />
            <UtilityBadge
              label="Electricity"
              isActive={property.has_electricity}
            />
            <UtilityBadge label="Gas" isActive={property.has_gas} />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">LOCATION</h3>
          <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
            <MapPreview
              lat={`${property.location_lat}`}
              lon={`${property.location_lon}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded p-2">
              <label className="text-xs font-medium text-gray-500">
                Latitude
              </label>
              <p className="text-sm text-gray-700">{property.location_lat}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <label className="text-xs font-medium text-gray-500">
                Longitude
              </label>
              <p className="text-sm text-gray-700">{property.location_lon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
