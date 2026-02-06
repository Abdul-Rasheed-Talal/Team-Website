import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkAuth } from "@/lib/auth-check"

// GET /api/posts - List published posts (public)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")
        const all = searchParams.get("all") === "true"

        // If requesting all posts, check auth
        if (all || status) {
            const authResult = await checkAuth()
            if ("error" in authResult) {
                return NextResponse.json(
                    { error: authResult.error },
                    { status: authResult.status }
                )
            }

            const posts = await prisma.post.findMany({
                where: status ? { status: status as any } : undefined,
                include: {
                    author: {
                        select: { name: true, email: true, image: true }
                    }
                },
                orderBy: { createdAt: "desc" }
            })

            return NextResponse.json(posts)
        }

        // Public: only published posts
        const posts = await prisma.post.findMany({
            where: { status: "PUBLISHED" },
            include: {
                author: {
                    select: { name: true, image: true }
                }
            },
            orderBy: { publishedAt: "desc" }
        })

        return NextResponse.json(posts)
    } catch (error) {
        console.error("Error fetching posts:", error)
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        )
    }
}

// POST /api/posts - Create new post (protected)
export async function POST(request: Request) {
    try {
        const authResult = await checkAuth()
        if ("error" in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        const body = await request.json()
        const { title, slug, content, excerpt, image, status } = body

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: "Title, slug, and content are required" },
                { status: 400 }
            )
        }

        // Check if slug already exists
        const existingPost = await prisma.post.findUnique({
            where: { slug }
        })

        if (existingPost) {
            return NextResponse.json(
                { error: "A post with this slug already exists" },
                { status: 400 }
            )
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                image,
                status: status || "DRAFT",
                authorId: authResult.user.id,
                publishedAt: status === "PUBLISHED" ? new Date() : null
            }
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error("Error creating post:", error)
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        )
    }
}
