// src/components/landlord/property_details/TopActionsBar.tsx
"use client";

import { useEditMode } from "@/context/EditModeContext";
import Link from "next/link";

export default function TopActionsBar() {
  const { isEditMode, setEditMode } = useEditMode();

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    // You can trigger a save function here
    console.log("Saving changes...");
    setEditMode(false);
  };
  return (
    <div className="flex justify-between items-center mb-8">
      <Link
        href="/"
        className="flex items-center text-labels hover:text-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Properties
      </Link>
      <div className="flex space-x-3">
        {!isEditMode ? (
          <button
            onClick={handleEdit}
            id="edit-toggle-btn"
            className="bg-primary hover:bg-labels text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            Edit Property
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              id="save-btn"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              id="cancel-btn"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
