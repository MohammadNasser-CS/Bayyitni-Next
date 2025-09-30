// src/app/(authed)/landlord/[property_id]/page.tsx
import TopActionsBar from "@/components/landlord/property_details/top_actions_bar/TopActionsBar";
import StudentPropertyHeader from "@/components/student/property_details/property_header/property_details_header";
import StudentRoomTabs from "@/components/student/property_details/roomTabs/roomTabs";
import { PropertyDetail } from "@/types/property/property";
import { getPropertyDetails } from "@/utils/landlord/getPropertyDetails";
import { notFound } from "next/navigation";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ property_id: number }>;
}) {
  const awaitedParams = await params;
  const propertyId = awaitedParams.property_id;

  let propertyDetails: PropertyDetail | null = null;
  console.log("propertyId:", propertyId);

  try {
    propertyDetails = await getPropertyDetails(propertyId);
    console.log("Fetched landlord propertyDetails raw:", propertyDetails);
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
        <StudentPropertyHeader property={propertyDetails} />

        {/* Tabs Navigation */}
        <StudentRoomTabs
          bedRooms={propertyDetails.rooms}
          property_id={propertyId}
        />
      </div>
    </div>
  );
}
