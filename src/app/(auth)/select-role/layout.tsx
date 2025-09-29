// app/(auth)/select-role/layout.tsx

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function SelectRoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Top Nav */}
      <nav className="w-full px-4 py-3 shadow-sm bg-background">
        <div className="max-w-5xl w-full mx-auto flex justify-between items-center">
          <img
            src="/images/branding/Bayyitni_logo_transparent_1.png"
            alt="Bayyitni Logo"
            width={120}
            height={40}
            className="cursor-pointer"
          />
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">
              {t("auth.SelectRoleLayout.alreadyHaveAccount")}
            </span>

            {isSignedIn ? (
              <SignOutButton redirectUrl="/sign-in">
                <button className="text-sm bg-primary hover:bg-labels disabled:opacity-50 text-white py-3 px-10 rounded-lg transition duration-300 cursor-pointer">
                  {t("auth.SelectRoleLayout.backToSignIn")}
                </button>
              </SignOutButton>
            ) : (
              <Link
                href="/sign-in"
                className="text-sm bg-primary hover:bg-labels disabled:opacity-50 text-white py-3 px-10 rounded-lg transition duration-300 cursor-pointer"
              >
                {t("auth.SelectRoleLayout.backToSignIn")}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Page Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
