import JobForm from "@/components/admin/job-form"
import { getJob } from "@/app/actions/jobs"
import { notFound } from "next/navigation"

export default async function EditJobPage({ params }: { params: { id: string } }) {
    // Await params before accessing its properties
    const { id } = await params;

    let job = null

    if (id !== 'new') {
        job = await getJob(id)
        if (!job) notFound()
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {id === 'new' ? 'Post New Job' : 'Edit Job'}
                </h1>
                <p className="text-muted-foreground">
                    {id === 'new' ? 'Create a new opportunity for developers.' : `Editing: ${job?.title}`}
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                <JobForm job={job || undefined} />
            </div>
        </div>
    )
}
