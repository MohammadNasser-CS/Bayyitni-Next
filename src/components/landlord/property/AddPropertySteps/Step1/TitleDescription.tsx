// components/property/Step1/TitleDescription.tsx
import { CreatePropertyRequest } from "@/types/property/property";

interface Props {
  t: any;
  localData: CreatePropertyRequest;
  handleFieldChange: (key: keyof CreatePropertyRequest, value: any) => void;
  errors: Record<string, string[]>;
}

export default function TitleDescription({
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
            "landlord.manageListings.addPropertyPage.detailsCard.propertyTitle.title"
          )}{" "}
          *
        </label>
        <input
          value={localData.title ?? ""}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.propertyTitle.placeholder"
          )}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        />
        {errors.title?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.propertyDescription.title"
          )}
        </label>
        <textarea
          value={localData.description ?? ""}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.propertyDescription.placeholder"
          )}
          rows={2}
          className="w-full rounded-md border px-2 py-1 text-sm border-gray-300 placeholder-hints"
        />
        {errors.description?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>
    </div>
  );
}
