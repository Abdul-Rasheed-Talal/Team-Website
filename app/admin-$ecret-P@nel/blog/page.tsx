import { getPosts, deletePost } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function AdminBlogPage() {
    const posts = await getPosts()

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage your blog content</p>
                </div>
                <Link href="/admin-$ecret-P@nel/blog/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create Post
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-zinc-950/50">
                        <tr className="border-b border-gray-200 dark:border-zinc-800 text-left text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No posts found. Create your first one.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{post.title}</div>
                                        <div className="text-sm text-gray-500 font-mono">/{post.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={post.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                            {post.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {post.adminAuthor?.email || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin-$ecret-P@nel/blog/${post.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-amber-600">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                'use server'
                                                await deletePost(post.id)
                                            }}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
