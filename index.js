import dotenv from "dotenv";
import { dbConnection } from "./configs/db.js";
import { initServer } from "./configs/app.js";

dotenv.config();
const PORT = process.env.PORT || 3005;

const startServer = async () => {
    try {

        await dbConnection();

        const app = initServer();

        app.listen(PORT, () => {
            console.log(`🚀 Sekurity ADMIN API running at http://localhost:${PORT}/sekurity/v1`);
        });

    } catch (error) {
        console.error("❌ Error starting ADMIN server:", error);
        process.exit(1);
    }
};

startServer();