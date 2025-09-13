// src/components/landlord/property_details/PropertyTabs.tsx
"use client";
import { useState } from "react";
import { Room } from "@/types/rooms/rooms";
import SectionHeader from "../bed_room_section/SectionHeader";
import BedRoomCard from "../bed_room_section/BedRoomCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  bedRooms: Room[];
}

export default function PropertyTabs({ bedRooms }: Props) {
  const [activeTab, setActiveTab] = useState<"bedrooms">("bedrooms");
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("bedrooms")}
            className={`w-full py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "bedrooms"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {t("property.rooms")}
          </button>
        </nav>
      </div>
      <div className="p-6">
        <SectionHeader
          title={`${t("room.bedrooms")} (${bedRooms.length})`}
          action={t("room.addBedroom")}
        />
        <div className="space-y-6">
          {bedRooms.map((room, index) => (
            <BedRoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
