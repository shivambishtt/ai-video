import connectDB from "@/app/utils/db";
import Video, { IVideo } from "@/app/models/video.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export async function GET() {
    try {
        await connectDB()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch videos" }, { status: 500 })

    }
}
export async function POST(request: NextRequest) {
    try {
        const session = getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 500 })
        }
        await connectDB()
        //uploading part
        const body: IVideo = await request.json()
        if (!body.title || !body.description || !body.videoURL || !body.thumbnailURL) {
            return NextResponse.json({ message: "Missing required field" }, { status: 400 })
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformations?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo)

    } catch (error) {
        return NextResponse.json({ message: "Error occured while uploading the video" }, { status: 500 })

    }
}