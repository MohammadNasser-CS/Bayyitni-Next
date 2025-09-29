"use client";

import { useEffect, useState, useCallback } from "react";
import Pagination from "@/components/landlord/property/Pagination";
import { Property } from "@/types/property/property";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  PropertyGenderPreference,
  PropertyType,
} from "@/lib/enum/property_enums";
import { StudentNavbar } from "@/components/student/navbar/StudentNavbar";
import StudentHeader from "@/components/student/explore/StudentHeader";
import FilterSection from "@/components/student/explore/FilterSection";
import { getAllProperties } from "@/utils/student/getAllProperties";
import StudentPropertyCard from "@/components/student/explore/properties_section/StudentPropertyCard";

export default function StudnetPage() {
  const { user, studentProfile, isLoading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const { t } = useLanguage();
  const gender = studentProfile?.gender;

  const fetchProperties = useCallback(
    async (filters?: {
      search?: string;
      max_price?: number;
      gender_preference?: PropertyGenderPreference;
      property_type?: PropertyType;
      has_internet?: boolean;
      has_water?: boolean;
      has_electricity?: boolean;
      has_gas?: boolean;
    }) => {
      if (!user?.id) return;
      setHasError(false);
      setIsLoadingProperty(true);
      try {
        const data = await getAllProperties(user.id, {
          gender_preference: "female" as PropertyGenderPreference,
          ...filters,
        });
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
  // If user has a role already, handle redirection here

  return (
    <>
      <div>
        <StudentNavbar />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header always visible */}
            <StudentHeader />

            {/* Filters always visible */}
            <FilterSection
              onFilterChange={fetchProperties}
              defaultGender={gender as PropertyGenderPreference}
            />

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
                      <StudentPropertyCard
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
      </div>
    </>
  );
}
