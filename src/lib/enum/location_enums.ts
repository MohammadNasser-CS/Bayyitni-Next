// enums/location.ts
export enum CityEnum {
    NABLUS = "nablus",
    RAMALLAH = "ramallah",
}

export enum CountryEnum {
    PALESTINE = "palestine",
}

// Localized labels
export const CITY_LABELS: Record<CityEnum, Record<string, string>> = {
    [CityEnum.NABLUS]: { en: "Nablus", ar: "نابلس" },
    [CityEnum.RAMALLAH]: { en: "Ramallah", ar: "رام الله" },
};

export const COUNTRY_LABELS: Record<CountryEnum, Record<string, string>> = {
    [CountryEnum.PALESTINE]: { en: "Palestine", ar: "فلسطين" },
};
