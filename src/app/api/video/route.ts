import connectDB from "@/app/utils/db";
import Video from "@/app/models/video.model";
import { NextRequest, NextResponse } from "next/server";

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