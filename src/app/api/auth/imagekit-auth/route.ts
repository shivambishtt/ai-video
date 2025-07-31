import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const authenticationParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        })

        return NextResponse.json({
            authenticationParams,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
        })
    } catch (error) {
        return NextResponse.json({
            error: "Authentication failed"
        }, { status: 500 })
    }
}