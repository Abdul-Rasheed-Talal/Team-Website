import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react"
import { prisma } from "@/lib/prisma"

// Fetch active jobs from database
async function getJobs() {
    const jobs = await prisma.job.findMany({
        where: { status: "OPEN" },
        orderBy: { createdAt: "desc" }
    })
    return jobs
}

export default async function JobsPage() {
    const jobs = await getJobs()

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Join Our Team
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    We&apos;re always looking for talented individuals who are passionate about building great software.
                </p>
            </section>

            {/* Job Listings */}
            <section className="container px-4 mx-auto max-w-4xl">
                {jobs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg mb-4">No open positions at the moment.</p>
                        <p className="text-sm text-muted-foreground">Check back soon or join our community to stay updated!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <article
                                key={job.id}
                                className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                {job.type || "Full-time"}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h2>
                                        <p className="text-muted-foreground line-clamp-2">
                                            {job.description.substring(0, 200)}...
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                                    </div>

                                    <div className="flex-shrink-0">
                                        <Link href={`/jobs/${job.slug}`}>
                                            <Button>View Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Benefits Section */}
            <section className="container py-12 md:py-24 mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                            <Clock className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Flexible Hours</h3>
                        <p className="text-sm text-muted-foreground">Work when you&apos;re most productive</p>
                    </div>
                    <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Remote First</h3>
                        <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
                    </div>
                    <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                            <DollarSign className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Competitive Pay</h3>
                        <p className="text-sm text-muted-foreground">Top-tier compensation packages</p>
                    </div>
                    <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                            <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Growth</h3>
                        <p className="text-sm text-muted-foreground">Learn and grow with the best</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
