"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building,
  Search,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { mockListings, mockRooms, mockBookings } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import LandlordHeader from "@/components/landlord/property/LandlordHeader";
import PropertyFilters from "@/components/landlord/property/PropertyFilters";
import PropertyCard from "@/components/landlord/property/PropertyCard";
import Pagination from "@/components/landlord/property/Pagination";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ManageListingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const { t } = useLanguage();
  // Filter listings
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.building_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && listing.is_active) ||
      (statusFilter === "inactive" && !listing.is_active);

    const matchesVerification =
      verificationFilter === "all" ||
      listing.verification_status === verificationFilter;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  const handleToggleActive = (listingId: number) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              is_active: !listing.is_active,
              updated_at: new Date(),
            }
          : listing
      )
    );
    toast.success("Listing status updated");
  };

  const handleDeleteListing = (listingId: number) => {
    setListings((prev) => prev.filter((listing) => listing.id !== listingId));
    toast.success("Listing deleted successfully");
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
            Verified
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const getListingStats = (listingId: number) => {
    const rooms = mockRooms.filter(
      (room) => room.property_listing_id === listingId
    );
    const totalBeds = rooms.reduce((sum, room) => sum + room.number_of_beds, 0);
    const availableBeds = rooms.reduce(
      (sum, room) => sum + room.number_of_available_beds,
      0
    );
    const bookings = mockBookings.filter(
      (booking) => booking.listing_id === listingId
    );
    const activeBookings = bookings.filter(
      (booking) => booking.status === "active"
    ).length;

    return { totalBeds, availableBeds, activeBookings, rooms: rooms.length };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <LandlordHeader properties={2} />
      {/* Filters */}
      <PropertyFilters />
      {/* Listings */}
      {filteredListings.length === 0 ? (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-12 text-center">
          {listings.length === 0 ? (
            <>
              <div className="flex min-h-[20vh] sm:min-h-[30vh] items-center justify-center text-center">
                <div className="flex flex-col items-center">
                  {/* House Icon */}
                  <div className="mb-4 text-gray-400">
                    <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {t("landlord.manageListings.noProperties.title")}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 mb-6 max-w-md">
                    {t("landlord.manageListings.noProperties.description")}
                  </p>

                  {/* Action Button */}

                  <Link
                    href="landlord/manage-listings/add-new-property"
                    className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white text-base font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-primary/80 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    {t("landlord.manageListings.noProperties.emptyAction")}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-3 shadow-sm border border-gray-200 rounded-lg">
            {listings.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                userName={user?.name ?? ""}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
}
