import { Team } from "@/components/marketing/team"
import { getTeamMembers } from "@/app/actions/team"

export default async function TeamPage() {
    const members = await getTeamMembers()

    return (
        <div className="flex flex-col pb-10">
            <Team members={members} />
        </div>
    )
}
