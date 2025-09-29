"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  PROPERTY_GENDER_PREFERENCE_LABELS,
  PropertyGenderPreference,
} from "@/lib/enum/property_enums";
import { UserPenIcon } from "lucide-react";

interface Props {
  form: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SectionPersonalInfo({ form, onChange }: Props) {
  const { t, language } = useLanguage();
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <UserPenIcon className="h-5 w-5 me-2" />
        {t("auth.SelectRole.student.studentInfo.personalInfo.title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth || today}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
          placeholder={t(
            "auth.SelectRole.student.studentInfo.personalInfo.dateOfBirthPlaceholder"
          )}
          min="1990-01-01" // earliest selectable date
          max={today}
        />
        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          {Object.values(PropertyGenderPreference).map((gender) => (
            <option key={gender} value={gender}>
              {PROPERTY_GENDER_PREFERENCE_LABELS[gender][language]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
