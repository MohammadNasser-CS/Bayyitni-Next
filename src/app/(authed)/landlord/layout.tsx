"use client";

import type React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LandlordNavbar } from "@/components/landlord/navbar/LandlordNavbar";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "landlord") {
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

  if (user?.role !== "landlord") {
    return null;
  }

  return (
    <>
      <LandlordNavbar />
      <main className="w-full p-6">{children}</main>
    </>
  );
}
