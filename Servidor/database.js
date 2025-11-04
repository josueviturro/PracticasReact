import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("MongoDB connected");
    }
    catch(error){
        console.error("MongoDB connection error:", error);
    }}

export default connectDB;
