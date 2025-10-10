"use client";

import { useRouter } from "next/navigation";
import {
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  // Mock data
  const mockListings = [
    {
      id: 1,
      title: "Al Noor Residence",
      city: "Riyadh",
      building_name: "Al Noor",
      verification_status: "pending",
    },
    {
      id: 2,
      title: "Sunset Apartments",
      city: "Jeddah",
      building_name: "Sunset",
      verification_status: "verified",
    },
    {
      id: 3,
      title: "Palm Towers",
      city: "Dammam",
      building_name: "Palm",
      verification_status: "rejected",
    },
  ];

  const mockBookings = [
    { id: 1, status: "active" },
    { id: 2, status: "pending" },
    { id: 3, status: "active" },
  ];

  const mockRooms = [
    { number_of_beds: 4, number_of_available_beds: 1 },
    { number_of_beds: 3, number_of_available_beds: 1 },
    { number_of_beds: 5, number_of_available_beds: 2 },
  ];

  // Statistics
  const totalListings = mockListings.length;
  const verifiedListings = mockListings.filter(
    (l) => l.verification_status === "verified"
  ).length;
  const pendingListings = mockListings.filter(
    (l) => l.verification_status === "pending"
  ).length;
  const rejectedListings = mockListings.filter(
    (l) => l.verification_status === "rejected"
  ).length;

  const totalRooms = mockRooms.length;
  const totalBeds = mockRooms.reduce((sum, r) => sum + r.number_of_beds, 0);
  const availableBeds = mockRooms.reduce(
    (sum, r) => sum + r.number_of_available_beds,
    0
  );
  const occupiedBeds = totalBeds - availableBeds;

  const totalBookings = mockBookings.length;
  const pendingBookings = mockBookings.filter(
    (b) => b.status === "pending"
  ).length;
  const activeBookings = mockBookings.filter(
    (b) => b.status === "active"
  ).length;

  const totalRevenue = occupiedBeds * 100;
  const monthlyRevenue = totalRevenue;

  return (
    <div className="min-h-screen w-full">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t("admin.dashboard.title")}
          </h1>
          <p className="text-hints">{t("admin.dashboard.subtitle")}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/admin/verification")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-orange-500 cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            {t("admin.dashboard.reviewListings", { count: pendingListings })}
          </button>
          <button
            onClick={() => router.push("/admin/payments")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-placeholders text-labels hover:bg-gray-100 cursor-pointer"
          >
            {t("admin.dashboard.managePayments")}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Listings */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-labels">
                {t("admin.stats.totalListings.title")}
              </h3>
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{totalListings}</div>
            <p className="text-xs text-hints">
              {t("admin.stats.totalListings.description", {
                verified: verifiedListings,
                pending: pendingListings,
              })}
            </p>
          </div>

          {/* Platform Users */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-labels">
                {t("admin.stats.platformUsers.title")}
              </h3>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">150+</div>
            <p className="text-xs text-hints">
              {t("admin.stats.platformUsers.description")}
            </p>
          </div>

          {/* Monthly Revenue */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-labels">
                {t("admin.stats.monthlyRevenue.title")}
              </h3>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {t("admin.stats.monthlyRevenue.value", { value: monthlyRevenue })}
            </div>
            <p className="text-xs text-hints">
              {t("admin.stats.monthlyRevenue.description")}
            </p>
          </div>

          {/* Pending Reviews */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-labels">
                {t("admin.stats.pendingReviews.title")}
              </h3>
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {pendingListings + pendingBookings}
            </div>
            <p className="text-xs text-hints">
              {t("admin.stats.pendingReviews.description")}
            </p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listing Verification Queue */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <h2 className="flex items-center gap-2 text-lg font-medium mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              {t("admin.verificationQueue.title")}
            </h2>
            <p className="text-sm text-hints mb-4">
              {t("admin.verificationQueue.subtitle")}
            </p>

            {pendingListings === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-hints">
                  {t("admin.verificationQueue.empty")}
                </p>
              </div>
            ) : (
              mockListings
                .filter((l) => l.verification_status === "pending")
                .slice(0, 3)
                .map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-3 border border-placeholders shadow rounded-md mb-2"
                  >
                    <div>
                      <h4 className="font-medium">{listing.title}</h4>
                      <p className="text-sm text-hints">
                        {listing.building_name}, {listing.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <Clock className="h-3 w-3" />
                      {t("admin.verificationQueue.pending")}
                    </div>
                  </div>
                ))
            )}

            {pendingListings > 0 && (
              <button
                onClick={() => router.push("/admin/verification")}
                className="mt-4 w-full py-2 border rounded-md text-sm text-white bg-primary hover:bg-orange-500 cursor-pointer"
              >
                {t("admin.verificationQueue.reviewAll", {
                  count: pendingListings,
                })}
              </button>
            )}
          </div>

          {/* Platform Statistics */}
          <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
            <h2 className="flex items-center gap-2 text-lg font-medium mb-2">
              <TrendingUp className="h-5 w-5" />
              {t("admin.platformStats.title")}
            </h2>
            <p className="text-sm text-hints mb-4">
              {t("admin.platformStats.subtitle")}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.totalProperties")}
                </span>
                <span className="font-medium">{totalListings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.totalRooms")}
                </span>
                <span className="font-medium">{totalRooms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.totalBeds")}
                </span>
                <span className="font-medium">{totalBeds}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.occupancyRate")}
                </span>
                <span className="font-medium">
                  {totalBeds > 0
                    ? Math.round((occupiedBeds / totalBeds) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.activeBookings")}
                </span>
                <span className="font-medium">{activeBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-hints">
                  {t("admin.platformStats.pendingBookings")}
                </span>
                <span className="font-medium">{pendingBookings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
          <h2 className="text-lg font-medium mb-2">
            {t("admin.recentActivity.title")}
          </h2>
          <p className="text-sm text-hints mb-4">
            {t("admin.recentActivity.subtitle")}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {t("admin.recentActivity.newListing")}
                </p>
                <p className="text-xs text-hints">Al-Noor Residence - 2h ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {t("admin.recentActivity.payment")}
                </p>
                <p className="text-xs text-hints">Booking #1234 - 4h ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {t("admin.recentActivity.newUser")}
                </p>
                <p className="text-xs text-hints">Student from KSU - 6h ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
