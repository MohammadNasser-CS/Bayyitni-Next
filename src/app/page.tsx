// src/app/page.tsx
import ClientRedirectHandler from "@/components/public/ClientRedirectHandler";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();

  // If not logged in, redirect to sign-in
  if (!user) return redirect("/sign-in");

  // If user has a role already, handle redirection here
  const role = user.publicMetadata?.role;
  switch (role) {
    case "student":
      return redirect("/student");
    case "landlord":
      return redirect("/landlord");
    case "bayyitni_admin":
      return redirect("/admin");
    case undefined:
      // Show client logic if role is undefined
      return <ClientRedirectHandler />;
    default:
      return redirect("/sign-in");
  }
}
