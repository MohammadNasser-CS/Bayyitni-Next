"use client";

import { useEffect, useState, useCallback } from "react";
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
  const { user, isLoading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const { t } = useLanguage();

  const fetchProperties = useCallback(
    async (filters?: { status: string; type: string; search: string }) => {
      if (!user?.id) return;
      setHasError(false);
      setIsLoadingProperty(true);
      try {
        const data = await getMyProperties(user.id, filters);
        setProperties(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoadingProperty(false);
      }
    },
    [user?.id]
  );

  // Initial load
  useEffect(() => {
    if (!authLoading && user?.id) fetchProperties();
  }, [authLoading, user?.id, fetchProperties]);

  const hasProperties = !hasError && properties.length > 0;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header always visible */}
        <LandlordHeader properties={properties.length} />

        {/* Filters always visible */}
        <PropertyFilters onFilterChange={fetchProperties} />

        {/* Properties Section */}
        <div className="mt-6 mb-4 p-3 rounded-lg bg-white shadow-sm border border-gray-200">
          {isLoadingProperty ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-60 bg-gray-200 rounded-lg"
                />
              ))}
            </div>
          ) : hasProperties ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="flex min-h-[40vh] items-center justify-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-secodnary mb-3">
                  {t("landlord.manageListings.noProperties.title")}
                </h2>
                <p className="text-labels mb-6 max-w-sm">
                  {t("landlord.manageListings.noProperties.description")}
                </p>
                <Link
                  href="/landlord/manage-listings/add-new-property"
                  className="bg-primary hover:bg-secondary transition text-white py-2 px-4 rounded-lg font-medium flex items-center"
                >
                  {t("landlord.manageListings.noProperties.emptyAction")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
