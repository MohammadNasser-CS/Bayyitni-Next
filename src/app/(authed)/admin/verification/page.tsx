"use client";

import { useUser } from "@clerk/nextjs";
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
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;

  // Example mock data for now
  const stats = [
    {
      title: t("admin.stats.totalLandlords.title"),
      value: 45,
      description: t("admin.stats.totalLandlords.description"),
      icon: Users,
      color: "text-primary",
    },
    {
      title: t("admin.stats.totalListings.title"),
      value: 128,
      description: t("admin.stats.totalListings.description"),
      icon: Building,
      color: "text-green-600",
    },
    {
      title: t("admin.stats.monthlyRevenue.title"),
      value: "92,000 SAR",
      description: t("admin.stats.monthlyRevenue.description"),
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: t("admin.stats.pendingApprovals.title"),
      value: 5,
      description: t("admin.stats.pendingApprovals.description"),
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      message: t("admin.activities.newListing", {
        name: "Al Noor Apartments",
      }),
      icon: Building,
      color: "text-primary",
    },
    {
      message: t("admin.activities.landlordApproved", {
        name: "Ahmad Saleh",
      }),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      message: t("admin.activities.listingRejected", {
        name: "Sunset Residency",
      }),
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t("navigation.dashboard")}
          </h1>
          <p className="text-hints">
            {t("admin.welcomeMessage", {
              name: user.firstName || user.username || "Admin",
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-cards-background shadow-md border border-placeholders p-4 rounded-lg flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-labels">
                  {item.title}
                </h3>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-hints">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-cards-background shadow-md border border-placeholders rounded-lg p-6">
          <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
            <TrendingUp className="h-5 w-5" /> {t("admin.recentActivity.title")}
          </h2>
          <ul className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 border-b border-placeholders pb-2 last:border-none"
              >
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                <span className="text-sm">{activity.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
