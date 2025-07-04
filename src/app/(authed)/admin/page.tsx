// src/app/student/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const user = await currentUser();
  if (user?.publicMetadata.role !== "bayyitni_admin") {
    return <div>Unauthorized</div>;
  }

  return <div>Welcome Admin {user.firstName}</div>;
}
