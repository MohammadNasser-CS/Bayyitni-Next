// File: src/app/select-role/page.tsx (Server Component)
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RoleType } from "@/components/select-role/RoleCard";
import ClientRoleSelector from "@/components/select-role/ClientRoleSelector";

export default async function SelectRolePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  console.log(`userId => ${userId}`);

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return <ClientRoleSelector userId={user!.id} />;
}
