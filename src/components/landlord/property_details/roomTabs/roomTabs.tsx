// src/components/landlord/property_details/PropertyTabs.tsx
"use client";
import { useState } from "react";
import { BedRoom } from "@/types/rooms/rooms";
import { SharedSpaces } from "@/types/rooms/sharedSpaces";
import SectionHeader from "../bed_room_section/SectionHeader";
import BedRoomCard from "../bed_room_section/BedRoomCard";
import SharedSpacesCard from "../shared_room_section/SharedRoomCard";

interface Props {
  bedRooms: BedRoom[];
  sharedSpaces: SharedSpaces[];
}

export default function RoomTabs({ bedRooms, sharedSpaces }: Props) {
  const [activeTab, setActiveTab] = useState<"bedrooms" | "shared-spaces">(
    "bedrooms"
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("bedrooms")}
            className={`tab-btn w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "bedrooms"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Bedrooms
          </button>
          <button
            onClick={() => setActiveTab("shared-spaces")}
            className={`tab-btn w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "shared-spaces"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Shared Spaces
          </button>
        </nav>
      </div>

      {activeTab === "bedrooms" && (
        <div className="tab-content active p-6">
          <SectionHeader
            title={`Bedrooms (${bedRooms.length})`}
            action="Add Bedroom"
          />
          <div className="space-y-6">
            {bedRooms.map((room, index) => (
              <BedRoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "shared-spaces" && (
        <div className="tab-content active p-6">
          <SectionHeader
            title={`Shared Spaces (${sharedSpaces.length})`}
            action="Add Shared Space"
          />
          <div className="space-y-6">
            {sharedSpaces.map((space, index) => (
              <SharedSpacesCard key={space.id} space={space} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
