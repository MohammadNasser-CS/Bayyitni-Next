// src/app/(authed)/landlord/[property_id]/page.tsx
import PropertyHeader from "@/components/landlord/property_details/property_header/property_details_header";
import PropertyStatusBanner from "@/components/landlord/property_details/property_status_banner/PropertyStatusBanner";
import RoomTabs from "@/components/landlord/property_details/roomTabs/roomTabs";
import TopActionsBar from "@/components/landlord/property_details/top_actions_bar/TopActionsBar";
import { EditModeProvider } from "@/context/EditModeContext";
import { PropertyDetail } from "@/types/property/property";
import { getPropertyDetails } from "@/utils/landlord/getPropertyDetails";
import { notFound } from "next/navigation";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ property_id: string }>;
}) {
  const awaitedParams = await params;
  const propertyId = awaitedParams.property_id;

  let propertyDetails: PropertyDetail | null = null;

  try {
    propertyDetails = await getPropertyDetails(propertyId);
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  if (!propertyDetails) {
    notFound();
  }

  return (
    <EditModeProvider>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Top Navigation */}
        <TopActionsBar />

        {/* Property Status Banner */}
        <PropertyStatusBanner
          property={{
            is_active: propertyDetails.is_active,
            available_rooms_count: propertyDetails.available_rooms_count,
          }}
        />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Property Header */}
          <PropertyHeader property={propertyDetails} />

          {/* Tabs Navigation */}
          <RoomTabs bedRooms={propertyDetails.rooms} />
        </div>
      </div>
    </EditModeProvider>
  );
}
