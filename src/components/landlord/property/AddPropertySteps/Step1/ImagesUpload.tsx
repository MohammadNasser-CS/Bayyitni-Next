// components/property/Step1/ImagesUpload.tsx
import { CreatePropertyRequest } from "@/types/property/property";
import { useRef } from "react";

interface Props {
  t: any;
  localData: CreatePropertyRequest;
  handleImagesChange: (files: FileList) => void;
}

export default function ImagesUpload({
  t,
  localData,
  handleImagesChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="px-4 mt-4">
      <label className="text-sm font-medium">
        {t("landlord.manageListings.addPropertyPage.detailsCard.images.title")}
      </label>
      <div className="flex gap-3 mt-2 flex-wrap">
        {(localData.images ?? []).map((img, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(img)}
            alt={`preview-${idx}`}
            className="h-24 w-24 object-cover rounded-md border"
          />
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-24 w-24 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          {t("landlord.manageListings.addPropertyPage.detailsCard.images.add")}
        </button>

        <input
          type="file"
          ref={inputRef}
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleImagesChange(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
}
