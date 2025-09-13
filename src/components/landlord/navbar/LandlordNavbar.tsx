"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Plus,
  Building,
  CreditCard,
  Menu,
  X,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { LanguageToggle } from "@/components/public/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export function LandlordNavbar() {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    {
      href: "/landlord/dashboard",
      label: t("navigation.dashboard"),
      icon: LayoutDashboard,
    },
    {
      href: "/landlord/manage-listings/add-new-property",
      label: t("navigation.addListing"),
      icon: Plus,
    },
    {
      href: "/landlord/manage-listings",
      label: t("navigation.manageListings"),
      icon: Building,
    },
    // {
    //   href: "/landlord/tenant-requests",
    //   label: t("navigation.tenantRequests"),
    //   icon: Users,
    // },
    {
      href: "/landlord/payments",
      label: t("navigation.payments"),
      icon: CreditCard,
    },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/landlord" className="flex items-center space-x-2">
              <Image
                src="/images/branding/Bayyitni_logo_transparent_1.png"
                alt="Bayyitni Logo"
                width={120}
                height={40}
              />
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications (icon only) */}
            <LanguageToggle />
            <Link
              href="/landlord/notifications"
              className="p-2 rounded-full hover:bg-muted transition"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>

            {/* User (Clerk built-in component) */}
            <UserButton />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
