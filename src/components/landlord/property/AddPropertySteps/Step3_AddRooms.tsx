import { CreateBedroomRequest } from "@/types/rooms/rooms";
import { CreateSharedSpaceRequest } from "@/types/rooms/sharedSpaces";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/locales/gregorian_ar";

const ROOM_TYPE_OPTIONS = [
  { label: "فردية", value: "single" },
  { label: "مشتركة", value: "double" },
];

interface Step3Props {
  bedRoomsData: CreateBedroomRequest[];
  setBedRoomsData: React.Dispatch<React.SetStateAction<CreateBedroomRequest[]>>;
  sharedSpacesData: CreateSharedSpaceRequest[];
  setSharedSpacesData: React.Dispatch<
    React.SetStateAction<CreateSharedSpaceRequest[]>
  >;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3({
  bedRoomsData,
  setBedRoomsData,
  sharedSpacesData,
  setSharedSpacesData,
  onBack,
  onNext,
}: Step3Props) {
  // ----------------- Handlers -----------------
  const handleBedroomChange = (
    index: number,
    field: keyof CreateBedroomRequest,
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
      const updatedBedrooms = [...prev];
      updatedBedrooms[roomIndex] = {
        ...updatedBedrooms[roomIndex],
        images: [...(updatedBedrooms[roomIndex].images || []), ...newFiles],
      };
      return updatedBedrooms;
    });
  };
  const addBedroom = () =>
    setBedRoomsData([...bedRoomsData, { room_type: "single", images: [] }]);

  const removeBedroom = (index: number) => {
    setBedRoomsData(bedRoomsData.filter((_, i) => i !== index));
  };

  const handleSharedChange = (
    index: number,
    field: keyof CreateSharedSpaceRequest,
    value: any
  ) => {
    const updated = [...sharedSpacesData];
    updated[index] = { ...updated[index], [field]: value };
    setSharedSpacesData(updated);
  };

  const handleSharedFileChange = (
    roomIndex: number,
    files: FileList | null
  ) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setSharedSpacesData((prev) => {
      const updatedharedSpaces = [...prev];
      updatedharedSpaces[roomIndex] = {
        ...updatedharedSpaces[roomIndex],
        images: [...(updatedharedSpaces[roomIndex].images || []), ...newFiles],
      };
      return updatedharedSpaces;
    });
  };

  const addSharedSpace = () =>
    setSharedSpacesData([
      ...sharedSpacesData,
      { room_type: "kitchen", images: [] },
    ]);

  const removeSharedSpace = (index: number) => {
    setSharedSpacesData(sharedSpacesData.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    console.log(bedRoomsData);
    console.log(sharedSpacesData);
    // onNext();
  };

  // ----------------- الواجهة -----------------
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-8" dir="rtl">
      <h2 className="text-2xl font-semibold text-gray-800">تفاصيل الغرف</h2>

      {/* -------- قسم غرف النوم -------- */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">غرف النوم</h3>
          <button
            onClick={addBedroom}
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            إضافة غرفة نوم
          </button>
        </div>

        <div className="space-y-4">
          {bedRoomsData.map((room, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4 transition-all duration-500 ease-out transform animate-[fadeIn_0.3s_ease-out]"
            >
              {/* العنوان */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">غرفة نوم {i + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeBedroom(i)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* نوع الغرفة والسعر */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    نوع الغرفة
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
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    {ROOM_TYPE_OPTIONS.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    السعر الشهري
                  </label>
                  <input
                    type="text"
                    placeholder="السعر لكل سرير شهرياً"
                    value={room.price_of_bed_per_month || ""}
                    onChange={(e) =>
                      handleBedroomChange(
                        i,
                        "price_of_bed_per_month",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* متاح من والوصف */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    متاح من
                  </label>
                  <DatePicker
                    calendarPosition="bottom-left"
                    containerClassName="w-full"
                    className="custom-calendar"
                    inputClass="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    locale={arabic}
                    value={room.available_from || ""}
                    onChange={(date) =>
                      handleBedroomChange(
                        i,
                        "available_from",
                        date?.format("YYYY-MM-DD")
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    وصف الغرفة
                  </label>
                  <textarea
                    placeholder="صف الغرفة هنا"
                    value={room.description || ""}
                    onChange={(e) =>
                      handleBedroomChange(i, "description", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* المميزات */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  مميزات الغرفة
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "has_internal_bathroom", label: "حمام داخلي" },
                    { key: "has_internal_balcony", label: "شرفة داخلية" },
                    { key: "has_ac", label: "مكيف هواء" },
                    { key: "has_office", label: "مكتب" },
                    { key: "is_active", label: "نشط" },
                    { key: "is_available", label: "متاح" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(
                          room[key as keyof CreateBedroomRequest]
                        )}
                        onChange={(e) =>
                          handleBedroomChange(
                            i,
                            key as keyof CreateBedroomRequest,
                            e.target.checked
                          )
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* رفع الصور */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  صور الغرفة
                </label>
                <div className="flex gap-2 mb-2">
                  {room.images?.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBedRoomsData((prev) => {
                            const updatedBedrooms = [...prev];
                            updatedBedrooms[i].images = updatedBedrooms[
                              i
                            ].images.filter(
                              (_, imgIndex) => imgIndex !== index
                            );
                            return updatedBedrooms;
                          });
                        }}
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
                    e.target.value = ""; // مسح الإدخال لمنع التكرار
                  }}
                  className="hidden"
                  id={`bedroom-images-${i}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`bedroom-images-${i}`)?.click()
                  }
                  className="w-full py-1 px-2 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  تحميل الصور
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- قسم المساحات المشتركة -------- */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            المساحات المشتركة
          </h3>
          <button
            onClick={addSharedSpace}
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            إضافة مساحة مشتركة
          </button>
        </div>

        <div className="space-y-4">
          {sharedSpacesData.map((space, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4 transition-all duration-500 ease-out transform animate-[fadeIn_0.3s_ease-out]"
            >
              {/* العنوان */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  مساحة مشتركة {i + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeSharedSpace(i)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* النوع والوصف */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    نوع المساحة
                  </label>
                  <select
                    value={space.room_type}
                    onChange={(e) =>
                      handleSharedChange(
                        i,
                        "room_type",
                        e.target.value as CreateSharedSpaceRequest["room_type"]
                      )
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="kitchen">مطبخ</option>
                    <option value="bathroom">حمام</option>
                    <option value="living_room">غرفة معيشة</option>
                    <option value="laundry">غسيل</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    وصف المساحة
                  </label>
                  <textarea
                    placeholder="صف هذه المساحة"
                    value={space.description || ""}
                    onChange={(e) =>
                      handleSharedChange(i, "description", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* رفع الصور */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  صور المساحة
                </label>
                <div className="flex gap-2 mb-2">
                  {space.images?.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSharedSpacesData((prev) => {
                            const updatedSharedSpaces = [...prev];
                            updatedSharedSpaces[i].images = updatedSharedSpaces[
                              i
                            ].images.filter(
                              (_, imgIndex) => imgIndex !== index
                            );
                            return updatedSharedSpaces;
                          });
                        }}
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
                  onChange={(e) => handleSharedFileChange(i, e.target.files)}
                  className="hidden"
                  id={`shared-images-${i}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`shared-images-${i}`)?.click()
                  }
                  className="w-full py-1 px-2 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  تحميل الصور
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          type="button"
          className="px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
        >
          رجوع
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          المراجعة
        </button>
      </div>
    </div>
  );
}
