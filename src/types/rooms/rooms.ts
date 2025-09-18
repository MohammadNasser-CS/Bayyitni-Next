export interface RoomImage {
  id: number;
  image_url: string;
}

export interface Room {
  id: number;
  description: string;
  price_of_bed_per_month: string;
  available_from: string;
  room_type: string;
  number_of_beds: number;
  number_of_available_beds: number;
  is_active: boolean;
  is_available: boolean;
  has_internal_bathroom: boolean;
  has_internal_balcony: boolean;
  has_ac: boolean;
  has_office: boolean;
  created_at: string;
  updated_at: string;
  images: RoomImage[];
}
export interface CreateRoomRequest {
  description?: string;
  price_of_bed_per_month?: number;
  number_of_beds: number;
  is_active?: boolean;
  room_type: "single" | "shared";
  available_from?: string; // YYYY-MM-DD
  number_of_available_beds: number;
  has_internal_bathroom?: boolean;
  has_internal_balcony?: boolean;
  has_ac?: boolean;
  has_office?: boolean;
  images: File[];
}