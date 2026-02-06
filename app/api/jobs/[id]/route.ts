import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth-check"

// GET /api/jobs/[id] - Get single job
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const job = await prisma.job.findUnique({
            where: { id },
            include: {
                _count: { select: { applications: true } }
            }
        })

        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(job)
    } catch (error) {
        console.error("Error fetching job:", error)
        return NextResponse.json(
            { error: "Failed to fetch job" },
            { status: 500 }
        )
    }
}

// PUT /api/jobs/[id] - Update job (protected)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await checkAuth(["ADMIN"])
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const { id } = await params
        const body = await request.json()
        const { title, slug, description, location, type, salary, isActive } = body

        const existingJob = await prisma.job.findUnique({ where: { id } })
        if (!existingJob) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 }
            )
        }

        // Check slug uniqueness if changed
        if (slug && slug !== existingJob.slug) {
            const slugExists = await prisma.job.findUnique({ where: { slug } })
            if (slugExists) {
                return NextResponse.json(
                    { error: "A job with this slug already exists" },
                    { status: 400 }
                )
            }
        }

        const job = await prisma.job.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                location,
                type,
                salary,
                isActive
            }
        })

        return NextResponse.json(job)
    } catch (error) {
        console.error("Error updating job:", error)
        return NextResponse.json(
            { error: "Failed to update job" },
            { status: 500 }
        )
    }
}

// DELETE /api/jobs/[id] - Delete job (protected, admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await checkAuth(["ADMIN"])
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const { id } = await params

        // Delete related applications first
        await prisma.application.deleteMany({ where: { jobId: id } })
        await prisma.job.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting job:", error)
        return NextResponse.json(
            { error: "Failed to delete job" },
            { status: 500 }
        )
    }
}
