import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                if (user.id) {
                    token.id = user.id
                }
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                if (token.id) {
                    session.user.id = token.id as string
                }
                if (token.role) {
                    session.user.role = token.role as "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER"
                }
            }
            return session
        }
    }
} satisfies NextAuthConfig

