// src/utils/users.ts
const CLERK_API_URL = "https://api.clerk.com/v1";
export async function fetchClerkUsers() {
  const res = await fetch(`${CLERK_API_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function updateClerkRole(userId: string, update: Record<string, any>) {
  const res = await fetch("/api/users/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, ...update }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to update user");
  }

  return data;
}

export async function deleteClerkUser(userId: string) {
  const res = await fetch("/api/users/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to delete user");
  return data;
}

export async function banClerkUser(userId: string) {
  const res = await fetch(`/api/users/ban`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to ban user");
  return data;
}