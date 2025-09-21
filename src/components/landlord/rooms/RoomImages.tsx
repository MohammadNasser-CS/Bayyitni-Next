// src/components/landlord/rooms/RoomImages.tsx
"use client";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  roomData: CreateRoomRequest;
  onChange: (field: keyof CreateRoomRequest, value: any) => void;
}

export default function RoomImages({ roomData, onChange }: Props) {
  const { t } = useLanguage();

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    onChange("images", [...(roomData.images || []), ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    onChange(
      "images",
      roomData.images.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {t("room.addPhotosHeader")}
      </label>
      <div className="flex gap-2 mb-2 flex-wrap">
        {roomData.images?.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          handleFileChange(e.target.files);
          if (e.target) e.target.value = "";
        }}
        className="hidden"
        id="room-images"
      />
      <button
        type="button"
        onClick={() => document.getElementById("room-images")?.click()}
        className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
      >
        {t("room.addPhotos")}
      </button>
    </div>
  );
}
