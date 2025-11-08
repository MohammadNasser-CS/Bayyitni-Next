"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { fetchDashboardSummary } from "@/utils/admin/dashboard/fetchDashboardSummary";
import { DashboardSummary } from "@/types/admin/statistics";

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  // Redirect to dashboard route if not already there
  useEffect(() => {
    if (window.location.pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard summary
  useEffect(() => {
    const loadData = async () => {
      try {
        const summary = await fetchDashboardSummary();
        setData(summary);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {t("errorFetchingData")}: {error}
      </div>
    );
  }

  const stats = data.statistics;
  const pendingListings = data.pendingListings || [];
  const recentActivity = data.recentActivity || [];

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
            {t("admin.dashboard.reviewListings", {
              count: stats.listings.pending,
            })}
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
          <StatCard
            icon={<Building className="h-5 w-5 text-primary" />}
            title={t("admin.stats.totalListings.title")}
            value={stats.listings.total}
            description={t("admin.stats.totalListings.description", {
              verified: stats.listings.verified,
              pending: stats.listings.pending,
            })}
          />

          {/* Platform Users */}
          <StatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            title={t("admin.stats.platformUsers.title")}
            value={stats.users.total}
            description={
              <>
                {t("admin.stats.platformUsers.description")}
                <br />
                {t("admin.stats.platformUsers.landlords")}:{" "}
                <strong>{stats.users.landlords}</strong> •{" "}
                {t("admin.stats.platformUsers.students")}:{" "}
                <strong>{stats.users.tenants}</strong>
              </>
            }
          />

          {/* Monthly Revenue */}
          <StatCard
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            title={t("admin.stats.monthlyRevenue.title")}
            value={`${stats.revenue.monthly} ${stats.revenue.currency}`}
            description={t("admin.stats.monthlyRevenue.description")}
          />

          {/* Pending Reviews */}
          <StatCard
            icon={<AlertTriangle className="h-5 w-5 text-primary" />}
            title={t("admin.stats.pendingReviews.title")}
            value={stats.listings.pending + stats.bookings.pending}
            description={t("admin.stats.pendingReviews.description")}
          />
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

            {pendingListings.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-hints">
                  {t("admin.verificationQueue.empty")}
                </p>
              </div>
            ) : (
              pendingListings.slice(0, 3).map((listing: any) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between p-3 border border-placeholders shadow rounded-md mb-2"
                >
                  <div>
                    <h4 className="font-medium">{listing.title}</h4>
                    <p className="text-sm text-hints">
                      {listing.buildingName}, {listing.location.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm">
                    <Clock className="h-3 w-3" />
                    {t("admin.verificationQueue.pending")}
                  </div>
                </div>
              ))
            )}

            {pendingListings.length > 0 && (
              <button
                onClick={() => router.push("/admin/verification")}
                className="mt-4 w-full py-2 border rounded-md text-sm text-white bg-primary hover:bg-orange-500 cursor-pointer"
              >
                {t("admin.verificationQueue.reviewAll", {
                  count: pendingListings.length,
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
              <StatLine
                label={t("admin.platformStats.totalProperties")}
                value={stats.listings.total}
              />
              <StatLine
                label={t("admin.platformStats.totalRooms")}
                value={stats.rooms.total}
              />
              <StatLine
                label={t("admin.platformStats.totalBeds")}
                value={stats.rooms.totalBeds}
              />
              <StatLine
                label={t("admin.platformStats.occupancyRate")}
                value={`${stats.rooms.occupancyRate}%`}
              />
              <StatLine
                label={t("admin.platformStats.activeBookings")}
                value={stats.bookings.active}
              />
              <StatLine
                label={t("admin.platformStats.pendingBookings")}
                value={stats.bookings.pending}
              />
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
            {recentActivity.slice(0, 5).map((act: any) => (
              <div
                key={act.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    act.type === "payment"
                      ? "bg-green-500"
                      : act.type === "booking"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t(`admin.recentActivity.${act.type}`)}
                  </p>
                  <p className="text-xs text-hints">
                    {JSON.stringify(act.details)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// 🔹 Reusable components
function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  description: React.ReactNode; // ✅ now accepts JSX or string
}) {
  return (
    <div className="p-4 rounded-lg bg-cards-background shadow-md border border-placeholders">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-labels">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-hints mt-1">{description}</div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-hints">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
