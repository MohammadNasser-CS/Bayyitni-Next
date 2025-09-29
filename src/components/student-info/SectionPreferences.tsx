"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ThumbsUp } from "lucide-react";

interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionPreferences({ form, onChange }: Props) {
  const { t } = useLanguage();

  const budgetOptions = [
    {
      value: "",
      label: t("auth.SelectRole.student.studentInfo.preferences.budget.select"),
    },
    {
      value: "under-500",
      label: t(
        "auth.SelectRole.student.studentInfo.preferences.budget.under500"
      ),
    },
    {
      value: "500-750",
      label: t(
        "auth.SelectRole.student.studentInfo.preferences.budget.between500_750"
      ),
    },
    {
      value: "750-1000",
      label: t(
        "auth.SelectRole.student.studentInfo.preferences.budget.between750_1000"
      ),
    },
    {
      value: "over-1000",
      label: t(
        "auth.SelectRole.student.studentInfo.preferences.budget.over1000"
      ),
    },
  ];

  const roomTypeOptions = [
    {
      value: "no-preference",
      label: t(
        "auth.SelectRole.student.studentInfo.preferences.room.noPreference"
      ),
    },
    {
      value: "single",
      label: t("auth.SelectRole.student.studentInfo.preferences.room.single"),
    },
    {
      value: "shared",
      label: t("auth.SelectRole.student.studentInfo.preferences.room.shared"),
    },
    {
      value: "studio",
      label: t("auth.SelectRole.student.studentInfo.preferences.room.studio"),
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <ThumbsUp className="h-5 w-5 me-2" />
        {t("auth.SelectRole.student.studentInfo.preferences.title")}{" "}
        <span className="text-sm text-gray-500 ms-1">
          ({t("auth.SelectRole.student.studentInfo.preferences.optional")})
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="budgetRange"
          value={form.budgetRange}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          name="roomType"
          value={form.roomType}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          {roomTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
