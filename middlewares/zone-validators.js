import { param, body } from "express-validator";
import { validateFields } from "./check-validators.js";

export const validateCreateZone = [
    body('name')
        .notEmpty().withMessage('El nombre de la zona es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser una cadena de texto')
        .trim()
        .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres'),
    validateFields
];

export const validateUpdateZone = [
    param('id')
        .isInt().withMessage('El ID de la zona debe ser un número entero'),
    body('name')
        .optional()
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser una cadena de texto')
        .trim(),
    validateFields
];

export const validateDeleteZone = [
    param('id')
        .isInt().withMessage('El ID de la zona debe ser un número entero')
        .notEmpty().withMessage('El ID es obligatorio'),
    validateFields
];