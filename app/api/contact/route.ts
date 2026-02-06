import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth-check"

// GET /api/contact - List contact messages (admin only)
export async function GET() {
    try {
        const authResult = await checkAuth(["ADMIN"])
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const messages = await prisma.contact.findMany({
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(messages)
    } catch (error) {
        console.error("Error fetching contact messages:", error)
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        )
    }
}

// POST /api/contact - Submit contact form (public)
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            )
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        })

        return NextResponse.json(
            { success: true, id: contact.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error saving contact message:", error)
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        )
    }
}
