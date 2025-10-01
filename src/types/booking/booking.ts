import { BookingStatus, BookingType } from "@/lib/enum/booking_enums";
import { PaymentStatus } from "@/lib/enum/payment_enums";

export interface Room {
    description: string;
    price_of_bed_per_month: string;
    number_of_beds: number;
}

// Use CreateBooking as base and extend it for display
export interface Booking {
    id: number;
    student_id: string;
    room_id: number;
    property_id: number;
    booking_type: BookingType;
    booking_status: BookingStatus;
    start_date: string;
    end_date: string;
    payment_status: PaymentStatus;
    room: Room;
}

// Keep your existing type for creating a booking
export interface CreateBooking {
    student_id: string;
    room_id: number;
    booking_type: string;
    booking_status: string;
    start_date: string;
    end_date: string;
    payment_status: string;
}
