// src/types/property.ts
export interface SharedSpaces {
  id: number;
  property_id: number,
  room_type: string;
  description?: string;
  images: string[];
  created_at: string;
  }
  
  export interface CreateSharedSpaceRequest {
    room_type: "kitchen" | "bathroom" | "living_room" | "laundry" | "other";
    description?: string;
    property_id?: number;
    images: File[];
  }