'use server'

import { prisma } from "@/lib/prisma"
import { verifyAdmin } from "@/lib/auth-admin"
import { revalidatePath } from "next/cache"

export async function submitContact(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        })
        return { success: true }
    } catch (error) {
        return { error: "Failed to send message." }
    }
}

export async function getContacts() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.contact.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function markAsRead(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.contact.update({
            where: { id },
            data: { isRead: true }
        })
        revalidatePath('/admin-$ecret-P@nel/contact')
        return { success: true }
    } catch (error) {
        return { error: "Failed to update." }
    }
}

export async function deleteContact(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.contact.delete({ where: { id } })
        revalidatePath('/admin-$ecret-P@nel/contact')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete." }
    }
}
