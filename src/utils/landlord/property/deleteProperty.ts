// src/utils/landlord/property/deleteProperty.ts
import axios from "axios";

export const deleteProperty = async (propertyId: number | string) => {
    try {
        const response = await axios.delete(
            `https://bayyitni-laravel-2.onrender.com/api/property/${propertyId}`
        );
        return response.data; // optional: return any response data
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to delete property");
    }
};
