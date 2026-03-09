import { Router } from "express";
import {
    createZone,
    getZones,
    updateZone,
    deleteZone
} from "./zone.controller.js";
import { 
    validateCreateZone, 
    validateUpdateZone, 
    validateDeleteZone 
} from "../../middlewares/zone-validators.js";

const router = Router();

// Crear zona con validación de body
router.post("/", validateCreateZone, createZone);

// Obtener todas (usualmente no requiere validación de entrada)
router.get("/", getZones);

// Actualizar zona con validación de ID y campos opcionales
router.put("/:id", validateUpdateZone, updateZone);

// Eliminar con validación de ID
router.delete("/:id", validateDeleteZone, deleteZone);

export default router;