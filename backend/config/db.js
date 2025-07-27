import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('YOUR_MONGODB_CONNECTION_STRING')
    .then(() => console.log('database connected'))
} 