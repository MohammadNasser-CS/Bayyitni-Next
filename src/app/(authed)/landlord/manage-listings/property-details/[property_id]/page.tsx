// src/app/(authed)/landlord/[property_id]/page.tsx
import AvailabilityCard from "@/components/landlord/property_details/AvailabilityCard";
import ChatSupportCard from "@/components/landlord/property_details/ChatSupportCard";
import PropertyHeader from "@/components/landlord/property_details/property_header/property_details_header";
import PropertyStatusBanner from "@/components/landlord/property_details/property_status_banner/PropertyStatusBanner";
import RoomTabs from "@/components/landlord/property_details/roomTabs/roomTabs";
import StudentInquiriesCard from "@/components/landlord/property_details/StudentInquiriesCard";
import TopActionsBar from "@/components/landlord/property_details/top_actions_bar/TopActionsBar";
import { EditModeProvider } from "@/context/EditModeContext";
import { mockListings } from "@/lib/mock-data";
import { Property } from "@/types/property/property";
import { BedRoom } from "@/types/rooms/rooms";
import { SharedSpaces } from "@/types/rooms/sharedSpaces";
import { getPropertyDetails } from "@/utils/landlord/getPropertyDetails";
import { notFound } from "next/navigation";
export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ property_id: string }>;
}) {
  const awaitedParams = await params; // await params here
  const propertyId = awaitedParams.property_id;
  console.log(`propertyId => ${propertyId}`);
  let property: Property | null = null;

  try {
    // property = await getPropertyDetails(propertyId);
    property = mockListings[0];
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
  console.log(`property => ${property?.building_name}`);
  if (!property) {
    notFound(); // or render a fallback message instead
  }

  const bedRooms: BedRoom[] = [
    {
      id: 1,
      price_of_bed_per_month: 850,
      available_from: "2025-07-15",
      is_available: true,
      is_active: true,
      room_type: "Bedroom",
      number_of_beds: 1,
      number_of_available_beds: 1,
      has_internal_bathroom: true,
      has_internal_balcony: true,
      has_ac: true,
      has_office: false,
      property_listing_id: 101,
      created_at: "2025-07-01T10:00:00Z",
      images: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      ],
    },
    {
      id: 2,
      price_of_bed_per_month: 750,
      available_from: "2025-08-01",
      is_available: false,
      is_active: true,
      room_type: "Bedroom",
      number_of_beds: 2,
      number_of_available_beds: 0,
      has_internal_bathroom: false,
      has_internal_balcony: false,
      has_ac: false,
      has_office: true,
      property_listing_id: 101,
      created_at: "2025-07-01T11:00:00Z",
      images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"],
    },
    {
      id: 3,
      price_of_bed_per_month: 600,
      available_from: "2025-07-20",
      is_available: true,
      is_active: true,
      room_type: "Bedroom",
      number_of_beds: 3,
      number_of_available_beds: 1,
      has_internal_bathroom: false,
      has_internal_balcony: false,
      has_ac: true,
      has_office: false,
      property_listing_id: 101,
      created_at: "2025-07-01T12:00:00Z",
      images: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457",
      ],
    },
  ];

  const sharedSpaces: SharedSpaces[] = [
    {
      id: 1,
      property_id: 101,
      room_type: "Kitchen",
      description:
        "Spacious kitchen equipped with modern appliances, including a gas stove, fridge, and microwave. Ample counter space and storage cabinets available.",
      images: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba",
        "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
      ],
      created_at: "2025-07-02T12:00:00Z",
    },
    {
      id: 2,
      property_id: 101,
      room_type: "Living Room",
      description:
        "Cozy living room furnished with a sofa set, coffee table, and smart TV. Perfect for socializing and relaxing.",
      images: [
        "https://images.unsplash.com/photo-1586105251261-72a756497a12",
        "https://images.unsplash.com/photo-1588881088101-bbbd88aa8730",
      ],
      created_at: "2025-07-02T12:00:00Z",
    },
    {
      id: 3,
      property_id: 101,
      room_type: "Bathroom",
      description:
        "Shared bathroom with modern fixtures, hot water shower, vanity mirror, and ample lighting.",
      images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
      created_at: "2025-07-02T12:00:00Z",
    },
    {
      id: 4,
      property_id: 101,
      room_type: "Laundry Room",
      description:
        "Laundry room with a fully automatic washing machine, drying rack, and ironing board.",
      images: ["https://images.unsplash.com/photo-1591533741474-cd1f1e72ef7f"],
      created_at: "2025-07-02T12:00:00Z",
    },
    {
      id: 5,
      property_id: 101,
      room_type: "Dining Area",
      description:
        "A bright dining space with a 6-seat table, ambient lighting, and close proximity to the kitchen.",
      images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
        "https://images.unsplash.com/photo-1598300058431-8fcab95ed777",
      ],
      created_at: "2025-07-02T12:00:00Z",
    },
  ];

  return (
    <>
      <EditModeProvider>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* <!-- Top Navigation --> */}
          <TopActionsBar />
          {/* <!-- Property Status Banner --> */}
          <PropertyStatusBanner />

          {/* <!-- Main Content --> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* <!-- Left Column - Property Details --> */}
            <div className="lg:col-span-2">
              {/* <!-- Property Header --> */}
              <PropertyHeader property={property} />

              {/* <!-- Tabs Navigation --> */}
              <RoomTabs bedRooms={bedRooms} sharedSpaces={sharedSpaces} />
            </div>

            {/* <!-- Right Column - Sidebar --> */}
            <div className="lg:col-span-1">
              {/* <!-- Availability Card --> */}
              <AvailabilityCard />
              {/* <!-- Student Inquiries Card --> */}
              <StudentInquiriesCard />
              {/* <!-- Chat Support Card --> */}
              <ChatSupportCard />
            </div>
          </div>
        </div>
      </EditModeProvider>
    </>
  );
}
