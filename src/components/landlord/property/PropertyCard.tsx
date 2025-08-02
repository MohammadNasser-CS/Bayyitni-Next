// components/PropertyCard.tsx

import { Property } from "@/types/property/property";
import Link from "next/link";

export default function PropertyCard({
  property,
  userName,
}: {
  property: Property;
  userName: string;
}) {
  return (
    <Link href={`/landlord/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col h-full min-h-[420px]">
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={property.property_image || "/fallback.jpg"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded ${
              property.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-2 text-sm text-gray-700">
          {/* Top Info */}
          <div className="space-y-1">
            <h3 className="text-md font-bold text-indigo-700 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-xs text-gray-500">
              {property.city}, {property.country} • {property.property_type}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p>
              <strong>Building:</strong> {property.building_name} #
              {property.building_number}
            </p>
            <p>
              <strong>Floor:</strong> {property.floor_number}
            </p>
            <p>
              <strong>Rooms:</strong> {property.number_of_rooms}
            </p>
            <p>
              <strong>Gender:</strong> {property.gender_preference}
            </p>
          </div>

          {/* Utilities */}
          <div className="flex flex-wrap gap-1 text-xs">
            {[
              { label: "Gas", active: property.has_gas },
              { label: "Water", active: property.has_water },
              { label: "Electricity", active: property.has_electricity },
              { label: "Internet", active: property.has_internet },
            ].map((util) => (
              <span
                key={util.label}
                className={`px-2 py-0.5 rounded-full ${
                  util.active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {util.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="text-xs text-gray-600 line-clamp-2">
            {property.description}
          </div>

          {/* Bottom Info */}
          <div className="mt-auto text-[11px] text-gray-400">
            <p>
              <strong>Coords:</strong> {property.location_lat},{" "}
              {property.location_lon}
            </p>
            <p>Landlord Name: {userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
