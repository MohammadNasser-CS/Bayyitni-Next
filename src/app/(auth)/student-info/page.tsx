"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { updateClerkRole } from "@/utils/users";
import ProgressBar from "@/components/student-info/ProgressBar";
import SectionPersonalInfo from "@/components/student-info/SectionPersonalInfo";
import SectionAcademicInfo from "@/components/student-info/SectionAcademicInfo";
import SectionPreferences from "@/components/student-info/SectionPreferences";
import FormActions from "@/components/student-info/FormActions";

export default function StudentInfoForm() {
  const { user } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({
    dateOfBirth: "",
    gender: "",
    universityName: "",
    college: "",
    degree: "",
    specialization: "",
    budgetRange: "",
    roomType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClerkRole(user?.id!, {
        role: "student",
        ...form,
      });
      router.replace("/");
    } catch (error) {
      console.error("Failed to update student info:", error);
      alert("Failed to complete registration.");
    }
  };

  return (
    <div id="student-info-page" className="max-w-2xl mx-auto">
      <ProgressBar />

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Tell us about yourself
          </h2>
          <p className="text-gray-600">
            Help us find the perfect accommodation for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionPersonalInfo form={form} onChange={handleChange} />
          <SectionAcademicInfo form={form} onChange={handleChange} />
          <SectionPreferences form={form} onChange={handleChange} />
          <FormActions />
        </form>
      </div>
    </div>
  );
}
