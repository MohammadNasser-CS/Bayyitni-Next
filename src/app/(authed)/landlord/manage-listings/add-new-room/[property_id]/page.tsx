// src/app/(authed)/landlord/manage-listings/add-new-room/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { RoomType } from "@/lib/enum/room_enums";
import { addNewRoom } from "@/utils/landlord/room/addRoom";
import { useLanguage } from "@/context/LanguageContext";
import RoomTypeAndPrice from "@/components/landlord/rooms/RoomTypeAndPrice";
import AvailableFromAndDescription from "@/components/landlord/rooms/AvailableFromAndDescription";
import RoomAmenities from "@/components/landlord/rooms/RoomAmenities";
import RoomImages from "@/components/landlord/rooms/RoomImages";

export default function AddNewPropertyRoomPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.publicMetadata?.role !== "landlord") redirect("/");
  }, [user]);

  const propertyId = Number(params?.property_id);
  const today = new Date().toISOString().split("T")[0];

  const [roomData, setRoomData] = useState<CreateRoomRequest>({
    room_type: RoomType.Single,
    images: [],
    number_of_available_beds: 1,
    number_of_beds: 1,
    available_from: today,
    is_available: true,
  });

  const handleChange = (field: keyof CreateRoomRequest, value: any) => {
    setRoomData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Room added:", roomData);
      const result = await addNewRoom(propertyId, roomData);
      console.log("Room added:", result);
      router.push(`/landlord/manage-listings/property-details/${propertyId}`);
    } catch (err) {
      console.error(err);
      alert(t("room.addFailed"));
    }
  };

  return (
    <div className="p-8 mt-5 bg-white rounded-lg shadow-lg space-y-8 max-w-4xl mx-auto border">
      <h2 className="text-2xl font-semibold text-gray-800">
        {t("room.addBedroomHeader")}
      </h2>
      <div className="space-y-5 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
        <RoomTypeAndPrice roomData={roomData} onChange={handleChange} />
        <AvailableFromAndDescription
          roomData={roomData}
          onChange={handleChange}
        />
        <RoomAmenities roomData={roomData} onChange={handleChange} />
        <RoomImages roomData={roomData} onChange={handleChange} />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
        >
          {t("common.back")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg font-medium text-white bg-primary hover:bg-orange-500 transition cursor-pointer"
        >
          {t("common.save")}
        </button>
      </div>
    </div>
  );
}
