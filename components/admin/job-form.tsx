'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Editor from "@/components/editor"
import { createJob, updateJob } from "@/app/actions/jobs"
import { JobStatus } from "@prisma/client"

interface JobData {
    id?: string
    title: string
    slug: string
    description: string
    location: string | null
    type: string | null
    salary: string | null
    status: JobStatus
}

export default function JobForm({ job }: { job?: JobData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState(job?.description || '')
    const [error, setError] = useState('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        formData.set('description', description)

        try {
            let result;
            if (job?.id) {
                result = await updateJob(job.id, formData)
            } else {
                result = await createJob(formData)
            }

            if (result.error) {
                setError(result.error)
            } else {
                router.push('/admin-$ecret-P@nel/jobs')
                router.refresh()
            }
        } catch (e) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input name="title" defaultValue={job?.title} required placeholder="Senior Backend Engineer" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input name="slug" defaultValue={job?.slug} required placeholder="senior-backend-engineer" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input name="location" defaultValue={job?.location || ''} placeholder="Remote / New York" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input name="type" defaultValue={job?.type || ''} placeholder="Full-time / Contract" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input name="salary" defaultValue={job?.salary || ''} placeholder="$120k - $150k" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Job Description</Label>
                <Editor content={description} onChange={setDescription} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                    name="status"
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue={job?.status || 'DRAFT'}
                >
                    <option value="DRAFT">Draft</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (job?.id ? 'Update Job' : 'Create Job')}
                </Button>
            </div>
        </form>
    )
}
