import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth({
    pages: {
        signIn: "/login",
        error: "/error"
    },
})