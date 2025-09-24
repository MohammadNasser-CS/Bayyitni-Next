// src/utils/landlord/room/addNewRoom.ts
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { uploadImageToCloudinary } from "@/utils/cloudinary/uploadImage";
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
    // Clone room data
    const payload: any = { ...roomData };

    // ✅ Upload room images to Cloudinary first
    if (Array.isArray(roomData.images) && roomData.images.length > 0) {
        const uploadedImages = await Promise.all(
            roomData.images.map((file) =>
                file instanceof File
                    ? uploadImageToCloudinary(
                        file,
                        process.env.NEXT_PUBLIC_CLOUDINARY_ROOM_PRESET!,
                        "bayyitni/rooms"
                    )
                    : file
            )
        );
        payload.images = uploadedImages;
    }

    // Add property_id
    payload.property_listing_id = property_id;

    // Convert booleans/numbers to proper JSON values
    // for (const [key, value] of Object.entries(payload)) {
    //     if (typeof value === "boolean") payload[key] = value;
    //     else if (typeof value === "number") payload[key] = value;
    // }
    console.log("Created Room Payload:", payload);
    try {
        const response = await axios.post(
            "https://bayyitni-laravel-2.onrender.com/api/room",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
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
