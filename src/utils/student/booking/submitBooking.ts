// src/utils/student/booking/submitBooking.ts

import axios from "axios";
import { CreateBooking } from "@/types/booking/booking";

export async function submitBooking(payload: CreateBooking) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Booking payload response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Booking API error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Booking request failed"
    );
  }
}
