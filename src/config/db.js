import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Database connection successful.");
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;