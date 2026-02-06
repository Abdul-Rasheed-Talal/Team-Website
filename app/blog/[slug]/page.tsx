import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

// Calculate read time based on content length
function getReadTime(content: string) {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
}

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params

    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            author: {
                select: { name: true, image: true },
                include: {
                    profile: {
                        select: { title: true }
                    }
                }
            }
        }
    })

    if (!post || post.status !== "PUBLISHED") {
        notFound()
    }

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Back Link */}
            <div className="container pt-8 mx-auto max-w-4xl px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>
            </div>

            {/* Article Header */}
            <article className="container mx-auto max-w-4xl px-4">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            {post.author?.image ? (
                                <img
                                    src={post.author.image}
                                    alt={post.author.name || "Author"}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-foreground">{post.author?.name || "Unknown Author"}</p>
                                <p className="text-xs">{(post.author as any)?.profile?.title || "Developer at DevOrg"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.publishedAt?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{getReadTime(post.content)}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="aspect-video w-full rounded-lg object-cover mb-8"
                        />
                    ) : (
                        <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8">
                            <span className="text-4xl font-bold text-primary/30">DevOrg</span>
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line">{post.content}</div>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Found this helpful?</p>
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className="container py-12 mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Want more insights?</h2>
                <Link href="/blog">
                    <Button>Read More Articles</Button>
                </Link>
            </section>
        </div>
    )
}
