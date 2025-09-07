"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { User, StudentProfile } from "@/types/user";

interface AuthContextType {
  user: User | null;
  studentProfile?: StudentProfile;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const [authData, setAuthData] = useState<AuthContextType>({
    user: null,
    studentProfile: undefined,
    isLoading: true,
  });

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        const convertedUser: User = {
          id: (clerkUser.publicMetadata.userId as string) || clerkUser.id,
          clerk_id: clerkUser.id,
          name:
            clerkUser.fullName ||
            `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
            "User",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          role:
            (clerkUser.publicMetadata.role as
              | "student"
              | "landlord"
              | "admin") || "student",
          phone: clerkUser.primaryPhoneNumber?.phoneNumber || "",
          profile_image_url: clerkUser.imageUrl,
          is_active: true,
          email_verified:
            clerkUser.primaryEmailAddress?.verification?.status === "verified",
          created_at: new Date(clerkUser.createdAt || Date.now()),
          updated_at: new Date(clerkUser.updatedAt || Date.now()),
        };

        setAuthData({
          user: convertedUser,
          studentProfile: clerkUser.publicMetadata.studentProfile as
            | StudentProfile
            | undefined,
          isLoading: false,
        });
      } else {
        setAuthData({
          user: null,
          studentProfile: undefined,
          isLoading: false,
        });
      }
    }
  }, [clerkUser, isLoaded]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
