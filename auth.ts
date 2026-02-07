import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as any,
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        ...authConfig.providers
    ],
})





// NEXT_PUBLIC_APP_URL=http://localhost:3000
// AUTH_SECRET=dev-secret # Change this in production
// DATABASE_URL="postgresql://neondb_owner:npg_EKpet7Nn2rjP@ep-wandering-smoke-a10567k7.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30&connection_limit=20&pool_timeout=20"

// # Auth Providers
// AUTH_GITHUB_ID=
// AUTH_GITHUB_SECRET=
// AUTH_GOOGLE_ID=
// AUTH_GOOGLE_SECRET=

// # RESEND EMAIL
// RESEND_API_KEY="re_WFm3vF16_Ca7G1Lpa3gfYqXcJ1r3i7dBf"
// RESEND_FROM_EMAIL="admin@devorg.com"

// # INITIAL ADMINS
// INITIAL_ADMIN_EMAIL_1="mabdulrasheedtalal@gmail.com"
// INITIAL_ADMIN_EMAIL_2="aliraza.dev.crusader@gmail.com"
// INITIAL_ADMIN_PASSWORD='@lira\$heedrazatalal129'
// APPROVAL_PASSWORD='@team_website@dmim\$12'

// # SYSTEM
// REQUIRED_APPROVALS=2
// SECRET_ADMIN_PATH="admin-\$ecret-P@nel"
// NEXTAUTH_SECRET="generate_random_32_chars"
// ADMIN_SESSION_SECRET="generate_random_32_chars"

