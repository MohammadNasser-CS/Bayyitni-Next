// src/app/student/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function StudentPage() {
  const user = await currentUser();
  if (user?.publicMetadata.role !== "student") {
    return <div>Unauthorized</div>;
  }

  return <div>Welcome Student {user.firstName}</div>;
}
