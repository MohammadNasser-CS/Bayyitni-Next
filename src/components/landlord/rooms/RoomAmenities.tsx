// src/components/landlord/rooms/RoomAmenities.tsx
"use client";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  roomData: CreateRoomRequest;
  onChange: (field: keyof CreateRoomRequest, value: any) => void;
}

export default function RoomAmenities({ roomData, onChange }: Props) {
  const { t } = useLanguage();

  const amenities = [
    {
      key: "has_internal_bathroom",
      label: t("room.amenities.internalBathroom"),
    },
    { key: "has_internal_balcony", label: t("room.amenities.internalBalcony") },
    { key: "has_ac", label: t("room.amenities.ac") },
    { key: "has_office", label: t("room.amenities.office") },
    { key: "is_active", label: t("common.active") },
  ];

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {t("room.amenities.title")}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {amenities.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(roomData[key as keyof CreateRoomRequest])}
              onChange={(e) =>
                onChange(key as keyof CreateRoomRequest, e.target.checked)
              }
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
