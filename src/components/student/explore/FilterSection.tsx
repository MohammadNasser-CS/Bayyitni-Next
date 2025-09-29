// src/components/student/explore/FilterSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getAllAmenities,
  PROPERTY_GENDER_PREFERENCE_LABELS,
  PROPERTY_TYPE_LABELS,
  PropertyAmenity,
  PropertyGenderPreference,
  PropertyType,
} from "@/lib/enum/property_enums";

export interface FilterValues {
  search?: string;
  max_price?: number;
  gender_preference?: PropertyGenderPreference;
  property_type?: PropertyType;
  has_internet?: boolean;
  has_water?: boolean;
  has_electricity?: boolean;
  has_gas?: boolean;
}

export interface PropertyFiltersProps {
  defaultGender: PropertyGenderPreference;
  onFilterChange: (filters: FilterValues) => void;
}

export default function FilterSection({
  defaultGender,
  onFilterChange,
}: PropertyFiltersProps) {
  const { t, language } = useLanguage();

  // State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // ✅ only this is sent to API
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [debouncedPrice, setDebouncedPrice] = useState<number>(1000); // ✅ only this is sent to API
  const [gender, setGender] = useState(
    defaultGender as PropertyGenderPreference
  );
  const [propertyType, setPropertyType] = useState<PropertyType>(
    PropertyType.All
  );
  const [amenities, setAmenities] = useState<Record<PropertyAmenity, boolean>>({
    [PropertyAmenity.Internet]: false,
    [PropertyAmenity.Water]: false,
    [PropertyAmenity.Electricity]: false,
    [PropertyAmenity.Gas]: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Debounce effect for price
  useEffect(() => {
    const handler = setTimeout(
      () => {
        setDebouncedPrice(maxPrice);
        setDebouncedSearch(search);
      },
      1000,
      1000
    ); // wait 600ms after user stops typing

    return () => clearTimeout(handler);
  }, [maxPrice, search]);

  // Trigger parent callback whenever filters change
  useEffect(() => {
    onFilterChange({
      search: debouncedSearch,
      max_price: debouncedPrice, // use debounced price instead of raw one
      gender_preference: gender,
      property_type: propertyType,
      has_internet: amenities[PropertyAmenity.Internet],
      has_water: amenities[PropertyAmenity.Water],
      has_electricity: amenities[PropertyAmenity.Electricity],
      has_gas: amenities[PropertyAmenity.Gas],
    });
  }, [
    debouncedSearch,
    debouncedPrice,
    gender,
    propertyType,
    amenities,
    onFilterChange,
  ]);

  // Handlers
  const toggleAmenity = (a: PropertyAmenity) => {
    setAmenities((prev) => ({
      ...prev,
      [a]: !prev[a],
    }));
  };

  const clearAll = () => {
    setSearch("");
    setMaxPrice(1000);
    setGender(PropertyGenderPreference.Any);
    setPropertyType(PropertyType.All);
    setAmenities({
      [PropertyAmenity.Internet]: false,
      [PropertyAmenity.Water]: false,
      [PropertyAmenity.Electricity]: false,
      [PropertyAmenity.Gas]: false,
    });
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Top Row: Search + Filter Btn */}
      <div className="flex gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t("student.explore.filters.searchPlaceholder", {
              defaultValue:
                "Search by location, university, or property name...",
            })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border border-gray-200 rounded-md px-3 py-1 h-9 w-full"
          />
        </div>

        {/* Filters button */}
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md text-sm shadow-sm"
        >
          <Filter className="h-4 w-4" />
          {t("student.explore.filters.filtersBtn", { defaultValue: "Filters" })}
        </button>
      </div>

      {/* Filter Card */}
      {showFilters && (
        <div className="bg-cards-background flex flex-col gap-6 rounded-xl border py-6 shadow-sm animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4 border-b">
            <h2 className="font-semibold text-lg">
              {t("student.explore.filters.title", { defaultValue: "Filters" })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="h-8 rounded-md px-3 text-sm hover:bg-accent"
              >
                {t("student.explore.filters.clearAll", {
                  defaultValue: "Clear All",
                })}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="h-8 rounded-md px-3 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("student.explore.filters.priceRange", {
                    defaultValue: "Price Range (SAR/month)",
                  })}
                </label>
                <input
                  type="number"
                  min={100}
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? Number(e.target.value) : maxPrice
                    )
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder={t("student.explore.filters.maxPrice")}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("student.explore.filters.gender", {
                    defaultValue: "Gender Preference",
                  })}
                </label>
                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value as PropertyGenderPreference)
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  {Object.values(PropertyGenderPreference).map((gender) => (
                    <option key={gender} value={gender}>
                      {PROPERTY_GENDER_PREFERENCE_LABELS[gender][language]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("student.explore.filters.propertyType", {
                    defaultValue: "Property Type",
                  })}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(e.target.value as PropertyType)
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  {Object.values(PropertyType).map((type) => (
                    <option key={type} value={type}>
                      {PROPERTY_TYPE_LABELS[type][language]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("student.explore.filters.amenities", {
                    defaultValue: "Amenities",
                  })}
                </label>
                <div className="flex flex-wrap gap-2">
                  {getAllAmenities(language).map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => toggleAmenity(a.value as PropertyAmenity)}
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition ${
                        amenities[a.value as PropertyAmenity]
                          ? "bg-primary text-white"
                          : "text-foreground"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
