// src/components/landlord/property_details/RoomTaps.tsx
"use client";
import { Room } from "@/types/rooms/rooms";
import SectionHeader from "../bed_room_section/SectionHeader";
import BedRoomCard from "../bed_room_section/BedRoomCard";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

interface Props {
  property_id: number;
  bedRooms: Room[];
}

export default function RoomTabs({ property_id, bedRooms }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const handleAddBedroom = () => {
    router.push(`/landlord/manage-listings/add-new-room/${property_id}`);
  };

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
          onActionClick={handleAddBedroom} // <-- pass handler
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
