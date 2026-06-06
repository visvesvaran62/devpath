import mongoose from "mongoose";


const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URI is not defined");
        }

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`database connected with ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }


}
export default connectDb
