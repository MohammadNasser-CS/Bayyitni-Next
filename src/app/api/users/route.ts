import { NextRequest, NextResponse } from "next/server";

const CLERK_API_URL = "https://api.clerk.com/v1";

export async function GET() {
  try {
    const res = await fetch(`${CLERK_API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    // You can map data here if needed to simplify props

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { userId, role } = await req.json();

  const res = await fetch(`${CLERK_API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
    body: JSON.stringify({
      public_metadata: { role },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();

  const res = await fetch(`${CLERK_API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });

  return NextResponse.json({ success: res.status === 200 });
}
