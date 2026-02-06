"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, HelpCircle } from "lucide-react"

export function Hero() {
    const { data: session } = useSession()

    return (
        <section className="relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center mx-auto py-20 md:py-32 lg:py-40 px-4">
                {/* Badge */}
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80"
                >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Trusted by leading companies</span>
                    <ArrowRight className="h-3 w-3" />
                </Link>

                {/* Main heading */}
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                        Verified Developers,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        Building Trust.
                    </span>
                </h1>

                {/* Subheading */}
                <p className="max-w-[42rem] leading-relaxed text-muted-foreground text-lg sm:text-xl">
                    We are a collective of vetted engineering talent dedicated to high-quality software delivery and open-source contributions.
                </p>

                {/* CTA Buttons - Changes based on session */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    {session ? (
                        <>
                            <Link href="/jobs">
                                <Button size="lg" className="gap-2 text-base px-8">
                                    View Jobs
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="text-base px-8">
                                    Our Services
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/join">
                                <Button size="lg" className="gap-2 text-base px-8">
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" className="text-base px-8">
                                    Learn More
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/40">
                    <div className="text-center">
                        <div className="text-3xl font-bold">50+</div>
                        <div className="text-sm text-muted-foreground">Verified Developers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">200+</div>
                        <div className="text-sm text-muted-foreground">Projects Delivered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">99%</div>
                        <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                    </div>
                </div>

                {/* FAQ Link */}
                <Link
                    href="/contact#faq"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <HelpCircle className="h-4 w-4" />
                    <span>Have questions? Check our FAQs</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}


