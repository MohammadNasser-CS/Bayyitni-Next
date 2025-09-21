// src/components/landlord/rooms/RoomTypeAndPrice.tsx
"use client";
import { RoomType } from "@/lib/enum/room_enums";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  roomData: CreateRoomRequest;
  onChange: (field: keyof CreateRoomRequest, value: any) => void;
}

export default function RoomTypeAndPrice({ roomData, onChange }: Props) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Room Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          {t("room.roomType")}
        </label>
        <select
          value={roomData.room_type}
          onChange={(e) => {
            const type = e.target.value as RoomType;
            onChange("room_type", type);
            if (type === RoomType.Single) {
              onChange("number_of_beds", 1);
              onChange("number_of_available_beds", 1);
            }
          }}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value={RoomType.Single}>{t("room.single")}</option>
          <option value={RoomType.Shared}>{t("room.shared")}</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          {t("room.monthlyRent")}
        </label>
        <input
          type="number"
          placeholder={t("room.monthlyRentPlaceholder")}
          value={roomData.price_of_bed_per_month || ""}
          onChange={(e) =>
            onChange("price_of_bed_per_month", parseFloat(e.target.value))
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Shared Room Beds */}
      {roomData.room_type === RoomType.Shared && (
        <>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {t("room.totalBeds")}
            </label>
            <input
              type="number"
              min={1}
              value={roomData.number_of_beds}
              onChange={(e) =>
                onChange("number_of_beds", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {t("room.availableBeds")}
            </label>
            <input
              type="number"
              min={1}
              max={roomData.number_of_beds}
              value={roomData.number_of_available_beds}
              onChange={(e) =>
                onChange("number_of_available_beds", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </>
      )}
    </div>
  );
}
