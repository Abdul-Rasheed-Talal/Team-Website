import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function checkAuth(allowedRoles: UserRole[] = ["ADMIN", "EDITOR"]) {
    const session = await auth()

    if (!session?.user?.email) {
        return { error: "Unauthorized", status: 401 }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true, name: true, email: true }
    })

    if (!user) {
        return { error: "User not found", status: 404 }
    }

    if (!allowedRoles.includes(user.role)) {
        return { error: "Forbidden - Insufficient permissions", status: 403 }
    }

    return { user }
}

export async function getSession() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true, name: true, email: true }
    })

    return user
}
