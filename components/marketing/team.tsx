import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
    {
        name: "Abdul Rasheed Talal",
        role: "Full Stack Developer",
        bio: "Building modern web applications with React, Next.js, and TypeScript.",
        portfolio: "https://abdulrasheedtalal.netlify.app",
        github: "Abdul-Rasheed-Talal",
    },
    {
        name: "Ali Raza",
        role: "Frontend Developer • Project Manager • Co-Founder",
        bio: "Leading projects and crafting exceptional user interfaces.",
        portfolio: "https://ali-raza-dev.netlify.app",
        github: "Ali-developer-12",
    },
    {
        name: "Hammad Ali",
        role: "Frontend Developer",
        bio: "Creating responsive and interactive web experiences.",
        portfolio: "http://hammad-portfolionetlifyapp.netlify.app",
        github: "hammad-ali-6",
    },
    {
        name: "Imran",
        role: "Frontend Developer • QA Tester",
        bio: "Building interfaces and ensuring quality through thorough testing.",
        portfolio: "https://muhammad-imran-dev.netlify.app",
        github: "imrancit104-cmyk",
    },
    {
        name: "Abdul Saboor",
        role: "Frontend Developer • UI/UX Designer",
        bio: "Designing beautiful interfaces with great user experience.",
        portfolio: "https://abdulsaboor-dev.netlify.app",
        github: "Abdul-Saboor-Dev",
    },
    {
        name: "M. Arsalan",
        role: "Developer",
        bio: "Building robust and scalable web solutions.",
        portfolio: null,
        github: null,
    },
    {
        name: "Taimoor Shahzad",
        role: "Developer",
        bio: "Passionate about creating impactful digital products.",
        portfolio: "https://tamoor-tech.github.io/Tamoor.dev/",
        github: "tamoor-tech",
    },
    {
        name: "Adil Ali",
        role: "Developer",
        bio: "Crafting clean code and innovative solutions.",
        portfolio: null,
        github: null,
    },
]

export function Team() {
    return (
        <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Meet the Team
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    We are a team of passionate developers building great software.
                </p>
            </div>

            {/* Group Photo Section */}
            <div className="mt-12 mb-8">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border shadow-xl">
                    <div className="aspect-[16/9] flex flex-col items-center justify-center p-8">
                        {/* Placeholder Icon */}
                        <div className="mb-4 rounded-full bg-primary/10 p-6">
                            <svg
                                className="h-16 w-16 text-primary/50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Team Photo</h3>
                        <p className="text-muted-foreground text-center max-w-md">
                            Our group photo is coming soon! Stay tuned to see the faces behind the code.
                        </p>
                        <span className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            Coming Soon
                        </span>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                {teamMembers.map((member) => (
                    <div
                        key={member.name}
                        className="group flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
                    >
                        {/* Avatar */}
                        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            {member.github ? (
                                <img
                                    src={`https://github.com/${member.github}.png`}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-bold text-primary">
                                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold">{member.name}</h3>
                            <p className="text-sm font-medium text-primary">{member.role}</p>
                            <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </div>

                        {/* Portfolio Link */}
                        {member.portfolio ? (
                            <Link href={member.portfolio} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    View Portfolio
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="ghost" size="sm" disabled className="gap-2 opacity-50">
                                Coming Soon
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}


