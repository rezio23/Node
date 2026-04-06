import { fileURLToPath } from "node:url";
import app from "./app.js";
import connectDB from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        const port = process.env.PORT || 8000;

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.log("Server startup failed!", error);
        process.exit(1);
    }
};

startServer();
