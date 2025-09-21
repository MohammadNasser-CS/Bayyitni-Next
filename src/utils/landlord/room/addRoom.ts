// src/utils/landlord/room/addNewRoom.ts
import { CreateRoomRequest } from "@/types/rooms/rooms";
import axios from "axios";

/**
 * Adds a single new room to a property.
 * @param property_id - ID of the property
 * @param roomData - Room data
 * @returns API response
 */
export const addNewRoom = async (
    property_id: number,
    roomData: CreateRoomRequest
): Promise<any> => {
    const form = new FormData();

    // Send property_id
    form.append("property_listing_id", property_id.toString());
    // Append each field
    for (const [key, value] of Object.entries(roomData)) {
        if (key === "images" && Array.isArray(value)) {
            value.forEach((file) => {
                if (file instanceof File) form.append("images[]", file);
            });
        } else if (typeof value === "boolean") {
            form.append(key, value ? "1" : "0");
        } else if (typeof value === "number") {
            form.append(key, value.toString());
        } else if (value !== undefined && value !== null) {
            form.append(key, value as string);
        }
    }

    try {
        const response = await axios.post(
            "https://bayyitni-laravel-2.onrender.com/api/room",
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(
            `Failed to create room: ${error.response?.data?.message || error.message}`
        );
    }
};
