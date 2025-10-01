import { PropertyGenderPreference, PropertyStatus, PropertyType } from "@/lib/enum/property_enums";
import axios from "axios";

// src/utils/student/getAllProperties.ts
interface PropertyFilters {
  gender_preference?: PropertyGenderPreference; // make optional
  search?: string;
  max_price?: number;
  property_type?: PropertyType;
  has_internet?: boolean;
  has_water?: boolean;
  has_electricity?: boolean;
  has_gas?: boolean;
}

export async function getAllProperties(landlord_id: string, filters?: PropertyFilters) {
  try {
    const params = new URLSearchParams();

    if (filters) {
      // Search
      if (filters?.search && filters.search.trim() !== "") {
        params.append("search", filters.search.trim());
      }

      // Property type
      if (filters?.property_type && filters.property_type !== PropertyType.All) {
        params.append("property_type", filters.property_type);
      }

      // Price range
      if (filters?.max_price && filters.max_price > 0) params.append("max_price", String(filters.max_price));

      // Gender preference ✅
      if (filters?.gender_preference && filters.gender_preference !== PropertyGenderPreference.All) {
        params.append("gender_preference", filters.gender_preference);
      }

      // Amenities
      if (filters?.has_internet === true) params.append("has_internet", String(filters.has_internet));
      if (filters?.has_water === true) params.append("has_water", String(filters.has_water));
      if (filters?.has_electricity === true) params.append("has_electricity", String(filters.has_electricity));
      if (filters?.has_gas === true) params.append("has_gas", String(filters.has_gas));

    }

    const url = `https://bayyitni-laravel-2.onrender.com/api/property/active_properties?${params.toString()}`;
    console.log("Fetching properties with URL:", url);

    const res = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });


    if (res.status !== 200) {
      const errorText = await res.statusText;
      throw new Error(`Failed to fetch listings: ${errorText}`);
    }

    const data = await res.data;
    console.log("Fetched landlord properties raw:", data);
    return data.data ?? [];
  } catch (error) {
    console.error("Error in getMyProperties:", error);
    throw error;
  }
}
