import { Router } from "express";

import {
    getRatings,
    getAverageRatingByReport
} from "./rating.controller.js";

const router = Router();

router.get("/", getRatings);

router.get("/averageByReport", getAverageRatingByReport);

export default router;