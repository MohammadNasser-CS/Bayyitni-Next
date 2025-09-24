import axios from "axios";

/**
 * Upload a single image to Cloudinary
 * @param file - The image File to upload
 * @param folder - Optional folder name in Cloudinary
 * @returns The secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(
    file: File,
    preset: string,
    folder: string = "bayyitni/properties"
): Promise<string> {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset || "bayyitni/properties"); // ✅ safer
        formData.append("folder", folder);

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }, // ✅ explicit header
            }
        );

        return res.data.secure_url;
    } catch (error: any) {
        console.error(
            "Cloudinary Upload Error:",
            error.response?.data || error.message
        );
        throw new Error("Failed to upload image to Cloudinary");
    }
}
