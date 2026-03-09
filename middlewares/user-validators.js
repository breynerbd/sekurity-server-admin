import { param, body } from "express-validator";
import { checkValidators } from "./check-validators.js"; // El middleware que revisa los resultados

export const validateGetUserById = [
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .notEmpty().withMessage('El ID es obligatorio'),
    checkValidators
];

export const validateDeactivateUser = [
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .notEmpty().withMessage('El ID es obligatorio'),
    checkValidators
];

export const validateUpdateUser = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser texto')
        .trim(),
    body('correo')
        .optional()
        .isEmail().withMessage('Debe ser un correo válido'),
    checkValidators
];