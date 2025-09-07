"use client";

import { useEffect, useState } from "react";
import LandlordHeader from "@/components/landlord/property/LandlordHeader";
import Pagination from "@/components/landlord/property/Pagination";
import PropertyCard from "@/components/landlord/property/PropertyCard";
import PropertyFilters from "@/components/landlord/property/PropertyFilters";
import { Property } from "@/types/property/property";
import Link from "next/link";
import { getMyProperties } from "@/utils/landlord/getMyProperties";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LandlordPage() {
  const { user, isLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    console.log("User:", JSON.stringify(user, null, 2));
    if (!isLoading && user?.id) {
      getMyProperties(user.id)
        .then((data) => setProperties(data))
        .catch((error) => {
          console.error("Error fetching properties:", error);
          setHasError(true);
        });
    }
  }, [isLoading, user?.id]);

  if (isLoading) return <div>Loading...</div>;

  const hasProperties = !hasError && properties.length > 0;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasProperties ? (
          <>
            <LandlordHeader properties={2} />
            <PropertyFilters />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  userName={user?.name ?? ""}
                />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="flex min-h-[70vh] sm:min-h-[80vh] items-center justify-center text-center">
            <div className="flex flex-col items-center">
              <div className="mb-2 text-secodnary">
                {/* House icon */}
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
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lucide lucide-house-plus"
                >
                  <path d="M12.662 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v2.475" />
                  <path d="M14.959 12.717A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8" />
                  <path d="M15 18h6" />
                  <path d="M18 15v6" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-secodnary mb-3">
                {t("landlord.noProperties.title")}
              </h2>
              <p className="text-labels mb-6 max-w-sm">
                {t("landlord.noProperties.description")}
              </p>
              <Link
                href="/landlord/add-new-property"
                className="bg-primary hover:bg-secondary transition text-white py-2 px-4 rounded-lg font-medium flex items-center"
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
                {t("landlord.noProperties.action")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
