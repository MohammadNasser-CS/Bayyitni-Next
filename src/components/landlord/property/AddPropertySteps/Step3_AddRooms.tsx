import { useLanguage } from "@/context/LanguageContext";
import { RoomType } from "@/lib/enum/room_enums";
import { CreateRoomRequest } from "@/types/rooms/rooms";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ROOM_TYPE_OPTIONS = [
  { label: "Single", value: "single" },
  { label: "Double", value: "double" },
];

interface Step3Props {
  bedRoomsData: CreateRoomRequest[];
  setBedRoomsData: React.Dispatch<React.SetStateAction<CreateRoomRequest[]>>;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3({
  bedRoomsData,
  setBedRoomsData,
  onBack,
  onNext,
}: Step3Props) {
  //
  const today = new Date().toISOString().split("T")[0]; // "2025-09-18"
  const { t } = useLanguage();
  // ---- Bedroom handlers ----
  const handleBedroomChange = (
    index: number,
    field: keyof CreateRoomRequest,
    value: any
  ) => {
    const updated = [...bedRoomsData];
    updated[index] = { ...updated[index], [field]: value };
    setBedRoomsData(updated);
  };

  const handleBedroomFileChange = (
    roomIndex: number,
    files: FileList | null
  ) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setBedRoomsData((prev) => {
      const updated = [...prev];
      updated[roomIndex] = {
        ...updated[roomIndex],
        images: [...(updated[roomIndex].images || []), ...newFiles],
      };
      return updated;
    });
  };

  const addBedroom = () =>
    setBedRoomsData([
      ...bedRoomsData,
      {
        room_type: "single",
        images: [],
        number_of_available_beds: 1,
        number_of_beds: 1,
        available_from: today, // <- default value
      },
    ]);

  const removeBedroom = (index: number) =>
    setBedRoomsData(bedRoomsData.filter((_, i) => i !== index));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        {t("room.addBedroomHeader")}
      </h2>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            {t("room.bedrooms")}
          </h3>
          <button
            onClick={addBedroom}
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Plus className="h-5 w-5" />
            {t("room.bedrooms")}
          </button>
        </div>

        <div className="space-y-5">
          {bedRoomsData.map((room, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-5 border border-gray-200 space-y-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  {t("common.room")} {i + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeBedroom(i)}
                  className="text-gray-400 hover:text-red-500 font-bold text-3xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Room type and price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {t("room.roomType")}
                  </label>
                  <select
                    value={room.room_type}
                    onChange={(e) =>
                      handleBedroomChange(
                        i,
                        "room_type",
                        e.target.value as "single" | "double"
                      )
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option key={RoomType.Single} value={RoomType.Single}>
                      {t("room.single")}
                    </option>
                    <option key={RoomType.Shared} value={RoomType.Shared}>
                      {t("room.shared")}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {t("room.monthlyRent")}
                  </label>
                  <input
                    type="number"
                    placeholder={t("room.monthlyRentPlaceholder")}
                    value={room.price_of_bed_per_month || ""}
                    onChange={(e) =>
                      handleBedroomChange(
                        i,
                        "price_of_bed_per_month",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Available from and description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {t("room.available_from")}
                  </label>
                  <DatePicker
                    selected={
                      room.available_from
                        ? new Date(room.available_from)
                        : new Date()
                    }
                    onChange={(date) =>
                      handleBedroomChange(
                        i,
                        "available_from",
                        date ? format(date, "yyyy-MM-dd") : ""
                      )
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
                    value={room.description || ""}
                    onChange={(e) =>
                      handleBedroomChange(i, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-20"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  {t("room.amenities.title")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      key: "has_internal_bathroom",
                      label: t("room.amenities.internalBathroom"),
                    },
                    {
                      key: "has_internal_balcony",
                      label: t("room.amenities.internalBalcony"),
                    },
                    { key: "has_ac", label: t("room.amenities.ac") },
                    { key: "has_office", label: t("room.amenities.office") },
                    { key: "is_active", label: t("common.active") },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(room[key as keyof CreateRoomRequest])}
                        onChange={(e) =>
                          handleBedroomChange(
                            i,
                            key as keyof CreateRoomRequest,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  {t("room.addPhotosHeader")}
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {room.images?.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setBedRoomsData((prev) => {
                            const updated = [...prev];
                            updated[i].images = updated[i].images.filter(
                              (_, imgIndex) => imgIndex !== index
                            );
                            return updated;
                          })
                        }
                        className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    handleBedroomFileChange(i, e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                  id={`bedroom-images-${i}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`bedroom-images-${i}`)?.click()
                  }
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  {t("room.addPhotos")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          type="button"
          className="px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          type="button"
          className="px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
