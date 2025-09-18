// src/components/landlord/property/PropertyFilters.tsx
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search } from "lucide-react";
import { PropertyStatus, PropertyType } from "@/lib/enum/property_enums";

export interface PropertyFiltersProps {
  onFilterChange: (filters: {
    status: string;
    type: string;
    search: string;
  }) => void;
}

// Debounce hook
function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function PropertyFilters({
  onFilterChange,
}: PropertyFiltersProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  // Notify parent whenever filters change (debounced for search)
  useEffect(() => {
    onFilterChange({ status, type, search: debouncedSearch });
  }, [status, type, debouncedSearch, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Status and Type Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">{t("common.allProperties")}</option>
            <option value={PropertyStatus.Active}>{t("common.active")}</option>
            <option value={PropertyStatus.NotActive}>
              {t("common.inactive")}
            </option>
            <option value={PropertyStatus.Pending}>
              {t("common.pending")}
            </option>
          </select>

          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">{t("common.allTypes")}</option>
            <option value={PropertyType.House}>{t("common.house")}</option>
            <option value={PropertyType.Apartment}>
              {t("common.apartment")}
            </option>
            <option value={PropertyType.Studio}>{t("common.studio")}</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>
    </div>
  );
}
