import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold text-destructive">Authentication Error</h1>
            <p className="text-muted-foreground">
                There was a problem signing you in. Please try again.
            </p>
            <Button asChild variant="outline">
                <Link href="/login">Back to Login</Link>
            </Button>
        </div>
    )
}
