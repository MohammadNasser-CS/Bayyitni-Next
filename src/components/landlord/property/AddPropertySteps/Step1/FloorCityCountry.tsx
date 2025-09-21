// components/property/Step1/FloorCityCountry.tsx
import { CreatePropertyRequest } from "@/types/property/property";
import { AMENITIES } from "@/constants/amenities";
import {
  CITY_LABELS,
  CityEnum,
  COUNTRY_LABELS,
  CountryEnum,
} from "@/lib/enum/location_enums";

interface Props {
  t: any;
  localData: CreatePropertyRequest;
  handleFieldChange: (key: keyof CreatePropertyRequest, value: any) => void;
  toggleAmenity: (key: string) => void;
  errors: Record<string, string[]>;
}

export default function FloorCityCountry({
  t,
  localData,
  handleFieldChange,
  toggleAmenity,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.floorNumber.title"
          )}
        </label>
        <input
          type="number"
          value={localData.floor_number ?? ""}
          onChange={(e) =>
            handleFieldChange(
              "floor_number",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          min={-3}
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.floorNumber.placeholder"
          )}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        />
        {errors.floor_number?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t("landlord.manageListings.addPropertyPage.detailsCard.city.title")}{" "}
          *
        </label>
        <select
          value={localData.city ?? ""}
          onChange={(e) => handleFieldChange("city", e.target.value)}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        >
          {Object.values(CityEnum).map((city) => (
            <option key={city} value={city}>
              {CITY_LABELS[city][t.language]}
            </option>
          ))}
        </select>
        {errors.city?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.country.title"
          )}{" "}
          *
        </label>
        <select
          value={localData.country ?? ""}
          onChange={(e) => handleFieldChange("country", e.target.value)}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        >
          {Object.values(CountryEnum).map((country) => (
            <option key={country} value={country}>
              {COUNTRY_LABELS[country][t.language]}
            </option>
          ))}
        </select>
        {errors.country?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t(
            "landlord.manageListings.addPropertyPage.detailsCard.numberOfRooms.title"
          )}
        </label>
        <input
          type="number"
          value={localData.rooms_count ?? 0}
          onChange={(e) =>
            handleFieldChange("rooms_count", Number(e.target.value))
          }
          placeholder={t(
            "landlord.manageListings.addPropertyPage.detailsCard.numberOfRooms.placeholder"
          )}
          className="h-8 w-full rounded-md border px-2 text-sm border-gray-300 placeholder-hints"
        />
        {errors.number_of_rooms?.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}

        {/* Amenities */}
        <div className="col-span-1 md:col-span-4 flex flex-wrap gap-2 mt-1">
          {AMENITIES.map(({ key, i18nKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleAmenity(key)}
              className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                (localData as any)[key]
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {t(i18nKey)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
