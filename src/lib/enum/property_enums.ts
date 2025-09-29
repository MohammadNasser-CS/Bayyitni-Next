// enums/property.ts

// --- Enum values (always English for backend) ---
export enum PropertyType {
  All = "all",
  Apartment = "apartment",
  Studio = "studio",
  House = "house",
  Other = "other",
}

export enum PropertyStatus {
  All = "",
  Active = "active",
  NotActive = "not_active",
  Pending = "pending",
}

export enum PropertyVerification {
  Verified = "verified",
  NotVerified = "not_verified",
}

export enum PropertyGenderPreference {
  All = "all",
  Any = "any",
  Male = "male",
  Female = "female",
}

export enum PropertyAmenity {
  Internet = "has_internet",
  Water = "has_water",
  Electricity = "has_electricity",
  Gas = "has_gas",
}

// --- Localized labels ---
export const PROPERTY_TYPE_LABELS: Record<PropertyType, Record<string, string>> = {
  [PropertyType.All]: { en: "All", ar: "الكل" },
  [PropertyType.Apartment]: { en: "Apartment", ar: "شقة" },
  [PropertyType.Studio]: { en: "Studio", ar: "ستوديو" },
  [PropertyType.House]: { en: "House", ar: "منزل" },
  [PropertyType.Other]: { en: "Other", ar: "أخرى" },
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, Record<string, string>> = {
  [PropertyStatus.All]: { en: "All", ar: "الكل" },
  [PropertyStatus.Active]: { en: "Active", ar: "نشط" },
  [PropertyStatus.NotActive]: { en: "Not Active", ar: "غير نشط" },
  [PropertyStatus.Pending]: { en: "Pending", ar: "قيد الانتظار" },
};

export const PROPERTY_VERIFICATION_LABELS: Record<PropertyVerification, Record<string, string>> = {
  [PropertyVerification.Verified]: { en: "Verified", ar: "تم التحقق" },
  [PropertyVerification.NotVerified]: { en: "Not Verified", ar: "لم يتم التحقق" },
};

export const PROPERTY_GENDER_PREFERENCE_LABELS: Record<PropertyGenderPreference, Record<string, string>> = {
  [PropertyGenderPreference.All]: { en: "All", ar: "الكل" },
  [PropertyGenderPreference.Any]: { en: "Any", ar: "غير محدد" },
  [PropertyGenderPreference.Male]: { en: "Male", ar: "طلاب" },
  [PropertyGenderPreference.Female]: { en: "Female", ar: "طالبات" },
};

export const PROPERTY_AMENITY_LABELS: Record<PropertyAmenity, Record<string, string>> = {
  [PropertyAmenity.Internet]: { en: "Internet", ar: "الإنترنت" },
  [PropertyAmenity.Water]: { en: "Water", ar: "الماء" },
  [PropertyAmenity.Electricity]: { en: "Electricity", ar: "الكهرباء" },
  [PropertyAmenity.Gas]: { en: "Gas", ar: "الغاز" },
};

// --- Helpers to get localized label ---
export function getAmenityLabel(amenity: PropertyAmenity, lang: string = "en"): string {
  return PROPERTY_AMENITY_LABELS[amenity][lang] || PROPERTY_AMENITY_LABELS[amenity].en;
}

export function getAllAmenities(lang: string = "ar"): { value: PropertyAmenity; label: string }[] {
  return Object.values(PropertyAmenity).map((amenity) => ({
    value: amenity,
    label: getAmenityLabel(amenity, lang),
  }));
}
