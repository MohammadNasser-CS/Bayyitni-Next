"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /admin/dashboard when user opens /admin
    router.replace("/admin/dashboard");
  }, [router]);

  return null; // nothing is rendered since we immediately redirect
}
