import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";


dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error); // Check for error
            throw error;
        });

        app.listen(process.env.PORT || 8000, ()  => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed!", error);
        process.exit(1);
    }
};

startServer();
