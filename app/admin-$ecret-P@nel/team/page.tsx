import { getTeamMembers, deleteTeamMember } from "@/app/actions/team"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function AdminTeamPage() {
    const members = await getTeamMembers()

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                    <p className="text-muted-foreground">Manage your developers and team members</p>
                </div>
                <Link href="/admin-$ecret-P@nel/team/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Member
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <div key={member.id} className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.profile?.title}</p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin-$ecret-P@nel/team/${member.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-amber-600">
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    await deleteTeamMember(member.id)
                                }}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                            {member.profile?.bio || 'No bio provided'}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {member.profile?.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                            {(member.profile?.skills.length || 0) > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{(member.profile?.skills.length || 0) - 3}
                                </Badge>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
