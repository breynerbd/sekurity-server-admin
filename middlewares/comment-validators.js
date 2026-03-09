import { param, body } from "express-validator";
import { checkValidators } from "./check-validators.js"; // Usando el nombre exacto de tu export

export const validateDeleteComment = [
    param('id')
        .notEmpty().withMessage('El ID del comentario es obligatorio')
        .isInt().withMessage('El ID debe ser un número entero'),
    checkValidators
];

// Validador preventivo para la creación de comentarios (POST)
export const validateCreateComment = [
    body('content')
        .notEmpty().withMessage('El contenido del comentario no puede estar vacío')
        .isString().withMessage('El contenido debe ser texto')
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage('El comentario debe tener entre 1 y 1000 caracteres'),
    body('user_id')
        .notEmpty().withMessage('El ID de usuario es obligatorio')
        .isInt().withMessage('ID de usuario inválido'),
    body('report_id')
        .notEmpty().withMessage('El ID del reporte es obligatorio')
        .isInt().withMessage('ID de reporte inválido'),
    checkValidators
];