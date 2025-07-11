import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB URI in env file")
}
let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { connection: null, promise: null }
}


export async function connectDB() {
    if (cached.connection) {
        return cached.connection
    }
    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose.connect(MONGODB_URI, options)
            .then(() => {
                mongoose.connection()
            })
    }
    try {
        cached.connection = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.connection
}