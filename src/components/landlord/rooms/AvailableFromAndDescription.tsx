// src/components/landlord/rooms/AvailableFromAndDescription.tsx
"use client";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { useLanguage } from "@/context/LanguageContext";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  roomData: CreateRoomRequest;
  onChange: (field: keyof CreateRoomRequest, value: any) => void;
}

export default function AvailableFromAndDescription({
  roomData,
  onChange,
}: Props) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          {t("room.available_from")}
        </label>
        <DatePicker
          selected={
            roomData.available_from
              ? new Date(roomData.available_from)
              : new Date()
          }
          onChange={(date) =>
            onChange("available_from", date ? format(date, "yyyy-MM-dd") : "")
          }
          dateFormat={"yyyy-MM-dd"}
          placeholderText="Select a date"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          popperClassName="z-50"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          {t("room.description")}
        </label>
        <textarea
          placeholder={t("room.descriptionPlaceholder")}
          value={roomData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-20"
        />
      </div>
    </div>
  );
}
