import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const response = await axios.post(
            "https://bayyinti-project.onrender.com/property-listings/",
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return NextResponse.json(response.data, { status: 201 })
    } catch (error: any) {
        console.error("❌ API Error:", error.response?.data || error.message)
        return NextResponse.json(
            { error: error.response?.data || "Failed to submit property" },
            { status: error.response?.status || 500 }
        )
    }
}
