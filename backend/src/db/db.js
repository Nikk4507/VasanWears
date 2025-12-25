import mongoose from "mongoose";
import dbName from "../constans.js";

let isConnected = false;

const connectDb = async () => {
    try {
        if (isConnected) {
            return;
        }

        const connection = await mongoose.connect(process.env.MONGODB_URL, {
            dbName,
            maxPoolSize: 10,       // connection pooling
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = connection.connections[0].readyState === 1;

        console.log("MongoDB connected:", connection.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDb;
