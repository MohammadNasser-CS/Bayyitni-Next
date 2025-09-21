// components/property/Step1/BuildingInfo.tsx
import { CreatePropertyRequest } from "@/types/property/property";

interface Props {
  t: any;
  localData: CreatePropertyRequest;
  handleFieldChange: (key: keyof CreatePropertyRequest, value: any) => void;
  errors: Record<string, string[]>;
}

export default function BuildingInfo({
  t,
  localData,
  handleFieldChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.buildingName.title"
          )}
        </label>
        <input
          value={localData.building_name ?? ""}
          onChange={(e) => handleFieldChange("building_name", e.target.value)}
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.buildingName.placeholder"
          )}
          className="h-8 w-full rounded-md border border-gray-300 px-2 text-sm placeholder-hints"
        />
        {errors.building_name?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.buildingNumber.title"
          )}
        </label>
        <input
          value={localData.building_number ?? ""}
          onChange={(e) => handleFieldChange("building_number", e.target.value)}
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.buildingNumber.placeholder"
          )}
          className="h-8 w-full rounded-md border border-gray-300 px-2 text-sm placeholder-hints"
        />
        {errors.building_number?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>
    </div>
  );
}
