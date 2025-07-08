"use client";

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

  return (
    <div className="min-h-screen w-full">
      <nav className="bg-primary border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side: Logo + Nav */}
            <div className="flex items-center space-x-6">
              <Image
                src="/images/branding/Bayyitni_logo_transparent_1.png"
                alt="Bayyitni Logo"
                width={120}
                height={40}
              />
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-secondary hover:text-blue-900 hover:border-b-2 hover:border-blue-600 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side: User + Logout */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {user?.firstName ||
                  user?.username ||
                  user?.emailAddresses?.[0]?.emailAddress ||
                  "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
              >
                <span className="text-sm font-medium">Log out</span>
                {/* Logout Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-secondary focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-100 shadow">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm text-secondary font-medium hover:text-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t pt-3 flex flex-col gap-2">
              <span className="text-sm text-gray-600">
                {user?.firstName ||
                  user?.username ||
                  user?.emailAddresses?.[0]?.emailAddress ||
                  "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition duration-200"
              >
                <span className="text-sm font-medium">Log out</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 w-full p-6">{children}</main>
    </div>
  );
}
