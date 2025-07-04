import React from "react";

export default function AvailabilityCard() {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Room Availability
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Rooms:</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Rooms:</span>
              <span className="font-semibold text-green-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Occupied Rooms:</span>
              <span className="font-semibold text-red-600">2</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="bg-green-500 h-2 rounded-full w-50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
