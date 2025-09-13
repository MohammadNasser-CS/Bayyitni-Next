// src/utils/landlord/getPropertyDetails.ts
import { PropertyDetail } from "@/types/property/property";
import axios from "axios";

export async function getPropertyDetails(property_id: string): Promise<PropertyDetail> {
  try {
    const res = await axios.get(
      `https://bayyitni-laravel-2.onrender.com/api/property/detailed/${property_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${process.env.ADMIN_API_TOKEN}`, // optional
        },
        timeout: 30000, // 10 seconds timeout
      }
    );

    return res.data.data as PropertyDetail;// return the actual property detail
  } catch (error: any) {
    console.error("Error fetching property details:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch property details");
  }
}
