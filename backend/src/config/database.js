import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n Connected to MongoDB!
            ${connectionInstance.connection.host}`);
    }
    catch (error){
        console.log("MongoDB connection failed!", error);
        process.exit(1)
    }
}

export default connectDB;