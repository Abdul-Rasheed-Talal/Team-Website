import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth-check"

// GET /api/posts/[id] - Get single post
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: { name: true, email: true, image: true }
                }
            }
        })

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(post)
    } catch (error) {
        console.error("Error fetching post:", error)
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        )
    }
}

// PUT /api/posts/[id] - Update post (protected)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authResult = await checkAuth()
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const { id } = await params
        const body = await request.json()
        const { title, slug, content, excerpt, image, status } = body

        const existingPost = await prisma.post.findUnique({ where: { id } })
        if (!existingPost) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            )
        }

        // Check slug uniqueness if changed
        if (slug && slug !== existingPost.slug) {
            const slugExists = await prisma.post.findUnique({ where: { slug } })
            if (slugExists) {
                return NextResponse.json(
                    { error: "A post with this slug already exists" },
                    { status: 400 }
                )
            }
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                image,
                status,
                publishedAt: status === "PUBLISHED" && !existingPost.publishedAt
                    ? new Date()
                    : existingPost.publishedAt
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error("Error updating post:", error)
        return NextResponse.json(
            { error: "Failed to update post" },
            { status: 500 }
        )
    }
}

// DELETE /api/posts/[id] - Delete post (protected, admin only)
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

        await prisma.post.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting post:", error)
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        )
    }
}
