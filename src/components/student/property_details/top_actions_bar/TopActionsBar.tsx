// src/components/landlord/property_details/TopActionsBar.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function StudentTopActionsBar() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between items-center mb-8 border w-fit px-3 bg-secondary/30 backdrop-blur-xl hover:bg-placeholders">
      <Link
        href="/student"
        className="flex items-center text-labels hover:text-secondary"
      >
        <ArrowLeftIcon className="h-4 w-4 me-2" />
        {t("property.backToProperties")}
      </Link>
    </div>
  );
}
