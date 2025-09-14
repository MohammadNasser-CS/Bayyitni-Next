// src/app/(authed)/landlord/[property_id]/page.tsx
import PropertyHeader from "@/components/landlord/property_details/property_header/property_details_header";
import RoomTabs from "@/components/landlord/property_details/roomTabs/roomTabs";
import TopActionsBar from "@/components/landlord/property_details/top_actions_bar/TopActionsBar";
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Top Navigation */}
      <TopActionsBar />

      {/* Main Content */}
      <div className="space-y-8">
        {/* Property Header */}
        <PropertyHeader property={propertyDetails} />

        {/* Tabs Navigation */}
        <RoomTabs bedRooms={propertyDetails.rooms} />
      </div>
    </div>
  );
}
