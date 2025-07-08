import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

interface User {
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    name: string,
    username: string,
    isAdmin: boolean,
}

export const userSceham = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})