import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://127.0.0.1:27017/myapp')
    } catch (error) {
        console.error(`error connectToDb ${error}`)
    }
}

export const connection = mongoose.connection