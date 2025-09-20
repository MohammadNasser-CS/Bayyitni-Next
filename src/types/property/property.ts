// src/types/property.ts

import { PropertyGenderPreference, PropertyStatus, PropertyType } from "@/lib/enum/property_enums";
import { CreateRoomRequest, Room } from "../rooms/rooms";
import { CityEnum, CountryEnum } from "@/lib/enum/location_enums";

export interface PropertyImage {
  id: number;
  image_url: string;
}

export interface PropertyDetail {
  id: number;
  landlord_id: string;
  building_name: string;
  building_number: string;
  title: string;
  description: string;
  floor_number: number;
  location_lat: string;
  location_lon: string;
  status: PropertyStatus;
  gender_preference: PropertyGenderPreference;
  property_type: PropertyType;
  city: CityEnum;
  country: CountryEnum;
  images: PropertyImage[];
  rooms_count: number;
  available_rooms_count: number;
  has_gas: false;
  has_electricity: false;
  has_water: false;
  has_internet: false;
  rooms: Room[];
}

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
  status: PropertyStatus;
  gender_preference: PropertyGenderPreference;
  has_gas: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  property_type: PropertyType;
  images: PropertyImage[]; // ✅ changed
  city: CityEnum;
  country: CountryEnum;
  rooms_count: number;
  // verification_status: string;
  available_rooms_count?: number;
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
  status: PropertyStatus;
  gender_preference: PropertyGenderPreference;
  has_gas: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  property_type: PropertyType;
  city: CityEnum;
  country: CountryEnum;
  rooms_count: number;
  // verification_status: string;
  images?: File[]; // optional if image upload is separate
  rooms: CreateRoomRequest[];
}

export interface UpdatePropertyData {
  title?: string;
  description?: string;
  gender_preference?: PropertyGenderPreference;
  has_water?: boolean;
  has_gas?: boolean;
  has_internet?: boolean;
  has_electricity?: boolean;
  location_lat?: number;
  location_lon?: number;
}