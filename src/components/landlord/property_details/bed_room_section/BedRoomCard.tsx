import { BedRoom } from "@/types/rooms";

export default function BedRoomCard({
  room,
  index,
}: {
  room: BedRoom;
  index: number;
}) {
  const isBedroom = room.room_type === "bedroom";

  return (
    <>
      <div className="bedroom-card border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            {room.room_type} - {index + 1}
          </h3>
          <div className="flex space-x-2">
            <button className="text-indigo-600 hover:text-indigo-800">
              Edit
            </button>
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  room.is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {room.is_available ? "Available" : "Occupied"}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Rate</p>
              <p className="font-semibold">${room.price_of_bed_per_month}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Photos</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {room.photos.map((url, index) => (
                <div
                  key={index}
                  className="photo-preview relative rounded-lg overflow-hidden h-20"
                >
                  <img
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-2">
            {/* Beds Info */}
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C3E50"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="lucide lucide-bed-double-icon lucide-bed-double w-4 h-4"
              >
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                <path d="M12 4v6" />
                <path d="M2 18h20" />
              </svg>
              <span className="font-semibold">Beds:</span> {room.number_of_beds}{" "}
              total, {room.number_of_available_beds} available
            </p>

            {/* AC */}
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C3E50"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="lucide lucide-air-vent-icon lucide-air-vent w-4 h-4"
              >
                <path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12" />
                <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 8h12" />
                <path d="M6.6 15.572A2 2 0 1 0 10 17v-5" />
              </svg>
              <span className="font-semibold">AC:</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_ac
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_ac ? "Included" : "Not Included"}
              </span>
            </p>

            {/* Bathroom */}
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C3E50"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="lucide lucide-toilet-icon lucide-toilet w-4 h-4"
              >
                <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
                <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
              </svg>
              <span className="font-semibold">Internal Bathroom:</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_internal_bathroom
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_internal_bathroom ? "Private" : "None"}
              </span>
            </p>

            {/* Balcony */}
            <p className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 15h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 12v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 12v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="8"
                  y="6"
                  width="8"
                  height="6"
                  rx="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-semibold">Internal Balcony:</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_internal_balcony
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_internal_balcony ? "Yes" : "No"}
              </span>
            </p>

            {/* Office */}
            <p className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect
                  x="7"
                  y="4"
                  width="10"
                  height="6"
                  rx="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 10v2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 14h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 14v4M18 14v4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-semibold">Office:</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  room.has_office
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.has_office ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
