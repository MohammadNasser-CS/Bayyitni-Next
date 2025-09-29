// src/app/select-role/components/RoleCard.tsx
import { CheckCheck, GraduationCap, HouseIcon } from "lucide-react";
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
      className={`bg-cards-background border rounded-2xl p-8 text-center cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary ${
        isSelected ? "ring-4 ring-orange-400" : ""
      }`}
      aria-pressed={isSelected}
    >
      <div className="mb-6">
        <div
          className={`${bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {role === "student" ? (
            <GraduationCap className="h-12 w-12" />
          ) : (
            <HouseIcon className="h-12 w-12" />
          )}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {points.map((point) => (
          <div key={point} className="flex items-center text-gray-600">
            <CheckCheck className="w-5 h-5 text-green-500 me-3" />
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
