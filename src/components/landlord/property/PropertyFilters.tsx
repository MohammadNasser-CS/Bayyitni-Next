// src/components/landlord/property/PropertyFilters.tsx
import { useLanguage } from "@/context/LanguageContext";
import { cp } from "fs";
import { Search } from "lucide-react";

export default function PropertyFilters() {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <select className="form-select">
            <option value={"all"}>{t("common.allProperties")}</option>
            <option value={"active"}>{t("common.active")}</option>
            <option value={"inactive"}>{t("common.inactive")}</option>
            <option value={"pending"}>{t("common.pending")}</option>
          </select>
          <select className="form-select">
            <option value={"all"}>{t("common.allTypes")}</option>
            <option value={"house"}>{t("common.house")}</option>
            <option value={"apartment"}>{t("common.apartment")}</option>
            <option value={"studio"}>{t("common.studio")}</option>
          </select>
        </div>

        <div className="relative w-full lg:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("common.search")}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>
    </div>
  );
}
