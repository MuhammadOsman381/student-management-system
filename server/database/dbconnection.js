import mongoose from "mongoose";

export default async function dbconnection() {
    try {
        const connectionObj = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`database connected at ${connectionObj.connection.host}`);
    } catch (error) {
        console.log("connection failed");
        throw error;
    }
}



