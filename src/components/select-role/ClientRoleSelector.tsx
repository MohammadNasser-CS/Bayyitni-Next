"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleCard, { RoleType } from "./RoleCard";
import { updateClerkRole } from "@/utils/users";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  userId: string;
}

export default function ClientRoleSelector({ userId }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<RoleType | "">("");
  const [loading, setLoading] = useState(false);

  const rolesData: Omit<
    React.ComponentProps<typeof RoleCard>,
    "isSelected" | "onSelect"
  >[] = [
    {
      role: "student",
      title: t("auth.SelectRole.student.title"),
      description: t("auth.SelectRole.student.description"),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      points: [
        t("auth.SelectRole.student.points.0"),
        t("auth.SelectRole.student.points.1"),
        t("auth.SelectRole.student.points.2"),
      ],
      footerText: t("auth.SelectRole.student.footerText"),
    },
    {
      role: "landlord",
      title: t("auth.SelectRole.landlord.title"),
      description: t("auth.SelectRole.landlord.description"),
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      points: [
        t("auth.SelectRole.landlord.points.0"),
        t("auth.SelectRole.landlord.points.1"),
        t("auth.SelectRole.landlord.points.2"),
      ],
      footerText: t("auth.SelectRole.landlord.footerText"),
    },
  ];

  const handleSubmit = async () => {
    if (!selectedRole) {
      alert(t("auth.SelectRole.alerts.noRole"));
      return;
    }

    setLoading(true);
    try {
      if (selectedRole === "landlord") {
        await updateClerkRole(userId, { role: selectedRole });
        router.replace("/");
      } else if (selectedRole === "student") {
        router.replace("/student-info");
      } else {
        alert(t("auth.SelectRole.alerts.invalidRole"));
      }
    } catch (error) {
      console.error(error);
      alert(t("auth.SelectRole.alerts.failedUpdate"));
    } finally {
      setLoading(false);
    }
  };

  const enhancedRoles = rolesData.map((role) => ({
    ...role,
    isSelected: selectedRole === role.role,
    onSelect: () => setSelectedRole(role.role),
  }));

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("auth.SelectRole.welcome")}
          </h1>
          <p className="text-xl opacity-90 mb-2">
            {t("auth.SelectRole.chooseRole")}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-slide-up">
          {enhancedRoles.map((role) => (
            <RoleCard key={role.role} {...role} />
          ))}
        </section>

        <footer className="text-center mt-7">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary cursor-pointer hover:bg-labels disabled:opacity-50 text-white font-medium py-3 px-10 rounded-lg transition duration-300"
          >
            {loading
              ? t("auth.SelectRole.loading")
              : t("auth.SelectRole.continue")}
          </button>

          <p className="mt-6 text-sm opacity-70">
            {t("auth.SelectRole.agree")}{" "}
            <a href="/legal/terms" className="underline hover:opacity-100">
              {t("auth.SelectRole.terms")}
            </a>{" "}
            {t("auth.SelectRole.and")}{" "}
            <a href="/legal/privacy" className="underline hover:opacity-100">
              {t("auth.SelectRole.privacy")}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
