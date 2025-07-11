import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/db";
import User from "@/app/models/user.model";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
        }
        await connectDB()
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: "User already registered" }, { status: 400 })
        }
        const user = await User.create({ email, password })

        return NextResponse.json({ message: "User successfully  registered", user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: "Failed to register user" }, { status: 400 })
    }
}