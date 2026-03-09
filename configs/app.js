import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions } from "./cors-configuration.js";
import { helmetConfiguration } from "./helmet-configuration.js";
import { requestLimit } from "../middlewares/request-limit.js";
import { errorHandler } from "../middlewares/handle-errors.js";
import { setupAssociations } from "../src/associations.js";

import userRouter from "../src/users/user.routes.js";
import reportRouter from "../src/reports/report.routes.js";
import zoneRouter from "../src/zones/zone.routes.js";
import commentRouter from "../src/comments/comment.routes.js";
import ratingRouter from "../src/ratings/rating.routes.js";
import internalRouter from "../src/internals/internal.routes.js";

const BASE_URL = "/sekurity/v1";

export const initServer = () => {

    const app = express();
    app.use(express.json());

    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    app.use(requestLimit);

    setupAssociations();

    app.use(`${BASE_URL}/users`, userRouter);
    app.use(`${BASE_URL}/reports`, reportRouter);
    app.use(`${BASE_URL}/zones`, zoneRouter);
    app.use(`${BASE_URL}/comments`, commentRouter);
    app.use(`${BASE_URL}/ratings`, ratingRouter);
    app.use(`${BASE_URL}/internals`, internalRouter);

    app.get(`${BASE_URL}/health`, (req, res) => {
        res.status(200).json({
            success: true,
            message: "Sekurity API running correctly"
        });
    });

    app.use(errorHandler);

    return app;
};
