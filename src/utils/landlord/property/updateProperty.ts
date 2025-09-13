import axios from "axios";
import { Property, UpdatePropertyData } from "@/types/property/property";



export const updateProperty = async (
    propertyId: number,
    updatedData: UpdatePropertyData
) => {
    if (Object.keys(updatedData).length === 0) {
        return; // nothing to update
    }

    try {
        const response = await axios.put(
            `https://bayyitni-laravel-2.onrender.com/api/property/${propertyId}`,
            updatedData,
            {
                headers: { "Content-Type": "application/json" },
                timeout: 30000, // 10 seconds timeout
            }
        );
        console.log(`updatedData => ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (err: any) {
        throw new Error(err.message || "Failed to update property");
    }
};
