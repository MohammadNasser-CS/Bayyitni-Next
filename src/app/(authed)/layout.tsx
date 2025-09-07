"use client";

import { LandlordNavbar } from "@/components/landlord/navbar/LandlordNavbar";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/https://resolved-dragon-23.accounts.dev/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  const role = user?.publicMetadata?.role ?? "user";

  const navLinks = [
    {
      label: "Properties",
      href:
        role === "landlord"
          ? "/landlord/"
          : role === "student"
          ? "/student/"
          : "#",
    },
    { label: "Applications", href: "#" },
    { label: "Tenants", href: "#" },
    { label: "Payments", href: "#" },
    { label: "Messages", href: "#" },
  ];

  return <main className="">{children}</main>;
}
