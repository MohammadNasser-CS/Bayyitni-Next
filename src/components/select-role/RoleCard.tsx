// src/app/select-role/components/RoleCard.tsx
import React from "react";

export type RoleType = "student" | "landlord";

interface RoleCardProps {
  role: RoleType;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  points: string[];
  footerText: string;
  isSelected: boolean;
  onSelect: (role: RoleType) => void;
}

export default function RoleCard({
  role,
  title,
  description,
  bgColor,
  iconColor,
  points,
  footerText,
  isSelected,
  onSelect,
}: RoleCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(role)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(role);
        }
      }}
      className={`bg-white rounded-2xl p-8 text-center cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 ${
        isSelected ? "ring-4 ring-orange-400" : ""
      }`}
      aria-pressed={isSelected}
    >
      <div className="mb-6">
        <div
          className={`${bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {role === "student" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-10 h-10 ${iconColor}`}
            >
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-10 h-10 ${iconColor}`}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          )}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {points.map((point) => (
          <div key={point} className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-green-500 mr-3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{point}</span>
          </div>
        ))}
      </div>

      <div
        className={`rounded-lg p-4 font-medium text-sm ${
          role === "student"
            ? "bg-placeholders text-secondary"
            : "bg-placeholders text-secondary"
        }`}
      >
        {footerText}
      </div>
    </div>
  );
}
