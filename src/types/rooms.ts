export interface BedRoom {
  id: number;
  price_of_bed_per_month: number;
  available_from: string;
  is_available: boolean;
  is_active: boolean;
  room_type: string;
  number_of_beds: number;
  number_of_available_beds: number;
  has_internal_bathroom: boolean;
  has_internal_balcony: boolean;
  has_ac: boolean;
  has_office: boolean;
  property_listing_id: number;
  created_at: string;
  photos: string[]; // ✅ Add this
}
