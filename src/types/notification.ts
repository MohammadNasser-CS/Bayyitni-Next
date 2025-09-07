export interface Notification {
    id: string
    user_id: string
    message: string
    type: "system" | "booking" | "payment" | "listing"
    is_read: boolean
    created_at: Date
  }