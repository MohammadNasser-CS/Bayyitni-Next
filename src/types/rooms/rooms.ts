export interface BedRoom {
  id: number;
  property_listing_id: number;
  description?: string;
  price_of_bed_per_month: number;
  available_from: string;
  room_type: string;
  number_of_beds: number;
  number_of_available_beds: number;
  created_at: string;
  images: string[];
  is_active: boolean;
  is_available: boolean;
  has_internal_bathroom: boolean;
  has_internal_balcony: boolean;
  has_ac: boolean;
  has_office: boolean;
}
export interface CreateBedroomRequest {
  property_listing_id?: number;
  description?: string;
  price_of_bed_per_month?: number;
  available_from?: string; // YYYY-MM-DD
  is_active?: boolean;
  is_available?: boolean;
  room_type: "single" | "shared";
  number_of_beds?: number;
  number_of_available_beds?: number;
  has_internal_bathroom?: boolean;
  has_internal_balcony?: boolean;
  has_ac?: boolean;
  has_office?: boolean;
  images: File[];
}