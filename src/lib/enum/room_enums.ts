// enums/room.ts
export enum RoomType {
    Single = "single",
    Shared = "shared",
}

// Localized labels
export const ROOM_TYPE_LABELS: Record<RoomType, Record<string, string>> = {
    [RoomType.Single]: { en: "Single", ar: "غرفة فردية" },
    [RoomType.Shared]: { en: "Shared", ar: "غرفة مشتركة" },
};
