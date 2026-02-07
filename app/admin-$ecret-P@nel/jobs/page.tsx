import { getJobs, deleteJob } from "@/app/actions/jobs"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function AdminJobsPage() {
    const jobs = await getJobs()

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
                    <p className="text-muted-foreground">Manage open positions and applications</p>
                </div>
                <Link href="/admin-$ecret-P@nel/jobs/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Post Job
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-zinc-950/50">
                        <tr className="border-b border-gray-200 dark:border-zinc-800 text-left text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Applications</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No jobs posted. Create your first one.
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{job.title}</div>
                                        <div className="text-sm text-gray-500 font-mono">/{job.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={job.status === 'OPEN' ? 'default' : 'secondary'}>
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {job.location} ({job.type})
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {job._count?.applications || 0}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin-$ecret-P@nel/jobs/${job.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-amber-600">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                'use server'
                                                await deleteJob(job.id)
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
