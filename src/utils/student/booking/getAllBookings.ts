// src/utils/student/booking/getAllBookings.ts
import axios from "axios";

export async function getAllBookings(studentId: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/booking/student/${studentId}`
        );
        return response.data.data; // API returns { data: [...] }
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
}
