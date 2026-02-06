import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth-check"

// GET /api/jobs - List jobs
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const all = searchParams.get("all") === "true"

        // If requesting all jobs, check auth
        if (all) {
            const authResult = await checkAuth()
            if ("error" in authResult) {
                return NextResponse.json(
                    { error: authResult.error },
                    { status: authResult.status }
                )
            }

            const jobs = await prisma.job.findMany({
                include: {
                    _count: { select: { applications: true } }
                },
                orderBy: { createdAt: "desc" }
            })

            return NextResponse.json(jobs)
        }

        // Public: only active jobs
        const jobs = await prisma.job.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(jobs)
    } catch (error) {
        console.error("Error fetching jobs:", error)
        return NextResponse.json(
            { error: "Failed to fetch jobs" },
            { status: 500 }
        )
    }
}

// POST /api/jobs - Create new job (protected)
export async function POST(request: Request) {
    try {
        const authResult = await checkAuth(["ADMIN"])
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const body = await request.json()
        const { title, slug, description, location, type, salary, isActive } = body

        if (!title || !slug || !description) {
            return NextResponse.json(
                { error: "Title, slug, and description are required" },
                { status: 400 }
            )
        }

        // Check if slug already exists
        const existingJob = await prisma.job.findUnique({
            where: { slug }
        })

        if (existingJob) {
            return NextResponse.json(
                { error: "A job with this slug already exists" },
                { status: 400 }
            )
        }

        const job = await prisma.job.create({
            data: {
                title,
                slug,
                description,
                location,
                type,
                salary,
                isActive: isActive ?? true
            }
        })

        return NextResponse.json(job, { status: 201 })
    } catch (error) {
        console.error("Error creating job:", error)
        return NextResponse.json(
            { error: "Failed to create job" },
            { status: 500 }
        )
    }
}
