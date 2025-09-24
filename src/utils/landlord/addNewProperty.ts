import { CreatePropertyRequest } from "@/types/property/property";
import axios from "axios";
import { uploadImageToCloudinary } from "../cloudinary/uploadImage";

export async function addNewProperty(formData: CreatePropertyRequest) {
  // ✅ Shallow clone to avoid mutating original formData
  const payload: any = { ...formData };

  // ✅ Upload property images
  if (Array.isArray(formData.images) && formData.images.length > 0) {
    const uploadedImages = await Promise.all(
      formData.images.map((file) =>
        file instanceof File ? uploadImageToCloudinary(file, process.env.NEXT_PUBLIC_CLOUDINARY_PROPERTY_PRESET!, "bayyitni/properties") : file
      )
    );
    payload.images = uploadedImages;
  }

  // ✅ Upload room images
  if (Array.isArray(formData.rooms) && formData.rooms.length > 0) {
    payload.rooms = await Promise.all(
      formData.rooms.map(async (room) => {
        const newRoom: any = { ...room };

        if (Array.isArray(room.images) && room.images.length > 0) {
          const uploadedRoomImages = await Promise.all(
            room.images.map((file) =>
              file instanceof File ? uploadImageToCloudinary(file, process.env.NEXT_PUBLIC_CLOUDINARY_ROOM_PRESET!, "bayyitni/rooms") : file
            )
          );
          newRoom.images = uploadedRoomImages;
        }

        return newRoom;
      })
    );
  }
  console.log("Created Property:", payload);
  try {
    // ✅ Send JSON (since now we only have URLs, no Files)
    const response = await axios.post(
      "https://bayyitni-laravel-2.onrender.com/api/property",
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
      `Failed to create property: ${error.response?.data || error.message}`
    );
  }
}
