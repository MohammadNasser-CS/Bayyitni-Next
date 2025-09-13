// src/utils/landlord/addNewProperty.ts
import { CreatePropertyRequest } from "@/types/property/property";

export async function addNewProperty(formData: CreatePropertyRequest) {
  const form = new FormData();

  // Map fields correctly
  for (const [key, value] of Object.entries(formData)) {
    if (key === "images" && Array.isArray(value)) {
      // Handle multiple files
      value.forEach((file) => {
        if (file instanceof File) {
          form.append("images", file); // backend expects a list
        }
      });
    } else if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else if (typeof value === "number") {
      form.append(key, value.toString());
    } else if (value !== undefined && value !== null) {
      form.append(key, value as string);
    }
  }


  const response = await fetch("https://bayyinti-project.onrender.com/property-listings/", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend Error:", errorText);
    throw new Error("Failed to create property");
  }

  return await response.json();
}
