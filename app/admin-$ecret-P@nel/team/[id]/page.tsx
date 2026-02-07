import TeamMemberForm from "@/components/admin/team-form"
import { getTeamMember } from "@/app/actions/team"
import { notFound } from "next/navigation"

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
    // Await params before accessing its properties
    const { id } = await params;

    let member = null

    if (id !== 'new') {
        member = await getTeamMember(id)
        if (!member) notFound()
    }

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {id === 'new' ? 'Add Team Member' : 'Edit Member'}
                </h1>
                <p className="text-muted-foreground">
                    {id === 'new' ? 'Onboard a new developer to your team.' : `Editing: ${member?.name}`}
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                <TeamMemberForm member={member || undefined} />
            </div>
        </div>
    )
}
