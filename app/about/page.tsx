import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Users, Target, Rocket, Sparkles, Zap, ArrowRight } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex flex-col pb-10">
            {/* Hero Section with Gradient Background */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24 lg:py-32">
                {/* Decorative floating elements */}
                <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full bg-primary/5 blur-2xl animate-pulse delay-500" />

                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                <Sparkles className="h-4 w-4" />
                                Building the Future Together
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                                About Our
                                <span className="block text-primary mt-2">Organization</span>
                            </h1>
                            <p className="mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed mx-auto lg:mx-0">
                                We were founded on the principle that <span className="font-semibold text-foreground">code quality matters</span>. Our mission is to elevate the standard of software engineering by gathering the best talent and building exceptional digital experiences.
                            </p>

                            {/* Stats */}
                            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">8+</div>
                                    <div className="text-sm text-muted-foreground">Team Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">∞</div>
                                    <div className="text-sm text-muted-foreground">Possibilities</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">100%</div>
                                    <div className="text-sm text-muted-foreground">Passion</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual Element */}
                        <div className="flex-1 relative hidden lg:flex justify-center">
                            <div className="relative w-80 h-80">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-spin-slow" style={{ animationDuration: '20s' }} />
                                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/10 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        <div className="h-16 w-16 rounded-xl bg-card border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Code2 className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="h-16 w-16 rounded-xl bg-card border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Users className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="h-16 w-16 rounded-xl bg-card border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Zap className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="h-16 w-16 rounded-xl bg-card border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                            <Rocket className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values Section */}
            <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        What Drives Us
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Our core values shape everything we do, from the code we write to the relationships we build.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Innovation Card */}
                    <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:border-primary/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
                        <div className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Rocket className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Innovation</h3>
                            <p className="text-muted-foreground">
                                We embrace cutting-edge technologies and modern development practices to build solutions that stand out.
                            </p>
                        </div>
                    </div>

                    {/* Collaboration Card */}
                    <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:border-primary/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
                        <div className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                            <p className="text-muted-foreground">
                                Together, we achieve more. Our diverse team brings unique perspectives to every project we undertake.
                            </p>
                        </div>
                    </div>

                    {/* Excellence Card */}
                    <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:border-primary/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
                        <div className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Excellence</h3>
                            <p className="text-muted-foreground">
                                Quality is never an accident. We strive for excellence in every line of code and every user interaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team CTA Section */}
            <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12 lg:p-16">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-primary/5 blur-3xl" />

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                                <Users className="h-4 w-4" />
                                Our Team
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                                Meet the People Behind the Code
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Get to know our talented team of developers, designers, and innovators who make everything possible.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <Link href="/team">
                                <Button size="lg" className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Meet the Team
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
