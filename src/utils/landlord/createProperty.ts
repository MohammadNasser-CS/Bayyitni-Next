import { CreatePropertyRequest } from "@/types/property/property";

export async function postProperty(formData: CreatePropertyRequest) {
  const form = new FormData();

  // Map fields correctly
  for (const [key, value] of Object.entries(formData)) {
    if (key === "property_image" && value instanceof File) {
      // Rename to match API
      form.append("image", value);
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
