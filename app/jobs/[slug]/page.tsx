"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Briefcase, DollarSign, CheckCircle, Loader2 } from "lucide-react"
import { use } from "react"

interface Job {
    id: string
    title: string
    slug: string
    description: string
    location: string | null
    type: string | null
    salary: string | null
    isActive: boolean
}

interface JobDetailPageProps {
    params: Promise<{ slug: string }>
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
    const { slug } = use(params)
    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [isApplying, setIsApplying] = useState(false)
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        resume: "",
        coverLetter: "",
    })

    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await fetch(`/api/jobs?slug=${slug}`)
                if (res.ok) {
                    const jobs = await res.json()
                    const found = jobs.find((j: Job) => j.slug === slug)
                    setJob(found || null)
                }
            } catch (error) {
                console.error("Error fetching job:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchJob()
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsApplying(true)
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsApplying(false)
        alert("Application submitted! We'll be in touch soon.")
        setFormState({ name: "", email: "", resume: "", coverLetter: "" })
    }

    if (loading) {
        return (
            <div className="container py-24 mx-auto max-w-4xl px-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Loading job details...</p>
            </div>
        )
    }

    if (!job) {
        return (
            <div className="container py-24 mx-auto max-w-4xl px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
                <p className="text-muted-foreground mb-6">The job posting you&apos;re looking for doesn&apos;t exist or has been filled.</p>
                <Link href="/jobs">
                    <Button>View All Jobs</Button>
                </Link>
            </div>
        )
    }

    // Parse description for sections (simple markdown-like parsing)
    const sections = {
        responsibilities: [
            "Contribute to the development of our products",
            "Collaborate with team members on projects",
            "Write clean, maintainable code"
        ],
        requirements: [
            "Relevant experience in the field",
            "Strong problem-solving skills",
            "Excellent communication abilities"
        ],
        benefits: [
            "Competitive salary and equity",
            "Flexible remote work",
            "Learning and development budget"
        ]
    }

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Back Link */}
            <div className="container pt-8 mx-auto max-w-4xl px-4">
                <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Link>
            </div>

            {/* Job Details */}
            <div className="container mx-auto max-w-4xl px-4">
                <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
                    {/* Main Content */}
                    <div>
                        <header className="mb-8">
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                                {job.type || "Full-time"}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                {job.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.location}</span>
                                    </div>
                                )}
                                {job.type && (
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{job.type}</span>
                                    </div>
                                )}
                                {job.salary && (
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span>{job.salary}</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4">About the Role</h2>
                                <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                                <ul className="space-y-2">
                                    {sections.responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {sections.requirements.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                                <ul className="space-y-2">
                                    {sections.benefits.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Application Form Sidebar */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Apply Now</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState({ ...formState, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState({ ...formState, email: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="resume" className="text-sm font-medium">
                                        Resume URL
                                    </label>
                                    <Input
                                        id="resume"
                                        placeholder="Link to your resume"
                                        value={formState.resume}
                                        onChange={(e) =>
                                            setFormState({ ...formState, resume: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="coverLetter" className="text-sm font-medium">
                                        Cover Letter
                                    </label>
                                    <Textarea
                                        id="coverLetter"
                                        placeholder="Why are you interested?"
                                        rows={4}
                                        value={formState.coverLetter}
                                        onChange={(e) =>
                                            setFormState({ ...formState, coverLetter: e.target.value })
                                        }
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isApplying}>
                                    {isApplying ? "Submitting..." : "Submit Application"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
