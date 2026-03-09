import { Router } from "express";
import {
    getRatings,
    getAverageRatingByReport
} from "./rating.controller.js";

const router = Router();

// Obtener todas las calificaciones
router.get("/", getRatings);

// Obtener promedio con validación de query param
router.get("/averageByReport", getAverageRatingByReport);

export default router;