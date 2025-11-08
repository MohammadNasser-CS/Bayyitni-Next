import { NextResponse } from "next/server";
import { DashboardSummary } from "@/types/admin/statistics";

const LARAVEL_URL = "https://bayyitni-laravel-2.onrender.com/api/admin/dashboard/summary";
const CLERK_API_URL = "https://api.clerk.dev/v1/users";

export async function GET() {
    try {
        // Laravel summary
        const laravelRes = await fetch(LARAVEL_URL, { cache: "no-store" });
        if (!laravelRes.ok) throw new Error("Laravel dashboard fetch failed");
        const laravelData = await laravelRes.json();

        // Clerk users
        const clerkRes = await fetch(CLERK_API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        });

        if (!clerkRes.ok) throw new Error("Clerk API request failed");
        const users = await clerkRes.json();

        // const totalUsers = users.length;
        const landlords = users.filter((u: any) => u.public_metadata?.role === "landlord").length;
        const tenants = users.filter((u: any) => u.public_metadata?.role === "student").length;

        const merged: DashboardSummary = {
            ...laravelData,
            statistics: {
                ...laravelData.statistics,
                users: {
                    total: landlords + tenants,
                    landlords,
                    tenants,
                },
            },
        };

        return NextResponse.json(merged);
    } catch (error: any) {
        console.error("Dashboard summary error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
