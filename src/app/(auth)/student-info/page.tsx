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
import { User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function StudentInfoForm() {
  const { user } = useUser();
  const router = useRouter();
  const { t } = useLanguage();

  const [studnetProfile, setStudnetProfile] = useState({
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
    setStudnetProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClerkRole(user?.id!, {
        role: "student",
        studentProfile: {
          ...studnetProfile,
        },
      });
      router.replace("/");
    } catch (error) {
      console.error("Failed to update student info:", error);
      alert(t("studentInfo.alerts.failedUpdate"));
    }
  };

  return (
    <div id="student-info-page" className="max-w-2xl mx-auto mt-6">
      <ProgressBar />

      <div className="bg-cards-background rounded-2xl shadow-lg p-8 border border-hints">
        <div className="text-center mb-8">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {t("auth.SelectRole.student.studentInfo.title")}
          </h2>
          <p className="text-hints">
            {t("auth.SelectRole.student.studentInfo.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionPersonalInfo form={studnetProfile} onChange={handleChange} />
          <SectionAcademicInfo form={studnetProfile} onChange={handleChange} />
          <SectionPreferences form={studnetProfile} onChange={handleChange} />
          <FormActions />
        </form>
      </div>
    </div>
  );
}
