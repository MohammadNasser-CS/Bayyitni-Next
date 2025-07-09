"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientRedirectHandler() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      window.location.href = "https://resolved-dragon-23.accounts.dev/sign-in";
    } else {
      router.replace("/select-role");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <img
        src="/images/branding/Bayyitni_logo_transparent_1.png"
        alt="Bayyitni Logo"
        className="mb-3 animate-bounce w-100 h-44"
      />

      {/* Spinner */}
      {/* <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4" /> */}

      <p className="text-gray-600 text-lg font-medium">Signing you in...</p>
    </div>
  ); // or a loading spinner
}
