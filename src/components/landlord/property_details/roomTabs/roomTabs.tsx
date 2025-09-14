// src/components/landlord/property_details/PropertyTabs.tsx
"use client";
import { Room } from "@/types/rooms/rooms";
import SectionHeader from "../bed_room_section/SectionHeader";
import BedRoomCard from "../bed_room_section/BedRoomCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  bedRooms: Room[];
}

export default function PropertyTabs({ bedRooms }: Props) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="border-b-2 border-secondary">
        <p className="w-full py-4 px-1 text-center font-medium text-md text-secondary">
          {t("property.rooms")}
        </p>
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
