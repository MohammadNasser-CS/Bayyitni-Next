// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/public/LanguageToggle";

export default function HomePage() {
  const { user, isLoading } = useAuth(); // Custom AuthContext (wraps Clerk)
  const router = useRouter();
  const { t } = useLanguage();
  const [buttonLoading, setButtonLoading] = useState<string | null>(null);

  // ✅ Handle redirect logic for authenticated users
  useEffect(() => {
    // 1. Don't do anything while auth state is still loading
    if (isLoading) return;

    // 2. If no user → stay on homepage (don't redirect)
    if (!user) return;

    // 3. If user exists, check their role
    const role = user?.role;

    if (!role) {
      // If role not assigned yet → ask user to pick one
      router.replace("/select-role");
      return;
    }

    // 4. Redirect user based on role
    switch (role) {
      case "student":
        router.replace("/student");
        break;
      case "landlord":
        router.replace("/landlord");
        break;
      case "admin":
        router.replace("/admin");
        break;
      default:
        router.replace("/sign-in"); // fallback (in case of unknown role)
    }
  }, [user, isLoading, router]);

  // ✅ While checking auth session
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse">
          {t("auth.checkingSession")}
        </p>
      </div>
    );
  }

  // ✅ If user exists → show redirect message
  if (user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse">
          {t("auth.welcomeBack", {
            name: user.name || t("auth.friend"),
            role: t("auth.dashboard"),
          })}
        </p>
      </div>
    );
  }

  // ✅ If NOT authenticated → show homepage (public landing page)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language toggle floating button */}
      <div className="absolute top-4 right-6 z-50">
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t("homepage.title")}
              <span className="text-primary"> {t("homepage.bayyitni")}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              {t("homepage.subtitle")}
            </p>

            {/* Buttons: Sign In / Sign Up */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setButtonLoading("sign-in");
                  router.push("/sign-in");
                }}
                disabled={buttonLoading === "sign-in"}
                className="bg-primary hover:scale-105 hover:bg-hints transform transition duration-200 text-white font-semibold rounded-lg px-8 py-3 text-lg cursor-pointer"
              >
                {buttonLoading === "sign-in"
                  ? t("common.loading")
                  : t("homepage.getStarted")}
              </button>

              <button
                onClick={() => {
                  setButtonLoading("sign-up");
                  router.push("/sign-up");
                }}
                disabled={buttonLoading === "sign-up"}
                className="border border-gray-300 hover:scale-105 hover:bg-gray-100 transform transition duration-200 text-gray-700 font-semibold rounded-lg px-8 py-3 text-lg cursor-pointer"
              >
                {buttonLoading === "sign-up"
                  ? t("common.loading")
                  : t("homepage.signUp")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-100 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("homepage.whyChoose")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("homepage.whyChooseSubtitle")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-primary mb-2">
                {t("homepage.forStudents")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("homepage.forStudentsDesc")}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t("homepage.studentsList.advancedSearch")}</li>
                <li>• {t("homepage.studentsList.verifiedLandlords")}</li>
                <li>• {t("homepage.studentsList.secureBooking")}</li>
                <li>• {t("homepage.studentsList.support247")}</li>
              </ul>
            </div>

            {/* Landlords */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {t("homepage.forLandlords")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("homepage.forLandlordsDesc")}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t("homepage.landlordsList.easyManagement")}</li>
                <li>• {t("homepage.landlordsList.tenantScreening")}</li>
                <li>• {t("homepage.landlordsList.securePayments")}</li>
                <li>• {t("homepage.landlordsList.analytics")}</li>
              </ul>
            </div>

            {/* Trusted */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                {t("homepage.trustedPlatform")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("homepage.trustedPlatformDesc")}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t("homepage.trustedList.verifiedListings")}</li>
                <li>• {t("homepage.trustedList.secureTransactions")}</li>
                <li>• {t("homepage.trustedList.culturalSensitivity")}</li>
                <li>• {t("homepage.trustedList.localSupport")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
