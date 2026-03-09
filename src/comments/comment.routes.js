import { Router } from "express";
import {
    getComments,
    deleteComment
} from "./comment.controller.js";
import { 
    validateDeleteComment 
} from "../../middlewares/comment-validators.js";

const router = Router();

// Obtener comentarios (podrías filtrar por reporte aquí después)
router.get("/", getComments);

// Eliminar comentario con validación de ID
router.delete("/:id", validateDeleteComment, deleteComment);

export default router;