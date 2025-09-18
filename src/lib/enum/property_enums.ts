// enums/property.ts

// --- Enum values (always English for backend) ---
export enum PropertyType {
  Apartment = "apartment",
  Studio = "studio",
  House = "house",
  Other = "other",
}

export enum PropertyStatus {
  Active = "active",
  NotActive = "not_active",
  Pending = "pending",
}

export enum PropertyVerification {
  Verified = "verified",
  NotVerified = "not_verified",
}

export enum PropertyGenderPreference {
  Any = "any",
  Male = "male",
  Female = "female",
}

// --- Localized labels ---
export const PROPERTY_TYPE_LABELS: Record<PropertyType, Record<string, string>> = {
  [PropertyType.Apartment]: { en: "Apartment", ar: "شقة" },
  [PropertyType.Studio]: { en: "Studio", ar: "ستوديو" },
  [PropertyType.House]: { en: "House", ar: "منزل" },
  [PropertyType.Other]: { en: "Other", ar: "أخرى" },
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, Record<string, string>> = {
  [PropertyStatus.Active]: { en: "Active", ar: "نشط" },
  [PropertyStatus.NotActive]: { en: "Not Active", ar: "غير نشط" },
  [PropertyStatus.Pending]: { en: "Pending", ar: "قيد الانتظار" },
};

export const PROPERTY_VERIFICATION_LABELS: Record<PropertyVerification, Record<string, string>> = {
  [PropertyVerification.Verified]: { en: "Verified", ar: "تم التحقق" },
  [PropertyVerification.NotVerified]: { en: "Not Verified", ar: "لم يتم التحقق" },
};

export const PROPERTY_GENDER_PREFERENCE_LABELS: Record<PropertyGenderPreference, Record<string, string>> = {
  [PropertyGenderPreference.Any]: { en: "Any", ar: "أي" },
  [PropertyGenderPreference.Male]: { en: "Male", ar: "ذكر" },
  [PropertyGenderPreference.Female]: { en: "Female", ar: "أنثى" },
};
