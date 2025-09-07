// src/types/user.ts
export interface User {
  id: string
  clerk_id: string // Added Clerk user ID for integration
  name: string
  email: string
  password_hash?: string
  role: "student" | "landlord" | "admin"
  phone: string
  profile_image_url?: string
  is_active: boolean
  email_verified: boolean
  created_at: Date
  updated_at: Date
}

export interface StudentProfile {
  id: string
  user_id: string
  date_of_birth: Date
  gender: "male" | "female"
  university_name: string
  college: string
  degree: string
  specialization: string
  budget_min: number
  budget_max: number
  preferred_room_type: string
  created_at: Date
  updated_at: Date
}

export interface AuthState {
  user: User | null
  studentProfile?: StudentProfile
  isAuthenticated: boolean
  isLoading: boolean
}
