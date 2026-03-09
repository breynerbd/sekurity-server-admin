import { Router } from "express";
import {
    getRatings,
    getAverageRatingByReport
} from "./rating.controller.js";
import { 
    validateGetAverageRatingByReport 
} from "../../middlewares/rating-validators.js";

const router = Router();

// Obtener todas las calificaciones
router.get("/", getRatings);

// Obtener promedio con validación de query param
router.get("/averageByReport", validateGetAverageRatingByReport, getAverageRatingByReport);

export default router;