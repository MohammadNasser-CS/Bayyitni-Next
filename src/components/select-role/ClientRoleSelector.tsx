"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleCard, { RoleType } from "./RoleCard";
import { updateClerkRole } from "@/utils/users";

interface Props {
  userId: string;
}

const rolesData: Omit<
  React.ComponentProps<typeof RoleCard>,
  "isSelected" | "onSelect"
>[] = [
  {
    role: "student",
    title: "I'm a Student",
    description: "Looking for accommodation near my university",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    points: [
      "Browse available properties",
      "Book rooms instantly",
      "Connect with other students",
    ],
    footerText: "Perfect for university students seeking quality accommodation",
  },
  {
    role: "landlord",
    title: "I'm a Landlord",
    description: "I have properties to rent to students",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    points: [
      "List your properties",
      "Manage bookings",
      "Reach verified students",
    ],
    footerText: "Ideal for property owners and rental managers",
  },
];

export default function ClientRoleSelector({ userId }: Props) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }
    console.log(`selectedRole => ${selectedRole}`);

    setLoading(true);
    try {
      if (selectedRole === "landlord") {
        // Update directly for landlord
        await updateClerkRole(userId, { role: selectedRole });
        router.replace("/");
      } else if (selectedRole === "student") {
        // Don't update yet — collect more data
        router.replace("/student-info");
        console.log(`inner selectedRole => ${selectedRole}`);
      } else {
        alert("Invalid role selected. Please try again.");
        console.warn(`Unexpected role selected: ${selectedRole}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update role. Please try again.");
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
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Bayyitni
          </h1>
          <p className="text-xl opacity-90 mb-2">
            Choose your role to get started
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-slide-up">
          {enhancedRoles.map((role) => (
            <RoleCard key={role.role} {...role} />
          ))}
        </section>

        <footer className="text-center mt-12">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-secondary cursor-pointer hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-10 rounded-lg transition duration-300"
          >
            {loading ? "Loading..." : "Continue"}
          </button>

          <p className="mt-6 text-sm opacity-70">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:opacity-100">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:opacity-100">
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
