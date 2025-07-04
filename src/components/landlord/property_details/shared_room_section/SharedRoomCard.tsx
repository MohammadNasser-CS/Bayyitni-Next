import { SharedSpaces } from "@/types/sharedSpaces/sharedSpaces";
import Image from "next/image";

export default function SharedSpacesCard({
  space,
  index,
}: {
  space: SharedSpaces;
  index: number;
}) {
  return (
    <>
      <div className="shared-space-card border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{space.room_type}</h3>
          <div className="flex space-x-2">
            <button className="edit-space-btn text-indigo-600 hover:text-indigo-800">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button className="delete-space-btn text-red-600 hover:text-red-800">
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
        </div>

        {/* Images */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Photos</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {space.images?.map((image, index) => (
                <div
                  key={index}
                  className="photo-preview relative rounded-lg overflow-hidden h-20"
                >
                  <Image
                    src={image}
                    alt={space.room_type}
                    className="w-full h-full object-cover"
                  />
                  <div className="photo-actions absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
                    <button className="text-white hover:text-yellow-300">
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="text-white hover:text-red-500">
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
                </div>
              ))}

              {/* Add photo button */}
              <div className="add-photo-btn flex items-center justify-center h-20 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
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
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-600">
            <p>{space.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
