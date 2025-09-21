import { PropertyStatus } from "@/lib/enum/property_enums";
import axios from "axios";

// src/utils/landlord/getMyProperties.ts
interface PropertyFilters {
  status?: PropertyStatus; // "active", "inactive", "pending"
  type?: string; // "house", "apartment", "studio"
  search?: string;
}

export async function getMyProperties(landlord_id: string, filters?: PropertyFilters) {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.status) {
        if (filters.status === PropertyStatus.Active) params.append("is_active", PropertyStatus.Active);
        if (filters.status === PropertyStatus.NotActive) params.append("is_active", PropertyStatus.NotActive);
        if (filters.status === PropertyStatus.Pending) params.append("is_active", PropertyStatus.Pending);
        // pending handled by backend if needed
      }
      if (filters.type && filters.type !== "all") params.append("property_type", filters.type);
      if (filters.search && filters.search.trim() !== "") params.append("search", filters.search);
    }
    console.log(`https://bayyitni-laravel-2.onrender.com/api/property/landlord/${landlord_id}?${params.toString()}`);
    const res = await axios.get(
      `https://bayyitni-laravel-2.onrender.com/api/property/landlord/${landlord_id}?${params.toString()}`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000, // 10 seconds timeout
      }
    );

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
