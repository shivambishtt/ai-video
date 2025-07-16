import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "../models/user.model";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials?.email || credentials?.password) {
                    throw new Error("Email or password is required")
                }
                try {
                    await connectDB()
                    const user = await User.findOne({ email: credentials?.email })
                    if (!user) {
                        throw new Error("User not found with this email")
                    }

                    const isValid = await bcrypt.compare(credentials?.password, user.password)
                    if (!isValid) {
                        throw new Error("Invalid password")
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    console.error("Auth error ", error)
                    throw error
                }
            }
        })

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token

        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET!
}