// src/types/user.ts
export interface User {
    id: string;
    email_addresses: { email_address: string }[];
    created_at: number;
    public_metadata?: { role?: string };
  }
  