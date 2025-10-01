"use client";

import type React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StudentNavbar } from "@/components/student/navbar/StudentNavbar";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "student") {
      router.push("/auth/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user?.role !== "student") {
    return null;
  }

  return (
    <>
      <StudentNavbar />
      <main className="w-full p-6">{children}</main>
    </>
  );
}
