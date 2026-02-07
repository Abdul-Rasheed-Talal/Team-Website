import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, PenSquare } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

// Fetch published posts from database
async function getPosts() {
    const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        include: {
            author: {
                select: { name: true, image: true }
            },
            adminAuthor: {
                select: { email: true }
            }
        },
        orderBy: { publishedAt: "desc" }
    })
    return posts
}

// Calculate read time based on content length
function getReadTime(content: string) {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
}

export default async function BlogPage() {
    const posts = await getPosts()
    const session = await auth()

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Our Blog
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Insights, tutorials, and best practices from our team of verified developers.
                </p>
            </section>

            {/* Blog Posts Grid */}
            <section className="container px-4 mx-auto max-w-7xl">
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
                        <p className="text-sm text-muted-foreground">Check back soon for updates!</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => {
                            // Determine author name
                            const authorName = post.author?.name || post.adminAuthor?.email?.split('@')[0] || "DevOrg Team";

                            return (
                                <article
                                    key={post.id}
                                    className="group rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg"
                                >
                                    {/* Image Placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-primary/30">DevOrg</span>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <Link href={`/blog/${post.slug}`}>
                                            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {post.excerpt || post.content.substring(0, 150) + "..."}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span className="capitalize">{authorName}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{post.publishedAt?.toLocaleDateString() || "Draft"}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{getReadTime(post.content)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
            </section>

            {/* CTA Section - Show different content based on auth status */}
            <section className="container py-12 md:py-24 mx-auto text-center">
                {session?.user ? (
                    <>
                        <h2 className="text-3xl font-bold mb-4">Ready to share your knowledge?</h2>
                        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                            You&apos;re logged in! The admin panel for writing posts is coming soon.
                        </p>
                        <Button size="lg" disabled className="gap-2">
                            <PenSquare className="h-5 w-5" />
                            Write a Post (Coming Soon)
                        </Button>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold mb-4">Want to contribute?</h2>
                        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                            If you&apos;re a verified developer, you can share your knowledge with our community.
                        </p>
                        <Link href="/login">
                            <Button size="lg">Login to Contribute</Button>
                        </Link>
                    </>
                )}
            </section>
        </div>
    )
}

