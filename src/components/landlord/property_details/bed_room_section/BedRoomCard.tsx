"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Room } from "@/types/rooms/rooms";
import { AirVentIcon, BathIcon, DoorOpenIcon, Printer } from "lucide-react";
import { updateRoom } from "@/utils/landlord/room/updateRoom";
import { deleteRoom } from "@/utils/landlord/room/deleteRoom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROOM_TYPE_LABELS } from "@/lib/enum/room_enums";

const FALLBACK_IMAGE = "/default-fallback-image.png";

interface Props {
  room: Room;
  index: number;
}

export default function BedRoomCard({ room, index }: Props) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [originalRoom, setOriginalRoom] = useState<Room>(room);
  const [editedRoom, setEditedRoom] = useState<Room>(room);
  const [updatedData, setUpdatedData] = useState<Record<string, any>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const images =
    room.images && room.images.length > 0
      ? room.images.map((img) => img.image_url)
      : [FALLBACK_IMAGE];

  useEffect(() => {
    setEditedRoom(room);
    setOriginalRoom(room);
    setUpdatedData({});
  }, [room]);

  const handleChange = (field: keyof Room, value: any) => {
    setEditedRoom((prev) => ({ ...prev, [field]: value }));

    // add only if changed compared to originalRoom
    if (value !== originalRoom[field]) {
      setUpdatedData((prev) => ({ ...prev, [field]: value }));
    } else {
      // if reverted back, remove it from updatedData
      setUpdatedData((prev) => {
        const copy = { ...prev };
        delete copy[field as string];
        return copy;
      });
    }
  };

  const handleCancel = () => {
    setEditedRoom(originalRoom);
    setUpdatedData({});
    setIsEditing(false);
  };

  // Save handler
  const handleSave = async () => {
    if (Object.keys(updatedData).length === 0) {
      setIsEditing(false);
      return; // nothing changed
    }

    try {
      setIsSaving(true);
      toast.loading("Saving changes...");
      const updatedRoomFromBackend = await updateRoom(room.id, updatedData);

      if (updatedRoomFromBackend) {
        setEditedRoom((prev) => ({ ...prev, ...updatedRoomFromBackend }));
        setOriginalRoom((prev) => ({ ...prev, ...updatedRoomFromBackend }));
        setUpdatedData({});
        toast.dismiss();
        toast.success("Room updated successfully ✅");
      }
      router.refresh();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to save changes ❌");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete handler: call parent on success
  const handleDelete = async () => {
    if (!confirm(t("common.confirmDelete") || "Are you sure?")) return;

    try {
      setIsDeleting(true);
      toast.loading("Deleting room...");
      await deleteRoom(room.id);
      toast.dismiss();
      toast.success("Room deleted successfully 🗑️");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to delete room ❌");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-cards-background border border-placeholders rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          {t("common.room")} - {index + 1}
        </h3>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                className="text-white bg-secondary hover:bg-hints font-medium cursor-pointer text-xl border py-1 px-3"
                onClick={() => setIsEditing(true)}
                disabled={isDeleting}
              >
                {t("common.edit")}
              </button>

              <button
                className="text-white hover:bg-red-400 font-medium cursor-pointer text-xl border py-1 px-3 bg-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
                title={isDeleting ? t("common.deleting") : t("common.delete")}
              >
                {isDeleting ? t("common.deleting") : t("common.delete")}
              </button>
            </>
          ) : (
            <>
              <button
                className="text-green-600 hover:text-green-800 font-medium"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving
                  ? t("common.saving") || "Saving..."
                  : t("common.save")}
              </button>
              <button
                className="text-gray-600 hover:text-gray-800 font-medium"
                onClick={handleCancel}
                disabled={isSaving}
              >
                {t("common.cancel")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Status + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t("room.status.title")}:</span>
            {isEditing ? (
              <select
                value={editedRoom.is_active ? "active" : "not_active"}
                onChange={(e) =>
                  handleChange("is_active", e.target.value === "active")
                }
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="active">{t("common.active")}</option>
                <option value="not_active">{t("common.inactive")}</option>
              </select>
            ) : (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  room.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {room.is_active ? t("common.active") : t("common.inactive")}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              {t("room.monthlyRent")}
            </p>
            {isEditing ? (
              <input
                type="number"
                value={editedRoom.price_of_bed_per_month}
                onChange={(e) =>
                  handleChange("price_of_bed_per_month", +e.target.value)
                }
                className="border rounded px-2 py-1 w-32"
              />
            ) : (
              <p className="font-semibold">
                ${editedRoom.price_of_bed_per_month}
              </p>
            )}
          </div>
        </div>
        {/* Beds & Room Type (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {t("room.totalBeds")}:
            </span>
            <span className="text-gray-700">{room.number_of_beds}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {t("room.availableBeds")}:
            </span>
            <span className="text-gray-700">
              {room.number_of_available_beds}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">{t("room.roomType")}:</span>
            <span className="text-gray-700">
              {ROOM_TYPE_LABELS[room.room_type][language]}
            </span>
          </div>
        </div>

        {/* Images (display only) */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium">
            {t("common.photos")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden h-28 border border-gray-200 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            {
              key: "has_ac",
              label: t("room.amenities.ac"),
              icon: <AirVentIcon className="h-4 w-4" />,
            },
            {
              key: "has_internal_bathroom",
              label: t("room.amenities.internalBathroom"),
              icon: <BathIcon className="h-4 w-4" />,
            },
            {
              key: "has_internal_balcony",
              label: t("room.amenities.internalBalcony"),
              icon: <DoorOpenIcon className="h-4 w-4" />,
            },
            {
              key: "has_office",
              label: t("room.amenities.office"),
              icon: <Printer className="h-4 w-4" />,
            },
          ].map(({ key, label, icon }) => (
            <p key={key} className="flex items-center gap-2">
              {icon}
              <span className="font-semibold">{label}:</span>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={editedRoom[key as keyof Room] as boolean}
                  onChange={(e) =>
                    handleChange(key as keyof Room, e.target.checked)
                  }
                />
              ) : (
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    editedRoom[key as keyof Room]
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {editedRoom[key as keyof Room]
                    ? t("common.included")
                    : t("common.notIncluded")}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
