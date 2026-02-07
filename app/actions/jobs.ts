'use server'

import { prisma } from "@/lib/prisma"
import { verifyAdmin } from "@/lib/auth-admin"
import { revalidatePath } from "next/cache"
import { JobStatus } from "@prisma/client"

export async function getJobs() {
    return await prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { applications: true } } }
    })
}

export async function getJob(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.job.findUnique({
        where: { id }
    })
}

export async function createJob(formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const type = formData.get("type") as string
    const salary = formData.get("salary") as string
    const status = formData.get("status") as JobStatus

    try {
        await prisma.job.create({
            data: {
                title,
                slug,
                description,
                location,
                type,
                salary,
                status: status || 'DRAFT',
            }
        })
        revalidatePath('/jobs')
        return { success: true }
    } catch (error) {
        return { error: "Failed to create job." }
    }
}

export async function updateJob(id: string, formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const type = formData.get("type") as string
    const salary = formData.get("salary") as string
    const status = formData.get("status") as JobStatus

    try {
        await prisma.job.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                location,
                type,
                salary,
                status
            }
        })
        revalidatePath(`/jobs/${slug}`)
        return { success: true }
    } catch (error) {
        return { error: "Failed to update job." }
    }
}

export async function deleteJob(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.job.delete({ where: { id } })
        revalidatePath('/jobs')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete job." }
    }
}
