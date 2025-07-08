// File: src/app/select-role/page.tsx (Server Component)
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import ClientRoleSelector from "@/components/select-role/ClientRoleSelector";

export default async function SelectRolePage() {
  const { userId } = await auth();
  if (!userId) redirect("/https://resolved-dragon-23.accounts.dev/sign-in");
  console.log(`userId => ${userId}`);

  const user = await currentUser();
  if (!user) redirect("/https://resolved-dragon-23.accounts.dev/sign-in");

  return <ClientRoleSelector userId={user!.id} />;
}
