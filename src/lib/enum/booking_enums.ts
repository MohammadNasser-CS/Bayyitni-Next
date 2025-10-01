// enums/booking.ts
export enum BookingType {
    BED = "bed",
    EXCLUSIVE = "exclusive",
}

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
    FINISHED = 'finished',
}



// Localized labels
export const BOOKING_TYPE_LABELS: Record<BookingType, Record<string, string>> = {
    [BookingType.BED]: { en: "Bed", ar: "سرير" },
    [BookingType.EXCLUSIVE]: { en: "Exclusive", ar: "غرفة كاملة" },
};


export const BOOKING_STATUS_LABELS: Record<BookingStatus, Record<string, string>> = {
    [BookingStatus.PENDING]: { en: "Pending", ar: "قيد الانتظار" },
    [BookingStatus.CONFIRMED]: { en: "Confirmed", ar: "مؤكد" },
    [BookingStatus.CANCELLED]: { en: "Cancelled", ar: "ملغي" },
    [BookingStatus.ACTIVE]: { en: "Active", ar: "نشط" },
    [BookingStatus.FINISHED]: { en: "Finished", ar: "انتهى" },
};
