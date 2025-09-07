"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LandlordDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { t } = useLanguage();
  const userName = user?.firstName || user?.username || "User";
  if (!isLoaded || !user) return null;

  // Fake fixed data
  const stats = [
    {
      title: "Total Listings",
      value: 12,
      description: "8 active",
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Occupancy Rate",
      value: "75%",
      description: "18/24 beds occupied",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "18,000 SAR",
      description: "Estimated earnings",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Pending Requests",
      value: 3,
      description: "Awaiting approval",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const listings = [
    { title: "Al Noor Apartments", city: "Ramallah", status: "verified" },
    { title: "Sunset Residency", city: "Nablus", status: "pending" },
    { title: "Garden View Villa", city: "Bethlehem", status: "rejected" },
  ];

  const revenue = {
    monthly: "18,000 SAR",
    annual: "216,000 SAR",
    occupiedBeds: "18 / 24",
    avgPerBed: "1,000 SAR/month",
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("navigation.dashboard")}
          </h1>
          <p className="text-gray-600">
            {t("landlord.welcomeMessage", { name: userName })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Listings */}
          <div
            key="Total Listings"
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                {t("landlord.stats.totalListings.title")}
              </h3>
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">
              {t("landlord.stats.totalListings.description", { value: "8" })}
            </p>
          </div>
          {/* Occupancy Rate */}
          <div
            key="Occupancy Rate"
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                {t("landlord.stats.occupancyRate.title")}
              </h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-gray-500">
              {t("landlord.stats.occupancyRate.description", {
                value: "18/14",
              })}
            </p>
          </div>
          {/* Monthly Revenue */}
          <div
            key="Monthly Revenue"
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                {t("landlord.stats.monthlyRevenue.title")}
              </h3>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">
              {t("landlord.stats.monthlyRevenue.value", { value: "8000" })}
            </div>
            <p className="text-xs text-gray-500">
              {t("landlord.stats.monthlyRevenue.description", {
                value: "8000",
              })}
            </p>
          </div>
          {/* Pending Requests */}
          <div
            key="Pending Requests"
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                {t("landlord.stats.pendingRequests.title")}
              </h3>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">
              {t("landlord.stats.pendingRequests.value", { value: "6" })}
            </div>
            <p className="text-xs text-gray-500">
              {t("landlord.stats.pendingRequests.description")}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="flex items-center gap-2 text-lg font-medium mb-2">
              <Building className="h-5 w-5" /> Listings Status
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Overview of your property listings
            </p>

            {listings.map((listing, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border rounded-lg mb-2"
              >
                <div>
                  <h4 className="font-medium">{listing.title}</h4>
                  <p className="text-sm text-gray-500">{listing.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  {listing.status === "verified" && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  {listing.status === "pending" && (
                    <Clock className="h-4 w-4 text-orange-600" />
                  )}
                  {listing.status === "rejected" && (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Overview */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="flex items-center gap-2 text-lg font-medium mb-2">
              <TrendingUp className="h-5 w-5" /> Revenue Overview
            </h2>
            <p className="text-gray-500 text-sm mb-4">Your earnings summary</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">This Month</span>
                <span className="font-medium">{revenue.monthly}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Projected Annual</span>
                <span className="font-medium">{revenue.annual}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Occupied Beds</span>
                <span className="font-medium">{revenue.occupiedBeds}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Average per Bed</span>
                <span className="font-medium">{revenue.avgPerBed}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
