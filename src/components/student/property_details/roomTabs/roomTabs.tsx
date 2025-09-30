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

export default function StudentRoomTabs({ property_id, bedRooms }: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="border-b-2 border-secondary">
        <p className="w-full py-4 px-1 text-center font-medium text-md text-secondary">
          {t("property.rooms")}
        </p>
      </div>
      <div className="p-6">
        <SectionHeader title={`${t("room.bedrooms")} (${bedRooms.length})`} />
        <div className="space-y-6">
          {bedRooms.map((room, index) => (
            <BedRoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
{
  /*
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="border-b border-primary">
        <div className="flex items-center justify-between py-4 px-6">
          <h2 className="text-3xl font-bold text-center text-secondary py-4 px-1">
            {t("property.rooms")}
          </h2>
          <div className="inline-flex items-center rounded-full font-semibold transition-colors bg-primary text-white hover:bg-primary/80 text-sm px-4 py-2">
            <p>{t("room.roomsNumber", { value: "2" })}</p>
            <Bed className="h-5 w-5 ms-2" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="relative p-4">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {bedRooms.map((room, index) => (
                <BedRoomCard key={room.id} room={room} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  
  */
}
