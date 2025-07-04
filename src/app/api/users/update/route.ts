import { NextRequest, NextResponse } from "next/server";
const CLERK_API_URL = "https://api.clerk.com/v1";
export async function POST(req: NextRequest) {
  const { userId, ...update } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
   // Build public_metadata from all provided fields
  const body = {
    public_metadata: { ...update },
  };

  const res = await fetch(`${CLERK_API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
     "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();


  if (!res.ok) {
    return NextResponse.json({ error: data?.message || "Update failed" }, { status: res.status });
  }

  return NextResponse.json(data); // 👈 must return Clerk's response as-is
}
