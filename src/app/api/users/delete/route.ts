import { NextRequest, NextResponse } from "next/server";
const CLERK_API_URL = "https://api.clerk.com/v1";
export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const res = await fetch(`${CLERK_API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error: error?.message || "Delete failed" }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
