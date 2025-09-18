import { CreatePropertyRequest } from "@/types/property/property";
import axios from "axios";

export async function addNewProperty(formData: CreatePropertyRequest) {
  const form = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    if (key === "images" && Array.isArray(value)) {
      // ✅ Laravel expects property_images[]
      value.forEach((file) => {
        if (file instanceof File) {
          form.append("property_images[]", file);
        }
      });
    } else if (key === "rooms" && Array.isArray(value)) {
      // ✅ Append each room as rooms[index][field]
      value.forEach((room, idx) => {
        Object.entries(room).forEach(([rKey, rValue]) => {
          if (rValue !== undefined && rValue !== null) {
            if (rKey === "images" && Array.isArray(rValue)) {
              rValue.forEach((file) => {
                if (file instanceof File) {
                  form.append(`rooms[${idx}][images][]`, file);
                }
              });
            } else if (typeof rValue === "boolean") {
              form.append(`rooms[${idx}][${rKey}]`, rValue ? "1" : "0");
            } else {
              form.append(`rooms[${idx}][${rKey}]`, String(rValue));
            }
          }
        });
      });
    } else if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else if (typeof value === "number") {
      form.append(key, value.toString());
    } else if (value !== undefined && value !== null) {
      form.append(key, value as string);
    }
  }

  try {
    const response = await axios.post(
      "https://bayyitni-laravel-2.onrender.com/api/property",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw new Error(`Failed to create property: ${error.response?.data || error.message}`);
  }
}
