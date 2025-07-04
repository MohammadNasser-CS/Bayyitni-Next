// src/app/(auth)/sign-in/[[...rest]]/page.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </>
  );
}
