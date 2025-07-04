// src/types/property.ts
export interface Property {
  id: number;
  title: string;
  building_name: string;
  building_number: string;
  landlord_id: string;
  description: string;
  floor_number: number;
  location_lat: string;
  location_lon: string;
  is_active: boolean;
  gender_preference: string;
  has_gas: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  property_type: string;
  property_image: string;
  city: string;
  country: string;
  number_of_rooms: number;
  created_at: string;
}

  