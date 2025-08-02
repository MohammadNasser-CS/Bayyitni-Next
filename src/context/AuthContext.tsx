"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface AuthContextType {
  userId: string | null;
  fullName: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [authData, setAuthData] = useState<AuthContextType>({
    userId: null,
    fullName: null,
    isLoading: true,
  });

  useEffect(() => {
    if (isLoaded) {
      setAuthData({
        userId: user?.id ?? null,
        fullName: user?.fullName ?? null,
        isLoading: false,
      });
    }
  }, [user, isLoaded]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
