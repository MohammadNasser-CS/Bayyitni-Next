import type { Notification } from "@/types/notification"
import { Booking, Payment } from "@/types/payments"
import type { Property } from "@/types/property/property"
import type { BedRoom } from "@/types/rooms/rooms"
import type { SharedSpaces } from "@/types/rooms/sharedSpaces"


export const mockListings: Property[] = [
  {
    id: 1,
    landlord_id: "2",
    building_name: "Al-Noor Residence",
    building_number: "123",
    title: "Modern Student Accommodation near KSU",
    description:
      "Fully furnished rooms with all amenities, perfect for university students. Located just 5 minutes from King Saud University campus.",
    floor_number: 2,
    number_of_rooms: 4,
    location_lat: 24.7136,
    location_lon: 46.6753,
    is_active: true,
    gender_preference: "male",
    has_gas: true,
    has_electricity: true,
    has_water: true,
    has_internet: true,
    property_type: "apartment",
    city: "Riyadh",
    country: "Saudi Arabia",
    created_at: new Date().toISOString(),
    property_image: "https://cdn.sanity.io/images/v48q37k7/production/d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg?auto=format&fit=max&q=90&w=1500",
    verification_status:"verified",
  },
  {
    id: 2,
    landlord_id: "2",
    building_name: "Green Valley Complex",
    building_number: "456",
    title: "Spacious Rooms for Female Students",
    description:
      "Safe and comfortable accommodation designed specifically for female students. Includes study areas and recreational facilities.",
    floor_number: 1,
    number_of_rooms: 6,
    location_lat: 24.7236,
    location_lon: 46.6853,
    is_active: true,
    gender_preference: "female",
    has_gas: true,
    has_electricity: true,
    has_water: true,
    has_internet: true,
    property_type: "villa",
    city: "Riyadh",
    country: "Saudi Arabia",
    created_at: new Date().toISOString(),
    property_image: "https://cdn.sanity.io/images/v48q37k7/production/d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg?auto=format&fit=max&q=90&w=1500",
    verification_status:"pending",
  },
  {
    id: 3,
    landlord_id: "2",
    building_name: "University Heights",
    building_number: "789",
    title: "Budget-Friendly Student Housing",
    description:
      "Affordable accommodation option for students on a budget. Clean, safe, and well-maintained facilities.",
    floor_number: 3,
    number_of_rooms: 8,
    location_lat: 24.7036,
    location_lon: 46.6653,
    is_active: true,
    gender_preference: "mixed",
    has_gas: true,
    has_electricity: true,
    has_water: true,
    has_internet: true,
    property_type: "apartment",
    property_image: "https://cdn.sanity.io/images/v48q37k7/production/d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg?auto=format&fit=max&q=90&w=1500",
    city: "Riyadh",
    country: "Saudi Arabia",
    created_at: new Date().toISOString(),
    verification_status:"rejected",
  },
]

export const mockRooms: BedRoom[] = [
  {
    id: 1,
    property_listing_id: 1,
    description: "Spacious single room with private bathroom",
    price_of_bed_per_month: 1200,
    available_from: new Date().toISOString(),
    is_active: true,
    is_available: true,
    room_type: "single",
    number_of_beds: 1,
    number_of_available_beds: 1,
    has_internal_bathroom: true,
    has_internal_balcony: false,
    has_ac: true,
    has_office: true,
    created_at: new Date().toISOString(),
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
  },
  {
    id: 2,
    property_listing_id: 1,
    description: "Shared room with 2 beds, great for friends",
    price_of_bed_per_month: 800,
    available_from: new Date().toISOString(),
    is_active: true,
    is_available: true,
    room_type: "shared",
    number_of_beds: 2,
    number_of_available_beds: 1,
    has_internal_bathroom: false,
    has_internal_balcony: true,
    has_ac: true,
    has_office: false,
    created_at: new Date().toISOString(),
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
  },
  {
    id:3,
    property_listing_id: 2,
    description: "Premium single room with study area",
    price_of_bed_per_month: 1500,
    available_from: new Date().toISOString(),
    is_active: true,
    is_available: true,
    room_type: "single",
    number_of_beds: 1,
    number_of_available_beds: 1,
    has_internal_bathroom: true,
    has_internal_balcony: true,
    has_ac: true,
    has_office: true,
    created_at: new Date().toISOString(),
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
  },
  {
    id: 4,
    property_listing_id: 3,
    description: "Budget-friendly shared accommodation",
    price_of_bed_per_month: 600,
    available_from: new Date().toISOString(),
    is_active: true,
    is_available: true,
    room_type: "shared",
    number_of_beds: 3,
    number_of_available_beds: 2,
    has_internal_bathroom: false,
    has_internal_balcony: false,
    has_ac: false,
    has_office: false,
    created_at: new Date().toISOString(),
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
  },
]


