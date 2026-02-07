import BlogPostForm from "@/components/admin/blog-form"
import { getPost } from "@/app/actions/blog"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: { id: string } }) {
    // Await params before accessing its properties
    const { id } = await params;

    let post = null

    if (id !== 'new') {
        post = await getPost(id)
        if (!post) notFound()
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {id === 'new' ? 'Create New Post' : 'Edit Post'}
                </h1>
                <p className="text-muted-foreground">
                    {id === 'new' ? 'Write something amazing today.' : `Editing: ${post?.title}`}
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                <BlogPostForm post={post || undefined} />
            </div>
        </div>
    )
}
