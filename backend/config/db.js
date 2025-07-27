import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://deepakdivek15:uihkuKSSMvV57NsL@cluster0.sd1xmyz.mongodb.net/BiryaniNest')
    .then(() => console.log('database connected'))
} 