export const mockSharedSpaces: SharedSpaces[] = [
  { 
    id: 1,
    property_id: 1, 
    room_type: "kitchen",
    description: "Fully equipped shared kitchen with modern appliances",
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    property_id: 1,
    room_type: "living_room",
    description: "Comfortable living area with TV and seating",
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    property_id: 2,
    room_type: "study_room",
    description: "Quiet study area with desks and good lighting",
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457"],
    created_at: new Date().toISOString(),
  },
]


export const mockNotifications: Notification[] = [
  // Student notifications
  {
    id: "1",
    user_id: "1",
    message: "Your booking request for Al-Noor Residence has been approved!",
    type: "booking",
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    user_id: "1",
    message: "Payment reminder: Your rent payment of SAR 1,200 is due in 3 days",
    type: "payment",
    is_read: false,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "3",
    user_id: "1",
    message: "New listing matches your preferences: Modern Studio near KFUPM",
    type: "listing",
    is_read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "4",
    user_id: "1",
    message: "Welcome to Bayyitni! Complete your profile to get better recommendations",
    type: "system",
    is_read: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },

  // Landlord notifications
  {
    id: "5",
    user_id: "2",
    message: "New booking request from Ahmed Al-Rashid for Green Valley Complex",
    type: "booking",
    is_read: false,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "6",
    user_id: "2",
    message: "Payment confirmed: SAR 1,500 received from Sara Mohammed",
    type: "payment",
    is_read: false,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: "7",
    user_id: "2",
    message: "Your listing 'University Heights' has been approved and is now live",
    type: "listing",
    is_read: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "8",
    user_id: "2",
    message: "Monthly payout of SAR 8,500 has been processed to your account",
    type: "system",
    is_read: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },

  // Admin notifications
  {
    id: "9",
    user_id: "3",
    message: "New listing pending verification: 'Luxury Student Apartments'",
    type: "listing",
    is_read: false,
    created_at: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "10",
    user_id: "3",
    message: "Payment dispute reported: Booking ID #12345 requires review",
    type: "payment",
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "11",
    user_id: "3",
    message: "System alert: High booking volume detected - monitor server performance",
    type: "system",
    is_read: true,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "12",
    user_id: "3",
    message: "New landlord registration requires verification: Mohammed Al-Faisal",
    type: "booking",
    is_read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
]
export const mockBookings: Booking[] = [
  {
    id: 1,
    student_id: 1,
    listing_id: 1,
    room_id: 1,
    status: "pending",
    start_date: new Date("2024-02-01"),
    end_date: new Date("2024-06-30"),
    payment_status: "unpaid",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    student_id: 1,
    listing_id: 2,
    room_id: 3,
    status: "approved",
    start_date: new Date("2024-03-01"),
    end_date: new Date("2024-08-31"),
    payment_status: "unpaid",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    student_id: 1,
    listing_id: 3,
    room_id: 4,
    status: "active",
    start_date: new Date("2024-01-15"),
    end_date: new Date("2024-07-15"),
    payment_status: "paid",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
]

export const mockBookmarks= [
  {
    id: 1,
    student_id: 1,
    property_listing_id: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 1,
    student_id: 1,
    property_listing_id: 2,
    created_at: new Date().toISOString(),
  },
]


export const mockPayments: Payment[] = [
  {
    id: 1,
    booking_id: 1,
    amount: 1200,
    method: "iban_transfer",
    status: "pending",
    reference_note: "Transfer from Ahmed Hassan - Ref: TXN123456",
    timestamp: new Date("2024-01-15T10:30:00"),
    created_at: new Date("2024-01-15T10:30:00"),
    updated_at: new Date("2024-01-15T10:30:00"),
  },
  {
    id: 2,
    booking_id: 3,
    amount: 800,
    method: "cash",
    status: "confirmed",
    reference_note: "Cash payment received at office by Sara Mohammed",
    timestamp: new Date("2024-01-14T14:20:00"),
    created_at: new Date("2024-01-14T14:20:00"),
    updated_at: new Date("2024-01-14T15:00:00"),
  },
  {
    id: 3,
    booking_id: 2,
    amount: 1500,
    method: "iban_transfer",
    status: "rejected",
    reference_note: "Invalid transfer reference - unable to verify",
    timestamp: new Date("2024-01-13T09:15:00"),
    created_at: new Date("2024-01-13T09:15:00"),
    updated_at: new Date("2024-01-13T16:30:00"),
  },
]
