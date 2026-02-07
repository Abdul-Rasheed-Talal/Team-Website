import { getContacts, markAsRead, deleteContact } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { Trash2, MailOpen, Mail } from "lucide-react"

export default async function AdminContactPage() {
    const contacts = await getContacts()

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
                <p className="text-muted-foreground">Read and manage inquiries from the website</p>
            </div>

            <div className="space-y-4">
                {contacts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
                        No messages received yet.
                    </div>
                ) : (
                    contacts.map((msg) => (
                        <div key={msg.id} className={`p-6 rounded-xl border transition-colors ${msg.isRead
                                ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'
                                : 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{msg.subject}</h3>
                                    <p className="text-sm text-gray-500">
                                        From: <span className="font-medium text-gray-900 dark:text-gray-100">{msg.name}</span> ({msg.email})
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Received: {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {!msg.isRead && (
                                        <form action={async () => {
                                            'use server'
                                            await markAsRead(msg.id)
                                        }}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <MailOpen className="w-4 h-4" />
                                                Mark Read
                                            </Button>
                                        </form>
                                    )}
                                    <form action={async () => {
                                        'use server'
                                        await deleteContact(msg.id)
                                    }}>
                                        <Button variant="ghost" size="icon" className="hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
