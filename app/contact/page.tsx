"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { submitContact } from "@/app/actions/contact"

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        const formData = new FormData()
        formData.append('name', formState.name)
        formData.append('email', formState.email)
        formData.append('subject', formState.subject)
        formData.append('message', formState.message)

        try {
            const result = await submitContact(formData)

            if (result.error) {
                throw new Error(result.error)
            }

            setSubmitStatus("success")
            setFormState({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            setSubmitStatus("error")
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Get in Touch
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Have a project in mind or want to join our team? We&apos;d love to hear from you.
                </p>
            </section>

            {/* Contact Form and Info */}
            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <p className="text-muted-foreground">
                                Reach out to us through any of the following channels or fill out the form.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-muted-foreground">hello@devorg.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-muted-foreground">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-lg border bg-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
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
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject
                                </label>
                                <Input
                                    id="subject"
                                    placeholder="What's this about?"
                                    value={formState.subject}
                                    onChange={(e) =>
                                        setFormState({ ...formState, subject: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project or inquiry..."
                                    rows={6}
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState({ ...formState, message: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>

                            {submitStatus === "success" && (
                                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                                    <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="container px-4 mx-auto max-w-4xl py-12 md:py-24">
                <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    Find answers to common questions about our organization and services.
                </p>

                <div className="space-y-4">
                    <FAQItem
                        question="What is DevOrg?"
                        answer="DevOrg is a collective of verified developers working together to build innovative solutions. We bring together talented individuals who share a passion for creating great software."
                    />
                    <FAQItem
                        question="How can I join the team?"
                        answer="You can apply through our Jobs page if there are open positions. We also welcome developers to join our community through the Join page, where you can create a profile and connect with us."
                    />
                    <FAQItem
                        question="Do you offer freelance services?"
                        answer="Yes! We provide web development, mobile app development, UI/UX design, and consulting services. Visit our Services page to learn more or contact us directly."
                    />
                    <FAQItem
                        question="How long does it take to get a response?"
                        answer="We typically respond to inquiries within 24-48 business hours. For urgent matters, please indicate this in your message subject."
                    />
                    <FAQItem
                        question="Can I contribute to your blog?"
                        answer="Absolutely! If you're a verified developer on our platform, you can contribute articles to our blog. Login to your account and head to the Blog section to get started."
                    />
                </div>
            </section>
        </div>
    )
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="rounded-lg border bg-card">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-6 text-left font-medium hover:bg-accent/50 transition-colors rounded-lg"
            >
                <span>{question}</span>
                <svg
                    className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-muted-foreground">
                    {answer}
                </div>
            )}
        </div>
    )
}

