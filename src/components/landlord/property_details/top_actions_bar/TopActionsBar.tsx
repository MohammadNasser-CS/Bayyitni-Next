// src/components/landlord/property_details/TopActionsBar.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function TopActionsBar() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between items-center mb-8">
      <Link
        href="/landlord"
        className="flex items-center text-labels hover:text-secondary"
      >
        <ArrowLeftIcon className="h-4 w-4 me-2" />
        {t("property.backToProperties")}
      </Link>
    </div>
  );
}
