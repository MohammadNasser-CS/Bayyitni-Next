// src/app/landlord/page.tsx

import LandlordHeader from "@/components/landlord/property/LandlordHeader";
import Pagination from "@/components/landlord/property/Pagination";
import PropertyCard from "@/components/landlord/property/PropertyCard";
import PropertyFilters from "@/components/landlord/property/PropertyFilters";
import { Property } from "@/types/property";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getMyProperties } from "@/utils/landlord/getMyProperties";
export default async function LandlordPage() {
  const user = await currentUser();
  let properties: Property[] = [];
  let hasError = false;
  console.log(`userId => ${user!.id}`);

  try {
    properties = await getMyProperties(user!.id);
  } catch (error) {
    console.error("Error fetching properties:", error);
    hasError = true;
  }
  // console.log(`properties=>${properties}`);
  // const properties: Property[] = [
  //   {
  //     id: 1,
  //     title: "Modern Family Home",
  //     building_name: "Sunset Tower",
  //     building_number: "12A",
  //     landlord_id: "landlord_123",
  //     description:
  //       "A beautiful modern family home located near parks and schools.",
  //     floor_number: 3,
  //     location_lat: "34.0522",
  //     location_lon: "-118.2437",
  //     is_active: true,
  //     gender_preference: "Any",
  //     has_gas: true,
  //     has_electricity: true,
  //     has_water: true,
  //     has_internet: true,
  //     property_type: "House",
  //     property_image:
  //       "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
  //     city: "Los Angeles",
  //     country: "USA",
  //     number_of_rooms: 4,
  //     created_at: "2025-06-27 01:02:51",
  //   },
  //   {
  //     id: 2,
  //     title: "Urban Loft",
  //     building_name: "Broadway Lofts",
  //     building_number: "333B",
  //     landlord_id: "landlord_456",
  //     description:
  //       "Cozy urban loft in the heart of the city with stunning skyline views.",
  //     floor_number: 7,
  //     location_lat: "40.7128",
  //     location_lon: "-74.006",
  //     is_active: false,
  //     gender_preference: "Male Only",
  //     has_gas: false,
  //     has_electricity: true,
  //     has_water: true,
  //     has_internet: false,
  //     property_type: "Apartment",
  //     property_image:
  //       "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
  //     city: "New York",
  //     country: "USA",
  //     number_of_rooms: 2,
  //     created_at: "2025-05-15 14:22:30",
  //   },
  //   // Add more properties as needed...
  // ];

  const hasProperties = !hasError && properties.length > 0;
  // const hasProperties = false;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasProperties ? (
          <>
            <LandlordHeader />
            <PropertyFilters />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  userName={`${user!.fullName}`}
                />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="flex min-h-[70vh] sm:min-h-[80vh] items-center justify-center text-center">
            <div className="flex flex-col items-center">
              <div className="mb-6 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lucide lucide-house-plus"
                >
                  <path d="M12.662 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v2.475" />
                  <path d="M14.959 12.717A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8" />
                  <path d="M15 18h6" />
                  <path d="M18 15v6" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
                No Properties Yet
              </h2>
              <p className="text-gray-500 mb-6 max-w-sm">
                Add your first property to start managing your student housing
                listings.
              </p>
              <Link
                href="/landlord/add-new-property"
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 px-6 rounded-lg font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Your First Property
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
