// src/types/user.ts

export interface User {
  id: string;
  clerk_id: string; // Clerk user ID
  name: string;
  email: string;
  password_hash?: string; // only for backend usage if applicable
  role: "student" | "landlord" | "admin";
  phone: string;
  profile_image_url?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface StudentProfile {
  id?: string; // optional since in Clerk metadata it may not exist yet
  user_id?: string; // redundant because Clerk ties this automatically
  date_of_birth: string; // ✅ store as ISO string in metadata
  gender: "male" | "female";
  university_name: string;
  college: string;
  degree: string;
  specialization: string;
  budget_min: number;
  budget_max: number;
  preferred_room_type: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  studentProfile?: StudentProfile;
  isAuthenticated: boolean;
  isLoading: boolean;
}
