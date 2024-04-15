import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        console.log(process.env.MONGO_URL);
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database `);
    } catch (error) {
        console.log("connection error in mongodb",error);
    }
}

export default connectDB;