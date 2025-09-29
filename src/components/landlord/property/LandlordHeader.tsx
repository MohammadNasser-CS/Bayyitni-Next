import { useLanguage } from "@/context/LanguageContext";
import { Building, Plus } from "lucide-react";
import Link from "next/link";

// src/components/landlord/property/LandlordHeader.tsx
export default function LandlordHeader({ properties }: { properties: number }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 p-3 rounded-lg bg-white shadow-sm border border-gray-200">
      <div className="">
        <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 mb-1">
          {t("landlord.manageListings.header.title")}
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          {t("landlord.manageListings.header.subTitle", { value: properties })}
        </p>
      </div>
      <Link
        href="/landlord/manage-listings/add-new-property"
        aria-label={t("landlord.manageListings.header.addListing")}
        className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white text-base font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-primary/80 transition-all duration-200"
      >
        <Plus className="h-4 w-4" />
        {t("landlord.manageListings.header.addNewProperty")}
      </Link>
    </div>
  );
}
