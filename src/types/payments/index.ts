
export interface Booking {
    id: number
    student_id: number
    listing_id: number
    room_id: number
    bed_index?: number
    status: "pending" | "approved" | "rejected" | "active" | "cancelled" | "completed"
    start_date: Date
    end_date: Date
    payment_status: "unpaid" | "partial" | "paid"
    created_at: Date
    updated_at: Date
  }
  
  export interface Payment {
    id: number
    booking_id: number
    amount: number
    method: "cash" | "iban_transfer"
    status: "pending" | "confirmed" | "rejected"
    reference_note?: string
    timestamp: Date
    created_at: Date
    updated_at: Date
  }
  
  export interface Notification {
    id: number
    user_id: number
    message: string
    type: "system" | "booking" | "payment" | "listing"
    is_read: boolean
    created_at: Date
  }
  
