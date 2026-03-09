import { query, body } from "express-validator";
import { validateFields } from "./check-validators.js";

export const validateGetAverageRatingByReport = [
    query('report_id')
        .notEmpty().withMessage('El report_id es obligatorio en los query parameters')
        .isInt().withMessage('El report_id debe ser un número entero'),
    validateFields
];

// Validador preventivo para cuando implementes el POST de creación
export const validateCreateRating = [
    body('score')
        .notEmpty().withMessage('La puntuación es obligatoria')
        .isInt({ min: 1, max: 5 }).withMessage('La puntuación debe ser un número entero entre 1 y 5'),
    body('user_id')
        .notEmpty().withMessage('El ID de usuario es obligatorio')
        .isInt().withMessage('El user_id debe ser un número entero'),
    body('report_id')
        .notEmpty().withMessage('El ID del reporte es obligatorio')
        .isInt().withMessage('El report_id debe ser un número entero'),
    validateFields
];