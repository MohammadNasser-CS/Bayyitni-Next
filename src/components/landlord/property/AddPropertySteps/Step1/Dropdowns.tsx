// components/property/Step1/Dropdowns.tsx

import {
  PropertyGenderPreference,
  PropertyType,
} from "@/lib/enum/property_enums";
import { CreatePropertyRequest } from "@/types/property/property";

interface Props {
  t: any;
  localData: CreatePropertyRequest;
  handleFieldChange: (key: keyof CreatePropertyRequest, value: any) => void;
  errors: Record<string, string[]>;
}

export default function Dropdowns({
  t,
  localData,
  handleFieldChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 mt-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.propertyType.title"
          )}
        </label>
        <select
          value={localData.property_type ?? ""}
          onChange={(e) => handleFieldChange("property_type", e.target.value)}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300"
        >
          <option value="">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.propertyType.placeholder"
            )}
          </option>
          <option value="apartment">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.propertyType.apartment"
            )}
          </option>
          <option value="studio">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.propertyType.studio"
            )}
          </option>
          <option value="house">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.propertyType.house"
            )}
          </option>
          <option value="other">
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.propertyType.other"
            )}
          </option>
        </select>
        {errors.type?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.title"
          )}
        </label>
        <select
          value={localData.gender_preference ?? ""}
          onChange={(e) =>
            handleFieldChange("gender_preference" as any, e.target.value)
          }
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        >
          <option selected value={PropertyGenderPreference.Any}>
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.placeholder"
            )}
          </option>
          <option value={PropertyGenderPreference.Male}>
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.male"
            )}
          </option>
          <option value={PropertyGenderPreference.Female}>
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.genderPreference.female"
            )}
          </option>
        </select>
        {errors.gender_preference?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>
    </div>
  );
}
