// src/types/property.ts
export interface Property {
  id: number;
  title: string;
  building_name: string;
  building_number: string;
  landlord_id: string;
  description: string;
  floor_number: number;
  location_lat: number;
  location_lon: number;
  is_active: boolean;
  gender_preference: string;
  has_gas: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  property_type: string;
  property_images: string[];
  city: string;
  country: string;
  number_of_rooms: number;
  verification_status:string;
  created_at: string;
}

  // src/types/property.ts

export interface CreatePropertyRequest {
  title: string;
  building_name: string;
  building_number: string;
  landlord_id: string;
  description: string;
  floor_number: number;
  location_lat: number;
  location_lon: number;
  is_active: boolean;
  gender_preference: string;
  has_gas: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  property_type: string;
  city: string;
  country: string;
  number_of_rooms: number;
  verification_status:string;
  property_images?: File[]; // optional if image upload is separate
}
