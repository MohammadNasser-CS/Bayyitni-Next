import { DashboardSummary } from "@/types/admin/statistics";

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
    const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return res.json();
};
